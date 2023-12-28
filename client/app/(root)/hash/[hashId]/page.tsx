import HashCard from "@/app/components/home/HashCard";
import CommentField from "@/app/components/home/links/CommentField";
import {
  fetchHashByIdAction,
  viewHashAction,
} from "@/app/lib/actions/hash/hash.actions";
import { fetchUserAction } from "@/app/lib/actions/user/user.actions";
import { DetailedHashType } from "@/app/lib/types/hash.types";
import { currentUser } from "@clerk/nextjs";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { hashId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const hashId = params.hashId;

  // fetch data
  const hash = (await fetchHashByIdAction(hashId)) as DetailedHashType;

  // optionally access and extend (rather than replace) parent metadata
  let images: string[] = [];
  if (hash.media.length > 0) {
    hash.media.forEach((source) => {
      images.push(source.url);
    });
  }

  return {
    title: `@${hash.author.username} on Hash / ${hash.text}`,
    openGraph: {
      images: images,
    },
  };
}

export default async function ({ params }: { params: { hashId: string } }) {
  const { hashId } = params;
  const hash = (await fetchHashByIdAction(hashId)) as DetailedHashType;
  const user = await currentUser();
  const loggedInUser = await fetchUserAction(user?.username ?? "");

  if (!hash.views.includes(loggedInUser.username)) {
    await viewHashAction({
      loggedInUser: loggedInUser.username,
      hashId,
    });
  }
  return (
    <div className="mt-5 bg-white dark:bg-dark rounded-xl mb-5 pb-5">
      <div className="flex flex-col pt-5">
        {hash.parentId && (
          <HashCard
            hash={hash.parentId}
            loggedInUser={loggedInUser?.username ?? ""}
            following={loggedInUser.following}
            variant="parent"
          />
        )}
        {/* Hash Card */}
        <HashCard
          hash={hash}
          loggedInUser={loggedInUser?.username ?? ""}
          following={loggedInUser.following}
          variant="child"
        />
        <div className="px-5 my-2 lg:my-5">
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
