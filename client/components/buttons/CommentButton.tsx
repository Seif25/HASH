import CommentIcon from "@mui/icons-material/Comment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateComment from "../forms/CreateComment";
import { currentUser } from "@clerk/nextjs";
import { abbreviateNumber } from "@/lib/utils";

interface CommentButtonProps {
  commentCount: number;
  userId: string;
  parentId: string;
  image: string;
}

function CommentButton({
  commentCount,
  userId,
  parentId,
  image,
}: CommentButtonProps) {
  return (
    <Dialog>
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
        <CreateComment image={image} userId={userId} parentId={parentId} />
      </DialogContent>
    </Dialog>
  );
}

export default CommentButton;
