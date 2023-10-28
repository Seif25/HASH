"use client";

import { Media } from "@/utils/types/hash.types";
import Image from "next/image";

export default function DaisyCarouselContent({ image, index, length }: { image: Media, index: number, length: number }) {
  return (
    <div
      id={`#slide${index}`}
      className="carousel-item relative carousel-center"
    >
      <Image
        src={image.url}
        alt={image.alt}
        width={600}
        height={400}
        className="rounded-box object-contain w-auto max-h-[36rem] h-auto"
      />
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a
          href={index !== 0 ? `#slide${index - 1}` : "#slide0"}
          className="btn btn-circle"
        >
          ❮
        </a>
        <a
          href={
            index !== length - 1
              ? `#slide${index + 1}`
              : `#slide${length - 1}`
          }
          className="btn btn-circle"
        >
          ❯
        </a>
      </div>
    </div>
  );
}
