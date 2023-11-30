"use client";

import { LeftSidebarLinks } from "@/app/utils/Links";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Badge from "@mui/material/Badge";
import LogoutBtn from "../shared/triggers/LogoutBtn";

interface LeftSidebarProps {
  username: string;
  notificationCount: number;
}

export default function LeftSidebar({
  username,
  notificationCount,
}: LeftSidebarProps) {
  const path = usePathname();

  // Notification.requestPermission().then((permission) => {
  //   if (permission === "granted") {
  //     console.log("Notification permission granted.");
  //   } else {
  //     console.log("Notification permission denied.");
  //   }
  // });

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
                    badgeContent={notificationCount ?? 0}
                    sx={{
                      "& .MuiBadge-badge": {
                        color: "#E6EBF0",
                        backgroundColor: "red",
                      },
                    }}
                  >
                    {link.icon}
                  </Badge>
                </>
              ) : (
                <>{link.icon}</>
              )}
              <span className="max-lg:hidden hidden group-hover:flex">
                {link.title}
              </span>
            </Link>
          ))}
        </div>
        <div>
          <LogoutBtn className="max-lg:hidden hidden group-hover:flex" />
        </div>
      </div>
    </div>
  );
}
