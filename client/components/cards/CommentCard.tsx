// *ACTIONS
import { getHash } from "@/lib/actions/hash.actions";
import {  getUserInformation } from "@/lib/actions/user.actions";

// *TYPES
import { Hash } from "@/utils/types/hash.types";

// *UTILS
import { currentUser } from "@clerk/nextjs";
import { checkReposted } from "@/utils/functions/hash.functions";
import Link from "next/link";
import dynamic from "next/dynamic";


// *COMPONENTS
import CreateComment from "@/components/forms/CreateComment";
import { User } from "@/utils/types/user.types";
import RepostedLabel from "../shared/RepostedLabel";
import AuthorInformationSkeleton from "../skeletons/AuthorInformationSkeleton";
import HashInformationSkeleton from "../skeletons/HashInformationSkeleton";
import { notFound } from "next/navigation";


const AuthorInformation = dynamic(() => import("../shared/AuthorInformation"), {
  ssr: false, // This ensures the component is only rendered on the client-side
});
const HashInformation = dynamic(() => import("../shared/HashInformation"), {
  ssr: false, // This ensures the component is only rendered on the client-side
});
interface CommentCardProps {
  hashId: string;
  isChild?: boolean;
  isComment: boolean;
}

export default async function CommentCard({
  hashId,
  isChild,
  isComment,
}: CommentCardProps) {
  // *GET HASH
  const hash: Hash = await getHash(hashId);

  if (!hash) notFound();

  // *GET CURRENT USER
  const user = await currentUser();

  // *GET USER FROM DATABASE
  let dbUser: User | null = null;
  if (user) {
    dbUser = await getUserInformation(user?.username ?? "");
  }

  // *CHECK IF USER REPOSTED THIS HASH
  const reposted = checkReposted({
    username: user?.username ?? "",
    reposts: hash.reposts,
  });

  return (
    <article className="w-full">
      <div className="hash-card">
        {/* CHECK IF USER REPOSTED THIS HASH */}
        {reposted && (
          <RepostedLabel
            label={
              user?.username === hash.author.username
                ? "You Reposted"
                : `${currentUser} Reposted`
            }
          />
        )}

        {/* AUTHOR INFORMATION */}
        {dbUser !== null ? (
          <AuthorInformation
            author={dbUser}
            createdAt={hash.createdAt}
            currentUser={dbUser.username ?? ""}
            hashId={hash._id.toString()}
            isComment={isComment}
          />
        ) : (
          <AuthorInformationSkeleton isComment={isComment} />
        )}

        <div
          className={`flex flex-col gap-5 ${
            hash.children.length > 0 && "border-l border-accent1"
          } ml-5`}
        >
          {/* HASH INFORMATION */}
          {dbUser !== null && hash ? (
            <HashInformation
              currentUser={dbUser.username ?? ""}
              hash={hash}
              profilePicture={dbUser.image}
              reposted={reposted}
              isComment={isComment}
            />
          ) : (
            <HashInformationSkeleton />
          )}

          {/* POST A COMMENT */}
          {!isChild && (
            <div className="px-5">
              <CreateComment
                currentUser={dbUser?.username ?? ""}
                image={dbUser?.image ?? "/assets/profile-pic.png"}
                parentAuthor={hash.author.username ?? ""}
                parentId={hash._id.toString()}
              />
            </div>
          )}
        </div>

        {/* COMMENTS */}
        {hash.children.length > 0 && !isChild && (
          <div className="flex flex-col gap-5 -ml-5 -mt-5">
            {hash.children.map((comment: Hash) => (
              <div className={`flex flex-col`} key={comment._id}>
                <CommentCard
                  hashId={comment._id.toString()}
                  isChild={true}
                  key={comment._id}
                  isComment={false}
                />
                {/* SHOW ALL REPLIES IF AVAILABLE */}
                {comment.children.length > 0 && (
                  <div
                    className={`flex items-center justify-start px-5 ml-10 -mt-5 ${
                      comment.children.length > 0 &&
                      "border-l border-primary border-dashed"
                    }`}
                  >
                    <Link
                      href={`/hash/${comment._id.toString()}`}
                      className="text-primary px-5 italic font-bold text-[14px]"
                    >
                      Show replies
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
