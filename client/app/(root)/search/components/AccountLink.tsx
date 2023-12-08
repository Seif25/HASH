import { UserType } from "@/app/lib/types/user.types";
import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";

export default function AccountLink({
  user,
  loggedInUser,
}: {
  user: UserType;
  loggedInUser: string;
}) {
  return (
    <div className="flex items-center gap-5 w-full rounded-2xl bg-accent2 px-5 py-3">
      <Image
        src={user.image}
        alt={user.username}
        width={48}
        height={48}
        className="rounded-full"
      />
      <div className="flex flex-col gap-0 w-full">
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-1 flex-grow">
            <h1 className="text-heading text-accent1">{user.name}</h1>
            {user.verified && <BadgeCheck size={16} className="text-primary" />}
            <p className="text-paragraph font-bold text-accent1/50">
              @{user.username}
            </p>
          </div>
          {user.followers.includes(loggedInUser) && (
            <Button
              variant={"outline"}
              size={"default"}
              className="mx-5 mt-1 w-28 h-6"
            >
              Follow
            </Button>
          )}
        </div>
        <p className="text-body text-accent1 mt-2">{user.bio}</p>
      </div>
    </div>
  );
}
