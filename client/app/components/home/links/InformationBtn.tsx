import { MessageCircle, MoreVertical } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InformationBtnProps {}

export default function InformationBtn({}: InformationBtnProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <div className="group flex items-center gap-1">
          <TooltipTrigger>
            <MoreVertical
              size={"24px"}
              className="text-accent1 group-hover:text-primary"
            />
          </TooltipTrigger>
        </div>
        <TooltipContent>
          <p>More</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
