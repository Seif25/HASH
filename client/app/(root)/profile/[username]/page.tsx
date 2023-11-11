import { FetchUserReplies, UserType } from "@/app/lib/types/user.types";
import fetchUserReplies, { fetchUser } from "@/lib/actions/user.actions";
import ProfileInformation from "../components/ProfileInformation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HashCard from "@/app/components/home/HashCard";
import { currentUser } from "@clerk/nextjs";
import { HashType } from "@/app/lib/types/hash.types";
import { Pin, Sparkles } from "lucide-react";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const loggedInUser = await currentUser();
  const user: UserType | null = await fetchUser(params.username);
  const replies: FetchUserReplies[] = await fetchUserReplies(params.username);

  const userHashes = user?.hashes as HashType[];
  const highlights = userHashes.filter((hash) => hash.highlighted);

  userHashes.sort((a, b) => {
    if (a.pinned && !b.pinned) {
      return -1;
    }
    if (!a.pinned && b.pinned) {
      return 1;
    }
    return 0;
  });

  const mediaHashes = user?.hashes.filter((hash) => hash.media.length > 0);

  const likedHashes = user?.hashes.filter((hash) =>
    hash.likes.includes(user.username)
  );

  return (
    <div className="bg-accent2/50 rounded-2xl w-full h-full mt-5 mb-10 lg:mb-5 px-5 lg:px-0">
      {user && (
        <ProfileInformation
          username={user.username}
          name={user.name}
          image={user.image}
          banner={user.banner}
          verified={user.verified}
          bio={user.bio}
          joinedAt={user.joinedAt}
          website={user.website}
          following={user.following.length}
          followers={user.followers.length}
        />
      )}
      {user && (
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full lg:w-[90%] flex items-center justify-center lg:ml-10 mb-5">
            <TabsTrigger className="w-full" value="posts">
              Posts
            </TabsTrigger>
            <TabsTrigger className="w-full" value="replies">
              Replies
            </TabsTrigger>
            <TabsTrigger className="w-full" value="highlights">
              Highlights
            </TabsTrigger>
            <TabsTrigger className="w-full" value="media">
              Media
            </TabsTrigger>
            <TabsTrigger className="w-full" value="likes">
              Likes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="lg:px-10 flex flex-col gap-5">
            {userHashes.map((hash) => (
              <div
                className="flex flex-col gap-1 bg-accent2 rounded-2xl"
                key={hash._id.toString()}
              >
                {hash.pinned && (
                  <h3 className="gradient bg-clip-text text-transparent text-paragraph font-bold flex items-center gap-1 px-5 pt-5">
                    <Pin size={16} className="text-accent3" /> Pinned
                  </h3>
                )}
                <HashCard
                  loggedInUser={loggedInUser?.username ?? ""}
                  hash={hash}
                />
              </div>
            ))}
          </TabsContent>
          <TabsContent value="replies" className="lg:px-10 flex flex-col gap-5">
            {replies.map((reply) => (
              <div
                className="bg-accent2 rounded-2xl pb-5"
                key={reply._id.toString()}
              >
                <div className="flex flex-col gap-5">
                  <HashCard
                    hash={reply.parentId}
                    loggedInUser={loggedInUser?.username ?? ""}
                  />
                  <div className="flex flex-col gap-5 border-l border-accent1/10 px-3 lg:mx-10 mx-5">
                    <HashCard
                      hash={reply as any}
                      loggedInUser={loggedInUser?.username ?? ""}
                    />
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent
            value="highlights"
            className="lg:px-10 flex flex-col gap-5"
          >
            {highlights.map((hash) => (
              <div
                className="flex flex-col gap-1 bg-accent2 rounded-2xl"
                key={hash._id.toString()}
              >
                <h3 className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-paragraph font-bold flex items-center gap-1 px-5 pt-5">
                  <Sparkles size={16} className="text-pink-500" /> Highlighted
                </h3>
                <HashCard
                  loggedInUser={loggedInUser?.username ?? ""}
                  hash={hash}
                />
              </div>
            ))}
          </TabsContent>
          <TabsContent value="media" className="lg:px-10 flex flex-col gap-5">
            {mediaHashes?.map((hash) => (
              <HashCard
                key={hash._id.toString()}
                hash={hash}
                loggedInUser={loggedInUser?.username ?? ""}
              />
            ))}
          </TabsContent>
          <TabsContent value="likes" className="lg:px-10 flex flex-col gap-5">
            {likedHashes?.map((hash) => (
              <HashCard
                key={hash._id.toString()}
                hash={hash}
                loggedInUser={loggedInUser?.username ?? ""}
              />
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
