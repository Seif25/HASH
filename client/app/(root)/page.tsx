import Image from "next/image";
import CreateHash from "./create-hash/page";
import { fetchHashes } from "@/lib/actions/hash.actions";
import { currentUser } from "@clerk/nextjs";
import HashCard from "@/components/cards/HashCard";

export default async function Home() {
  const userHashes = await fetchHashes(1, 30);
  const user = await currentUser()
  return (
    <main className="flex flex-col flex-1 justify-start gap-10">
      {/* Create Hash */}
      <section className="w-full h-auto hidden lg:block">
        <CreateHash />
      </section>
      {/* Hashes */}
      <section className="m-10 flex flex-col gap-10">
        {
          userHashes.hashes.map((hash) => (
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
            />
          ))
        }
      </section>
      {/* <pre>
        <code>
          {
            JSON.stringify(
              userHashes.hashes[1].media,
              null,
              2
            )
          }
        </code>
      </pre> */}
    </main>
  );
}
