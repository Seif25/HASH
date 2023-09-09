import { Button } from "../ui/button";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BarChartIcon from "@mui/icons-material/BarChart";
import CachedIcon from "@mui/icons-material/Cached";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HashLinksProps {
  commentCount: number | string;
  likeCount: number | string;
  repostCount: number | string;
  viewCount: number | string;
}

function HashLinks({
  commentCount,
  likeCount,
  repostCount,
  viewCount,
}: HashLinksProps) {
  return (
    <div className="flex items-center gap-5 w-[90%] px-5">
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"ghost"} className="w-5 h-5 p-3 flex items-center justify-center">
                <CommentIcon className="text-white" fontSize="small"/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Comment</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span>{commentCount}</span>
      </div>
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"ghost"} className="w-5 h-5 p-3 flex items-center justify-center">
                <CachedIcon className="text-white" fontSize="small"/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Repost</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span>{repostCount}</span>
      </div>
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"} className="w-5 h-5 p-3 flex items-center justify-center"
              >
                <FavoriteBorderIcon className="text-white" fontSize="small"/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Like</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span>{likeCount}</span>
      </div>
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"} className="w-5 h-5 p-3 flex items-center justify-center"
              >
                <BarChartIcon className="text-white" fontSize="small"/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Views</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span>{viewCount}</span>
      </div>
    </div>
  );
}

export default HashLinks;
