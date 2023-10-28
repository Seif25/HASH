import { Heart } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LikeBtnProps {
  count: number;
}

export default function LikeBtn({ count }: LikeBtnProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <div className="group flex items-center gap-1">
          <TooltipTrigger>
            <Heart
              size={"24px"}
              className="text-accent1 group-hover:text-red-500"
            />
          </TooltipTrigger>
          <span className="text-accent1/50 text-paragraph select-none">
            {count}
          </span>
        </div>
        <TooltipContent>
          <p>Like</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
