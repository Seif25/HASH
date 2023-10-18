"use client";

import { BadgeCheck, MessageSquarePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getFollowing } from "@/lib/actions/user.actions";
import { UserSummary } from "@/utils/types/user.types";
import Image from "next/image";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase/supabase";
import { useRouter } from "next/navigation";

type FollowingType = {
  following: UserSummary[];
};

export default async function NewConversation({
  username,
}: {
  username: string;
}) {
  const router = useRouter();
  const [following, setFollowing] = useState<FollowingType>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getFollowing(username)
      .then((follow) => {
        setFollowing(follow);
      })
      .catch((err) => console.log(err));
  }, []);

  async function createNewConversation(recipient: string) {
    const info = {
      recipient,
      sender: username,
      messages: [],
    };
    const { data: exists, error: existsError } = await supabase
      .from("Chats")
      .select()
      .or(
        `sender.in.(${username},${recipient}),recipient.in.(${username},${recipient})`
      );
    if (existsError) {
      console.log(existsError)
      throw new Error(existsError.message)
    } ;
    if (exists) {
      router.push(`/messages/${exists[0].id}`);
    } else {
      const { data, error } = await supabase
        .from("Chats")
        .insert(info)
        .select();
      if (data) router.push(`/messages/${data[0].id}`);
      if (error) {
        console.log(error);
        if (error.code === "23505") {
          setOpen(false);
        }
      }
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="flex items-center justify-center hover:bg-primary/10 rounded-full p-2">
            <MessageSquarePlus size={"24px"} className="text-accent1" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-accent2">
          <DialogHeader>
            <DialogTitle>New Conversation</DialogTitle>
          </DialogHeader>
          {following && (
            <div className="flex flex-col gap-5">
              {following.following.map((recipient: UserSummary) => (
                <div
                  className="flex items-center p-5 rounded-2xl cursor-pointer"
                  onClick={() => createNewConversation(recipient.username)}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={recipient.image ?? "/assets/profile-pic.png"}
                      alt={recipient.username}
                      width={48}
                      height={48}
                      className="rounded-full bg-accent2"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-[16px] text-accent1 flex items-center gap-1">
                        {recipient.name}
                        {recipient.verified && (
                          <BadgeCheck size={"16px"} className="text-primary" />
                        )}
                      </h1>
                      <h1 className="font-bold text-[16px] text-accent1/50">
                        @{recipient.username}
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
