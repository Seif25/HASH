import { fetchUserFollowingAction } from "@/app/lib/actions/user/user.actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { currentUser } from "@clerk/nextjs";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const loggedInUser = await currentUser();
  const userFollowing = await fetchUserFollowingAction(params?.username ?? "");
  return (
    <div className="flex flex-col mt-5 w-full">
      <Tabs defaultValue="following" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger
            value="following"
            className="w-1/2 flex items-center gap-2"
          >
            <span className="text-accent1/50 font-bold text-[12px]">
              {userFollowing?.following.length}
            </span>
            <p>following</p>
          </TabsTrigger>
          <Link
            href={`/profile/${params.username}/followers`}
            className="w-1/2"
          >
            <TabsTrigger value="#" className="w-full flex items-center gap-2">
              <span className="text-accent1/50 font-bold text-[12px]">
                {userFollowing?.followers.length}
              </span>
              followers
            </TabsTrigger>
          </Link>
        </TabsList>
        <TabsContent value="following" className="w-full">
          <div className="w-full bg-accent2 rounded-xl mt-5 px-2 flex flex-col gap-5">
            {userFollowing?.following.map((user) => (
              <div
                key={user.username}
                className="p-5 flex items-center justify-between"
              >
                <Link href={`/profile/${user.username}`}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={user.image ?? "/assets/profile-pic.png"}
                      alt={user.username}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <h1 className="text-body text-accent1">{user.name}</h1>
                      <h1 className="text-paragraph font-bold text-accent1/50">
                        @{user.username}
                      </h1>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center gap-1">
                  {user.username !== loggedInUser?.username && (
                    <Button
                      variant={"outline"}
                      size={"default"}
                      className="text-accent1"
                    >
                      {user?.followers.includes(loggedInUser?.username ?? "")
                        ? "Following"
                        : "Follow"}
                    </Button>
                  )}
                  <Button
                    variant={"icon"}
                    size={"icon"}
                    className="text-accent1 hover:text-primary"
                  >
                    <MoreVertical size={24} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
