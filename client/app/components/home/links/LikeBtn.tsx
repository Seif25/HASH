import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
//@ts-ignore
import mojs from "@mojs/core";
import { useEffect, useRef, useState } from "react";
import { likeHash, unlikeHash } from "@/lib/actions/hash.actions";
import { usePathname } from "next/navigation";
import { HeartIcon as NotLikedIcon } from "@heroicons/react/24/outline";
import { HeartIcon as LikedIcon } from "@heroicons/react/16/solid";

interface LikeBtnProps {
  count: number;
  loggedInUser: string;
  likes: string[];
  hashId: string;
}

export default function LikeBtn({
  hashId,
  count,
  loggedInUser,
  likes,
}: LikeBtnProps) {
  const pathname = usePathname();
  const parentDom = useRef<HTMLDivElement>(null);
  const burstAnimation = useRef(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const found = likes.find((like) => like === loggedInUser);
    setLiked(found ? true : false);
  }, [loggedInUser, likes]);

  useEffect(() => {
    if (burstAnimation.current) return;

    burstAnimation.current = new mojs.Burst({
      parent: parentDom.current,
      radius: { 0: 100 },
      count: 10,
      easing: "ease.in-out",
      isShowStart: true,
      children: {
        fill: { "#1991fe": "#ef4444" },
      },
    });
  }, []);

  const handleLike = async (e: { pageX: any; pageY: any }) => {
    if (liked) {
      await unlikeHash({
        id: hashId,
        currentUser: loggedInUser,
        pathname,
      });
      setLiked(false);
    } else {
      await likeHash({
        id: hashId,
        currentUser: loggedInUser,
        pathname,
      });
      setLiked(true);
    }
    // if (burstAnimation.current) {
    //   const parentRect = parentDom.current?.getBoundingClientRect();
    //   const heartRect = iconRef.current?.getBoundingClientRect();
    //   const screenSize = window.innerWidth;
    //   if (parentRect && heartRect) {
    //     const x = heartRect.left - parentRect.left + heartRect.width / 2;
    //     const y = heartRect.top - parentRect.top + heartRect.height / 2;
    //     if (screenSize <= 480) {
    //       (burstAnimation.current as mojs.Burst)
    //         .tune({ x: x - 80, y: y - 120 })
    //         .replay();
    //     } else {
    //       (burstAnimation.current as mojs.Burst)
    //         .tune({ x: x - 200, y: y - 20 })
    //         .replay();
    //     }
    //   }
    // }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <div className="group flex items-center gap-1">
          <TooltipTrigger>
            <div ref={parentDom} onClick={handleLike}>
              {liked ? (
                <LikedIcon className="size-4 text-red-700 hover:text-red-500" />
              ) : (
                <NotLikedIcon className="size-4 ext-accent2 dark:text-accent1 hover:text-red-500" />
              )}
            </div>
          </TooltipTrigger>
          <span className="text-accent2/50 dark:text-accent1/50 text-paragraph select-none">
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
