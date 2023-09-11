import { getHash } from "@/lib/actions/hash.actions";
import { Hash, Media } from "@/utils/types/hash";
import { currentUser } from "@clerk/nextjs";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import AuthorMoreMenu from "@/components/shared/AuthorMoreMenu";
import ViewerMoreMenu from "@/components/shared/ViewerMoreMenu";
import ImageDialog from "@/components/cards/ImageDialog";
import FormattedWord from "@/components/shared/FormattedWord";
import HashLinks from "@/components/shared/HashLinks";
import ShareMenu from "@/components/shared/ShareMenu";
import CreateComment from "@/components/forms/CreateComment";
import { getUser } from "@/lib/actions/user.actions";
import { MongoUser } from "@/utils/types/user";
import CachedIcon from "@mui/icons-material/Cached";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

async function CommentCard({
  hashId,
  isChild,
}: {
  hashId: string;
  isChild: boolean;
}) {
  const user = await currentUser();
  const hash: Hash = await getHash(hashId);
  let dbUser: MongoUser | null | undefined;
  if (user) {
    dbUser = await getUser({ clerkId: user.id });
  }

  let repostedByMe;
  if (hash.reposts.length > 0) {
    if (dbUser) {
      repostedByMe = hash.reposts.find(
        (repost) => repost.user?.toString() === dbUser?._id.toString()
      );
    }
  }

  function formatContent(input: string) {
    const words = input.trim().split(/\s+/);

    return words.map((formattedWord, index) => (
      <FormattedWord key={index} text={formattedWord} index={index} />
    ));
  }
  return (
    <article className="w-full">
      {hash && (
        <div className="flex flex-col gap-5 p-5 w-full bg-accent2 rounded-lg">
          {repostedByMe && (
            <p className="italic font-bold text-green-500 flex items-center gap-1">
              <CachedIcon fontSize="small" color="inherit" />
              You reposted
            </p>
          )}
          <div className="flex items-start justify-between gap-3 w-full">
            {/* User Information + Hash Information */}
            <div className="flex w-auto flex-1 flex-row items-center gap-0">
              <HoverCard>
                <HoverCardTrigger>
                  <Link href={`/profile/${hash.author.id}`}>
                    {/* Profile Picture + Name + isVerified + Username */}
                    <div className="flex w-full flex-1 flex-row items-center justify-start gap-2">
                      <Image
                        src={hash.author.image ?? ""}
                        alt="pp"
                        width={42}
                        height={42}
                        className="rounded-full"
                      />
                      <div className="flex flex-col gap-0">
                        <span className="font-extrabold text-ellipsis w-40 text-white flex items-center gap-1">
                          {hash.author.name}
                          {hash.author.verified && (
                            <span className="flex items-center justify-center">
                              <VerifiedIcon className="text-amber-400" />
                            </span>
                          )}
                        </span>
                        <span className="font-light text-accent1 text-ellipsis w-40">
                          {"@"}
                          {hash.author.username}
                        </span>
                      </div>
                    </div>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex flex-col gap-3 w-full h-auto">
                    <div className="flex flex-col gap-1 w-full h-auto">
                      <div className="flex items-center justify-between w-full">
                        <Link href={`/profile/${hash.author.id}`}>
                          <Image
                            src={hash.author.image ?? ""}
                            alt="pp"
                            width={52}
                            height={52}
                            className="rounded-full"
                          />
                        </Link>
                        <button className="bg-gradient-to-b from-primary via-[#1183e8] to-[#0671cb] p-2 rounded-full w-20 z-20 hover:scale-105">
                          Follow
                        </button>
                      </div>
                      <Link href={`/profile/${hash.author.id}`}>
                        <div className="flex items-center gap-1">
                          <span className="font-extrabold truncate w-20 lg:w-auto text-white flex items-center gap-0 hover:underline">
                            {hash.author.name}
                          </span>
                          {hash.author.verified && (
                            <span className="flex items-center justify-center">
                              <VerifiedIcon
                                className="text-amber-400"
                                fontSize="small"
                              />
                            </span>
                          )}
                        </div>
                      </Link>
                      <Link href={`/profile/${hash.author.id}`}>
                        <span className="font-light text-white truncate w-16 lg:w-auto">
                          {"@"}
                          {hash.author.username}
                        </span>
                      </Link>
                    </div>
                    <p className="whitespace-pre-line break-all h-auto w-full text-sm text-white">
                      {hash.author.bio}
                    </p>
                    <div className="grid grid-cols-2 items-center gap-5">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">
                          {hash.author.following?.length ?? 0}
                        </span>
                        <span className="text-light-3 font-light">
                          Following
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">
                          {hash.author.followers?.length ?? 0}
                        </span>
                        <span className="text-light-3 font-light">
                          Followers
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            {/* More Information */}
            <div className="w-auto flex items-center justify-end">
              {user?.id === hash.author.id ? (
                <AuthorMoreMenu
                  id={hash._id.toString()}
                  authorId={hash.author.toString() ?? ""}
                />
              ) : (
                <ViewerMoreMenu
                  id={hash._id.toString()}
                  authorId={user?.id.toString() ?? ""}
                  username={hash.author.username ?? ""}
                />
              )}
            </div>
          </div>
          <div className="ml-5">
            <div
              className={`flex flex-col gap-0 ${
                hash.children.length > 0 && "border-l border-light-3"
              }`}
            >
              {/* Hash Content + Image */}
              <div className="flex flex-col gap-3 justify-center w-full px-5">
                {isChild ? (
                  <Link href={`/hash/${hash._id.toString()}`}>
                    <h2 className="whitespace-pre-line break-all h-auto w-full text-sm">
                      {formatContent(hash.text)}
                    </h2>
                  </Link>
                ) : (
                  <h2 className="whitespace-pre-line break-all h-auto w-full text-sm">
                    {formatContent(hash.text)}
                  </h2>
                )}
                {hash.media && (
                  <div
                    className={`${
                      hash.media?.length > 1
                        ? "grid grid-cols-2 items-center justify-center h-auto border border-light-1 rounded-lg"
                        : "flex items-center justify-center"
                    } z-20`}
                  >
                    {hash.media &&
                      hash.media?.map((m: Media, index: number) => (
                        <div
                          className={`${
                            hash.media?.length ?? 0 > 1
                              ? `w-auto h-auto object-cover ${
                                  index === 0 && "rounded-tl-lg"
                                } ${index === 1 && "rounded-tr-lg"} ${
                                  index === 2 && "rounded-bl-lg"
                                } ${index === 3 && "rounded-br-lg"}`
                              : "w-full h-full rounded-lg"
                          }`}
                          key={m.id}
                        >
                          <ImageDialog
                            media={m}
                            commentCount={hash.children.length}
                            likeCount={hash.likes?.length ?? 0}
                            repostCount={hash.reposts?.length ?? 0}
                            viewCount={hash.views ?? 0}
                            id={hash._id.toString()}
                            currentUserId={dbUser?._id.toString() ?? ""}
                            index={index}
                            liked={
                              hash.likes?.includes(
                                dbUser?._id.toString() ?? ""
                              ) ?? false
                            }
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
              {/* Hash Metadata */}
              <div className="flex items-center gap-2 text-light-3 text-small-semibold px-5">
                <span className="uppercase">
                  {moment(hash.createdAt).format("hh:mm a")}
                </span>
                <span>• {moment(hash.createdAt).format("MMM D, YYYY")}</span>
                <span>
                  • {hash.views} {hash.views > 1 ? "views" : "view"}
                </span>
              </div>
              {/* Links */}
              <div className="flex items-center justify-between w-full pt-5">
                <HashLinks
                  commentCount={hash.children.length}
                  likeCount={hash.likes?.length ?? 0}
                  repostCount={hash.reposts?.length ?? 0}
                  viewCount={hash.views ?? 0}
                  userId={dbUser?._id.toString() ?? ""}
                  hashId={hash._id.toString()}
                  liked={
                    hash.likes?.includes(dbUser?._id.toString() ?? "") ?? false
                  }
                  image={dbUser?.image ?? ""}
                  reposted={repostedByMe ? true : false}
                />
                <div className="w-[10%] flex items-center justify-end">
                  <ShareMenu
                    id={hash._id.toString()}
                    authorId={user?.id.toString() ?? ""}
                  />
                </div>
              </div>
              {!isChild && (
                <CreateComment
                  userId={dbUser?._id.toString() ?? ""}
                  parentId={hash._id.toString()}
                  image={user?.imageUrl ?? ""}
                />
              )}
              {/* Comments */}
              <div className="flex flex-col gap-5 w-full px-5">
                {hash.children.length > 0 &&
                  !isChild &&
                  hash.children.map((c: Hash) => (
                    <CommentCard
                      hashId={c._id.toString()}
                      isChild={true}
                      key={c._id}
                    />
                  ))}
              </div>
            </div>
            {hash.children.length > 0 && isChild && (
              <div
                className={`flex items-center justify-start ${
                  hash.children.length > 0 &&
                  "border-l border-primary border-dashed"
                }`}
              >
                <Link
                  href={`/hash/${hash._id.toString()}`}
                  className="text-primary px-5"
                >
                  Show replies
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

export default CommentCard;
