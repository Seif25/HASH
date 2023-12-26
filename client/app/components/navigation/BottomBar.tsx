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
    <nav className="fixed bottom-5 my-0 mx-auto rounded-xl bg-white dark:bg-dark flex items-center justify-evenly w-[95%] md:hidden p-3 z-20">
      {BottomBarLinks.map((link) => (
        <Link href={link.link} key={link.title}>
          {link.title === "Notifications" ? (
            <>
              {notificationCount > 0 ? (
                <Badge
                  variant="dot"
                  sx={{
                    "& .MuiBadge-badge": {
                      color: "#E6EBF0",
                      backgroundColor: "rgb(25 145 254)",
                    },
                  }}
                >
                  <Button variant={"icon"} className="hover:text-primary">
                    {link.icon}
                  </Button>
                </Badge>
              ) : (
                <Button variant={"icon"} className="hover:text-primary">
                  {link.icon}
                </Button>
              )}
            </>
          ) : (
            <Button variant={"icon"} className="hover:text-primary">
              {link.icon}
            </Button>
          )}
        </Link>
      ))}
    </nav>
  );
}
