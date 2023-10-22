// *TYPES
import { Hash, Media } from "@/utils/types/hash.types";

// *UTILS
import Link from "next/link";

// *COMPONENTS
import ImageDialog from "../cards/ImageDialog";
import HashLinks from "./HashLinks";
import ShareMenu from "./ShareMenu";
import moment from "moment";
import HashText from "../text/HashText";
import AuthorMoreMenu from "./AuthorMoreMenu";
import ViewerMoreMenu from "./ViewerMoreMenu";

interface HashInformationProps {
  hash: Hash;
  currentUser: string;
  profilePicture: string | undefined;
  reposted: boolean;
  isComment?: boolean;
  isChild?: boolean;
}

export default function HashInformation({
  hash,
  currentUser,
  profilePicture,
  reposted,
  isComment,
  isChild = false,
}: HashInformationProps) {
  const isFollowing = hash.author.followers?.includes(currentUser); //TODO: Remove ? after making followers required: [] by default

  return (
    <div
      className={`flex flex-col gap-2 justify-center w-full ${
        !isComment && !isChild && "pl-5"
      }`}
    >
      {/* HASH TEXT */}
      <div className="max-w-xs lg:max-w-4xl">
        {!isComment ? (
          <Link href={`/hash/${hash._id.toString()}`} className="">
            <HashText text={hash.text} />
          </Link>
        ) : (
          <h2 className="hash-text-wrap h-auto text-sm">
            <HashText text={hash.text} />
          </h2>
        )}
      </div>
      {/* HASH IMAGES, GIFs or VIDEOS */}
      {hash.media?.length > 0 && (
        <div className="w-full pl-10">
          <div
            className={`${
              hash.media?.length > 1
                ? `grid grid-cols-2 lg:grid-cols-4 rounded-lg w-full h-full gap-0`
                : "flex items-start w-full h-full rounded-lg"
            }`}
          >
            {hash.media.map((image: Media, index: number) => (
              <>
                <div
                  className={`lg:hidden w-full ${
                    hash.media?.length > 1
                      ? "max-w-[180px] h-[180px]"
                      : "max-w-[360px] h-[360px]"
                  }`}
                  key={image.id}
                >
                  <ImageDialog
                    currentImage={image}
                    commentCount={hash.children?.length ?? 0}
                    likeCount={hash.likes?.length ?? 0}
                    repostCount={hash.reposts?.length ?? 0}
                    viewCount={hash.views ?? 0}
                    id={hash._id.toString()}
                    currentUserId={currentUser}
                    index={index}
                    liked={hash.likes?.includes(currentUser ?? "") ?? false}
                    length={hash.media?.length ?? 0}
                    media={hash.media ?? []}
                    size="xs"
                  />
                </div>
                <div
                  className={`hidden lg:flex w-full ${
                    hash.media?.length > 1
                      ? "max-w-[180px] h-[180px]"
                      : "max-w-[360px] h-[360px]"
                  }`}
                  key={image.id}
                >
                  <ImageDialog
                    currentImage={image}
                    commentCount={hash.children?.length ?? 0}
                    likeCount={hash.likes?.length ?? 0}
                    repostCount={hash.reposts?.length ?? 0}
                    viewCount={hash.views ?? 0}
                    id={hash._id.toString()}
                    currentUserId={currentUser}
                    index={index}
                    liked={hash.likes?.includes(currentUser ?? "") ?? false}
                    length={hash.media?.length ?? 0}
                    media={hash.media ?? []}
                    size="lg"
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      )}

      {/* HASH METADATA IF DISPLAYING HASH PAGE */}
      {isComment && (
        <div className="flex items-center gap-2 text-accent1/50 text-small-semibold px-10">
          <span className="uppercase">
            {moment(hash.createdAt).format("hh:mm a")}
          </span>
          <span>• {moment(hash.createdAt).format("MMM D, YYYY")}</span>
          <span>• {hash.views} views</span>
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
        <div className="w-[5%] flex items-center justify-end gap-5">
          <ShareMenu
            id={hash._id.toString()}
            authorId={hash.author.username}
            content={hash.text}
          />
          {currentUser === hash.author.username ? (
            <AuthorMoreMenu
              hashId={hash._id.toString()}
              currentUser={currentUser}
            />
          ) : (
            <ViewerMoreMenu
              currentUser={currentUser}
              author={hash.author.username}
              isFollowing={isFollowing ?? false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
