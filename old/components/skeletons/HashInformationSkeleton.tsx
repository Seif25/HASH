import { Skeleton } from "../ui/skeleton";

import BarChartIcon from "@mui/icons-material/BarChart";
import CommentIcon from "@mui/icons-material/Comment";
import CachedIcon from "@mui/icons-material/Cached";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";


export default function HashInformationSkeleton() {
  return (
    <div className="flex flex-col gap-3 justify-center w-full">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <Skeleton
            className="w-full h-4 rounded-full bg-accent1"
            key={`skeleton-${index}`}
          />
        ))}
        <div className="flex items-center pl-10 gap-5">
            <CommentIcon className="text-white" fontSize="small" />
            <CachedIcon className="text-white" fontSize="small" />
            <FavoriteBorderIcon className="text-white" fontSize="small" />
            <BarChartIcon className="text-white" fontSize="small" />
        </div>
    </div>
  );
}
