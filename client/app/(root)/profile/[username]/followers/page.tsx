import UserFriends from "@/components/shared/UserFriends";
import { getFollowers } from "@/lib/actions/user.actions";

import { getUserById } from "@/lib/actions/user.actions";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const userId = params.userId;

  // fetch data
  const user = await getUserById(userId);

  return {
    title: `People Following (@${user.username}) / Hash`,
  };
}

async function fetchFollowers(id: string) {
  const followers = await getFollowers(id);

  return followers;
}

export default async function Following({
  params,
}: {
  params: { userId: string };
}) {
  const data = await fetchFollowers(params.userId);
  return <UserFriends followers={data.followers} />;
}
