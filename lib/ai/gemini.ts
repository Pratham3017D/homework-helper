export interface GeminiOptions {
  model?: string;
  systemInstruction?: string;
  prompt: string;
  temperature?: number;
  timeoutMs?: number;
}

export interface GeminiResult {
  text: string;
  model: string;
  provider: "google-gemini";
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function callGeminiGenerateContent({
  model = process.env.AI_MODEL || "gemini-flash-lite-latest",
  systemInstruction,
  prompt,
  temperature = 0.2,
  timeoutMs = 15000,
}: GeminiOptions): Promise<GeminiResult> {
  const apiKey = (process.env.GEMINI_API_KEY || process.env.AI_API_KEY || "").trim();

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in environment variables.");
  }

  // Model fallback chain:
  // 1. User-configured model
  // 2. gemini-flash-lite-latest (fastest & high availability)
  // 3. gemini-3.5-flash (high quality flash model)
  // 4. gemini-3.8-flash (latest flash model)
  // 5. gemini-flash-latest (canonical alias)
  // 6. gemini-pro-latest (pro fallback)
  const candidateModels = [
    model,
    "gemini-flash-lite-latest",
    "gemini-3.5-flash",
    "gemini-3.8-flash",
    "gemini-flash-latest",
    "gemini-pro-latest",
  ];

  const uniqueModels = [...new Set(candidateModels.filter(Boolean))];
  let lastError: Error | null = null;

  for (const candidate of uniqueModels) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${candidate}:generateContent?key=${apiKey}`;

    const requestBody: Record<string, unknown> = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature,
      },
    };

    if (systemInstruction) {
      requestBody.systemInstruction = {
        parts: [{ text: systemInstruction }],
      };
    }

    // Try up to 2 attempts for transient errors (429, 503)
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          signal: AbortSignal.timeout(timeoutMs),
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (text) {
            return {
              text,
              model: candidate,
              provider: "google-gemini",
            };
          }
        }

        // Fatal auth errors - do not continue looping through models
        if (response.status === 401 || response.status === 403) {
          const errBody = await response.text();
          throw new Error(`Gemini Authentication Failed [${response.status}]: Invalid API key. Details: ${errBody}`);
        }

        // Transient errors: 429 (rate limit) or 503 (high demand)
        if (response.status === 429 || response.status === 503) {
          const errorText = await response.text();
          lastError = new Error(`Gemini transient error [${response.status}]: ${errorText}`);
          if (attempt === 1) {
            await delay(600);
            continue; // retry once with backoff
          }
          break; // move to next candidate model
        }

        // 404 Model Not Found or other 4xx: Move immediately to next model
        const errorText = await response.text();
        lastError = new Error(`Gemini native [${response.status}]: ${errorText}`);
        break;
      } catch (err) {
        lastError = err as Error;

        // If it was an authentication failure, re-throw immediately
        if (lastError.message.includes("Gemini Authentication Failed")) {
          throw lastError;
        }

        // Network or timeout: backoff on first attempt, then try next candidate
        if (attempt === 1) {
          await delay(400);
          continue;
        }
        break;
      }
    }

    // Secondary fallback: Google OpenAI-compatible chat completions endpoint
    try {
      const openAiUrl = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
      const openAiRes = await fetch(openAiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        signal: AbortSignal.timeout(timeoutMs),
        body: JSON.stringify({
          model: candidate,
          messages: [
            ...(systemInstruction ? [{ role: "system", content: systemInstruction }] : []),
            { role: "user", content: prompt },
          ],
          response_format: { type: "json_object" },
          temperature,
        }),
      });

      if (openAiRes.ok) {
        const openAiData = await openAiRes.json();
        const openAiText = openAiData.choices?.[0]?.message?.content;
        if (openAiText) {
          return {
            text: openAiText,
            model: candidate,
            provider: "google-gemini",
          };
        }
      }
    } catch {
      // Ignore and continue down the model candidate chain
    }
  }

  throw lastError || new Error("All Gemini models and endpoints failed to generate content.");
}
