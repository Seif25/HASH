import ProfileInformation from "@/components/layouts/profile/ProfileInformation";
import ProfileTabs from "@/components/layouts/profile/ProfileTabs";
import { fetchUser } from "@/lib/actions/user.actions";
import type { Metadata, ResolvingMetadata } from "next";

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
    title: `${user?.name} (@${username}) / Hash`,
  };
}

export default async function Profile({ params }: { params: { username: string } }) {
  const user = await fetchUser(params.username);
  
  return (
    <div className="bg-accent2 bg-opacity-50 lg:rounded-lg">
      {user && (
        <>
          <ProfileInformation user={user} />

          <ProfileTabs posts={user.hashes} likes={user.likes} currentUser={params.username} />
        </>
      )}
    </div>
  );
}
