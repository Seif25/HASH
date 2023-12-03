import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_API_KEY) {
  throw new Error("Missing Stripe secret API key");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY, {
  apiVersion: "2023-10-16",
});

export default stripe;
