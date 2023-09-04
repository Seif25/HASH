"use client";

import {
  SignOutButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Logout from "@mui/icons-material/Logout";
import { dark } from "@clerk/themes";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  return (
    <nav className="navbar">
      <div className="lg:hidden text-black">Hash</div>

      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo_t.png" alt="Hash Logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 hidden lg:block">Hash</p>
      </Link>

      <div className="flex items-center gap-1">
        <UserButton
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
}

export default Navbar;
