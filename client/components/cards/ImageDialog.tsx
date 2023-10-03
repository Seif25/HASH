import { Media } from "@/utils/types/hash.types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import HashLinks from "../shared/HashLinks";
import ShareMenu from "../shared/ShareMenu";
import { currentUser } from "@clerk/nextjs";
import { EmblaCarousel } from "../shared/carousel/EmblaCarousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface ImageDialogProps {
  currentImage: Media;
  commentCount: number;
  likeCount: number;
  viewCount: number;
  repostCount: number;
  currentUserId: string;
  id: string;
  index: number;
  liked: boolean;
  length: number;
  media: Media[];
  size?: "xs" | "lg";
}

async function ImageDialog({
  currentImage,
  commentCount,
  likeCount,
  viewCount,
  repostCount,
  currentUserId,
  id,
  index,
  liked,
  length,
  media,
  size = "lg",
}: ImageDialogProps) {
  const user = await currentUser();
  const rounded = [
    ["rounded-lg"],
    ["rounded-l-lg", "rounded-r-lg"],
    ["rounded-l-lg", "", "rounded-r-lg"],
    ["rounded-l-lg", "", "", "rounded-r-lg"],
  ];
  const rounded_sm = [
    ["rounded-lg"],
    ["rounded-l-lg", "rounded-r-lg"],
    ["rounded-tl-lg", "rounded-r-lg", "rounded-b-lg", ""],
    ["rounded-tl-lg", "rounded-tr-lg", "rounded-bl-lg", "rounded-br-lg"],
  ];
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <AspectRatio ratio={4 / 3}>
          {size === "lg" ? (
            <Image
              key={currentImage.id}
              src={currentImage.url}
              alt={currentImage.alt}
              width={120}
              height={180}
              priority
              className={`object-cover ${
                index > 0 && "border-l border-accent2"
              } ${rounded[length - 1][index]} ${
                length > 1
                  ? "w-full max-w-[180px] h-[180px]"
                  : "w-full max-w-[360px] h-[360px]"
              }`}
            />
          ) : (
            <Image
              key={currentImage.id}
              src={currentImage.url}
              alt={currentImage.alt}
              width={120}
              height={180}
              priority
              className={`object-cover ${rounded_sm[length - 1][index]} ${
                length > 1
                  ? "w-full max-w-[180px] h-[180px]"
                  : "w-full max-w-[360px] h-[360px]"
              }`}
            />
          )}
        </AspectRatio>
      </DialogTrigger>
      <DialogContent className="w-full h-full flex flex-col gap-5">
        <div className="flex items-center justify-center w-full h-[90%]">
          <EmblaCarousel
            startIndex={index}
            slides={media.map((image: Media) => (
              <div className="w-full h-[580px] max-h-[600px] flex items-center justify-center">
                <Image
                  key={image.id}
                  src={image.url}
                  alt={image.alt}
                  width={600}
                  height={400}
                  priority
                  className="object-contain rounded-lg p-2 w-full max-w-xs lg:max-w-screen-lg h-[580px] max-h-[600px]"
                  // style={{
                  //   width: "auto",
                  //   maxWidth: 600,
                  //   height: 580,
                  //   maxHeight: 580,
                  // }}
                />
              </div>
            ))}
          />
        </div>
        <div className="flex items-center justify-between h-auto pt-5">
          {/* // TODO: PARENT AUTHOR */}
          <HashLinks
            commentCount={commentCount}
            likeCount={likeCount}
            viewCount={viewCount}
            repostCount={repostCount}
            currentUser={user?.username ?? ""}
            parentAuthor=""
            hashId={id}
            liked={liked}
            image={user?.imageUrl ?? ""}
          />
          <div className="w-[10%] flex items-center justify-end">
            <ShareMenu
              id={id.toString()}
              authorId={currentUserId?.toString() ?? ""}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImageDialog;
