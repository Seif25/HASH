"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MediaType } from "@/app/lib/types/hash.types";
import { HashCarouselItem } from "./HashCarouselItem";

export function HashCarousel2({ hashMedia }: { hashMedia: MediaType[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[400px]"
    >
      <CarouselContent>
        {hashMedia.map((media, index) => (
          <HashCarouselItem key={media.id} media={media} index={index} />
        ))}
      </CarouselContent>
      <CarouselPrevious variant={"icon"} />
      <CarouselNext variant={"icon"} />
    </Carousel>
  );
}
