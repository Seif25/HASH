"use client";

import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import { SignOutButton } from "@clerk/nextjs";

export default function Logout() {
  const router = useRouter();
  return (
    <SignOutButton signOutCallback={() => router.push("sign-in")}>
      <div className="flex cursor-pointer gap-1 left-sidebar-link">
        <LogoutIcon fontSize="medium" sx={{ color: "#fff" }} />
        <p className="text-accent1">Logout</p>
      </div>
    </SignOutButton>
  );
}
