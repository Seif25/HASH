import { Metadata, NextPage } from "next";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserInformation } from "@/lib/actions/user.actions";
import CreateNewHash from "@/components/forms/CreateHash";

export const metadata: Metadata = {
  title: "Create Hash / Hash",
  description: "Create a new hash",
};

const CreateHash: NextPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userInfo = await getUserInformation(user.username ?? "");

  if (!userInfo?.onBoarded) redirect("/onboarding");

  return (
    <div className="px-5 py-10 lg:p-0">
      <CreateNewHash
        username={userInfo.username ?? ""}
        image={userInfo.image}
      />
    </div>
  );
};

export default CreateHash;
