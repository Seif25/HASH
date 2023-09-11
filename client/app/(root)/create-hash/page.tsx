import { Metadata, NextPage } from "next";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/user.actions";
import CreateNewHash from "@/components/forms/CreateHash";

export const metadata: Metadata = {
    title: 'Create Hash / Hash',
    description: 'Create a new hash',
  }

const CreateHash: NextPage = async () => {
    const user = await currentUser();

    if (!user) {
        redirect('/sign-in');
    }

    const userInfo = await getUser({clerkId: user.id});

    if (!userInfo?.onBoarded) redirect('/onboarding');

    return (
        <>
            <CreateNewHash userId={userInfo._id.toString()} image={userInfo.image}/>
        </>
    )
}

export default CreateHash;