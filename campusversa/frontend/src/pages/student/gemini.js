export const getTutorResponse = async (
  userPrompt,
  language,
  lessonContext
) => {
  try {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!apiKey) {
      return "Missing OpenRouter API Key";
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "EduSense AI",
        },

        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324:free",

          messages: [
            {
              role: "system",
              content: `
You are an expert programming tutor.

Lesson Context: ${lessonContext}

Reply in ${language}.

Explain programming concepts clearly and simply.
              `,
            },

            {
              role: "user",
              content: userPrompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("AI RESPONSE:", data);

    if (data.error) {
      return `API Error: ${data.error.message}`;
    }

    return (
      data?.choices?.[0]?.message?.content ||
      "No response from AI"
    );

  } catch (error) {
    console.error("AI ERROR:", error);

    return "Failed to connect to AI";
  }
};