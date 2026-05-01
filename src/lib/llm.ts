/**
 * Unified LLM caller.
 *
 * How providers are selected:
 *
 *   LOCAL dev  (OLLAMA_BASE_URL = localhost)
 *     → Try to reach Ollama. If it's not running, spawn it, wait, call, stop it.
 *     → If Ollama fails, fall back to Groq.
 *
 *   VERCEL / remote  (OLLAMA_BASE_URL = https://your-tunnel.trycloudflare.com)
 *     → Just try to reach that URL. No spawning (can't install things on Vercel).
 *     → If unreachable (your laptop is off), fall back to Groq.
 *
 * So the only thing you need to change when deploying to Vercel is:
 *   Set OLLAMA_BASE_URL=https://your-tunnel.trycloudflare.com in Vercel's env vars.
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

export type LLMProvider = "ollama" | "groq" | "none";

export interface LLMResult {
  text: string;
  provider: LLMProvider;
}

const OLLAMA_BASE  = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL    || "llama3.2";

// True when running on Vercel or when OLLAMA_BASE_URL points to a remote host
const IS_REMOTE_OLLAMA = !OLLAMA_BASE.includes("localhost") && !OLLAMA_BASE.includes("127.0.0.1");

// ── Ollama lifecycle (local only) ─────────────────────────────────────────────

let ollamaSpawned: ReturnType<typeof spawn> | null = null;
let weStartedOllama = false;

async function isOllamaReachable(): Promise<boolean> {
  try {
    const res = await fetch(`${OLLAMA_BASE}/api/tags`, {
      signal: AbortSignal.timeout(2500),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function ensureOllamaRunning(): Promise<boolean> {
  if (await isOllamaReachable()) return true;

  // Remote URL (Vercel → tunnel) — don't try to spawn, just report unreachable
  if (IS_REMOTE_OLLAMA) {
    console.warn("[LLM] Remote Ollama unreachable:", OLLAMA_BASE, "— is your laptop on and tunnel running?");
    return false;
  }

  // Local: try to start Ollama
  console.log("[LLM] Starting Ollama locally...");
  try {
    ollamaSpawned = spawn("ollama", ["serve"], {
      detached: true,
      stdio: "ignore",
      env: { ...process.env, OLLAMA_KEEP_ALIVE: "0" },
    });
    weStartedOllama = true;
  } catch {
    console.warn("[LLM] Could not spawn ollama — is it installed?");
    return false;
  }

  for (let i = 0; i < 20; i++) {
    await sleep(1000);
    if (await isOllamaReachable()) {
      console.log(`[LLM] Ollama ready after ${i + 1}s`);
      return true;
    }
  }

  console.warn("[LLM] Ollama did not start in time");
  return false;
}

function stopOllamaIfWeStartedIt() {
  if (!weStartedOllama || !ollamaSpawned) return;
  console.log("[LLM] Stopping Ollama (we started it)");
  try { ollamaSpawned.kill("SIGTERM"); } catch { /* already gone */ }
  ollamaSpawned = null;
  weStartedOllama = false;
}

// ── Ollama call ───────────────────────────────────────────────────────────────

async function callOllama(opts: LLMOptions): Promise<string | null> {
  const ready = await ensureOllamaRunning();
  if (!ready) return null;

  try {
    const body: Record<string, unknown> = {
      model:      OLLAMA_MODEL,
      messages:   opts.messages,
      stream:     false,
      keep_alive: 0,           // free RAM immediately after response
      options: {
        temperature: opts.temperature ?? 0.2,
        num_predict: opts.maxTokens   ?? 6000,
      },
    };
    if (opts.json) body.format = "json";

    const res = await fetch(`${OLLAMA_BASE}/api/chat`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(body),
      signal:  AbortSignal.timeout(180_000),
    });

    if (!res.ok) {
      console.error("[LLM] Ollama HTTP error:", res.status, await res.text().catch(() => ""));
      return null;
    }

    const data = await res.json() as { message?: { content?: string } };
    return data.message?.content ?? null;
  } catch (err) {
    console.error("[LLM] Ollama call failed:", err);
    return null;
  } finally {
    stopOllamaIfWeStartedIt();
  }
}

// ── Groq fallback ─────────────────────────────────────────────────────────────

async function callGroq(opts: LLMOptions): Promise<string | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  try {
    const { default: Groq } = await import("groq-sdk");
    const client = new Groq({ apiKey });
    const completion = await client.chat.completions.create({
      model:       "llama-3.3-70b-versatile",
      max_tokens:  opts.maxTokens   ?? 6000,
      temperature: opts.temperature ?? 0.2,
      ...(opts.json ? { response_format: { type: "json_object" as const } } : {}),
      messages:    opts.messages,
    });
    return completion.choices[0]?.message?.content ?? null;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("429") || msg.includes("rate_limit")) {
      console.warn("[LLM] Groq rate limit hit — laptop tunnel is the fix for unlimited");
    } else {
      console.error("[LLM] Groq error:", msg);
    }
    return null;
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function callLLM(opts: LLMOptions): Promise<LLMResult | null> {
  const ollamaText = await callOllama(opts);
  if (ollamaText) return { text: ollamaText, provider: "ollama" };

  const groqText = await callGroq(opts);
  if (groqText) return { text: groqText, provider: "groq" };

  return null;
}

export function getProviderStatus() {
  return {
    groqKeySet:   !!process.env.GROQ_API_KEY,
    ollamaModel:  OLLAMA_MODEL,
    ollamaRemote: IS_REMOTE_OLLAMA,
    ollamaBase:   OLLAMA_BASE,
  };
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}
