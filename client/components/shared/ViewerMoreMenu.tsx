"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import BlockIcon from "@mui/icons-material/Block";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FlagIcon from "@mui/icons-material/Flag";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import { followUser } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";

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
          <Button
            variant={"ghost"}
            className="rounded-full w-5 h-5 p-3 flex items-center justify-center"
          >
            <MoreVertIcon className="text-white" fontSize="small" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 flex flex-col gap-2 p-2">
          <DropdownMenuItem>
            <SentimentVeryDissatisfiedIcon className="mr-2 h-4 w-4" />
            <span className="">Not interested in this post</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleFollow}>
            {isFollowing ? (
              <PersonRemoveAlt1Icon className="mr-2 h-4 w-4 text-primary" />
            ) : (
              <PersonAddAlt1Icon className="mr-2 h-4 w-4" />
            )}
            <span className="">
              {isFollowing ? "Unfollow" : "Follow"} @{currentUser}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <VolumeOffIcon className="mr-2 h-4 w-4" />
            <span className="">Mute @{currentUser}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <VolumeOffIcon className="mr-2 h-4 w-4" />
            <span className="">Mute conversation</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BlockIcon className="mr-2 h-4 w-4" />
            <span className="">Block @{currentUser}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FlagIcon className="mr-2 h-4 w-4" />
            <span className="">Report post</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CommentsDisabledIcon className="mr-2 h-4 w-4" />
            <span className="">View hidden replies</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ViewerMoreMenu;
