"use client";

import { useEffect, useState } from "react";
import AccountResultCard from "../cards/AccountResultCard";
import { User } from "@/utils/types/user.types";
import { fetchUsers } from "@/lib/actions/user.actions";
import { SearchIcon } from "lucide-react";

interface SearchProps {
  currentUser: string;
}

export default function Search({ currentUser }: SearchProps) {
  const [results, setResults] = useState<User[] | null>([]);
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    fetchUsers({
      currentUser: currentUser,
      searchString: searchString,
      pageNumber: 1,
      pageSize: 10,
      sortBy: "asc",
    })
      .then((res) => {
        if (res) setResults(res.users);
        else setResults(null);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [searchString]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };
  return (
    <div className="absolute top-0 right-0 m-10 flex flex-1 flex-col justify-start w-[19.5%] gap-2">
      <div className="w-full flex items-center justify-between bg-accent2 rounded-xl px-2">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for people, lists, or keywords"
          className="rounded-full bg-transparent border-none outline-none ring-0 focus:outline-none focus:border-none focus:ring-0 p-2 placeholder:text-[14px]"
          onChange={handleChange}
          autoComplete="off"
        />
        <SearchIcon color="#fff" />
      </div>
      <div className={`relative top-0 z-40 ${searchString.length > 0 ? "visible" : "hidden"}`} id="navbar-search-results">
        {results?.length === 0 && (
          <div className="bg-accent2 rounded-2xl w-full flex flex-col gap-2 p-5">
            {"No Results Found"}
          </div>
        )}
        {results && results.length > 0 && (
          <div className="bg-accent2 rounded-2xl w-full flex flex-col gap-2">
            {results?.map((result, index) => (
              <AccountResultCard
                key={index}
                user={result}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
