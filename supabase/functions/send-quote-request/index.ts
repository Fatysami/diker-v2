import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface QuoteRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  workType: string;
  description: string;
  surface?: string;
  deadline?: string;
  photos?: { name: string; data: string }[];
}

// Fetch notification email from database
async function getNotificationEmail(): Promise<string> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  const { data, error } = await supabase
    .from("contact_info")
    .select("value")
    .eq("type", "notification_email")
    .single();
  
  if (error || !data) {
    console.log("Using fallback email, notification_email not found:", error);
    return "info@diker-bau.de";
  }
  
  return data.value;
}

// Fetch contact info for confirmation email
async function getContactInfo(): Promise<{ phone: string; address: string }> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  const { data, error } = await supabase
    .from("contact_info")
    .select("type, value")
    .in("type", ["phone", "address"]);
  
  if (error || !data) {
    console.log("Using fallback contact info:", error);
    return {
      phone: "0212 22 66 39 31",
      address: "Wittkuller Str. 161, 42719 Solingen"
    };
  }
  
  const phone = data.find(d => d.type === "phone")?.value || "0212 22 66 39 31";
  const address = data.find(d => d.type === "address")?.value || "Wittkuller Str. 161, 42719 Solingen";
  
  return { phone, address };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: QuoteRequest = await req.json();
    console.log("Received quote request:", { ...data, photos: data.photos?.length || 0 });

    // Get notification email from database
    const notificationEmail = await getNotificationEmail();
    const contactInfo = await getContactInfo();
    console.log("Sending to notification email:", notificationEmail);

    // Build email HTML for company
    const photoSection = data.photos && data.photos.length > 0
      ? `<h3>Anhänge</h3><p>${data.photos.length} Foto(s) angehängt</p>`
      : "";

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #4b5563; }
          .value { margin-top: 5px; }
          .footer { background: #1f2937; color: white; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Neue Angebotsanfrage</h1>
            <p style="margin: 10px 0 0 0;">Diker Bau</p>
          </div>
          <div class="content">
            <h2>Kontaktdaten</h2>
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${data.firstName} ${data.lastName}</div>
            </div>
            <div class="field">
              <div class="label">Telefon:</div>
              <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            <div class="field">
              <div class="label">E-Mail:</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            <div class="field">
              <div class="label">Ort des Projekts:</div>
              <div class="value">${data.city}</div>
            </div>

            <h2>Projektdetails</h2>
            <div class="field">
              <div class="label">Art der Arbeiten:</div>
              <div class="value">${data.workType}</div>
            </div>
            <div class="field">
              <div class="label">Beschreibung:</div>
              <div class="value">${data.description}</div>
            </div>
            ${data.surface ? `
            <div class="field">
              <div class="label">Geschätzte Fläche:</div>
              <div class="value">${data.surface} m²</div>
            </div>
            ` : ""}
            ${data.deadline ? `
            <div class="field">
              <div class="label">Gewünschter Zeitraum:</div>
              <div class="value">${data.deadline}</div>
            </div>
            ` : ""}
            ${photoSection}
          </div>
          <div class="footer">
            <p>Diese Anfrage wurde über das Kontaktformular auf der Website gesendet.</p>
            <p>Datum: ${new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Prepare attachments if photos exist
    const attachments = data.photos?.map((photo, index) => ({
      filename: photo.name || `foto-${index + 1}.jpg`,
      content: photo.data.split(",")[1], // Remove data URL prefix
    })) || [];

    // Send email to company with attachments
    const emailResponse = await resend.emails.send({
      from: "Diker Bau <info@diker-bau.de>",
      to: [notificationEmail],
      reply_to: data.email,
      subject: `Neue Anfrage: ${data.workType} - ${data.firstName} ${data.lastName}`,
      html: htmlContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    console.log("Email sent:", emailResponse);

    // Send confirmation email to customer
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
            <p><strong>Tel: ${contactInfo.phone}</strong></p>
            <p>Mit freundlichen Grüßen,<br>Ihr Team von Diker Bau</p>
          </div>
          <div class="footer">
            <p>Diker Bau GmbH</p>
            <p>${contactInfo.address}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: "Diker Bau <info@diker-bau.de>",
      to: [data.email],
      subject: "Ihre Anfrage bei Diker Bau",
      html: confirmationHtml,
    });

    console.log("Confirmation email sent to customer");

    return new Response(
      JSON.stringify({ success: true, message: "Quote request sent successfully" }),
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
