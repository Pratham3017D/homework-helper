export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionOptions {
  model?: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  timeoutMs?: number;
}

export interface ChatCompletionResult {
  text: string;
  model: string;
  provider: "openai-compatible";
}

export async function createChatCompletion({
  model = process.env.AI_MODEL || "qwen/qwen3.7-flash:free",
  messages,
  temperature = 0.3,
  max_tokens = 3000,
  timeoutMs = 15000,
}: ChatCompletionOptions): Promise<ChatCompletionResult> {
  const baseUrl = process.env.AI_API_BASE_URL || "https://api.bazaarlink.ai/v1";
  const apiKey = (process.env.AI_API_KEY || "").trim();

  if (!apiKey) {
    throw new Error("AI_API_KEY is not configured in environment variables.");
  }

  const endpoint = `${baseUrl.replace(/\/+$/, "")}/chat/completions`;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(timeoutMs),
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens,
      }),
    });
  } catch (err) {
    const error = err as Error;
    if (error.name === "TimeoutError") {
      throw new Error(`OpenAI-compatible provider timed out after ${timeoutMs}ms.`);
    }
    throw new Error(`OpenAI-compatible network error: ${error.message}`);
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `OpenAI-compatible provider request failed [Status ${response.status}]: ${errorText}`
    );
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("AI provider returned an empty response.");
  }

  return {
    text: content,
    model,
    provider: "openai-compatible",
  };
}
