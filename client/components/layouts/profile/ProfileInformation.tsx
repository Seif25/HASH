// *TYPES
import { DetailedUser } from "@/utils/types/user.types";

// *NEXT/COMPONENTS
import Image from "next/image";
import Link from "next/link";

// *ICONS
import LinkIcon from "@mui/icons-material/Link";
import VerifiedIcon from "@mui/icons-material/Verified";
import CalendarMonth from "@mui/icons-material/CalendarMonth";

// *UTILS
import moment from "moment";

interface ProfileInformationProps {
  user: DetailedUser;
}

export default function ProfileInformation({ user }: ProfileInformationProps) {
  return (
    <>
      {/* BANNER */}
      {user?.banner ? (
        <section
          className="lg:rounded-lg p-10"
          style={{
            backgroundImage: `url(${
              user.banner ||
              `https://placehold.co/800x300/13161a/1991fe?text=${user.username};&font=Lato`
            })`,
            backgroundSize: "cover",
            width: "100%",
            height: "300px",
          }}
        ></section>
      ) : (
        <section
          className="lg:rounded-lg p-5 bg-accent2 flex items-start justify-end"
          style={{
            backgroundSize: "cover",
            width: "100%",
            height: "150px",
          }}
        ></section>
      )}

      {/* PROFILE PICTURE + EDIT PROFILE */}
      <div className="flex justify-between">
        <Image
          src={user.image ? user.image : "/assets/profile-pic.png"}
          alt="banner"
          width={128}
          height={128}
          className="rounded-full bg-contain z-10 -mt-[15%] md:-mt-[10%] lg:-mt-[8%] ml-[5%]"
          priority
          placeholder="blur"
          blurDataURL="/assets/profile-pic.png"
        />
        <Link href={"/onboarding"} className="pt-2 px-5">
          <button className="bg-gradient-to-b from-[#1991fe] via-[#1183e8] to-[#0671cb] rounded-full text-white p-2">
            Edit Profile
          </button>
        </Link>
      </div>

      {/* USER INFORMATION */}
      <div className="flex flex-col p-5">
        <h3 className="text-[16px] font-bold text-white flex items-center gap-1">
          {user.name}
          {user.verified && (
            <span className="flex items-center justify-center">
              <VerifiedIcon className="text-amber-400" fontSize="small" />
            </span>
          )}
        </h3>
        <h3 className="text-[16px] font-light text-light-3">{`@${user.username}`}</h3>
        <h3 className="text-[16px] font-light text-white pt-2">{user.bio}</h3>
        <div className="flex items-center gap-5 pt-2">
          {user.website && (
            <Link
              href={user.website}
              className="text-primary hover:font-bold text-[14px] flex items-center gap-1 hover:underline"
            >
              <LinkIcon fontSize="small" className="text-primary" />
              {user.website}
            </Link>
          )}
          <h3 className="text-white text-[14px] flex items-center gap-1">
            <CalendarMonth fontSize="small" className="text-white" />
            Joined {moment(user.joinedAt).format("MMMM YYYY")}
          </h3>
        </div>
        <div className="flex items-start gap-5 pt-2">
          <Link
            href={`/profile/${user.username}/following`}
            className="hover:underline hover:text-primary"
          >
            <div className="flex items-center gap-1">
              <h3 className="text-white text-[14px] font-bold">
                {user.following?.length ?? 0}
              </h3>
              <h3 className="text-light-3 text-[14px]">Following</h3>
            </div>
          </Link>
          <Link
            href={`/profile/${user.username}/followers`}
            className="hover:underline hover:text-primary"
          >
            <div className="flex items-center gap-1">
              <h3 className="text-white text-[14px] font-bold">
                {user.followers?.length ?? 0}
              </h3>
              <h3 className="text-light-3 text-[14px]">Followers</h3>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
