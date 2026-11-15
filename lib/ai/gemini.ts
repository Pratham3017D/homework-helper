export interface GeminiOptions {
  model?: string;
  systemInstruction?: string;
  prompt: string;
  temperature?: number;
}

export async function callGeminiGenerateContent({
  model = process.env.AI_MODEL || "gemini-flash-lite-latest",
  systemInstruction,
  prompt,
  temperature = 0.2,
}: GeminiOptions): Promise<string> {
  const apiKey = (process.env.GEMINI_API_KEY || process.env.AI_API_KEY || "").trim();

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in environment variables.");
  }

  // Model fallback chain:
  // 1. gemini-flash-lite-latest (fastest & high availability)
  // 2. gemini-3.5-flash (high quality flash model)
  // 3. gemini-3.8-flash (latest flash model)
  // 4. gemini-flash-latest
  // 5. gemini-pro-latest
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
    // 1. Try Native Google Gemini endpoint
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

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        signal: AbortSignal.timeout(18000),
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
          console.log(`[Gemini Native] Successfully generated content using ${candidate}`);
          return text;
        }
      } else {
        const errorText = await response.text();
        console.warn(
          `[Gemini Native] Model ${candidate} returned status ${response.status}: ${errorText}`
        );
        lastError = new Error(`Gemini native [${response.status}]: ${errorText}`);
      }
    } catch (err) {
      console.warn(`[Gemini Native] Exception on ${candidate}:`, err);
      lastError = err as Error;
    }

    // 2. Try Google OpenAI-compatible endpoint as secondary fallback
    try {
      const openAiUrl = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
      const openAiRes = await fetch(openAiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        signal: AbortSignal.timeout(18000),
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
          console.log(`[Gemini OpenAI Mode] Successfully generated content using ${candidate}`);
          return openAiText;
        }
      }
    } catch (err) {
      console.warn(`[Gemini OpenAI Mode] Exception on ${candidate}:`, err);
    }
  }

  throw lastError || new Error("All Gemini models and endpoints failed.");
}
