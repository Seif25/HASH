"use client";

import { Media } from "@/utils/types/hash.types";

import React, { ReactNode, useEffect } from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Image from "next/image";

type PropType = {
  slides: ReactNode[];
  startIndex: number;
};

export const DaisyCarousel = ({
  slides,
  startIndex,
}: {
  slides: ReactNode[];
  startIndex: number;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: "center",
      startIndex: startIndex,
      containScroll: "trimSnaps",
    },
    []
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="carousel items-center justify-center w-full max-h-[36rem] space-x-4 p-10 rounded-lg object-contain">
      <div className="flex max-w-screen-xs w-[400px] lg:max-w-screen-md lg:w-[768px] h-full py-5 lg:px-10" ref={emblaRef}>
        <div className="flex grow gap-5 lg:gap-0 items-center max-w-screen-xs w-[400px] lg:max-w-screen-md lg:w-full h-full max-h-[550px]">
          {slides.map((slide: ReactNode, index: number) => (
            <div key={`slide-${index}`} className="carousel-item relative">
              {slide}
            </div>
          ))}
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};
