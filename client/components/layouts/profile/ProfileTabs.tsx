import HashCard from "@/components/cards/HashCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hash } from "@/utils/types/hash.types";

interface ProfileTabsProps {
  posts: Hash[] | undefined;
  likes: Hash[] | undefined;
  currentUser: string;
}

export default function ProfileTabs({
  posts,
  likes,
  currentUser,
}: ProfileTabsProps) {
  const replies: Hash[] | undefined = posts?.filter(
    (hash: Hash) => hash.parentId !== null
  );
  return (
    <div className="lg:p-5">
      <Tabs defaultValue="Posts" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="Posts" className="w-full">
            Posts
          </TabsTrigger>
          <TabsTrigger value="Replies" className="w-full">
            Replies
          </TabsTrigger>
          <TabsTrigger value="Highlights" className="w-full">
            Highlights
          </TabsTrigger>
          <TabsTrigger value="Media" className="w-full">
            Media
          </TabsTrigger>
          <TabsTrigger value="Likes" className="w-full">
            Likes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Posts">
          {posts && (
            <div className="flex flex-col gap-5 items-center justify-center p-5">
              {posts.map((hash: Hash) => (
                <HashCard
                  key={hash._id}
                  hash={hash}
                  currentUser={currentUser}
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="Replies">
          <div className="flex flex-col gap-5 items-center justify-center p-5">
            {replies && (
              <>
                {replies.map((hash: Hash) => (
                  <HashCard
                    key={hash._id}
                    hash={hash}
                    currentUser={currentUser}
                  />
                ))}
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value="Highlights">
          <div className="flex flex-col gap-5 items-center justify-center p-5">
            <h3>Highlights</h3>
          </div>
        </TabsContent>
        <TabsContent value="Media">
          <div className="flex flex-col gap-5 items-center justify-center p-5">
            <h3>Media</h3>
          </div>
        </TabsContent>
        <TabsContent value="Likes">
          {likes && (
            <div className="flex flex-col gap-5 items-center justify-center p-5">
              {likes.map((hash: Hash) => (
                <HashCard
                  key={hash._id}
                  hash={hash}
                  currentUser={currentUser}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
