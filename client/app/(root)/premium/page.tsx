"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { loadStripe } from "@stripe/stripe-js";
import { BadgeCheck, Check } from "lucide-react";
import { useState } from "react";

export default function Premium({ sm = false }: { sm?: boolean }) {
  const [interval, setInterval] = useState<"monthly" | "annually">("annually");
  async function handleCheckout(packageName: string) {
    let price: string;
    if (interval === "annually") {
      price =
        packageName === "Basic"
          ? "31699"
          : packageName === "Pro"
          ? "52799"
          : "94999";
    } else {
      price =
        packageName === "Basic"
          ? "3000"
          : packageName === "Pro"
          ? "5000"
          : "9000";
    }
    const plan = {
      name: `Premium - ${packageName}`,
      price: price,
      currency: "egp",
      interval: interval === "monthly" ? "month" : "year",
    };
    try {
      const stripe = await loadStripe(
        "pk_test_51O1uGQFroKPsWfSfMR8gKPZs7951JOJhY2z0vbhoPU4KdHWufT01NpXUPzys5hpAsqbSK1C4fFWwcM9ns8bSlYjq00xDzqKYO9"
      );
      if (!stripe) throw new Error("Failed to load stripe");

      const checkoutResponse = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
        }),
      });

      const { sessionId } = await checkoutResponse.json();
      const stripeError = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) console.log(stripeError);
    } catch (error) {
      console.log(error);
    }
  }

  function handleIntervalSwitch(checked: boolean) {
    if (!checked) setInterval("annually");
    else setInterval("monthly");
  }
  return (
    <div className="flex flex-col gap-5 rounded-xl mt-5 bg-accent2 text-accent1">
      <div className="flex flex-col gap-5 p-5 rounded-t-lg">
        <div className="flex items-center gap-5">
          <BadgeCheck className="text-primary" size={32} />
          <h1 className="text-heading">Subscribe to Premium</h1>
        </div>
        <p className="text-body">
          Subscribe to premium to get access to all the premium features.
        </p>
      </div>
      <div className="flex items-center justify-center gap-5 p-5">
        <Switch id="interval-switch" onCheckedChange={handleIntervalSwitch} />
        <label
          htmlFor="interval-switch"
          className="capitalize flex items-center gap-5"
        >
          {interval}
          {/* {interval === "annually" && (
           )} */}
          <Badge
            variant={"default"}
            className={`${interval === "monthly" && "opacity-0"}`}
          >
            Save 12%
          </Badge>
        </label>
      </div>
      <div
        className={`flex flex-col ${!sm && "lg:grid lg:grid-cols-3"} gap-5 p-5`}
      >
        <div className="flex flex-col gap-5 items-center justify-center border border-accent1/10 rounded-xl p-5">
          <h1 className="text-body">Basic</h1>
          {/* <p className="text-paragraph text-accent1/80">
            Includes all the essential features you need
          </p> */}
          {interval === "annually" ? (
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-[14px] font-bold text-accent1/50 line-through">
                EGP 360.00
              </h1>
              <div className="flex items-center gap-1">
                <h1 className="text-[20px] font-bold text-accent1">
                  EGP 316.99
                </h1>
                <p className="text-paragraph text-accent1/50 font-bold">
                  / Year
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <h1 className="text-[20px] font-bold text-accent1">EGP 30.00</h1>
              <p className="text-paragraph text-accent1/50 font-bold">
                / Month
              </p>
            </div>
          )}
          <div className="flex flex-col gap-5">
            <h1 className="text-body text-accent1 flex items-center gap-2">
              <Check size={16} />
              Edit Post
            </h1>
            <h1 className="text-body text-accent1 flex items-center gap-2">
              <Check size={16} />
              Longer Posts
            </h1>
            <h1 className="text-body text-accent1 flex items-center gap-2">
              <Check size={16} />
              Undo Post
            </h1>
            <h1 className="text-body text-accent1 flex items-center gap-2">
              <Check size={16} />
              Post Longer Videos
            </h1>
          </div>
          <div className="flex items-center justify-center p-5">
            <Button
              variant={"outline"}
              size={"default"}
              className="w-40"
              onClick={() => handleCheckout("Basic")}
            >
              Subscribe & Pay
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center border border-accent1/10 rounded-xl p-5 bg-primary shadow-md shadow-primary/30">
          <h1 className="text-body">Pro</h1>
          {/* <p className="text-paragraph text-accent1/80">
            Designed for users who need more advanced features and functionality
          </p> */}
          {interval === "annually" ? (
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-[14px] font-bold text-accent1/50 line-through">
                EGP 600.00
              </h1>
              <div className="flex items-center gap-1">
                <h1 className="text-[20px] font-bold text-accent1">
                  EGP 527.99
                </h1>
                <p className="text-paragraph text-accent1/50 font-bold">
                  / Year
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <h1 className="text-[20px] font-bold text-accent1">EGP 50.00</h1>
              <p className="text-paragraph text-accent1/50 font-bold">
                / Month
              </p>
            </div>
          )}
          <div className="flex flex-col gap-5">
            <h1 className="text-body text-accent1 flex items-center gap-2">
              <Check size={16} />
              Edit Post
            </h1>
            <h1 className="text-body text-accent1 flex items-center gap-2">
              <Check size={16} />
              Longer Posts
            </h1>
            <h1 className="text-body text-accent1 flex items-center gap-2">
              <Check size={16} />
              Undo Post
            </h1>
            <h1 className="text-body text-accent1 flex items-center gap-2">
              <Check size={16} />
              Post Longer Videos
            </h1>
          </div>
          <div className="flex items-center justify-center p-5">
            <Button
              variant={"outline"}
              size={"default"}
              className="w-40 hover:bg-accent1 hover:text-primary"
              onClick={() => handleCheckout("Pro")}
            >
              Subscribe & Pay
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center border border-accent1/10 rounded-xl p-5">
          <h1 className="text-body">Plus</h1>
          {/* <p className="text-paragraph text-accent1/80">
            The most comprehensive package
          </p> */}
          {interval === "annually" ? (
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-[14px] font-bold text-accent1/50 line-through">
                EGP 1080.00
              </h1>
              <div className="flex items-center gap-1">
                <h1 className="text-[20px] font-bold text-accent1">
                  EGP 949.99
                </h1>
                <p className="text-paragraph text-accent1/50 font-bold">
                  / Year
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <h1 className="text-[20px] font-bold text-accent1">EGP 90.00</h1>
              <p className="text-paragraph text-accent1/50 font-bold">
                / Month
              </p>
            </div>
          )}
          <div className="flex flex-col gap-5">
            <h1 className="text-body text-accent1 flex items-center gap-2">
              <Check size={16} />
              Edit Post
            </h1>
            <h1 className="text-body text-accent1 flex items-center gap-2">
              <Check size={16} />
              Longer Posts
            </h1>
            <h1 className="text-body text-accent1 flex items-center gap-2">
              <Check size={16} />
              Undo Post
            </h1>
            <h1 className="text-body text-accent1 flex items-center gap-2">
              <Check size={16} />
              Post Longer Videos
            </h1>
          </div>
          <div className="flex items-center justify-center p-5">
            <Button
              variant={"outline"}
              size={"default"}
              className="w-40"
              onClick={() => handleCheckout("Plus")}
            >
              Subscribe & Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
