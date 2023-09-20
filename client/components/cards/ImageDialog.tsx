import { Media } from "@/utils/types/hash.types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import HashLinks from "../shared/HashLinks";
import ShareMenu from "../shared/ShareMenu";
import { currentUser } from "@clerk/nextjs";

interface ImageDialogProps {
  media: Media;
  commentCount: number;
  likeCount: number;
  viewCount: number;
  repostCount: number;
  currentUserId: string;
  id: string;
  index: number;
  liked: boolean;
  length: number;
}

async function ImageDialog({
  media,
  commentCount,
  likeCount,
  viewCount,
  repostCount,
  currentUserId,
  id,
  index,
  liked,
  length,
}: ImageDialogProps) {
  const user = await currentUser();
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <AspectRatio ratio={4 / 3}>
          <Image
            key={media.id}
            src={media.url}
            alt={media.alt}
            fill
            priority
            className={`object-cover ${
              index === 0 && length > 1 && "rounded-tl-lg"
            } ${index === 1 && "rounded-tr-lg"} ${
              index === 2 && "rounded-bl-lg"
            } ${index === 3 && "rounded-br-lg"} ${
              length === 1 && "rounded-lg"
            }`}
          />
        </AspectRatio>
      </DialogTrigger>
      <DialogContent className="w-full h-full flex flex-col gap-5">
        <div className="h-[90%] flex items-center justify-center p-5">
          <div className="block lg:hidden">
            <Image
              key={media.id}
              src={media.url}
              alt={media.alt}
              fill
              priority
              className="object-contain rounded-lg w-auto h-auto"
            />
          </div>
          <div
            className="hidden lg:block rounded-lg"
            style={{
              width: "auto",
              maxWidth: 600,
              height: 600,
              maxHeight: 600,
            }}
          >
            <Image
              key={media.id}
              src={media.url}
              alt={media.alt}
              width={600}
              height={400}
              priority
              className="object-contain rounded-lg p-2"
              style={{
                width: "auto",
                maxWidth: 600,
                height: 600,
                maxHeight: 600,
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between h-[10%]">
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
