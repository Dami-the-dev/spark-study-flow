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
    
    // Support both pdfText (direct text) and pdfContent (base64 encoded)
    let textContent = pdfText;
    
    if (!textContent && pdfContent) {
      // Decode base64 content - extract text from PDF
      try {
        const binaryString = atob(pdfContent);
        // Simple text extraction from PDF binary (basic approach)
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

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an educational question generator. Generate ${questionCount} multiple-choice questions based on the provided text. Each question should have 4 options (A, B, C, D) and indicate the correct answer. Format your response as a JSON array of objects with this structure: { "question": "...", "options": {"A": "...", "B": "...", "C": "...", "D": "..."}, "correct_answer": "A/B/C/D", "explanation": "..." }`
          },
          {
            role: "user",
            content: `Generate ${questionCount} educational questions from this text:\n\n${textContent.substring(0, 15000)}`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_questions",
              description: "Generate educational questions from text",
              parameters: {
                type: "object",
                properties: {
                  questions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        question: { type: "string" },
                        options: { 
                          type: "object",
                          properties: {
                            A: { type: "string" },
                            B: { type: "string" },
                            C: { type: "string" },
                            D: { type: "string" }
                          },
                          required: ["A", "B", "C", "D"]
                        },
                        correct_answer: { type: "string", enum: ["A", "B", "C", "D"] },
                        explanation: { type: "string" }
                      },
                      required: ["question", "options", "correct_answer", "explanation"]
                    }
                  }
                },
                required: ["questions"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_questions" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      throw new Error("Failed to generate questions");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error("No questions generated");
    }

    const questions = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify(questions),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error generating questions:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to generate questions" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});