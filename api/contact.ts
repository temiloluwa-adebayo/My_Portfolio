// Vercel Function: delivers the portfolio contact form through Resend.
// Needs RESEND_API_KEY set in the Vercel project. CONTACT_TO and CONTACT_FROM are optional.

const TO = process.env.CONTACT_TO ?? 'temidaniel124@gmail.com';
// onboarding@resend.dev works without a verified domain, but Resend only delivers it
// to the email address that owns the Resend account.
const FROM = process.env.CONTACT_FROM ?? 'Portfolio <onboarding@resend.dev>';

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

export async function POST(request: Request): Promise<Response> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: 'Email is not configured' }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: real visitors never see this field.
  if (clean(body.company, 200)) return Response.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const topic = clean(body.topic, 120) || 'General enquiry';
  const message = clean(body.message, 5000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return Response.json({ error: 'Please fill in your name, a valid email and a message.' }, { status: 422 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Portfolio: ${topic} — ${name}`,
      text: `${message}\n\n— ${name} <${email}>\nTopic: ${topic}`,
      html: `<p style="white-space:pre-wrap">${escape(message)}</p><hr><p>${escape(name)} &lt;${escape(email)}&gt;<br>Topic: ${escape(topic)}</p>`,
    }),
  });

  if (!res.ok) return Response.json({ error: 'Could not send right now' }, { status: 502 });
  return Response.json({ ok: true });
}
