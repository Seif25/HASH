"use client";

import React, { ReactNode, useEffect } from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

type PropType = {
  slides: ReactNode[];
  startIndex: number;
};

export const EmblaCarousel = (props: PropType) => {
  const { slides, startIndex } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    startIndex: startIndex,
    containScroll: "trimSnaps",
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla pt-5">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__img">
                {slide}
              </div>
            </div>
          ))}
        </div>
      </div>
      {slides.length > 1 && (
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      )}
    </div>
  );
};
