"use client";

import { Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Post from "../home/Post";
import { User } from "@clerk/nextjs/server";
import { UserType } from "@/app/lib/types/user.types";
import { useState } from "react";

interface FloatingButtonDialogProps {
  loggedInUser: string;
  profilePic: string;
}

export default function FloatingButtonDialog({
  loggedInUser,
  profilePic,
}: FloatingButtonDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        size={"icon"}
        variant={"icon"}
        className="bg-primary fixed bottom-24 right-5 z-20 hover:z-30 hover:scale-110 transition-all text-accent1 size-10"
        onClick={() => setOpen(true)}
      >
        <Feather />
      </Button>
      <DialogContent className="bg-white dark:bg-dark border-white dark:border-dark">
        <Post
          loggedInUser={loggedInUser}
          profilePic={profilePic}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
