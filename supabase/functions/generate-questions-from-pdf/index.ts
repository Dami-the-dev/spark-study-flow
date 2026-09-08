import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pdfText, pdfContent, questionCount, courseId } = await req.json();

    let textContent = pdfText;

    if (!textContent && pdfContent) {
      try {
        const binaryString = atob(pdfContent);
        textContent = binaryString.replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s+/g, ' ').trim();
      } catch (e) {
        console.error("Error decoding base64:", e);
        return new Response(
          JSON.stringify({ error: "Failed to decode PDF content" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }
    }

    if (!textContent || !questionCount) {
      return new Response(
        JSON.stringify({ error: "PDF text/content and question count are required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    if (!GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not configured");
    }

    const systemPrompt = `You are an educational question generator. Generate ${questionCount} multiple-choice questions based on the provided text. Each question must have 4 options (A, B, C, D) and indicate the correct answer. You MUST respond with ONLY a valid JSON array, no markdown, no explanation. Format: [{"question":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"correct_answer":"A","explanation":"..."}]`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Generate ${questionCount} educational questions from this text:\n\n${textContent.substring(0, 15000)}`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", response.status, errorText);
      throw new Error("Failed to generate questions from Groq API");
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content;

    if (!rawContent) {
      throw new Error("No content returned from AI");
    }

    let questions;
    try {
      const parsed = JSON.parse(rawContent);
      // Handle both {questions: [...]} and direct array responses
      questions = parsed.questions ?? parsed;
    } catch {
      throw new Error("Failed to parse AI response as JSON");
    }

    return new Response(
      JSON.stringify({ questions }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error generating questions:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate questions";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
