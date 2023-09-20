// *TYPES
import { Hash, Media } from "@/utils/types/hash.types";

// *UTILS
import Link from "next/link";

// *COMPONENTS
import ImageDialog from "../cards/ImageDialog";
import HashLinks from "./HashLinks";
import ShareMenu from "./ShareMenu";
import FormattedWord from "./FormattedWord";
import moment from "moment";
import HashText from "../text/HashText";

interface HashInformationProps {
  hash: Hash;
  currentUser: string;
  profilePicture: string | undefined;
  reposted: boolean;
  isComment?: boolean;
}

export default function HashInformation({
  hash,
  currentUser,
  profilePicture,
  reposted,
  isComment,
}: HashInformationProps) {
  return (
    <div className="flex flex-col gap-3 justify-center w-full">
      {/* HASH TEXT */}
      <div className="max-w-xs lg:max-w-4xl">
        {!isComment ? (
          <Link href={`/hash/${hash._id.toString()}`} className="px-10">
            <HashText text={hash.text} />
          </Link>
        ) : (
          <h2 className="hash-text-wrap h-auto text-sm">
            <HashText text={hash.text} />
          </h2>
        )}
      </div>
      {/* HASH IMAGES, GIFs or VIDEOS */}
      <div className="px-10">
        {hash.media && (
          <div
            className={`${
              hash.media?.length > 1
                ? "grid grid-cols-2 items-center justify-center h-auto border border-light-1 rounded-lg"
                : "flex items-center justify-center"
            }`}
          >
            {hash.media.map((image: Media, index: number) => (
              <div
                className={`${
                  hash.media?.length > 1
                    && `w-auto h-auto object-cover ${
                        index === 0 && "rounded-tl-lg"
                      } ${index === 1 && "rounded-tr-lg"} ${
                        index === 2 && "rounded-bl-lg"
                      } ${index === 3 && "rounded-br-lg"}`
                } ${hash.media?.length === 1 && "w-full h-full rounded-lg"}`}
                key={image.id}
              >
                <ImageDialog
                  media={image}
                  commentCount={hash.children?.length ?? 0}
                  likeCount={hash.likes?.length ?? 0}
                  repostCount={hash.reposts?.length ?? 0}
                  viewCount={hash.views ?? 0}
                  id={hash._id.toString()}
                  currentUserId={currentUser}
                  index={index}
                  liked={hash.likes?.includes(currentUser ?? "") ?? false}
                  length={hash.media?.length ?? 0}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* HASH METADATA IF DISPLAYING HASH PAGE */}
      {isComment && (
        <div className="flex items-center gap-2 text-light-3 text-small-semibold px-10">
          <span className="uppercase">
            {moment(hash.createdAt).format("hh:mm a")}
          </span>
          <span>• {moment(hash.createdAt).format("MMM D, YYYY")}</span>
          <span>
            • {hash.views} {hash.views > 1 ? "views" : "view"}
          </span>
        </div>
      )}

      {/* HASH LINKS */}
      <div className="flex items-center justify-between w-full pl-10">
        <HashLinks
          commentCount={hash.children.length ?? 0}
          likeCount={hash.likes?.length ?? 0}
          repostCount={hash.reposts.length ?? 0}
          viewCount={hash.views ?? 0}
          hashId={hash._id.toString()}
          currentUser={currentUser}
          liked={hash.likes?.includes(currentUser) ?? false}
          image={profilePicture ?? ""}
          reposted={reposted}
          parentAuthor={hash.author.username}
        />
        <div className="w-[5%] flex items-center justify-end">
          <ShareMenu id={hash._id.toString()} authorId={currentUser} />
        </div>
      </div>
    </div>
  );
}
