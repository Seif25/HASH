import HashCard from "@/app/components/home/HashCard";
import { searchAction } from "@/app/lib/actions/search/search.actions";
import { HashType } from "@/app/lib/types/hash.types";
import { UserType } from "@/app/lib/types/user.types";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs";
import { BadgeCheck, Search } from "lucide-react";
import Image from "next/image";
import SearchResults from "./components/SearchResults";
import { fetchUserAction } from "@/app/lib/actions/user/user.actions";

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

type Type = "query" | "hashtag" | "profile";

export default async function Page({ searchParams }: Props) {
  const user = await currentUser();
  const loggedInUser = await fetchUserAction(user?.username ?? "");

  const query = searchParams?.q ?? "";
  const type: Type = (searchParams?.type as Type) ?? "query";

  if (type !== "query" && type !== "hashtag" && type !== "profile")
    throw new Error("Invalid search type");

  const searchQuery = type === "hashtag" ? `#${query}` : query;
  const results = await searchAction({
    query: searchQuery,
    type,
    loggedUsername: loggedInUser.username,
    loggedName: loggedInUser.name,
  });

  return (
    <div className="mt-5 bg-accent2/50 rounded-lg p-5">
      <SearchResults
        initialQuery={query}
        initialType={type}
        loggedUsername={loggedInUser.username}
        loggedName={loggedInUser.name}
        initialResults={results}
      />
    </div>
  );
}
