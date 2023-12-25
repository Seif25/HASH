"use client";

import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface SearchProps {}

export default function Search({}: SearchProps) {
  const router = useRouter();
  const [expand, setExpand] = useState<boolean>(false);
  const [query, ChangeQuery] = useState<string>("");

  const handleCollapse = () => {
    setTimeout(() => {
      setExpand(false);
    }, 1000);
  };

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    ChangeQuery(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearchQuery();
    }
  }

  function handleSearchQuery() {
    if (query.length > 0) {
      let type: "hashtag" | "profile" | "query" = "query";
      if (query.startsWith("#")) {
        type = "hashtag";
      } else if (query.startsWith("@")) {
        type = "profile";
      }
      router.push(`/search?q=${query}&type=${type}`);
    }
  }
  return (
    <div
      className={`flex items-center w-full rounded-2xl ${
        expand
          ? "bg-accent-1 dark:bg-accent2 justify-between"
          : "bg-transparent justify-end"
      } px-2`}
    >
      <motion.div
        initial={expand ? { opacity: 0 } : { opacity: 1 }}
        animate={expand ? { opacity: 1 } : { opacity: 0 }}
        transition={expand ? { ease: "easeInOut" } : { ease: "easeOut" }}
        className="flex items-center justify-between w-full"
      >
        <input
          type="text"
          placeholder="Search"
          value={query}
          className="bg-transparent ring-0 outline-none border-none w-[80%] p-2"
          // onBlur={handleCollapse}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearchQuery} disabled={query.length === 0}>
          <SearchIcon
            size={"24px"}
            className="text-accent2 dark:text-accent1"
          />
        </button>
      </motion.div>
      <motion.div
        initial={
          expand ? { opacity: 1, width: "auto" } : { opacity: 0, width: 0 }
        }
        animate={
          expand ? { opacity: 0, width: 0 } : { opacity: 1, width: "auto" }
        }
        transition={
          !expand ? { delay: 0.2, ease: "easeIn" } : { ease: "easeOut" }
        }
        className={`flex items-center`}
      >
        <button onClick={() => setExpand(!expand)}>
          <SearchIcon
            size={"24px"}
            className="text-accent2 dark:text-accent1"
          />
        </button>
      </motion.div>
    </div>
  );
}
