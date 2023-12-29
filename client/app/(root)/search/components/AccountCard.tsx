import { UserType } from "@/app/lib/types/user.types";
import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";

export default function AccountCard({
  user,
  loggedInUser,
}: {
  user: UserType;
  loggedInUser: string;
}) {
  return (
    <div className="flex flex-col h-full rounded-lg bg-accent2">
      {user.banner ? (
        <section
          className="rounded-lg p-10"
          style={{
            backgroundImage: `url(${user.banner})`,
            backgroundSize: "cover",
            width: "100%",
            height: "80px",
          }}
        ></section>
      ) : (
        <section
          className="rounded-lg p-5 bg-accent2 flex items-start justify-end"
          style={{
            backgroundSize: "cover",
            width: "100%",
            height: "80px",
          }}
        ></section>
      )}
      {/* PROFILE PICTURE */}
      <div className="flex items-start justify-between mb-5">
        <Image
          src={user.image ?? "/assets/profile-pic.png"}
          alt={user.username}
          width={48}
          height={48}
          className="rounded-full object-cover mx-5 -mt-5"
        />
        {!user.followers.includes(loggedInUser) && (
          <Button
            variant={"outline"}
            size={"default"}
            className="mx-5 mt-1 w-28 h-6"
          >
            Follow
          </Button>
        )}
      </div>
      <div className="flex items-center gap-1 px-5">
        <div className="flex items-center gap-1">
          <h1 className="text-heading text-accent1">{user.name}</h1>
          {user.verified && <BadgeCheck size={16} className="text-primary" />}
        </div>
        <p className="text-paragraph font-bold text-accent1/50">
          @{user.username}
        </p>
      </div>
      <p className="px-5 text-body text-accent1 mb-5">{user.bio}</p>
    </div>
  );
}
