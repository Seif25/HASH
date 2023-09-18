// *SHADCN COMPONENTS
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// *ICONS
import GifBoxIcon from "@mui/icons-material/GifBox";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MediaButton from "../buttons/MediaButtons";

interface HashFieldOptionsProps {
  control: any;
  handleImageChange: (e: any, onChange: any) => void;
}

export default function HashFieldOptions({
  control,
  handleImageChange,
}: HashFieldOptionsProps) {
  return (
    <div className="flex items-center w-full gap-5">
      <MediaButton
        control={control}
        name="media"
        type="file"
        accept="image/*"
        placeholder="Upload Image"
        handleImageChange={handleImageChange}
      />
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
