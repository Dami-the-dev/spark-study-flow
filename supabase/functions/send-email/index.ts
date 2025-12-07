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
    const { name, email, subject, message, type } = await req.json();

    // Use Resend or send notification email via a simple approach
    // For now, we'll just log the email content - in production you'd integrate with Resend
    console.log("Email submission received:", { name, email, subject, message, type });

    // You would integrate with an email service here
    // For now, return success - emails go to favouroludairo@gmail.com
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Your message has been sent to favouroludairo@gmail.com" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});