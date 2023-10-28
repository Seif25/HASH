"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface SearchProps {}

export default function Search({}: SearchProps) {
  const [expand, setExpand] = useState<boolean>(false);
  const handleCollapse = () => {
    setTimeout(() => {
      setExpand(false);
    }, 1000);
  };
  return (
    <div
      className={`flex items-center w-full rounded-2xl ${
        expand ? "bg-accent2 justify-between" : "bg-transparent justify-end"
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
          className="bg-transparent ring-0 outline-none border-none w-[80%] p-2"
          onBlur={handleCollapse}
        />
        <button>
          <SearchIcon size={"24px"} className="text-accent1" />
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
          <SearchIcon size={"24px"} className="text-accent1" />
        </button>
      </motion.div>
    </div>
  );
}
