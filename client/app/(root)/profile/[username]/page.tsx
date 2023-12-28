import { FetchUserReplies, UserType } from "@/app/lib/types/user.types";
import fetchUserReplies, { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { HashType } from "@/app/lib/types/hash.types";
import { Metadata, ResolvingMetadata } from "next";
import Profile from "../components/Profile";

type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  return {
    title: `@${params.username} Profile / Hash`,
  };
}

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const loggedInUser = await currentUser();
  // const loggedInUser = await fetchUser(_currentUser?.username ?? "");
  const user: UserType | null = await fetchUser(params.username);
  const replies: FetchUserReplies[] = await fetchUserReplies(params.username);

  const userHashes = user?.hashes as HashType[];
  const highlights = userHashes.filter(
    (hash) => hash.highlighted && hash.author.username === params.username
  );

  // userHashes.sort((a, b) => {
  //   if (a.pinned && !b.pinned) {
  //     return -1;
  //   }
  //   if (!a.pinned && b.pinned) {
  //     return 1;
  //   }
  //   return 0;
  // });

  const pinned = userHashes.filter(
    (hash) => hash.pinned && hash.author.username === params.username
  );
  const remainingHashes = userHashes.filter(
    (hash) => !(hash.pinned && hash.author.username === params.username)
  );
  const hashes = [...pinned, ...remainingHashes];

  const mediaHashes = user?.hashes.filter((hash) => hash.media.length > 0);

  const likedHashes = user?.likes;

  return (
    <div>
      {user && (
        <Profile
          loggedInUser={loggedInUser?.username ?? ""}
          user={user}
          replies={replies}
          userHashes={hashes}
          highlights={highlights}
          mediaHashes={mediaHashes ?? []}
          likedHashes={likedHashes ?? []}
        />
      )}
    </div>
  );
}
