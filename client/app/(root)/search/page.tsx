import Search from "@/components/shared/Search";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Search / Hash",
};

export default async function SearchPage() {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated.");

  const userInfo = await fetchUser(user?.username ?? "");
  if (!userInfo?.onBoarded) redirect("/onboarding");

  //   Fetch All Users
//   const handleSearch = async (searchString: string) => {
//     return await fetchUsers({
//       currentUser: userInfo.username,
//       searchString: searchString,
//       pageNumber: 1,
//       pageSize: 10,
//       sortBy: "asc",
//     });
//   };

  return (
    <section className="search-box">
      <Search currentUser={userInfo.username} />
    </section>
  );
}
