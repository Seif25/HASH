import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SummarizedUserType } from "@/app/lib/types/user.types";
import { Ban, Flag, Frown, UserPlus2, UserX2, VolumeX } from "lucide-react";

interface ViewerMoreInformationProps {
  loggedInUser: string;
  hashAuthor: SummarizedUserType;
}

export default function ViewerMoreInformation({
  loggedInUser,
  hashAuthor,
}: ViewerMoreInformationProps) {
  return (
    <DropdownMenuContent>
      {/* Not Interested */}
      <DropdownMenuItem className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer">
        <Frown className="size-4 mr-2" />
        <span>Not Interested in this Hash</span>
      </DropdownMenuItem>
      {/* Follow / Un-follow */}
      <DropdownMenuItem className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer">
        <UserPlus2 className="size-4 mr-2" />
        <span>Follow @{hashAuthor.username}</span>
      </DropdownMenuItem>
      {/* Mute Author */}
      <DropdownMenuItem className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer">
        <UserX2 className="size-4 mr-2" />
        <span>Mute @{hashAuthor.username}</span>
      </DropdownMenuItem>
      {/* Block Author */}
      <DropdownMenuItem className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer">
        <Ban className="size-4 mr-2" />
        <span>Block @{hashAuthor.username}</span>
      </DropdownMenuItem>
      {/* Mute Conversation */}
      <DropdownMenuItem className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer">
        <VolumeX className="size-4 mr-2" />
        <span>Mute Conversation</span>
      </DropdownMenuItem>
      {/* Report Hash */}
      <DropdownMenuItem className="flex items-center gap-5 text-accent2 dark:text-accent1 cursor-pointer">
        <Flag className="size-4 mr-2" />
        <span>Report Hash</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
