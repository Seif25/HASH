import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SummarizedUserType } from "@/app/lib/types/user.types";
import { Ban, Flag, Frown, UserPlus2, UserX2, VolumeX } from "lucide-react";
import {
  BellSnoozeIcon,
  FlagIcon,
  NoSymbolIcon,
  SpeakerXMarkIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/16/solid";
import {
  followUserAction,
  unfollowUserAction,
} from "@/app/lib/actions/user/user.actions";
import { usePathname } from "next/navigation";

interface ViewerMoreInformationProps {
  loggedInUser: string;
  hashAuthor: SummarizedUserType;
}

export default function ViewerMoreInformation({
  loggedInUser,
  hashAuthor,
}: ViewerMoreInformationProps) {
  const pathname = usePathname();

  async function handleFollow() {
    if (hashAuthor.followers.includes(loggedInUser)) {
      await unfollowUserAction({
        loggedInUser,
        userToUnfollow: hashAuthor.username,
        pathname,
      });
    } else {
      await followUserAction({
        loggedInUser,
        userToFollow: hashAuthor.username,
        pathname,
      });
    }
  }
  return (
    <DropdownMenuContent>
      {/* Not Interested */}
      <DropdownMenuItem className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer">
        <Frown className="size-4 mr-2" />
        <span>Not Interested in this Hash</span>
      </DropdownMenuItem>
      {/* Follow / Un-follow */}
      <DropdownMenuItem
        className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer"
        onClick={handleFollow}
      >
        {hashAuthor.followers.includes(loggedInUser) ? (
          <UserMinusIcon className="size-4 mr-2" />
        ) : (
          <UserPlusIcon className="size-4 mr-2" />
        )}
        <span>
          {hashAuthor.followers.includes(loggedInUser)
            ? `Unfollow @${hashAuthor.username}`
            : `Follow @${hashAuthor.username}`}
        </span>
      </DropdownMenuItem>
      {/* Mute Author */}
      <DropdownMenuItem className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer">
        <BellSnoozeIcon className="size-4 mr-2" />
        <span>Mute @{hashAuthor.username}</span>
      </DropdownMenuItem>
      {/* Block Author */}
      <DropdownMenuItem className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer">
        <NoSymbolIcon className="size-4 mr-2" />
        <span>Block @{hashAuthor.username}</span>
      </DropdownMenuItem>
      {/* Mute Conversation */}
      <DropdownMenuItem className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer">
        <SpeakerXMarkIcon className="size-4 mr-2" />
        <span>Mute Conversation</span>
      </DropdownMenuItem>
      {/* Report Hash */}
      <DropdownMenuItem className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer">
        <FlagIcon className="size-4 mr-2" />
        <span>Report Hash</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
