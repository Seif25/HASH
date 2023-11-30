import HashCard from "@/app/components/home/HashCard";
import { searchAction } from "@/app/lib/actions/search/search.actions";
import { HashType } from "@/app/lib/types/hash.types";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs";
import { Search } from "lucide-react";

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

export default async function Page({ searchParams }: Props) {
  const user = await currentUser();

  const query = searchParams?.q ?? "";
  const type = searchParams?.type ?? "";

  const results = await searchAction({ query: `#${query}`, type });

  return (
    <div className="mt-5 bg-accent2/50 rounded-2xl p-5">
      <h1 className="text-heading font-bold mb-5">Search</h1>
      <div className="flex items-center justify-between rounded-2xl bg-accent2 p-1 mb-5">
        <input
          type="text"
          className="bg-accent2 w-full rounded-full ringo-0 outline-none border-none px-3 py-1 text-accent1"
          defaultValue={query}
          placeholder="Search Hash"
        />
        <Button size={"icon"} variant={"icon"} className="text-accent1">
          <Search size={24} />
        </Button>
      </div>
      {results &&
        (results.type === "hash" ? (
          <div className="flex flex-col gap-5">
            {results.results.map((result: HashType) => (
              <HashCard
                key={result._id}
                hash={result}
                loggedInUser={user?.username ?? ""}
              />
            ))}
          </div>
        ) : (
          <></>
        ))}
    </div>
  );
}
