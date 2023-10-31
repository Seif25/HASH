import HashAuthor from "@/app/components/home/HashAuthor";
import HashCard from "@/app/components/home/HashCard";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { fetchHashByIdAction } from "@/lib/actions/hash/hash.actions";
import { HashType } from "@/lib/types/hash.types";
import { SendHorizonal } from "lucide-react";

export default async function ({ params }: { params: { hashId: string } }) {
  const { hashId } = params;
  const hash = (await fetchHashByIdAction(hashId)) as HashType;
  return (
    <div className="mt-5 bg-accent2 rounded-2xl mb-5 pb-5">
      <div className="flex flex-col gap-5">
        {/* Hash Card */}
        <HashCard hash={hash} loggedInUser="seif25" />
        <div className="flex items-center justify-between bg-dark rounded-2xl p-2 px-5 mx-10">
          <input
            type="text"
            className="ring-0 outline-none border-none bg-transparent px-3 w-full"
            placeholder="Write a comment"
          />
          <button>
            <SendHorizonal size={"16px"} className="text-primary" />
          </button>
        </div>
        {hash.children.length > 0 && (
          <div className="flex flex-col gap-5 border-l border-accent1/10 px-3 mx-10">
            {hash.children.map((comment) => (
              <HashCard
                hash={comment}
                loggedInUser="seif25"
                key={comment._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
