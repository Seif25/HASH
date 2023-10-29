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
import { SummarizedUserType } from "@/lib/types/user.types";
import ViewerMoreInformation from "./information/ViewerMoreInformation";
import AuthorMoreInformation from "./information/AuthorMoreInformation";

interface InformationBtnProps {
  loggedInUser: string;
  hashAuthor: SummarizedUserType;
  hashId: string;
  pinned: boolean;
  highlighted: boolean;
}

export default function InformationBtn({
  loggedInUser,
  hashAuthor,
  hashId,
  pinned,
  highlighted,
}: InformationBtnProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="group flex items-center gap-1">
              <TooltipTrigger>
                <MoreVertical
                  size={"24px"}
                  className="text-accent1 group-hover:text-primary"
                />
              </TooltipTrigger>
            </div>
          </DropdownMenuTrigger>
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
