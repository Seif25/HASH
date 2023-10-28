import { Repeat2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RepostBtnProps {
  count: number;
}

export default function RepostBtn({ count }: RepostBtnProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <div className="group flex items-center gap-1">
          <TooltipTrigger>
            <Repeat2
              size={"24px"}
              className="text-accent1 group-hover:text-green-500"
            />
          </TooltipTrigger>
          <span className="text-accent1/50 text-paragraph select-none">
            {count}
          </span>
        </div>
        <TooltipContent>
          <p>Repost</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
