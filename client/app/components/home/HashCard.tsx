import { HashType } from "@/lib/types/hash.types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import HashAuthor from "./HashAuthor";
import moment from "moment";
import Image from "next/image";
import HashStats from "./HashStats";
import HashText from "../shared/text/HashText";

interface HashProps {
  hash: HashType;
  loggedInUser: string;
}

export default function HashCard({ hash, loggedInUser }: HashProps) {
  const cols = ["grid-cols-1", "grid-cols-2", "grid-cols-3", "grid-cols-4"];

  return (
    <div className="bg-accent2 rounded-2xl p-5">
      {/* AUTHOR INFORMATION */}
      <div className="flex items-center justify-between">
        <HoverCard>
          <HoverCardTrigger>
            <HashAuthor
              username={hash.author.username}
              name={hash.author.name}
              image={hash.author.image}
              verified={hash.author.verified}
              hover={false}
              bio={hash.author.bio}
              following={hash.author.following.length}
              followers={hash.author.followers.length}
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <HashAuthor
              username={hash.author.username}
              name={hash.author.name}
              image={hash.author.image}
              verified={hash.author.verified}
              hover={true}
              bio={hash.author.bio}
              following={hash.author.following.length}
              followers={hash.author.followers.length}
            />
          </HoverCardContent>
        </HoverCard>

        {/* Hash Timestamp */}
        <p className="text-accent1/50 text-paragraph">
          {moment(hash.createdAt).fromNow()}
        </p>
      </div>

      {/* HASH INFORMATION */}
      <div className="flex flex-col gap-5">
        {/* Hash Text */}
        <h2 className="text-heading font-normal text-accent1 p-5">
          <HashText text={hash.text} />
        </h2>

        {/* Hash Media */}
        {hash.media.length > 0 && (
          <div
            className={`grid ${
              cols[hash.media.length - 1]
            } gap-5 p-5 items-center justify-center ${
              hash.media.length === 1 ? "max-w-sm h-auto" : "w-full h-full"
            } object-cover`}
          >
            {hash.media.map((media) => (
              <div key={media.id}>
                <Image
                  src={media.url}
                  alt={media.alt}
                  width={800}
                  height={800}
                  className="rounded-2xl w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hash Metadata */}
      <HashStats
        commentCount={hash.children.length}
        likeCount={hash.likes.length}
        repostCount={hash.reposts.length}
        viewCount={hash.views}
        loggedInUser={loggedInUser}
        hashMedia={hash.media}
        hashAuthor={hash.author}
        hashText={hash.text}
      />
    </div>
  );
}
