import { SheetLinks } from "@/app/utils/Links";
import Image from "next/image";
import Link from "next/link";
import LogoutBtn from "../shared/triggers/LogoutBtn";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";
import { ThemeSwitcher } from "@/app/utils/theme/theme-switcher";

interface ProfileDrawerProps {
  username: string;
  profilePicture: string;
  name: string;
  following: number;
  followers: number;
  verified: boolean;
}

export default function ProfileDrawer({
  username,
  profilePicture,
  name,
  following,
  followers,
  verified,
}: ProfileDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger>
        <Image
          src={profilePicture}
          alt="HASH"
          width={48}
          height={48}
          className="rounded-full size-10"
        />
      </DrawerTrigger>
      <DrawerContent className="text-accent2 dark:text-accent1 text-body">
        <DrawerHeader className="text-accent2 dark:text-accent1">
          <DrawerTitle className="flex flex-col gap-5">
            {/* Profile Picture, Name and Username */}
            <div className="flex items-center gap-5">
              <Link href={`/profile/${username}`}>
                <Image
                  src={profilePicture}
                  alt={username}
                  width={48}
                  height={48}
                  className="rounded-full size-10"
                />
              </Link>
              <div className="flex flex-col justify-start gap-0">
                <div className="flex items-center gap-1">
                  <h1 className="text-body text-accent2 dark:text-accent1">
                    {name}
                  </h1>
                  {verified && (
                    <CheckBadgeIcon className="text-primary size-4" />
                  )}
                </div>
                <h3 className="text-body text-accent2/50 dark:text-accent1/50 flex items-center justify-start">
                  @{username}
                </h3>
              </div>
            </div>
            {/* Following and Followers Information */}
            <div className="flex items-center px-16 gap-5">
              <Link
                href={`/profile/${username}/following`}
                className="flex items-center gap-2"
              >
                <span className="text-body text-accent2 dark:text-accent1">
                  {following}
                </span>
                <span className="text-body text-accent2/50 dark:text-accent1/50 hover:underline">
                  Following
                </span>
              </Link>
              <Link
                href={`/profile/${username}/followers`}
                className="flex items-center gap-2"
              >
                <span className="text-body text-accent2 dark:text-accent1">
                  {followers}
                </span>
                <span className="text-body text-accent2/50 dark:text-accent1/50 hover:underline">
                  Followers
                </span>
              </Link>
            </div>
          </DrawerTitle>
          <DrawerDescription className="flex flex-col justify-between gap-5 px-16 pt-10 h-full">
            {/* USER NAVIGATION LINKS */}
            <div className="flex flex-col gap-3">
              {SheetLinks.filter((l) => l.section === 1).map((link) => (
                <Link
                  href={
                    link.title === "Profile" ? link.link + username : link.link
                  }
                  key={link.title}
                  className="sheet-links"
                >
                  {link.icon} {link.title}
                </Link>
              ))}
            </div>

            {/* SETTINGS AND LOGOUT */}
            <div className="flex flex-col gap-3 mt-10 border-t border-t-accent2/10 dark:border-accent1/10 pt-5">
              <div>
                <ThemeSwitcher variant="sm" />
              </div>
              {SheetLinks.filter((l) => l.section === 2).map((link) => (
                <Link
                  href={link.link}
                  key={link.title}
                  className="sheet-config-links"
                >
                  {link.icon} {link.title}
                </Link>
              ))}
              <LogoutBtn />
            </div>
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
