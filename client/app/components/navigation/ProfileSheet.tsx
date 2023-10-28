import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SheetLinks } from "@/utils/Links";
import { BadgeCheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProfileSheetProps {
  username: string;
  profilePicture: string;
  name: string;
  following: number;
  followers: number;
  verified: boolean;
}

export default function ProfileSheet({
  username,
  profilePicture,
  name,
  following,
  followers,
  verified,
}: ProfileSheetProps) {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src={profilePicture}
          alt="HASH"
          width={48}
          height={48}
          className="rounded-full"
        />
      </SheetTrigger>
      <SheetContent side={"left"} className="text-accent1 text-body">
        <SheetHeader className="text-accent1">
          <SheetTitle className="flex flex-col gap-5">
            {/* Profile Picture, Name and Username */}
            <div className="flex items-center gap-5">
              <Link href={`/profile/${username}`}>
                <Image
                  src={profilePicture}
                  alt={username}
                  width={48}
                  height={48}
                />
              </Link>
              <div className="flex flex-col justify-center gap-0">
                <div className="flex items-center gap-1">
                  <h1 className="text-heading text-accent1">{name}</h1>
                  {verified && (
                    <BadgeCheckIcon size={"16px"} className="text-primary" />
                  )}
                </div>
                <h3 className="text-paragraph text-accent1/50">@{username}</h3>
              </div>
            </div>
            {/* Following and Followers Information */}
            <div className="flex items-center px-16 gap-5">
              <Link
                href={`/profile/${username}/following`}
                className="flex items-center gap-1"
              >
                <span className="text-heading text-accent1">{following}</span>
                <span className="text-paragraph text-accent1/50 hover:underline">
                  Following
                </span>
              </Link>
              <Link
                href={`/profile/${username}/followers`}
                className="flex items-center gap-1"
              >
                <span className="text-heading text-accent1">{followers}</span>
                <span className="text-paragraph text-accent1/50 hover:underline">
                  Followers
                </span>
              </Link>
            </div>
          </SheetTitle>
          <SheetDescription className="flex flex-col justify-between px-16 pt-10 h-full">
            {/* USER NAVIGATION LINKS */}
            <div className="flex flex-col gap-3">
              {SheetLinks.filter((l) => l.section === 1).map((link) => (
                <Link
                  href={link.link + username}
                  key={link.title}
                  className="sheet-links"
                >
                  {link.icon} {link.title}
                </Link>
              ))}
            </div>
            {/* SETTINGS AND LOGOUT */}
            <div className="flex flex-col gap-3 mt-10 border-t border-accent1/10 pt-5">
              {SheetLinks.filter((l) => l.section === 2).map((link) => (
                <Link
                  href={link.link}
                  key={link.title}
                  className="sheet-config-links"
                >
                  {link.icon} {link.title}
                </Link>
              ))}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
