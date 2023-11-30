import { Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Post from "../home/Post";
import { currentUser } from "@clerk/nextjs";
import { getUserInformation } from "@/lib/actions/user.actions";

export default async function FloatingButton() {
  const loggedInUser = await currentUser();
  const userInfo = await getUserInformation(loggedInUser?.username ?? "");
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          size={"icon"}
          variant={"icon"}
          className="bg-primary fixed bottom-20 right-5 z-20 hover:z-30 hover:scale-110 transition-all md:hidden"
        >
          <Feather />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Post
          loggedInUser={loggedInUser?.username ?? ""}
          profilePic={userInfo?.image ?? "/assets/profile-pic.png"}
        />
      </DialogContent>
    </Dialog>
  );
}
