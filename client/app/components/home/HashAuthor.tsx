import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HashAuthorProps {
  username: string;
  name: string;
  image: string;
  verified: boolean;
  hover: boolean;
  bio: string;
  following: number;
  followers: number;
}

export default function HashAuthor({
  username,
  name,
  image,
  verified,
  hover,
  bio,
  following,
  followers,
}: HashAuthorProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3">
      <Link
        className="flex items-center gap-2 cursor-pointer"
        href={`/profile/${username}`}
      >
        <Image
          src={image}
          alt={username}
          width={48}
          height={48}
          className="rounded-full size-10"
        />
        <div className="flex flex-col gap-0">
          <div className="flex items-center gap-1">
            <h1 className="text-accent2 dark:text-accent1 text-body">{name}</h1>
            {verified && <CheckBadgeIcon className="size-4 text-primary" />}
          </div>
          <p className="text-accent2/50 dark:text-accent1/50 text-paragraph">
            @{username}
          </p>
        </div>
      </Link>
      {hover && (
        <>
          <div className="flex items-center w-full">
            <h3 className="text-accent2 dark:text-accent1 text-body">{bio}</h3>
          </div>
          <div className="flex items-center gap-10">
            <Link
              className="group flex items-center gap-1 cursor-pointer"
              href={`/profile/${username}/following`}
            >
              <h3 className="text-accent2 dark:text-accent1 text-body">
                {following}
              </h3>
              <span className="text-accent2/50 dark:text-accent1/50 text-paragraph group-hover:underline">
                Following
              </span>
            </Link>

            <div
              className="group flex items-center gap-1 cursor-pointer"
              onClick={() => router.push(`/profile/${username}/followers`)}
            >
              <h3 className="text-accent2 dark:text-accent1 text-body">
                {followers}
              </h3>
              <span className="text-accent2/50 dark:text-accent1/50 text-paragraph group-hover:underline">
                Followers
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
