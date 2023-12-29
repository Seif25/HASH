import { ArrowLeft, CheckCircle2, Download, EyeOff } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { clerkClient } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function DownloadData() {
  const verified = false;
  return (
    <div className="flex flex-col gap-5 p-5 h-screen overflow-scroll w-full custom-scrollbar">
      <div className="flex items-center gap-5 bg-transparent rounded-lg text-accent1">
        <Link href={`/settings/account-settings`}>
          <ArrowLeft size={20} className="text-accent1/75 hover:text-primary" />
        </Link>
        <h3 className="text-heading flex-grow">Download Your Data</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {verified && (
                <Button size={"icon"} variant={"icon"}>
                  <Download
                    size={24}
                    className="text-accent1 hover:text-primary opacity-75 hover:opacity-100"
                  />
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-body">Download Data</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {!verified && (
        <div className="flex flex-col gap-5">
          <h1 className="text-heading text-accent1">
            {"Verification Required for Sensitive Action"}
          </h1>
          <p className="text-accent1/80 font-bold text-body">
            Please note that this is a sensitive action and requires
            verification of your identity.
          </p>
          <p className="text-accent1 font-bold text-body capitalize">
            To proceed please Re-enter your password
          </p>
          <div className="flex items-center border border-accent1/10 rounded-lg gap-1">
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder={"Please enter your password"}
              className="border-none outline-none ring-0 focus:ring-0 focus:outline-none h-auto focus-visible:ring-0"
            />
            <div className="border-l border-accent1/10 h-full p-2 flex items-center justify-center">
              <EyeOff size={20} />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button variant={"outline"} size={"default"} className="w-40">
              Verify
            </Button>
          </div>
        </div>
      )}
      {verified && (
        <div className="flex flex-col gap-5">
          <h1 className="text-heading text-accent1">
            Choose the data you wish to download
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Checkbox id="select-all" defaultChecked={true} />
              <Label htmlFor="select-all" className="text-accent1">
                Select All
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="user-profile" defaultChecked={true} />
              <Label htmlFor="user-profile" className="text-accent1">
                Profile Data & Personal Information
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="user-hashes" defaultChecked={true} />
              <Label htmlFor="user-hashes" className="text-accent1">
                Posts & Comments
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="user-messages" defaultChecked={true} />
              <Label htmlFor="user-messages" className="text-accent1">
                Messages
              </Label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
