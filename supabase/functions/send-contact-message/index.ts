import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// Fetch notification email and contact info from database
async function getContactSettings(): Promise<{ notificationEmail: string; phone: string; address: string; publicEmail: string }> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  const { data, error } = await supabase
    .from("contact_info")
    .select("type, value");
  
  if (error || !data) {
    console.log("Using fallback contact settings:", error);
    return {
      notificationEmail: "info@diker-bau.de",
      phone: "0212 22 66 39 31",
      address: "Wittkuller Str. 161, 42719 Solingen",
      publicEmail: "info@diker-bau.de"
    };
  }
  
  return {
    notificationEmail: data.find(d => d.type === "notification_email")?.value || "info@diker-bau.de",
    phone: data.find(d => d.type === "phone")?.value || "0212 22 66 39 31",
    address: data.find(d => d.type === "address")?.value || "Wittkuller Str. 161, 42719 Solingen",
    publicEmail: data.find(d => d.type === "email")?.value || "info@diker-bau.de"
  };
}

async function sendEmail(payload: {
  from: string;
  to: string[];
  reply_to?: string;
  subject: string;
  html: string;
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return res.json();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactRequest = await req.json();
    console.log("Received contact request:", { name: data.name, email: data.email, subject: data.subject });

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ error: "Name, email and message are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get contact settings from database
    const settings = await getContactSettings();
    console.log("Sending to notification email:", settings.notificationEmail);

    // Build HTML content for company email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Neue Kontaktanfrage</h1>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Kontaktdaten</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; width: 140px;">Name:</td>
              <td style="padding: 10px 0; color: #1f2937; font-weight: 500;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280;">E-Mail:</td>
              <td style="padding: 10px 0; color: #1f2937;"><a href="mailto:${data.email}" style="color: #f97316;">${data.email}</a></td>
            </tr>
            ${data.phone ? `
            <tr>
              <td style="padding: 10px 0; color: #6b7280;">Telefon:</td>
              <td style="padding: 10px 0; color: #1f2937;"><a href="tel:${data.phone}" style="color: #f97316;">${data.phone}</a></td>
            </tr>
            ` : ''}
            ${data.subject ? `
            <tr>
              <td style="padding: 10px 0; color: #6b7280;">Betreff:</td>
              <td style="padding: 10px 0; color: #1f2937;">${data.subject}</td>
            </tr>
            ` : ''}
          </table>
          
          <h2 style="color: #1f2937; border-bottom: 2px solid #f97316; padding-bottom: 10px; margin-top: 30px;">Nachricht</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #f97316;">
            <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>
        
        <div style="padding: 20px; background: #1f2937; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 14px;">
            Diese Nachricht wurde über das Kontaktformular auf diker-bau.de gesendet
          </p>
        </div>
      </div>
    `;

    // Send email to company
    const emailResponse = await sendEmail({
      from: "Diker Bau <onboarding@resend.dev>",
      to: [settings.notificationEmail],
      reply_to: data.email,
      subject: data.subject ? `Kontaktanfrage: ${data.subject}` : `Neue Kontaktanfrage von ${data.name}`,
      html: htmlContent,
    });

    console.log("Contact email sent successfully:", emailResponse);

    // Send confirmation email to customer
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Vielen Dank für Ihre Nachricht!</h1>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Sehr geehrte(r) ${data.name},
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            vielen Dank für Ihre Kontaktaufnahme. Wir haben Ihre Nachricht erhalten und werden uns 
            schnellstmöglich bei Ihnen melden.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
            <h3 style="color: #1f2937; margin-top: 0;">Ihre Nachricht:</h3>
            <p style="color: #6b7280; white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Mit freundlichen Grüßen,<br>
            <strong>Ihr Team von Diker Bau</strong>
          </p>
        </div>
        
        <div style="padding: 20px; background: #1f2937; text-align: center;">
          <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 14px;">Diker Bau</p>
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            ${settings.address}<br>
            Tel: ${settings.phone} | ${settings.publicEmail}
          </p>
        </div>
      </div>
    `;

    await sendEmail({
      from: "Diker Bau <onboarding@resend.dev>",
      to: [data.email],
      subject: "Wir haben Ihre Nachricht erhalten - Diker Bau",
      html: confirmationHtml,
    });

    console.log("Confirmation email sent to customer");

    return new Response(
      JSON.stringify({ success: true, message: "Contact message sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-contact-message function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
