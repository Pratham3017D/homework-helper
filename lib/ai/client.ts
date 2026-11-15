export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionOptions {
  model?: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
}

export async function createChatCompletion({
  model = process.env.AI_MODEL || "qwen/qwen3.7-flash:free",
  messages,
  temperature = 0.3,
  max_tokens = 3000,
}: ChatCompletionOptions): Promise<string> {
  const baseUrl = process.env.AI_API_BASE_URL || "https://api.bazaarlink.ai/v1";
  const apiKey = process.env.AI_API_KEY;

  if (!apiKey) {
    throw new Error("AI_API_KEY is not configured in environment variables.");
  }

  const endpoint = `${baseUrl.replace(/\/+$/, "")}/chat/completions`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `AI API request failed [Status ${response.status}]: ${errorText}`
    );
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("AI provider returned an empty response.");
  }

  return content;
}
