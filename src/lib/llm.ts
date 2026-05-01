import Groq from "groq-sdk";

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

export interface LLMResult {
  text: string;
}

const MODEL = "llama-3.1-8b-instant";

export async function callLLM(opts: LLMOptions): Promise<LLMResult | null> {
  const apiKey = process.env.GROQ_API_KEY;
  console.log("[Groq] GROQ_API_KEY present:", !!apiKey, "| key prefix:", apiKey?.slice(0, 8) ?? "MISSING");

  if (!apiKey) {
    console.error("[Groq] No API key — skipping LLM call");
    return null;
  }

  const groq = new Groq({ apiKey });

  console.log("[Groq] Sending request | model:", MODEL, "| maxTokens:", opts.maxTokens ?? 6000, "| json:", !!opts.json);

  try {
    const res = await groq.chat.completions.create({
      model: MODEL,
      messages: opts.messages,
      max_tokens: opts.maxTokens ?? 6000,
      temperature: opts.temperature ?? 0.2,
      response_format: opts.json ? { type: "json_object" } : undefined,
    });

    const text = res.choices[0]?.message?.content ?? null;
    console.log("[Groq] Response received | text length:", text?.length ?? 0, "| finish_reason:", res.choices[0]?.finish_reason);
    if (!text) {
      console.error("[Groq] Empty response content");
      return null;
    }
    return { text };
  } catch (err) {
    console.error("[Groq] Call failed:", err);
    return null;
  }
}
