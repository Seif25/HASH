import { Suspense } from "react";
import Home from "../components/home/Home";
import HashSkeleton from "../components/home/HashSkeleton";
import Post from "../components/home/Post";
import { fetchHashes } from "@/lib/actions/hash.actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const revalidate = 0;

export default async function Hash() {
  // Fetch Recommended Hashes for User
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["hashes"],
    queryFn: () => fetchHashes(1, 10),
  });

  const loggedInUser = {
    name: "Seif Ahmed Fouad",
    username: "seif25",
    verified: true,
    image: "/assets/ts.jpg",
  };

  return (
    <section className="flex flex-col gap-5 overflow-y-hidden">
      <Post
        loggedInUser={loggedInUser.username}
        profilePic={loggedInUser.image}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Home loggedInUser={loggedInUser.username} />
      </HydrationBoundary>
    </section>
  );
}
