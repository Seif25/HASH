import HashCarousel from "@/app/components/home/HashCarousel";
import HashVideoPlayer from "@/app/components/home/HashVideoPlayer";
import HashVideoPreview from "@/app/components/home/HashVideoPreview";

export default function Page() {
  return (
    <div className="w-full mt-5 flex flex-col gap-10">
      <HashVideoPlayer src="/assets/stock-video.mp4" />
      <HashVideoPreview src="/assets/stock-video.mp4" />
      {/* <HashCarousel media={[]} /> */}
    </div>
  );
}
