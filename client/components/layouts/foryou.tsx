import { Hash } from "@/utils/types/hash.types";
import HashCard from "../cards/HashCard";

interface ForYouProps {
  hashes: Hash[];
  currentUser: string;
}

export default function ForYou({ hashes, currentUser }: ForYouProps) {
  return (
    <section className="flex flex-col gap-5 w-full pt-5 pl-14">
      {hashes.map((hash: Hash) => (
        <HashCard key={hash._id} hash={hash} currentUser={currentUser} />
      ))}
    </section>
  );
}
