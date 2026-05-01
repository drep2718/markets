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

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = "llama-3.1-8b-instant";

export async function callLLM(opts: LLMOptions): Promise<LLMResult | null> {
  if (!process.env.GROQ_API_KEY) return null;

  try {
    const res = await groq.chat.completions.create({
      model: MODEL,
      messages: opts.messages,
      max_tokens: opts.maxTokens ?? 6000,
      temperature: opts.temperature ?? 0.2,
      response_format: opts.json ? { type: "json_object" } : undefined,
    });

    const text = res.choices[0]?.message?.content ?? null;
    if (!text) return null;
    return { text };
  } catch (err) {
    console.error("[Groq] Call failed:", err);
    return null;
  }
}
