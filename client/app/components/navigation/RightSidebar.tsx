import { getRecommendedUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTrendingTags } from "@/lib/actions/tag.actions";

export default async function RightSidebar() {
  const user = await currentUser();
  const recommendedUsers = await getRecommendedUsers(user?.username ?? "");
  const trendingTags = await getTrendingTags();
  console.log(trendingTags);
  return (
    <div className="right-sidebar custom-scrollbar">
      {recommendedUsers && (
        <>
          {recommendedUsers.length > 0 && (
            <div className="flex flex-col gap-5 bg-white dark:bg-dark p-5 rounded-xl">
              <h1 className="text-lg font-bold capitalize">who to follow</h1>
              <div className="flex flex-col gap-5">
                {recommendedUsers?.slice(0, 5).map((user) => (
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex items-center gap-1">
                      <Link href={`/profile/${user.username}`}>
                        <Image
                          src={user.image ?? "/assets/profile-pic.png"}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="size-10 rounded-full"
                        />
                      </Link>
                      <div className="flex flex-col gap-0">
                        <div className="flex items-center gap-1">
                          <h1 className="font-bold">{user.name}</h1>
                          {user.verified && (
                            <CheckBadgeIcon className="size-4 text-primary" />
                          )}
                        </div>
                        <h3 className="text-accent2/80 dark:text-accent1/80">
                          @{user.username}
                        </h3>
                      </div>
                    </div>
                    <Button
                      variant={"default"}
                      size={"default"}
                      className="bg-primary lg:opacity-80 hover:opacity-100 w-14 h-7 px-2"
                    >
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      <div className="flex flex-col gap-5 bg-white dark:bg-dark p-5 rounded-xl">
        <h1 className="text-lg font-bold capitalize">{"What's happening"}</h1>
        {trendingTags.map((tag) => (
          <h1 key={tag._id.toString()}>{tag.tag}</h1>
        ))}
      </div>
    </div>
  );
}
