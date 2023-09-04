"use client";

import { sidebarLinks } from "@/constants/index";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Logout from "@mui/icons-material/Logout";
import Button from "@mui/joy/Button";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`${
                isActive ? "leftsidebar-active-link" : "leftsidebar-link"
              }`}
            >
              {link.icon}

              <p className="max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('sign-in')}>
            <div className="flex cursor-pointer gap-1 leftsidebar-link">
              <Logout fontSize="medium" sx={{ color: "white" }} />

              <p className="text-light-2 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSidebar;
