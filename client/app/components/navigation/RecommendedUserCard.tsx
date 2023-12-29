"use client";

import { followUserAction } from "@/app/lib/actions/user/user.actions";
import { UserType } from "@/app/lib/types/user.types";
import { Button } from "@/components/ui/button";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function RecommendedUserCard({
  user,
  loggedInUser,
}: {
  user: UserType;
  loggedInUser: string;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  async function handleFollow() {
    setLoading(true);
    await followUserAction({
      loggedInUser,
      userToFollow: user.username,
      pathname: pathname ?? "/",
    });
    setLoading(false);
  }
  return (
    <div className="flex items-start justify-between gap-1">
      <div className="flex items-center gap-1">
        <Link href={`/profile/${user.username}`}>
          <Image
            src={user.image ?? "/assets/profile-pic.png"}
            alt={user.name}
            width={40}
            height={40}
            className="size-10 rounded-full"
          />
        </Link>
        <div className="flex flex-col gap-0">
          <div className="flex items-center gap-1">
            <h1 className="font-bold">{user.name}</h1>
            {user.verified && (
              <CheckBadgeIcon className="size-4 text-primary" />
            )}
          </div>
          <h3 className="text-accent2/80 dark:text-accent1/80">
            @{user.username}
          </h3>
        </div>
      </div>
      <Button
        variant={"default"}
        size={"default"}
        className="bg-primary lg:opacity-80 hover:opacity-100 w-14 h-7 px-2"
        onClick={handleFollow}
      >
        {loading ? (
          <Loader2 className="size-5 text-accent1 animate-spin" />
        ) : (
          "Follow"
        )}
      </Button>
    </div>
  );
}
