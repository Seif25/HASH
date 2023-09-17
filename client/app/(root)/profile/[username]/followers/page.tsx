import { getFollowers } from "@/lib/actions/user.actions";

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
    title: `People Following (@${user?.username}) / Hash`,
  };
}

async function fetchFollowers(username: string) {
  const userFollowers = await getFollowers(username);
  return userFollowers;
}

export default async function Following({
  params,
}: {
  params: { username: string };
}) {
  const data = await fetchFollowers(params.username);
  return <UserFollowings followers={data.followers} />;
}
