"use client";

import Link from "next/link";
import Image from "next/image";
import VerifiedIcon from "@mui/icons-material/Verified";
import { User } from "@/utils/types/user.types";
import { usePathname } from "next/navigation";
import { followUser } from "@/lib/actions/user.actions";

const UserHoverContent = ({
  author,
  currentUser,
  isFollowing,
}: {
  author: string;
  currentUser: string;
  isFollowing: boolean;
}) => {
  const pathname = usePathname();

  async function handleFollow() {
    if (!isFollowing) {
      await followUser({
        currentUser: currentUser,
        toFollowId: author,
        pathname,
      });
    }
  }
  return (
    <>
      {currentUser !== author.toString() && (
        <button
          className="bg-gradient-to-b from-primary via-[#1183e8] to-[#0671cb] p-2 rounded-full w-20 z-20 hover:scale-105"
          onClick={handleFollow}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </>
  );
};

export default UserHoverContent;
