"use client";
import { Card, CardContent } from "@/components/ui/card";
import { MediaType } from "@/app/lib/types/hash.types";
import Image from "next/image";
import HashVideoPreview from "./HashVideoPreview";
import { useState } from "react";
import { CarouselItem } from "@/components/ui/carousel";

export function HashCarouselItem({
  index,
  media,
}: {
  index: number;
  media: MediaType;
}) {
  const [pinched, setPinched] = useState(-1);

  function handlePinched() {
    if (pinched === index) {
      setPinched(-1);
    } else {
      setPinched(index);
    }
  }
  return (
    <CarouselItem className="lg:basis-1/3" onClick={handlePinched}>
      <div className="lg:p-1">
        <Card className="bg-transparent border-none">
          <CardContent
            className={`w-[350px] h-[350px] lg:w-full lg:h-auto flex aspect-square items-center lg:justify-center lg:p-2`}
          >
            {media.mediaType === "image" ? (
              <Image
                src={media.url}
                alt={media.alt}
                width={400}
                height={400}
                priority
                className={`aspect-square w-11/12 lg:w-full h-auto bg-[#000a13] rounded-xl ${
                  pinched === index ? "object-contain" : "object-cover"
                }`}
              />
            ) : media.mediaType === "video" ? (
              <HashVideoPreview src={media.url} />
            ) : (
              <></>
            )}
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
