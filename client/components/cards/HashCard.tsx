import { checkReposted } from "@/utils/functions/hash.functions";
import { Hash } from "@/utils/types/hash.types";
import RepostedLabel from "../shared/RepostedLabel";
// import AuthorInformation from "../shared/AuthorInformation";
import dynamic from "next/dynamic";

const AuthorInformation = dynamic(() => import("../shared/AuthorInformation"), {
  ssr: false, // This ensures the component is only rendered on the client-side
});
const HashInformation = dynamic(() => import("../shared/HashInformation"), {
  ssr: false, // This ensures the component is only rendered on the client-side
});

interface HashCardProps {
  hash: Hash;
  currentUser: string;
}

export default function HashCard({ hash, currentUser }: HashCardProps) {
  const reposted = checkReposted({
    username: currentUser,
    reposts: hash.reposts,
  });
  return (
    <article className="w-full">
      <div className="hash-card">
        {/* CHECK IF USER REPOSTED THIS HASH */}
        {reposted && (
          <RepostedLabel
            label={
              currentUser === hash.author.username
                ? "You Reposted"
                : `${currentUser} Reposted`
            }
          />
        )}

        {/* AUTHOR INFORMATION */}
        <AuthorInformation
          author={hash.author}
          createdAt={hash.createdAt}
          currentUser={currentUser}
          hashId={hash._id.toString()}
        />

        {/* HASH INFORMATION */}
        <div>
          <HashInformation
            hash={hash}
            currentUser={currentUser}
            profilePicture={hash.author.image}
            reposted={reposted}
          />
        </div>
      </div>
    </article>
  );
}
