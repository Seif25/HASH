"use client";

import Image from "next/image";
import HashVideoPreview from "./HashVideoPreview";

import "@splidejs/splide/css/skyblue";
import { MediaType } from "@/app/lib/types/hash.types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function HashCarousel({
  HashMedia,
}: {
  HashMedia: MediaType[];
}) {
  const [active, setActive] = useState<number>(0);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setEndX(e.changedTouches[0].clientX);
    handleSwipe();
  };

  function handlePrevious() {
    if (active === 0) {
      setActive(HashMedia.length - 1);
    } else {
      setActive(active - 1);
    }
  }
  function handleNext() {
    if (active === HashMedia.length - 1) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  }

  const handleSwipe = () => {
    if (startX - endX > 100) {
      // Swipe to the left
      handleNext();
    } else if (startX - endX < -100) {
      // Swipe to the right
      handlePrevious();
    }
  };
  return (
    <div
      id="carousel-container"
      aria-label="media carousel for post"
      className="w-[100%] h-[450px] relative lg:p-10 mb-10"
    >
      <div
        id="carousel-navigation"
        className="flex items-center justify-center px-5"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Button
          id="prev-arrow"
          className="text-accent1 hover:text-primary opacity-75 hover:opacity-100 absolute left-0 top-1/2 -translate-y-[50%] z-30"
          onClick={handlePrevious}
        >
          <ArrowLeft size={24} />
        </Button>
        <Button
          id="next-arrow"
          className="text-accent1 hover:text-primary opacity-75 hover:opacity-100 absolute right-0 top-1/2 -translate-y-[50%] z-30"
          onClick={handleNext}
        >
          <ArrowRight size={24} />
        </Button>
      </div>
      <div
        id="slides-wrapper"
        className="flex items-center justify-center h-[450px] max-h-[450px]"
      >
        {HashMedia.map((media, index) => (
          <div
            id={media.id}
            key={media.id}
            className={`absolute flex items-center justify-start inset-0 rounded-2xl ${
              active === index ? "block" : "hidden"
            }`}
          >
            {media.mediaType === "image" ? (
              <div className="w-[450px] h-[250px] max-h-[250px]">
                <Image
                  src={media.url}
                  alt={media.alt}
                  fill
                  className="rounded-xl aspect-auto object-contain block"
                />
              </div>
            ) : media.mediaType === "video" ? (
              <AspectRatio ratio={16 / 9}>
                <HashVideoPreview src={media.url} autoplay={active === index} />
              </AspectRatio>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
