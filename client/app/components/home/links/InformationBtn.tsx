import { MessageCircle, MoreVertical } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SummarizedUserType } from "@/app/lib/types/user.types";
import ViewerMoreInformation from "./information/ViewerMoreInformation";
import AuthorMoreInformation from "./information/AuthorMoreInformation";
import { useState } from "react";

interface InformationBtnProps {
  loggedInUser: string;
  hashAuthor: SummarizedUserType;
  hashId: string;
  pinned: boolean;
  highlighted: boolean;
  restriction: "everyone" | "followers only" | "followed by me";
}

export default function InformationBtn({
  loggedInUser,
  hashAuthor,
  hashId,
  pinned,
  highlighted,
  restriction,
}: InformationBtnProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <div className="group flex items-center gap-1">
            <DropdownMenuTrigger>
              <TooltipTrigger>
                <MoreVertical
                  size={"24px"}
                  className="text-accent1 group-hover:text-primary"
                />
              </TooltipTrigger>
            </DropdownMenuTrigger>
          </div>
          {loggedInUser !== hashAuthor.username ? (
            <ViewerMoreInformation
              loggedInUser={loggedInUser}
              hashAuthor={hashAuthor}
            />
          ) : (
            <AuthorMoreInformation
              hashId={hashId}
              pinned={pinned}
              highlighted={highlighted}
              restriction={restriction}
              closeDropdown={setOpen}
            />
          )}
        </DropdownMenu>
        <TooltipContent>
          <p>More</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
