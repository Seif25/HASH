import { BarChart } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

interface ViewsProps {
  count: number;
}

export default function Views({ count }: ViewsProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <div className="group flex items-center gap-1">
          <TooltipTrigger>
            <ArrowTrendingUpIcon className="text-accent1 group-hover:text-amber-400 size-6" />
          </TooltipTrigger>
          <span className="text-accent1/50 text-paragraph select-none">
            {count}
          </span>
        </div>
        <TooltipContent>
          <p>Views</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
