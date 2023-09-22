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
  const mediaHashes: Hash[] | undefined = posts?.filter(
    (hash: Hash) => hash.media.length > 0
  );
  return (
    <div className="lg:p-5">
      <Tabs defaultValue="Posts" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="Posts" className="w-full text-[12px] lg:text=[14px]">
            Posts
          </TabsTrigger>
          <TabsTrigger value="Replies" className="w-full text-[12px] lg:text=[14px]">
            Replies
          </TabsTrigger>
          <TabsTrigger value="Highlights" className="w-full text-[12px] lg:text=[14px]">
            Highlights
          </TabsTrigger>
          <TabsTrigger value="Media" className="w-full text-[12px] lg:text=[14px]">
            Media
          </TabsTrigger>
          <TabsTrigger value="Likes" className="w-full text-[12px] lg:text=[14px]">
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
            <h3 className="text-[12px]">{"You Haven't Highlighted Any Post On Your Profile Yet!"}</h3>
          </div>
        </TabsContent>
        <TabsContent value="Media">
          {mediaHashes && (
            <div className="flex flex-col gap-5 items-center justify-center p-5">
              {mediaHashes.map((hash: Hash) => (
                <HashCard
                  key={hash._id}
                  hash={hash}
                  currentUser={currentUser}
                />
              ))}
            </div>
          )}
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
