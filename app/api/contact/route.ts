import { NextResponse } from "next/server"

function isValidEmail(email: string) {
  // Simple email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const name = (body?.name ?? "").toString().trim()
    const email = (body?.email ?? "").toString().trim()
    const message = (body?.message ?? "").toString().trim()

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "All fields are required." }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const CONTACT_TO = process.env.CONTACT_TO || "aimanshahid800@gmail.com"

    if (!RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: "Missing RESEND_API_KEY." }, { status: 500 })
    }

    // Compose HTML email
    const html = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
        <h2 style="margin:0 0 8px 0">New Portfolio Contact</h2>
        <p style="margin:0 0 4px 0"><strong>Name:</strong> ${name}</p>
        <p style="margin:0 0 4px 0"><strong>Email:</strong> ${email}</p>
        <p style="margin:12px 0 0 0"><strong>Message:</strong></p>
        <p style="white-space:pre-wrap;margin:6px 0 0 0">${message}</p>
      </div>
    `

    // Send via Resend HTTP API
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [CONTACT_TO],
        subject: `New contact from ${name}`,
        html,
        reply_to: email,
      }),
    })

    if (!resp.ok) {
      const errText = await resp.text().catch(() => "")
      console.error("[v0] Resend error:", resp.status, errText)
      return NextResponse.json({ ok: false, error: "Failed to send message." }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("[v0] Contact API error:", err?.message || err)
    return NextResponse.json({ ok: false, error: "Unexpected error." }, { status: 500 })
  }
}
