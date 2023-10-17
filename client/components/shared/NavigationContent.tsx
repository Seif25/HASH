"use client";

import { sidebarLinks, sidebarLinksLg } from "@/constants/index";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Logout from "@mui/icons-material/Logout";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import { LogOut, User2 } from "lucide-react";

interface LeftSidebarContentProps {
  username: string;
  type: "left" | "bottom";
}

export default function LeftSidebarContent({
  username,
  type,
}: LeftSidebarContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section
      className={`group custom-scrollbar ${type === "left" && "left-sidebar"}`}
    >
      {type === "left" ? (
        <div className="flex flex-1 flex-col gap-6 px-6 pt-12">
          {sidebarLinksLg.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;
            return (
              <Link
                href={link.route}
                key={link.label}
                className={`${
                  isActive ? "left-sidebar-active-link" : "left-sidebar-link"
                }`}
              >
                {link.icon}
                <p className="max-lg:hidden hidden group-hover:flex">{link.label}</p>
              </Link>
            );
          })}
          <Link
            href={`/profile/${username}`}
            key={"profile"}
            className={`${
              pathname.includes("/profile")
                ? "left-sidebar-active-link"
                : "left-sidebar-link"
            }`}
          >
            <User2 />
            <p className="max-lg:hidden hidden group-hover:flex">Profile</p>
          </Link>
        </div>
      ) : (
        <div className="footer-container">
          {sidebarLinks.slice(0,4).map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;
            return (
              <Link
                href={link.route}
                key={link.label}
                className={`${
                  isActive ? "left-sidebar-active-link" : "left-sidebar-link"
                }`}
              >
                {link.icon}
                <p className="max-lg:hidden">{link.label}</p>
              </Link>
            );
          })}
          <Link
            href={`/profile/${username}`}
            key={"profile"}
            className={`${
              pathname.includes("/profile")
                ? "left-sidebar-active-link"
                : "left-sidebar-link"
            }`}
          >
            <PersonIcon fontSize="medium" sx={{ color: "#fff" }} />
            <p className="max-lg:hidden">Profile</p>
          </Link>
        </div>
      )}
      {type === "left" && (
        <div className="mt-10 px-6">
          <SignedIn>
            <SignOutButton signOutCallback={() => router.push("sign-in")}>
              <div className="flex cursor-pointer gap-1 logout-link">
                <LogOut />
                <p className="text-accent1 max-lg:hidden hidden group-hover:flex">Logout</p>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      )}
    </section>
  );
}
