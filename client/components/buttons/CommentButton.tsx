"use client";

// *ICONS
import CommentIcon from "@mui/icons-material/Comment";

// *SHADCN COMPONENTS
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// *COMPONENTS
import CreateComment from "../forms/CreateComment";

// *UTILS
import { abbreviateNumber } from "@/lib/utils";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

interface CommentButtonProps {
  commentCount: number;
  currentUser: string;
  parentId: string;
  image: string;
  parentAuthor: string;
}

export default async function CommentButton({
  commentCount,
  currentUser,
  parentId,
  image,
  parentAuthor,
}: CommentButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <div className="flex flex-col items-center gap-0">
                <button className="rounded-full flex items-center justify-center">
                  <MessageCircle
                    className="text-accent1 hover:text-primary"
                    size={"20px"}
                  />
                </button>
                <span className="font-bold">{abbreviateNumber(commentCount)}</span>
              </div>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Comment</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[425px] lg:w-full">
        <CreateComment
          image={image}
          currentUser={currentUser}
          parentId={parentId}
          parentAuthor={parentAuthor}
          handleDialogClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}
