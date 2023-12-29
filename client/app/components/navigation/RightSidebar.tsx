import { getRecommendedUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { getTrendingTags } from "@/lib/actions/tag.actions";
import RecommendedUserCard from "./RecommendedUserCard";

export default async function RightSidebar() {
  const loggedInUser = await currentUser();
  const recommendedUsers = await getRecommendedUsers(
    loggedInUser?.username ?? ""
  );
  const trendingTags = await getTrendingTags();
  return (
    <div className="right-sidebar custom-scrollbar">
      {recommendedUsers && (
        <>
          {recommendedUsers.length > 0 && (
            <div className="flex flex-col gap-5 bg-white dark:bg-dark p-5 rounded-lg">
              <h1 className="text-lg font-bold capitalize">who to follow</h1>
              <div className="flex flex-col gap-5">
                {recommendedUsers?.slice(0, 5).map((user) => (
                  <RecommendedUserCard
                    key={user._id.toString()}
                    user={user}
                    loggedInUser={loggedInUser?.username ?? ""}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
      <div className="flex flex-col gap-5 bg-white dark:bg-dark p-5 rounded-lg">
        <h1 className="text-lg font-bold capitalize">{"What's happening"}</h1>
        {trendingTags.map((tag) => (
          <h1 key={tag._id.toString()}>{tag.tag}</h1>
        ))}
      </div>
    </div>
  );
}
