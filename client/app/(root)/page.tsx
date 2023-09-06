import Image from "next/image";
import CreateHash from "./create-hash/page";
import { fetchHashes } from "@/lib/actions/hash.actions";
import { currentUser } from "@clerk/nextjs";
import HashCard from "@/components/cards/HashCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Home() {
  const userHashes = await fetchHashes(1, 30);
  const user = await currentUser();
  return (
    <main className="flex flex-col flex-1 justify-start gap-10 w-full p-5 lg:p-0">
      {/* Tabs */}
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
            <section className="w-full h-auto hidden lg:block border-b border-light-3">
              <CreateHash />
            </section>
            {/* Hashes */}
            <section className="lg:px-10 flex flex-col gap-0 w-full">
              {userHashes.hashes.map((hash) => (
                <HashCard
                  key={hash._id}
                  id={hash._id}
                  currentUserId={user?.id}
                  parentId={hash.parentId}
                  content={hash.text}
                  author={hash.author}
                  createdAt={hash.createdAt}
                  community={hash.community}
                  comments={hash.children}
                  media={hash.media}
                  verified={hash.author.verified}
                />
              ))}
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

      {/* <pre>
        <code>
          {
            JSON.stringify(
              userHashes.hashes[1].author,
              null,
              2
            )
          }
        </code>
      </pre> */}
    </main>
  );
}
