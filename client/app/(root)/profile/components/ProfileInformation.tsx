import { BadgeCheck, CalendarDays, Link2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

interface ProfileInformationProps {
  banner: string;
  image: string;
  name: string;
  username: string;
  verified: boolean;
  bio: string;
  joinedAt: string;
  website: string;
  following: number;
  followers: number;
  ref?: any;
}

export default function ProfileInformation({
  name,
  username,
  banner,
  image,
  verified,
  bio,
  joinedAt,
  website,
  following,
  followers,
  ref,
}: ProfileInformationProps) {
  return (
    <div ref={ref}>
      {banner ? (
        <section
          className="rounded-2xl p-10"
          style={{
            backgroundImage: `url(${
              banner ||
              `https://placehold.co/800x300/13161a/1991fe?text=${username};&font=Lato`
            })`,
            backgroundSize: "cover",
            width: "100%",
            height: "300px",
          }}
        ></section>
      ) : (
        <section
          className="rounded-2xl p-5 bg-accent2 flex items-start justify-end"
          style={{
            backgroundSize: "cover",
            width: "100%",
            height: "150px",
          }}
        ></section>
      )}
      {/* PROFILE PICTURE */}
      <Image
        src={image ?? "/assets/profile-pic.png"}
        alt={username}
        width={84}
        height={84}
        className="rounded-full object-cover lg:mx-10 mx-5 -mt-10 lg:w-[128px] lg:h-[128px]"
      />
      {/* NAME / USERNAME */}
      <div className="flex flex-col gap-0 justify-center lg:mx-10 my-5">
        <div className="flex items-center gap-1">
          <h1 className="text-heading font-bold">{name}</h1>
          {verified && <BadgeCheck size={16} className="text-primary" />}
        </div>
        <h3 className="text-paragraph font-normal text-accent1/50">
          @{username}
        </h3>
        {/* BIO */}
        <h3 className="text-body my-3">{bio}</h3>
        {/* FOLLOWING / FOLLOWERS */}
        <div className="flex items-center gap-10 justify-between lg:justify-normal mb-3">
          <Link
            href={`/profile/${username}/following`}
            className="flex items-center gap-1 group"
          >
            <h3 className="text-heading font-bold">{following}</h3>
            <h3 className="text-paragraph font-normal text-accent1/50 group-hover:underline">
              Following
            </h3>
          </Link>

          <Link
            href={`/profile/${username}/followers`}
            className="flex items-center gap-1 group"
          >
            <h3 className="text-heading font-bold">{followers}</h3>
            <h3 className="text-paragraph font-normal text-accent1/50 group-hover:underline">
              Followers
            </h3>
          </Link>
        </div>
        {/* WEBSITE / JOINED AT */}
        <div className="flex lg:flex-row flex-col gap-3 lg:items-center justify-between">
          {website && (
            <Link
              href={website}
              className="flex items-center gap-1 text-primary hover:underline"
            >
              <Link2 className="text-primary" size={16} />
              <h3>{website}</h3>
            </Link>
          )}
          <div className="flex items-center gap-1">
            <CalendarDays className="text-accent1/50" size={16} />
            <h3 className="text-accent1/50 font-bold">
              Joined {moment(joinedAt).format("MMMM YYYY")}{" "}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
