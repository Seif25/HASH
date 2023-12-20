import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BottomBarLinks } from "@/app/utils/Links";
import { Badge } from "@mui/material";

export default function BottomBar({
  notificationCount,
}: {
  notificationCount: number;
}) {
  return (
    <nav className="fixed bottom-0 rounded-xl bg-dark flex items-center justify-evenly w-full md:hidden pb-5 pt-2 z-20">
      {BottomBarLinks.map((link) => (
        <Link href={link.link} key={link.title}>
          {link.title === "Notifications" ? (
            <Badge
              badgeContent={notificationCount ?? 0}
              sx={{
                "& .MuiBadge-badge": {
                  color: "#E6EBF0",
                  backgroundColor: "#1ca0f2",
                },
              }}
            >
              <Button
                size={"icon"}
                variant={"icon"}
                className="hover:text-primary"
              >
                {link.icon}
              </Button>
            </Badge>
          ) : (
            <Button
              size={"icon"}
              variant={"icon"}
              className="hover:text-primary"
            >
              {link.icon}
            </Button>
          )}
        </Link>
      ))}
    </nav>
  );
}
