import HashCard from "@/app/components/home/HashCard";
import { fetchUserBookmarks } from "@/app/lib/actions/hash/hash.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Page() {
  const user = await currentUser();
  const bookmarks = await fetchUserBookmarks({
    username: user?.username ?? "",
  });
  return (
    <div className="flex flex-col p-5 gap-5">
      {bookmarks.map((bookmark) => (
        <HashCard
          hash={bookmark}
          loggedInUser={user?.username ?? ""}
          key={bookmark._id}
          page="home"
        />
      ))}
    </div>
  );
}
