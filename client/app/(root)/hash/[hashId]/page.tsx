import HashCard from "@/app/components/home/HashCard";
import CommentField from "@/app/components/home/links/CommentField";
import { fetchHashByIdAction } from "@/app/lib/actions/hash/hash.actions";
import { fetchUserAction } from "@/app/lib/actions/user/user.actions";
import { HashType } from "@/app/lib/types/hash.types";
import { currentUser } from "@clerk/nextjs";
import { SendHorizonal } from "lucide-react";

export default async function ({ params }: { params: { hashId: string } }) {
  const { hashId } = params;
  const hash = (await fetchHashByIdAction(hashId)) as HashType;
  const user = await currentUser();
  const loggedInUser = await fetchUserAction(user?.username ?? "");
  return (
    <div className="mt-5 bg-white dark:bg-dark rounded-2xl mb-5 pb-5">
      <div className="flex flex-col gap-2 lg:gap-5">
        {/* Hash Card */}
        <HashCard
          hash={hash}
          loggedInUser={loggedInUser?.username ?? ""}
          following={loggedInUser.following}
        />
        <div className="px-5">
          <CommentField
            commenter={loggedInUser?.username ?? ""}
            hashId={hashId}
          />
        </div>
        {hash.children.length > 0 && (
          <div className="flex flex-col gap-5 border-l border-accent2/10 dark:border-accent1/10 lg:px-3 lg:mx-10 mx-5">
            {hash.children.map((comment) => (
              <HashCard
                hash={comment}
                loggedInUser={loggedInUser?.username ?? ""}
                key={comment._id}
                following={loggedInUser.following}
                page="hash"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
