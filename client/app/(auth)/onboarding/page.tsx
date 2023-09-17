import AccountProfile from "@/components/forms/AccountProfile";
import { getUserInformation } from "@/lib/actions/user.actions";
import { User } from "@/utils/types/user.types";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Onboarding / Hash",
};

async function Profile() {
  const user = await currentUser();

  const userInfo: User | null = await getUserInformation(user?.username ?? "");

  const userData: User = {
    id: user?.id ?? "",
    _id: userInfo?._id.toString() ?? "",
    username: (userInfo?.username || user?.username) ?? "",
    name: userInfo?.name || user?.firstName + " " + user?.lastName,
    bio: userInfo?.bio || "",
    image: userInfo?.image || "",
    banner: userInfo?.banner || "",
    birthDate: userInfo?.birthDate || new Date(),
    website: userInfo?.website || "",
    location: userInfo?.location || "",
    verified: userInfo?.verified || false,
    onBoarded: userInfo?.onBoarded || false,
    joinedAt: userInfo?.joinedAt || new Date(),
  };
  return (
    <main className="mx-auto flex max-w-4xl flex-col justify-start lg:px-10 py-20 bg-dark-2 my-10 rounded-lg">
      <h1 className="text-heading1-bold px-5 lg:px-0">Profile</h1>
      <p className="mt-1 text-light-2 px-5 lg:px-0">
        Complete your profile to start using Hash
      </p>
      <section className="mt-9">
        <AccountProfile user={userData} btnTitle="Continue"/>
      </section>
    </main>
  );
}

export default Profile;
