export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const TO_EMAIL = process.env.CONTACT_TO_EMAIL;
  const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;

  if (!SENDGRID_API_KEY || !TO_EMAIL || !FROM_EMAIL) {
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const payload = {
    personalizations: [
      {
        to: [{ email: TO_EMAIL }],
        subject: `Portfolio contact from ${name}`
      }
    ],
    from: { email: FROM_EMAIL },
    reply_to: { email: email },
    content: [
      {
        type: "text/plain",
        value: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      }
    ]
  };

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SendGrid error:", errorText);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Email send failed" });
  }
}
