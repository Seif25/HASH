import { fetchUserFollowingAction } from "@/app/lib/actions/user/user.actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import UsersCardGroup from "../../components/UsersCardGroup";
import UserCardSkeleton from "../../components/UserCardSkeleton";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const loggedInUser = await currentUser();
  const userFollowing = await fetchUserFollowingAction(params?.username ?? "");
  return (
    <div className="flex flex-col mt-5 w-full bg-white dark:bg-dark rounded-lg px-5 pt-5">
      <Tabs defaultValue="following" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger
            value="following"
            className="w-1/2 flex items-center gap-2"
          >
            <span className="text-accent2/50 dark:text-accent1/50 font-bold text-[12px]">
              {userFollowing?.following.length}
            </span>
            <p>Following</p>
          </TabsTrigger>
          <Link
            href={`/profile/${params.username}/followers`}
            className="w-1/2"
          >
            <TabsTrigger value="#" className="w-full flex items-center gap-2">
              <span className="text-accent2/50 dark:text-accent1/50 font-bold text-[12px]">
                {userFollowing?.followers.length}
              </span>
              Followers
            </TabsTrigger>
          </Link>
        </TabsList>
        <TabsContent value="following" className="w-full">
          {userFollowing ? (
            <UsersCardGroup
              users={userFollowing.following ?? []}
              variant="following"
              loggedInUser={loggedInUser?.username ?? ""}
              params={params}
            />
          ) : (
            <UserCardSkeleton />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
