import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs" // ensure Node runtime

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string
const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")
  const buf = Buffer.from(await req.arrayBuffer())

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(buf, sig as string, endpointSecret)
  } catch (err) {
    return new NextResponse(`Webhook Error: ${(err as Error).message}`, { status: 400 })
  }

  // Minimal: expect fingerprint in metadata of checkout/session
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const fingerprint = session.metadata?.fingerprint
    const plan = session.metadata?.plan || "supporter"

    if (fingerprint) {
      const now = Date.now()
      const addMs =
        plan === "pro-6mo" ? 6 * 30 * 24 * 60 * 60 * 1000 :
        plan === "pro-3mo" ? 3 * 30 * 24 * 60 * 60 * 1000 :
        30 * 24 * 60 * 60 * 1000 // supporter: +1 month

      // extend expiry; if no expiry, create new based on now
      const { data: rows } = await supabase
        .from("usage_tracking")
        .select("expiry_date")
        .eq("fingerprint", fingerprint)
        .limit(1)

      const currentExpiry = rows?.[0]?.expiry_date ? new Date(rows[0].expiry_date).getTime() : now
      const newExpiry = new Date(Math.max(currentExpiry, now) + addMs).toISOString()

      await supabase
        .from("usage_tracking")
        .upsert({
          fingerprint,
          expiry_date: newExpiry,
          is_supporter: true,
          last_created: new Date().toISOString()
        }, { onConflict: "fingerprint" })
    }
  }

  return NextResponse.json({ received: true })
}
