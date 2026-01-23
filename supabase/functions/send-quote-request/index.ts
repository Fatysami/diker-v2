import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationRequest {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  workType: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ConfirmationRequest = await req.json();
    console.log("Sending confirmation email to:", data.email);

    // Send confirmation email to customer only
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .footer { background: #1f2937; color: white; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Vielen Dank für Ihre Anfrage!</h1>
          </div>
          <div class="content">
            <p>Sehr geehrte(r) ${data.firstName} ${data.lastName},</p>
            <p>vielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten und werden uns innerhalb von 24-48 Stunden bei Ihnen melden.</p>
            <p><strong>Ihre Anfrage:</strong></p>
            <ul>
              <li>Art der Arbeiten: ${data.workType}</li>
              <li>Ort: ${data.city}</li>
            </ul>
            <p>Bei dringenden Anliegen erreichen Sie uns telefonisch unter:</p>
            <p><strong>Tel: 0212 22 66 39 31</strong></p>
            <p>Mit freundlichen Grüßen,<br>Ihr Team von Diker Straßenbau</p>
          </div>
          <div class="footer">
            <p>Diker Straßenbau GmbH</p>
            <p>Tersteegenstraße 1, 42653 Solingen</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Diker Straßenbau <onboarding@resend.dev>",
      to: [data.email],
      subject: "Ihre Anfrage bei Diker Straßenbau",
      html: confirmationHtml,
    });

    console.log("Confirmation email sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Confirmation email sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-quote-request:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

Deno.serve(handler);
