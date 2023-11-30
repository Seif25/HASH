import { SummarizedUserType } from "@/app/lib/types/user.types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MailPlus } from "lucide-react";
import NewConversationCard from "./NewConversationCard";
import { currentUser } from "@clerk/nextjs";

interface NewConversationWindowProps {
  following: SummarizedUserType[];
  loggedInUser: string;
}

export default async function NewConversationWindow({
  following,
  loggedInUser,
}: NewConversationWindowProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <Dialog>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <button className="rounded-full w-[48px] h-[48px] bg-primary flex items-center justify-center group hover:scale-110">
                <MailPlus
                  className="text-accent1 group-hover:text-dark"
                  size={"24px"}
                />
              </button>
            </TooltipTrigger>
          </DialogTrigger>
          <DialogContent className="max-h-96 overflow-y-scroll custom-scrollbar">
            <DialogHeader>
              <DialogTitle>Start A New Conversation</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-10">
              {following.map((user) => (
                <NewConversationCard
                  user={user}
                  key={user.username}
                  loggedInUser={loggedInUser}
                />
              ))}
            </div>
          </DialogContent>
        </Dialog>
        <TooltipContent>
          <p>Start a Conversation</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
