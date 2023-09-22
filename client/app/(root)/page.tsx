import Image from "next/image";
import CreateHash from "./create-hash/page";
import { fetchHashes } from "@/lib/actions/hash.actions";
import { currentUser } from "@clerk/nextjs";
import HashCard from "@/components/cards/HashCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInformation } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { Hash } from "@/utils/types/hash.types";
import HashCardSkeleton from "@/components/skeletons/HashCardSkeleton";
import ForYou from "@/components/layouts/foryou";

export const metadata: Metadata = {
  title: "Home / Hash",
  description: "Home page for Hash",
};

export default async function Home() {
  const userHashes = await fetchHashes(1, 20);

  const user = await currentUser();

  return (
    <main className="flex flex-col flex-1 justify-start gap-10 w-full lg:p-0">
      {/* Tabs */}
      {user && (
        <section>
          <Tabs defaultValue="For-you" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="For-you" className="w-full">
                For you
              </TabsTrigger>
              <TabsTrigger value="Following" className="w-full">
                Following
              </TabsTrigger>
            </TabsList>
            <TabsContent value="For-you">
              {/* Create Hash */}
              <section className="w-full h-auto hidden lg:block">
                <CreateHash />
              </section>
              {/* Hashes */}
              <section className="flex flex-col gap-5 w-full">
                {userHashes ? (
                  <>
                    <ForYou
                      hashes={userHashes.hashes}
                      currentUser={user.username ?? ""}
                    />
                    {/* {userHashes.hashes.map((hash: Hash) => (
                      <HashCard
                        key={hash._id}
                        id={hash._id}
                        _id={hash._id}
                        currentUserId={dbUser?._id.toString() ?? ""}
                        parentId={hash.parentId}
                        content={hash.text}
                        author={hash.author}
                        createdAt={hash.createdAt}
                        community={hash.community}
                        comments={hash.children}
                        media={hash.media}
                        likes={hash.likes}
                        reposts={hash.reposts}
                        views={hash.views}
                        following={dbUser?.following ?? []}
                      />
                    ))} */}
                  </>
                ) : (
                  <>
                    {Array.from(Array(10).keys()).map((i) => (
                      <HashCardSkeleton key={`skeleton-${i}`} />
                    ))}
                  </>
                )}
              </section>
            </TabsContent>
            <TabsContent value="Following">
              {/* Create Hash */}
              <section className="w-full h-auto hidden lg:block border-b border-light-3">
                <CreateHash />
              </section>
            </TabsContent>
          </Tabs>
        </section>
      )}
    </main>
  );
}
