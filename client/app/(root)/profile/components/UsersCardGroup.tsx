"use client";

import {
  SummarizedUserType,
  UserFollowingType,
} from "@/app/lib/types/user.types";
import { Button } from "@/components/ui/button";
import { Loader2Icon, MoreVerticalIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface UsersCardGroupProps {
  users: SummarizedUserType[];
  variant: "following" | "followers";
  loggedInUser: string;
  params: { username: string };
}

export default function UsersCardGroup({
  users,
  variant,
  loggedInUser,
  params,
}: UsersCardGroupProps) {
  const [limit, setLimit] = useState(10);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && limit < users.length) {
      setLimit((prev) => prev + 10);
    }
  }, [inView]);

  return (
    <div className="flex flex-col gap-5 justify-between">
      <div className="w-full bg-accent1 dark:bg-accent2 rounded-lg px-2 mt-5 py-5 flex flex-col gap-5">
        {users.slice(0, limit).map((user) => (
          <div
            key={user.username}
            className="px-5 flex items-center justify-between"
          >
            <Link href={`/profile/${user.username}`}>
              <div className="flex items-center gap-5">
                <Image
                  src={user.image ?? "/assets/profile-pic.png"}
                  alt={user.username}
                  width={48}
                  height={48}
                  className="rounded-full object-cover size-10"
                />
                <div className="flex flex-col gap-0">
                  <h1 className="text-body text-accent2 dark:text-accent1">
                    {user.name}
                  </h1>
                  <h1 className="text-paragraph font-bold text-accent2/50 dark:text-accent1/50">
                    @{user.username}
                  </h1>
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-1">
              {user.username !== loggedInUser && (
                <>
                  {variant === "following" ? (
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="text-accent2 dark:text-accent1 hover:text-accent1"
                    >
                      {user?.followers.includes(loggedInUser ?? "")
                        ? "Following"
                        : "Follow"}
                    </Button>
                  ) : (
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="text-accent2 dark:text-accent1 hover:text-accent1"
                    >
                      {user.followers?.includes(loggedInUser ?? "")
                        ? "Following"
                        : loggedInUser === params.username
                        ? "Follow Back"
                        : "Follow"}
                    </Button>
                  )}
                </>
              )}
              {/* <button className="text-accent1 hover:text-primary">
                <MoreVerticalIcon className="size-4" />
              </button> */}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center" ref={ref}>
        <button
          className={`hidden ${
            inView && "flex"
          } h-7 w-auto hover:underline underline-offset-4 text-primary text-[12px]`}
        >
          {inView && limit < users.length && (
            <Loader2Icon className="size-4 animate-spin text-primary" />
          )}
        </button>
      </div>
    </div>
  );
}
