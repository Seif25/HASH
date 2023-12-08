"use client";

import HashCard from "@/app/components/home/HashCard";
import { searchAction } from "@/app/lib/actions/search/search.actions";
import { HashType } from "@/app/lib/types/hash.types";
import { UserType } from "@/app/lib/types/user.types";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BadgeCheck,
  Filter,
  MoreVertical,
  Search,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountCard from "./AccountCard";
import Link from "next/link";
import AccountLink from "./AccountLink";

interface SearchResultsProps {
  initialQuery: string;
  initialType: "query" | "hashtag" | "profile";
  loggedUsername: string;
  loggedName: string;
  initialResults: { results: { users: UserType[]; hashes: HashType[] } };
}

export default function SearchResults({
  initialQuery,
  initialType,
  loggedUsername,
  loggedName,
  initialResults,
}: SearchResultsProps) {
  const [value, setValue] = useState("all");
  const [results, UpdateResults] =
    useState<typeof initialResults>(initialResults);
  const [query, setQuery] = useState<string>(initialQuery);
  const [type, setType] = useState<"query" | "hashtag" | "profile">(
    initialType
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    searchParams.get("q") && setQuery(searchParams.get("q") as string);
    searchParams.get("type") &&
      setType(searchParams.get("type") as "query" | "hashtag" | "profile");
  }, [searchParams]);

  useEffect(() => {
    const searchQuery = type === "hashtag" ? `#${query}` : query;
    searchAction({ query: searchQuery, type, loggedUsername, loggedName })
      .then((res) => {
        UpdateResults(res);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err.message);
      });
  }, [query, type]);
  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="grid grid-cols-12 gap-5 items-center">
        <div className="col-span-1">
          <Button variant={"icon"} size={"icon"} onClick={() => router.back()}>
            <ArrowLeft
              size={24}
              aria-label="Go back"
              className="opacity-75 text-accent1 hover:text-primary hover:opacity-100"
            />
          </Button>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-accent2 p-1 col-span-9">
          <input
            type="text"
            className="bg-accent2 w-full rounded-full ringo-0 outline-none border-none px-3 py-1 text-accent1"
            value={query}
            aria-label="Search Box"
            placeholder="Search Hash"
          />
          <Button
            size={"icon"}
            variant={"icon"}
            className="text-accent1"
            aria-label="Search Button"
          >
            <Search size={24} />
          </Button>
        </div>
        {/* Filters */}
        <div className="flex items-center gap-5 col-span-2">
          <Button variant={"icon"} size={"icon"} aria-label="Filter Button">
            <Filter
              size={24}
              className="opacity-75 text-accent1 hover:text-primary hover:opacity-100"
            />
          </Button>
          <Button
            variant={"icon"}
            size={"icon"}
            aria-label="More Options Button"
          >
            <MoreVertical
              size={24}
              className="opacity-75 text-accent1 hover:text-primary hover:opacity-100"
            />
          </Button>
        </div>
      </div>
      {/* Categories */}
      <Tabs value={value} className="w-full" onValueChange={setValue}>
        <TabsList className="w-full mb-5">
          <TabsTrigger className="w-40" value="all">
            All
          </TabsTrigger>
          <TabsTrigger className="w-40" value="hashes">
            Hashes
          </TabsTrigger>
          <TabsTrigger className="w-40" value="people">
            People
          </TabsTrigger>
          <TabsTrigger className="w-40" value="media">
            Media
          </TabsTrigger>
        </TabsList>
        <TabsContent className="flex flex-col px-5" value="all">
          {/* People */}
          <div className="flex flex-col gap-3 border-b border-accent1/10 mb-5 pb-5">
            <div className="flex items-center justify-between">
              <h1 className="text-heading text-accent1">People</h1>
              <Button
                variant={"link"}
                size={"default"}
                onClick={() => setValue("people")}
              >
                See All
              </Button>
            </div>
            {results.results.users.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {results.results.users.slice(0, 3).map((result: UserType) => (
                  <Link
                    href={`/profile/${result.username}`}
                    key={result.username}
                  >
                    <AccountCard user={result} loggedInUser={loggedUsername} />
                  </Link>
                ))}
              </div>
            )}
          </div>
          {/* Hashes */}
          <div className="flex flex-col gap-3 border-b border-accent1/10 mb-5 pb-5">
            <div className="flex items-center justify-between">
              <h1 className="text-heading text-accent1">Hashes</h1>
              <Button
                variant={"link"}
                size={"default"}
                onClick={() => setValue("hashes")}
              >
                See All
              </Button>
            </div>
            {results.results.hashes.length > 0 && (
              <div className="flex flex-col gap-5">
                {results.results.hashes.slice(0, 10).map((result: HashType) => (
                  <HashCard
                    key={result._id}
                    hash={result}
                    loggedInUser={loggedUsername}
                  />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent className="flex flex-col px-5" value="hashes">
          {results.results.hashes.length > 0 && (
            <div className="flex flex-col gap-5">
              {results.results.hashes.map((result: HashType) => (
                <HashCard
                  key={result._id}
                  hash={result}
                  loggedInUser={loggedUsername}
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent className="flex flex-col px-5 gap-5" value="people">
          {results.results.users.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {results.results.users.slice(0, 3).map((result: UserType) => (
                <Link
                  href={`/profile/${result.username}`}
                  key={result.username}
                >
                  <AccountCard user={result} loggedInUser={loggedUsername} />
                </Link>
              ))}
            </div>
          )}
          {results.results.users.length > 3 && (
            <div className="flex flex-col gap-5">
              {results.results.users.slice(3).map((result: UserType) => (
                <Link
                  href={`/profile/${result.username}`}
                  key={result.username}
                >
                  <AccountLink user={result} loggedInUser={loggedUsername} />
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent className="flex flex-col px-5" value="media">
          {results.results.hashes.length > 0 && (
            <div className="flex flex-col gap-5">
              {results.results.hashes.map((result: HashType) => (
                <>
                  {result.media.length > 0 && (
                    <HashCard
                      key={result._id}
                      hash={result}
                      loggedInUser={loggedUsername}
                    />
                  )}
                </>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
