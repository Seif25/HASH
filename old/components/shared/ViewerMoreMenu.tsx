"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { followUser } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import {
  Ban,
  Flag,
  Frown,
  MailQuestion,
  MailX,
  MoreVertical,
  UserMinus2,
  UserPlus2,
  VolumeX,
} from "lucide-react";

function ViewerMoreMenu({
  author,
  currentUser,
  isFollowing,
}: {
  author: string;
  currentUser: string;
  isFollowing: boolean;
}) {
  const pathname = usePathname();

  async function handleFollow() {
    if (!isFollowing) {
      await followUser({
        currentUser,
        toFollowId: author,
        pathname: pathname,
      });
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full flex items-center justify-center">
            <MoreVertical
              className="text-accent1 hover:text-primary"
              size={"20px"}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 flex flex-col gap-2 p-2">
          <DropdownMenuItem>
            <Frown size={"20px"} className="mr-2" />
            <span className="">Not interested in this post</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleFollow}>
            {isFollowing ? (
              <UserMinus2 className="text-primary mr-2" size={"24px"} />
            ) : (
              <UserPlus2
                className="text-accent1 hover:text-primary mr-2"
                size={"24px"}
              />
            )}
            <span className="">
              {isFollowing ? "Unfollow" : "Follow"} @{author}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <VolumeX size={"20px"} className="mr-2" />
            <span className="">Mute @{author}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MailX size={"20px"} className="mr-2" />
            <span className="">Mute conversation</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Ban size={"20px"} className="mr-2" />
            <span className="">Block @{author}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Flag size={"20px"} className="mr-2" />
            <span className="">Report post</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MailQuestion size={"20px"} className="mr-2" />
            <span className="">View hidden replies</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ViewerMoreMenu;
