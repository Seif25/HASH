"use client";

import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutBtn({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <SignedIn>
      <SignOutButton signOutCallback={() => router.push("sign-in")}>
        <div className="sheet-config-links cursor-pointer">
          <LogOut size={24} />
          <span className={className}>{"Logout"}</span>
        </div>
      </SignOutButton>
    </SignedIn>
  );
}
