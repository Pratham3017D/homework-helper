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

/**
 * Checks whether a 429 response represents an unrecoverable quota exhaustion
 * (e.g. daily limit exceeded or large retryDelay) vs a transient burst limit.
 */
function isQuotaExhausted(status: number, bodyText: string): boolean {
  if (status !== 429) return false;
  const lower = bodyText.toLowerCase();
  return (
    lower.includes("resource_exhausted") ||
    lower.includes("limit: 0") ||
    lower.includes("daily limit") ||
    lower.includes("per day") ||
    lower.includes("retry in 2") || // hours/days retry
    lower.includes("retrydelay")
  );
}

export async function callGeminiGenerateContent({
  model = process.env.AI_TRANSLATION_MODEL || process.env.AI_MODEL || "gemini-flash-lite-latest",
  systemInstruction,
  prompt,
  temperature = 0.2,
  timeoutMs = 16000,
}: GeminiOptions): Promise<GeminiResult> {
  const apiKey = (process.env.GEMINI_API_KEY || process.env.AI_API_KEY || "").trim();

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in environment variables.");
  }

  // Use a strictly bounded model chain:
  // 1. Configured/Primary flash model
  // 2. Single fast fallback flash model (gemini-3.5-flash)
  // NEVER include heavy pro models (gemini-pro-latest) which are quota-blocked on free tier.
  const fallbackModel = "gemini-3.5-flash";
  const candidateModels = model === fallbackModel ? [model] : [model, fallbackModel];
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

    // Attempt native endpoint (at most 1 retry for transient network/503 errors)
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

        const errBody = await response.text();

        // 1. Fatal authentication errors: throw immediately
        if (response.status === 401 || response.status === 403) {
          throw new Error(`Gemini Authentication Failed [${response.status}]: Invalid API key.`);
        }

        // 2. Fatal quota exhaustion (daily free-tier limit hit): Fail immediately!
        // Do NOT retry and do NOT loop through other models sharing the same quota.
        if (isQuotaExhausted(response.status, errBody)) {
          throw new Error(
            `Gemini Quota Exhausted [429]: Project free-tier quota exceeded. Details: ${errBody.slice(0, 300)}`
          );
        }

        // 3. Transient rate limit or 503 high demand: retry once with short backoff
        if (response.status === 429 || response.status === 503) {
          lastError = new Error(`Gemini transient error [${response.status}]: ${errBody.slice(0, 200)}`);
          if (attempt === 1) {
            await delay(400);
            continue;
          }
          break; // move to next model if transient error persisted
        }

        // 4. Model not found (404): Break to next model immediately without retry
        lastError = new Error(`Gemini native [${response.status}]: ${errBody.slice(0, 200)}`);
        break;
      } catch (err) {
        lastError = err as Error;

        // If it was an auth failure or quota exhaustion, re-throw immediately to stop wasting time
        if (
          lastError.message.includes("Gemini Authentication Failed") ||
          lastError.message.includes("Gemini Quota Exhausted")
        ) {
          throw lastError;
        }

        // Transient network abort: retry once
        if (attempt === 1) {
          await delay(300);
          continue;
        }
        break;
      }
    }
  }

  throw lastError || new Error("All Gemini models failed to generate content.");
}
