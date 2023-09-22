"use client"

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
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <div className="flex items-center gap-1">
                <button className="w-5 h-5 p-3 flex items-center justify-center">
                  <CommentIcon
                    className="text-white hover:text-primary"
                    fontSize="small"
                  />
                </button>
                <span>{abbreviateNumber(commentCount)}</span>
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
