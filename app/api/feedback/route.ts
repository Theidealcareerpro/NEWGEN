import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL || "noreply@example.com"
const TO = process.env.FEEDBACK_TO_EMAIL || "hello@your-domain.com"

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json() as {
      name?: string; email?: string; message?: string
    }
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New feedback from ${name}`,
      reply_to: email,
      text: `From: ${name} <${email}>\n\n${message}`
    })
    if (error) throw new Error(error.message)
    return NextResponse.json({ ok: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
