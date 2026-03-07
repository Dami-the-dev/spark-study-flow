import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const GEMINI_API_KEY = 'AIzaSyAEIwKCyegzXdzeO8pAL6Gan_twaOuua0g';

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const systemPrompt = `You are an educational AI study assistant for Study Spark. Your purpose is STRICTLY educational.
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

    // Convert messages format for Gemini
    const geminiMessages = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: geminiMessages,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'AI service error' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

    return new Response(
      JSON.stringify({ 
        choices: [{ 
          message: { 
            role: 'assistant', 
            content: aiText 
          } 
        }] 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in educational-chat function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
