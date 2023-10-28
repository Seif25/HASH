import { User } from "@/utils/types/user.types";
import Verified from "@mui/icons-material/Verified";
import Image from "next/image";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";

export default function AccountResultCard({
  user,
  currentUser,
}: {
  user: User;
  currentUser: string;
}) {
  const isFollowing = user.followers?.includes(currentUser);
  const FollowsBack = user.following?.includes(currentUser);
  return (
    <div className="flex flex-col items-start gap-1 p-5 bg-accent2 rounded-2xl w-full">
      <Link href={`/profile/${user.username}`}>
        <div className="flex items-center gap-3">
          <Image
            src={user.image || "/assets/profile-pic.png"}
            alt="profile picture"
            width={36}
            height={36}
            className="rounded-full"
            priority
            placeholder="blur"
            blurDataURL="/assets/profile-pic.png"
          />
          <div className="flex flex-col items-start justify-start gap-0">
            <h3 className="font-bold text-white text-[14px] flex items-center gap-1 text-ellipsis">
              {user.name}
              {user.verified && (
                <Verified className="text-amber-500" fontSize="small" />
              )}
            </h3>
            <h3 className="font-light text-light-3 text-[14px] text-ellipsis">
              @{user.username}
            </h3>
            {isFollowing ? (
              <h3 className="font-light text-light-3 text-[14px] flex items-center justify-start">
                <PersonIcon className="text-light-3" style={{ fontSize: 14 }} />
                {!FollowsBack ? "Following" : "You Follow Each Other"}
              </h3>
            ) : FollowsBack ? (
              <h3 className="font-light text-light-3 text-[14px] flex items-center justify-start">
                <PersonIcon className="text-light-3" style={{ fontSize: 14 }} />
                Follows You
              </h3>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
