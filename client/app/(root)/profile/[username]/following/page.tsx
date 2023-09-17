import { getFollowing } from "@/lib/actions/user.actions";

import { fetchUser } from "@/lib/actions/user.actions";
import type { Metadata, ResolvingMetadata } from "next";

import dynamic from "next/dynamic";

const UserFollowings = dynamic(() => import("@/components/shared/profile/UserFollowings"), {
  ssr: false, // This ensures the component is only rendered on the client-side
});

type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const username = params.username;

  // fetch data
  const user = await fetchUser(username);

  return {
    title: `People (@${user?.username}) Follows / Hash`,
  };
}

async function fetchFollowing(username: string) {
    const userFollowing = await getFollowing(username);
    return userFollowing 
}

export default async function Following({
  params,
}: {
  params: { username: string };
}) {
  const data = await fetchFollowing(params.username);
  return <UserFollowings following={data.following} />;
}
