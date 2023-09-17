"use client";

import { DetailedUser } from "@/utils/types/user.types";
import Verified from "@mui/icons-material/Verified";
import Image from "next/image";
import Link from "next/link";

export default function UserCard({ user }: { user: DetailedUser }) {
  return (
    <div className="grid grid-cols-2 items-start justify-between gap-5 p-5 bg-accent2 rounded-2xl w-full">
      <Link href={`/profile/${user.username}`}>
        <div className="flex items-start gap-1">
          <Image
            src={user.image || "/assets/profile-pic.png"}
            alt="profile picture"
            width={50}
            height={50}
            className="rounded-full"
            priority
            placeholder="blur"
            blurDataURL="/assets/profile-pic.png"
          />
          <div className="flex flex-col">
            <h3 className="font-bold text-white text-[14px] flex items-center gap-1">
              {user.name}
              {user.verified && (
                <Verified className="text-amber-500" fontSize="small" />
              )}
            </h3>
            <h3 className="font-light text-light-3 text-[14px]">
              @{user.username}
            </h3>
            <h3 className="font-normal text-white text-[14px] pt-1">
              {user.bio}
            </h3>
          </div>
        </div>
      </Link>
      <div className="flex items-start justify-end">
        <button className="rounded-full bg-gradient-to-b from-[#1991fe] via-[#1183e8] to-[#0671cb] p-2">
          Following
        </button>
      </div>
    </div>
  );
}
