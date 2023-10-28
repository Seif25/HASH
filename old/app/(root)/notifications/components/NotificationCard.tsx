import {
  AtSign,
  Heart,
  Info,
  Repeat2,
  ShieldAlert,
  User2,
  X,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

interface NotificationCardProps {
  user: string;
  message: string;
  type: string;
  link: string;
  read: boolean;
  createdAt: Date;
  image?: string;
  sourceName: string;
  sourceUsername: string;
}

export default function NotificationCard({
  user,
  message,
  type,
  link,
  read,
  createdAt,
  image,
  sourceName,
  sourceUsername,
}: NotificationCardProps) {
  const notificationTypes = {
    info: <Info size={"25px"} className="text-primary" />,
    like: <Heart size={"25px"} className="text-red-500" />,
    admin: <ShieldAlert size={"25px"} className="text-orange-500" />,
    mention: <AtSign size={"25px"} className="text-primary" />,
    repost: <Repeat2 size={"25px"} className="text-green-500" />,
    users: <User2 size={"25px"} className="text-primary" />,
  };
  return (
    <>
      <Link href={link}>
        <div
          className={`flex flex-col gap-5 rounded-xl ${
            read ? "bg-accent2/50" : "bg-accent2"
          } p-5 w-full`}
        >
          <div className="flex justify-between gap-2 w-full">
            <div
              className={`flex ${
                image && sourceName && sourceUsername ? "start" : "center"
              } gap-2 w-full`}
            >
              {/* Information Icon */}
              <div className="py-2">
                {notificationTypes[type as keyof typeof notificationTypes]}
              </div>
              {/* User Information & Message */}
              {image && sourceName && sourceUsername ? (
                <div className="flex flex-col items-start justify-center gap-2 w-full">
                  <Link href={`/profile/${sourceUsername}`} className="w-full">
                    <div className="flex items-center gap-1">
                      <Image
                        src={image ?? "/assets/profile-pic.png"}
                        alt={sourceUsername}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <h3 className="text-[16px] text-accent1/50 font-bold">
                        {sourceName}
                      </h3>
                    </div>
                  </Link>
                  <div className="flex items-center justify-between w-full gap-0">
                    <h3 className="text-[16px] text-accent1">{message}</h3>
                    <h3 className="text-accent1/50 text-[14px] font-bold">
                      {moment(createdAt).fromNow()}
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full py-2">
                  <h3 className="text-[16px] text-accent1">{message}</h3>
                  <h3 className="text-accent1/50 text-[14px] font-bold">
                    {moment(createdAt).fromNow()}
                  </h3>
                </div>
              )}
            </div>
            {/* Delete Notification */}
            <div className="flex items-start justify-end">
              <button>
                <X size={"16px"} className="text-accent1/50" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
