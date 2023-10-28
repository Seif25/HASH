"use client";

import { LeftSidebarLinks } from "@/utils/Links";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";

interface LeftSidebarProps {
  username: string;
}

export default function LeftSidebar({ username }: LeftSidebarProps) {
  const path = usePathname();
  return (
    <div className="group custom-scrollbar left-sidebar">
      <div className="flex flex-col justify-between h-screen">
        <div className="flex flex-col gap-10 mt-10">
          {LeftSidebarLinks.map((link) => (
            <Link
              href={link.specific ? link.link + username : link.link}
              key={link.title}
              className={`left-sidebar-link ${
                path === link.link && "left-sidebar-active-link"
              }`}
            >
              {link.icon}
              <span className="max-lg:hidden hidden group-hover:flex">
                {link.title}
              </span>
            </Link>
          ))}
        </div>
        <div>
          <Link
            href={"/logout"}
            key={"logout"}
            className={`sheet-config-links`}
          >
            <LogOut size={24} />
            <span className="max-lg:hidden hidden group-hover:flex">
              {"Logout"}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
