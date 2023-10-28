"use client";

import { DetailedUser } from "@/utils/types/user.types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserCard from "../../cards/UserCard";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

interface UserFollowingsProps {
  following?: DetailedUser[];
  followers?: DetailedUser[];
}

export default function UserFollowings ({ followers, following }: UserFollowingsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const tab = pathname.split("/")[3];

  const handleRouting = (value: string) => {
    let path: string = "/";
    if (value === "followers") {
      path = pathname.replace("/following", "/followers");
    } else if (value === "following") {
      path = pathname.replace("/followers", "/following");
    }
    router.replace(path);
  };

  return (
    <>
      <Tabs
        defaultValue={tab}
        className="w-full"
        onValueChange={(value) => handleRouting(value)}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="following" className="w-full">
            Following
          </TabsTrigger>
          <TabsTrigger value="followers" className="w-full">
            Followers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="following">
          {following && (
            <>
              {following.length > 0 ? (
                <>
                  {following.map((user) => (
                    <UserCard key={user._id} user={user} />
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-10 min-h-screen w-full">
                  <Image src="/logo.png" alt="logo" width={128} height={128} />
                  <h3 className="text-heading3-bold uppercase">
                    {"Looks like you haven't followed anyone yet"}
                  </h3>
                  <button className="btn">Find People to Follow</button>
                </div>
              )}
            </>
          )}
        </TabsContent>
        <TabsContent value="followers">
          {followers && (
            <>
              {followers.length > 0 ? (
                <>
                  {followers.map((user) => (
                    <UserCard key={user._id} user={user} />
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-10 h-full">
                  <Image src="/logo.png" alt="logo" width={200} height={200} />
                  <h3 className="text-heading3-bold uppercase">
                    {"Looks like you don't have any followers yet"}
                  </h3>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};
