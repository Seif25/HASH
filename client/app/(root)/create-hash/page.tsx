import { NextPage } from "next";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/user.actions";
import PostHash from "@/components/forms/PostHash";

const CreateHash: NextPage = async () => {
    const user = await currentUser();

    if (!user) {
        redirect('/sign-in');
    }

    const userInfo = await getUser({clerkId: user.id});

    if (!userInfo?.onBoarded) redirect('/onboarding');

    return (
        <>
            <PostHash userId={userInfo._id}/>
        </>
    )
}

export default CreateHash;