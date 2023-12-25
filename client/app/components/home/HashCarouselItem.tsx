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
    <CarouselItem className="" onClick={handlePinched}>
      <div className="p-1">
        <Card className="bg-transparent border-none">
          <CardContent
            className={`w-[400px] h-[400px] flex aspect-square items-center justify-center p-2`}
          >
            {media.mediaType === "image" ? (
              <Image
                src={media.url}
                alt={media.alt}
                width={400}
                height={400}
                priority
                className={`aspect-square bg-[#000a13] rounded-xl ${
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
