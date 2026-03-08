type Message = { role: "user" | "assistant"; content: string };

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string;

const SYSTEM_PROMPT = `You are an educational AI study assistant for Study Spark. Your purpose is STRICTLY educational.
CORE RESPONSIBILITIES:
- Answer questions about academic subjects, study techniques, and educational topics
- Help students understand concepts and solve problems
- Provide explanations, summaries, and study guidance
- Be encouraging, empathetic, and motivating
- Break down complex topics into understandable parts
STRICT LIMITATIONS:
- ONLY respond to educational and academic queries
- DO NOT engage in conversations about non-educational topics
- If asked about non-educational topics, politely redirect to educational subjects
- DO NOT provide personal advice unrelated to studies
- DO NOT discuss topics like politics, religion, or controversial subjects
TONE & APPROACH:
- Be friendly, patient, and encouraging
- Celebrate progress and effort
- Acknowledge when topics are challenging
- Use simple language and examples
- Ask clarifying questions when needed
If a user asks something non-educational, respond with:
"I'm here to help you with your studies and academic questions. Let's focus on educational topics! What would you like to learn about today?"`;

export async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError?: (error: string) => void;
}) {
  try {
    if (!GROQ_API_KEY) {
      onError?.("Groq API key is not configured. Please set VITE_GROQ_API_KEY.");
      return;
    }

    const resp = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!resp.ok) {
      let errorMsg = "Failed to connect to AI service.";
      try {
        const errorData = await resp.json();
        if (resp.status === 429) {
          onError?.("Rate limit exceeded. Please wait a moment and try again.");
          return;
        }
        errorMsg = errorData?.error?.message || errorMsg;
      } catch {
        // ignore JSON parse errors
      }
      onError?.(errorMsg);
      return;
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;

      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Final flush
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch { /* ignore partial leftovers */ }
      }
    }

    onDone();
  } catch (error) {
    console.error("Stream error:", error);
    onError?.(error instanceof Error ? error.message : "An error occurred");
  }
}
