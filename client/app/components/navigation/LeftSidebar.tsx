"use client";

import { LeftSidebarLinks } from "@/app/utils/Links";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Badge from "@mui/material/Badge";
import LogoutBtn from "../shared/triggers/LogoutBtn";
import { ThemeSwitcher } from "@/app/utils/theme/theme-switcher";

interface LeftSidebarProps {
  username: string;
  notificationCount: number;
}

export default function LeftSidebar({
  username,
  notificationCount,
}: LeftSidebarProps) {
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
              {link.title === "Notifications" ? (
                <>
                  <Badge
                    variant="dot"
                    className="size-4"
                    sx={{
                      "& .MuiBadge-badge": {
                        color: "#E6EBF0",
                        backgroundColor: "#1991fe",
                      },
                    }}
                  >
                    {link.icon}
                  </Badge>
                </>
              ) : (
                <>{link.icon}</>
              )}
              <span className="max-lg:hidden opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-300">
                {link.title}
              </span>
            </Link>
          ))}
        </div>
        <div>
          <ThemeSwitcher />
        </div>
        <div>
          <LogoutBtn className="max-lg:hidden opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-300" />
        </div>
      </div>
    </div>
  );
}
