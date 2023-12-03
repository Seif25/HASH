"use client";

import HashCard from "./HashCard";
import { fetchHashes } from "@/lib/actions/hash.actions";
import { useQuery } from "@tanstack/react-query";
import HashSkeleton from "./HashSkeleton";

interface HomeProps {
  loggedInUser: string;
}

export default async function Home({ loggedInUser }: HomeProps) {
  const {
    data: result,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["hashes"],
    queryFn: () => fetchHashes(1, 10),
    refetchInterval: 300000,
  });

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.log("Notification permission denied.");
    }
  });

  if (error) throw new Error(error.message);
  if (isLoading) return <HashSkeleton />;
  if (result) {
    return (
      <>
        {result.hashes.length > 0 && (
          <div className="flex flex-col gap-5 h-full w-full">
            {result.hashes?.map((hash) => (
              <HashCard
                key={hash._id}
                hash={hash}
                loggedInUser={loggedInUser}
              />
            ))}
          </div>
        )}
      </>
    );
  }
}
