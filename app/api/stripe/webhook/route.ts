import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const text = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(text, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const cs = event.data.object as Stripe.Checkout.Session;
    const email = cs.customer_details?.email;
    if (email) {
      const token = crypto.randomUUID();
      const ttlDays = Number(process.env.BOOK_LINK_TTL_DAYS ?? 10);
      const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);
      await prisma.paymentAccessToken.create({ data: { clientEmail: email, token, expiresAt } });
      const link = `${process.env.NEXTAUTH_URL}/book/${token}`;
      await sendEmail(email, "Your booking link — Service Animal Bureau", `Pay confirmed. Book here: <a href="${link}">${link}</a>`);
    }
  }
  return NextResponse.json({ received: true });
}