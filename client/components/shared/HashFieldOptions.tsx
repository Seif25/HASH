// *SHADCN COMPONENTS
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// *ICONS
import ImageIcon from "@mui/icons-material/Image";
import GifBoxIcon from "@mui/icons-material/GifBox";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

export default function HashFieldOptions() {
  return (
    <div className="flex items-center w-full gap-5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="rounded-full">
              <ImageIcon className="text-primary" fontSize="small" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Media</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="rounded-full">
              <GifBoxIcon className="text-primary" fontSize="small" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>GIF</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="rounded-full">
              <InsertEmoticonIcon className="text-primary" fontSize="small" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Emojis</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
