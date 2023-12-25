import { ChartBarIcon } from "@heroicons/react/20/solid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ViewsProps {
  count: number;
}

export default function Views({ count }: ViewsProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <div className="group flex items-center gap-1">
          <TooltipTrigger>
            <ChartBarIcon className="size-5 text-accent2 dark:text-accent1 group-hover:text-amber-400" />
          </TooltipTrigger>
          <span className="text-accent2/50 dark:text-accent1/50 text-paragraph select-none">
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
