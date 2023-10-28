import { Share } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ShareBtnProps {}

export default function ShareBtn({}: ShareBtnProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <div className="group flex items-center gap-1">
          <TooltipTrigger>
            <Share
              size={"24px"}
              className="text-accent1 group-hover:text-primary"
            />
          </TooltipTrigger>
        </div>
        <TooltipContent>
          <p>Share</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
