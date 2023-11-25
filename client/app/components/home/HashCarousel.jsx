import Image from "next/image";
import ReactPlayer from "react-player";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import '@splidejs/splide/css/skyblue';

export default function HashCarousel({ media }) {
  return (
    <Splide
      aria-label="My Favorite Images"
      className="w-full h-[25rem] lg:p-10 my-10 bg-teal-200"
    >
      {media.map((item, index) => (
        <SplideSlide key={`slide-${index}`} options = {{ autoWidth: true, autoHeight: true }} className="bg-red-400 py-10">
          {item.mediaType === "image" ? (
            <Image
              src={item.url}
              alt={item.alt}
              width={400}
              height={400}
              className="rounded-2xl w-full lg:w-1/2 bg-accent1 h-80 object-cover"
            />
          ) : (
            <div className="rounded-2xl w-full h-80">
              <ReactPlayer
                url={item.url}
                width="100%"
                height="100%"
                muted={true}
                playing={true}
                loop={true}
                controls={true}
                style={{ borderRadius: "1rem" }}
              />
            </div>
          )}
        </SplideSlide>
      ))}
    </Splide>
  );
}
