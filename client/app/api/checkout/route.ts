import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import stripe from "@/app/lib/config/stripe";

export async function POST(req: NextRequest, res: NextResponse) {
  const headersList = headers();
  const { plan } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: plan.currency,
            product_data: {
              name: plan.name,
            },
            recurring: {
              interval: plan.interval,
              interval_count: 1,
            },
            unit_amount: plan.price,
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${headersList.get("origin")}/premium/success`,
      cancel_url: `${headersList.get("origin")}/premium`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error creating checkout session" });
  }
}
