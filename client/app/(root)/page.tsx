import Home from "../components/home/Home";
import Post from "../components/home/Post";
import { fetchHashes } from "@/lib/actions/hash.actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";

export const revalidate = 0;

export default async function Hash() {
  // Fetch Recommended Hashes for User
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["hashes"],
    queryFn: () => fetchHashes(1, 20),
  });

  const user = await currentUser();
  const loggedInUser = await fetchUser(user?.username ?? "");

  return (
    <section className="flex flex-col px-5 lg:px-0 gap-5 overflow-y-hidden">
      {/* <Post
        loggedInUser={loggedInUser?.username ?? ""}
        profilePic={loggedInUser?.image ?? "/assets/profile-pic.png"}
      /> */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Home loggedInUser={loggedInUser?.username ?? ""} />
      </HydrationBoundary>
    </section>
  );
}
