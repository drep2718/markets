/**
 * LLM caller — Ollama only.
 *
 * Local dev: if Ollama isn't running, spawns it, waits, calls it, stops it.
 * Vercel:    connects to OLLAMA_BASE_URL (your tunnel URL). No spawning.
 */

import { spawn } from "child_process";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface LLMOptions {
  messages: Message[];
  maxTokens?: number;
  temperature?: number;
  json?: boolean;
}

export type LLMProvider = "ollama" | "none";

export interface LLMResult {
  text: string;
  provider: LLMProvider;
}

const OLLAMA_BASE  = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL    || "llama3.2";

const IS_REMOTE = !OLLAMA_BASE.includes("localhost") && !OLLAMA_BASE.includes("127.0.0.1");

// ── Lifecycle ─────────────────────────────────────────────────────────────────

let spawned: ReturnType<typeof spawn> | null = null;
let weStarted = false;

const EXTRA_HEADERS: Record<string, string> = IS_REMOTE
  ? { "ngrok-skip-browser-warning": "1" }
  : {};

async function isReachable(): Promise<boolean> {
  try {
    const res = await fetch(`${OLLAMA_BASE}/api/tags`, {
      headers: EXTRA_HEADERS,
      signal: AbortSignal.timeout(2500),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function ensureRunning(): Promise<boolean> {
  if (await isReachable()) return true;

  if (IS_REMOTE) {
    console.warn("[Ollama] Tunnel unreachable:", OLLAMA_BASE);
    return false;
  }

  console.log("[Ollama] Starting locally...");
  try {
    spawned = spawn("ollama", ["serve"], {
      detached: true,
      stdio: "ignore",
      env: { ...process.env, OLLAMA_KEEP_ALIVE: "0" },
    });
    weStarted = true;
  } catch {
    console.warn("[Ollama] Could not spawn — is Ollama installed?");
    return false;
  }

  for (let i = 0; i < 20; i++) {
    await sleep(1000);
    if (await isReachable()) {
      console.log(`[Ollama] Ready after ${i + 1}s`);
      return true;
    }
  }

  console.warn("[Ollama] Did not start in time");
  return false;
}

function stopIfWeStarted() {
  if (!weStarted || !spawned) return;
  try { spawned.kill("SIGTERM"); } catch { /* already gone */ }
  spawned = null;
  weStarted = false;
}

// ── Call ──────────────────────────────────────────────────────────────────────

export async function callLLM(opts: LLMOptions): Promise<LLMResult | null> {
  const ready = await ensureRunning();
  if (!ready) return null;

  try {
    const body: Record<string, unknown> = {
      model:      OLLAMA_MODEL,
      messages:   opts.messages,
      stream:     false,
      keep_alive: 0,
      options: {
        temperature: opts.temperature ?? 0.2,
        num_predict: opts.maxTokens   ?? 6000,
      },
    };
    if (opts.json) body.format = "json";

    const res = await fetch(`${OLLAMA_BASE}/api/chat`, {
      method:  "POST",
      headers: { "Content-Type": "application/json", ...EXTRA_HEADERS },
      body:    JSON.stringify(body),
      signal:  AbortSignal.timeout(180_000),
    });

    if (!res.ok) {
      console.error("[Ollama] HTTP error:", res.status, await res.text().catch(() => ""));
      return null;
    }

    const data = await res.json() as { message?: { content?: string } };
    const text = data.message?.content ?? null;
    if (!text) return null;
    return { text, provider: "ollama" };
  } catch (err) {
    console.error("[Ollama] Call failed:", err);
    return null;
  } finally {
    stopIfWeStarted();
  }
}

export function getProviderStatus() {
  return {
    ollamaModel:  OLLAMA_MODEL,
    ollamaBase:   OLLAMA_BASE,
    ollamaRemote: IS_REMOTE,
  };
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}
