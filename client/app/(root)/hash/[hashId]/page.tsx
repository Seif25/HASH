import HashCard from "@/components/cards/HashCard";
import { getHash } from "@/lib/actions/hash.actions";
import { HashCardProps, Media } from "@/utils/types/hash";
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

async function Hash({ params }: { params: { hashId: string } }) {
  const user = await currentUser();
  const hash: any = await getHash(params.hashId);

  function formatContent(input: string) {
    const words = input.trim().split(/\s+/);

    return words.map((formattedWord, index) => (
      <FormattedWord key={index} text={formattedWord} index={index} />
    ));
  }
  return (
    <article className="border-b border-light-3 w-full py-5">
      {hash && (
        <div className="flex flex-col gap-5 p-5 w-full bg-accent3 rounded-lg">
          <div className="flex items-start justify-between gap-3 w-full">
            {/* User Information + Hash Information */}
            <div className="flex w-auto flex-1 flex-row items-center gap-0">
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
                    <span className="font-extrabold truncate w-20 lg:w-auto text-black flex items-center gap-1">
                      {hash.author.name}
                      {hash.author.verified && (
                        <span className="flex items-center justify-center">
                          <VerifiedIcon className="text-amber-400" />
                        </span>
                      )}
                    </span>
                    <span className="font-light text-accent1 truncate w-16 lg:w-auto">
                      {"@"}
                      {hash.author.username}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            {/* More Information */}
            <div className="w-auto flex items-center justify-end">
              {user?.id === hash.author.id ? (
                <AuthorMoreMenu
                  id={hash._id.toString()}
                  authorId={hash.currentUserId ?? ""}
                />
              ) : (
                <ViewerMoreMenu
                  id={hash._id.toString()}
                  authorId={user?.id ?? ""}
                  username={hash.author.username ?? ""}
                />
              )}
            </div>
          </div>
          <div className="pl-5">
            <div className="flex flex-col gap-0 border-l border-light-3">
              {/* Hash Content + Image */}
              <div className="px-10 flex flex-col gap-3 justify-center w-full">
                <h2 className="whitespace-pre-line break-all h-auto w-full text-sm">
                  {formatContent(hash.text)}
                </h2>
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
                            commentCount={0}
                            likeCount={0}
                            repostCount={0}
                            viewCount={0}
                            id={hash._id.toString()}
                            currentUserId={user?.id}
                            index={index}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
              {/* Hash Metadata */}
              <div className="flex items-center gap-2 px-10 text-accent1 text-small-semibold">
                <span className="uppercase">
                  {moment(hash.createAt).format("hh:mm a")}
                </span>
                <span>• {moment(hash.createAt).format("MMM D, YYYY")}</span>
                <span>• {0} views</span>
              </div>
              {/* Links */}
              <div className="flex items-center justify-between w-full pl-5 pt-5">
                <HashLinks
                  commentCount={"2.1m"}
                  likeCount={"345k"}
                  repostCount={"92"}
                  viewCount={"12.9m"}
                />
                <div className="w-[10%] flex items-center justify-end">
                  <ShareMenu
                    id={hash._id.toString()}
                    authorId={user?.id ?? ""}
                  />
                </div>
              </div>
              <CreateComment userId={user?.id ?? ""} parentId={hash._id.toString()}/>
            </div>
          </div>
        </div>
      )}
      {/* <pre>
        <code>{JSON.stringify(hash, null, 2)}</code>
      </pre> */}
    </article>
  );
}

export default Hash;
