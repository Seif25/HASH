import CreateHash from "./create-hash/page";
import { fetchHashes } from "@/lib/actions/hash.actions";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
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
    <main className="flex flex-col flex-1 justify-start gap-10 w-full lg:px-0 lg:pt-0 pb-10">
      {/* Tabs */}
      {user && (
        <section>
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
              </>
            ) : (
              <>
                {Array.from(Array(10).keys()).map((i) => (
                  <HashCardSkeleton key={`skeleton-${i}`} />
                ))}
              </>
            )}
          </section>
        </section>
      )}
    </main>
  );
}
