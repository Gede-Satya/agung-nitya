"use server";

export interface ContactFormState {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    agency?: string;
    message?: string;
  };
}

/**
 * Server Action for "Hubungi Kami" form (DESIGN.md §2 & §6)
 * - Native form action compatibility (works with or without JavaScript)
 * - Honeypot anti-spam check
 * - Sends data to CONTACT_WEBHOOK_URL if configured
 */
export async function submitContactAction(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  // 1. Honeypot check (anti-bot)
  const honeypot = formData.get("website_hp")?.toString() || "";
  if (honeypot.trim() !== "") {
    // Silently succeed for bots
    return { success: true };
  }

  // 2. Extract values
  const name = formData.get("name")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const agency = formData.get("agency")?.toString().trim() || "";
  const phone = formData.get("phone")?.toString().trim() || "";
  const message = formData.get("message")?.toString().trim() || "";

  // 3. Validation
  const fieldErrors: ContactFormState["fieldErrors"] = {};

  if (!name || name.length < 2) {
    fieldErrors.name = "Nama lengkap wajib diisi.";
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Alamat email tidak valid.";
  }

  if (!agency || agency.length < 2) {
    fieldErrors.agency = "Nama instansi / dinas pemohon wajib diisi.";
  }

  if (!message || message.length < 10) {
    fieldErrors.message = "Pesan kebutuhan pengadaan minimal 10 karakter.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: "Mohon lengkapi formulir dengan data yang valid.",
      fieldErrors,
    };
  }

  const payload = {
    timestamp: new Date().toISOString(),
    name,
    email,
    agency,
    phone,
    message,
    source: "PT Agung Wijaya Nitya Official Portal",
  };

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("Webhook POST failed with status:", res.status);
      }
    } catch (err) {
      console.error("Error dispatching contact webhook:", err);
    }
  } else {
    console.log("[DEV MODE] Contact form submission payload:", payload);
  }

  return {
    success: true,
  };
}
