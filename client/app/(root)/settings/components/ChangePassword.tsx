import { ArrowLeft, CheckCircle2, EyeOff } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { clerkClient } from "@clerk/nextjs";

export default function ChangePassword() {
  return (
    <div className="flex flex-col gap-5 p-5 h-screen overflow-scroll w-full custom-scrollbar">
      <div className="flex items-center gap-5 bg-transparent rounded-2xl text-accent1">
        <Link href={`/settings/account-settings`}>
          <ArrowLeft size={20} className="text-accent1/75 hover:text-primary" />
        </Link>
        <h3 className="text-heading flex-grow">Change Your Password</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={"icon"} variant={"icon"}>
                <CheckCircle2
                  size={24}
                  className="text-primary opacity-75 hover:opacity-100"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-body">Save Changes</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="grid grid-cols-12 gap-5 p-5 rounded-2xl">
        {/* Current Password */}
        <div className="flex flex-col gap-2 col-span-12">
          <Label htmlFor="password">Current Password</Label>
          <div className="flex items-center border border-accent1/10 rounded-xl gap-1">
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder={"Please enter your current password"}
              className="border-none outline-none ring-0 focus:ring-0 focus:outline-none h-auto focus-visible:ring-0"
            />
            <div className="border-l border-accent1/10 h-full p-2 flex items-center justify-center">
              <EyeOff size={20} />
            </div>
          </div>
        </div>
        {/* New Password */}
        <div className="flex flex-col gap-2 col-span-12">
          <Label htmlFor="new-password">New Password</Label>
          <div className="flex items-center border border-accent1/10 rounded-xl gap-1">
            <Input
              id="new-password"
              type="password"
              autoComplete="new-password"
              placeholder={"Please enter your new password"}
              className="border-none outline-none ring-0 focus:ring-0 focus:outline-none h-auto focus-visible:ring-0"
            />
            <div className="border-l border-accent1/10 h-full p-2 flex items-center justify-center">
              <EyeOff size={20} />
            </div>
          </div>
        </div>
        {/* Confirm Password */}
        <div className="flex flex-col gap-2 col-span-12">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="flex items-center border border-accent1/10 rounded-xl gap-1">
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              placeholder={"Please confirm your new password"}
              className="border-none outline-none ring-0 focus:ring-0 focus:outline-none h-auto focus-visible:ring-0"
            />
            <div className="border-l border-accent1/10 h-full p-2 flex items-center justify-center">
              <EyeOff size={20} />
            </div>
          </div>
          <span className="font-bold text-[12px] text-red-500">
            {
              "Hmm, there seems to be a mismatch between your passwords. Please double-check and try again."
            }
          </span>
        </div>
      </div>
      {/* Forgot Password */}
      <div className="flex items-center justify-center w-full px-5">
        <Link
          href="/forgot-password"
          className="text-primary hover:underline w-full"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}
