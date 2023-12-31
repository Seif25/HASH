"use client";

import HashCard from "./HashCard";
import { fetchHashes } from "@/lib/actions/hash.actions";
import { useQuery } from "@tanstack/react-query";
import HashSkeleton from "./HashSkeleton";
import { motion } from "framer-motion";
import { fetchHashesAction } from "@/app/lib/actions/hash/hash.actions";

interface HomeProps {
  loggedInUser: string;
  following: string[];
}

const component = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export default async function Home({ loggedInUser, following }: HomeProps) {
  const {
    data: result,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["hashes"],
    queryFn: () => fetchHashesAction(loggedInUser, 1, 20),
    refetchInterval: 300000,
  });

  // Notification.requestPermission().then((permission) => {
  //   if (permission === "granted") {
  //     console.log("Notification permission granted.");
  //   } else {
  //     console.log("Notification permission denied.");
  //   }
  // });

  if (error) throw new Error(error.message);
  if (isLoading) return <HashSkeleton />;
  if (result) {
    return (
      <>
        {result.hashes.length > 0 && (
          <motion.div
            variants={component}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-5 h-full w-full mt-5"
          >
            {result.hashes?.map((hash) => (
              <HashCard
                key={hash._id}
                hash={hash}
                loggedInUser={loggedInUser}
                following={following}
              />
            ))}
          </motion.div>
        )}
      </>
    );
  }
}
