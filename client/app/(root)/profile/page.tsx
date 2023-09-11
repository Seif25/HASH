import {
  getUseProfile,
  getUser,
  getUserById,
} from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";

import LinkIcon from "@mui/icons-material/Link";
import VerifiedIcon from "@mui/icons-material/Verified";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import moment from "moment";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MongoUser } from "@/utils/types/user";
import { Hash } from "@/utils/types/hash";
import HashCard from "@/components/cards/HashCard";

export async function generateMetadata(): Promise<Metadata> {
  // read route params
  const clerkUser = await currentUser();

  // fetch data
  const user = await getUser({ clerkId: clerkUser?.id ?? "" });

  return {
    title: `${user?.name} (@${user?.username}) / Hash`,
  };
}

async function Profile() {
  const clerkUser = await currentUser();
  const user: any = await getUseProfile(clerkUser?.id ?? "");
  const author: MongoUser = await getUserById(user._id);
  return (
    <div className="bg-accent2 bg-opacity-50 lg:rounded-lg">
      {user && (
        <>
          {user.bannerUrl ? (
            <section
              className="lg:rounded-lg p-10"
              style={{
                backgroundImage: `url(${
                  user.bannerUrl ||
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
            >
              <button className="bg-gradient-to-b from-[#1991fe] via-[#1183e8] to-[#0671cb] rounded-full text-white p-2">
                Add Banner
              </button>
            </section>
          )}
          <div className="flex justify-between">
            <Image
              src={user.image ? user.image : "/assets/profile-pic.png"}
              alt="banner"
              width={128}
              height={128}
              className="rounded-full bg-contain z-10 -mt-[15%] md:-mt-[10%] lg:-mt-[8%] ml-[5%]"
            />
            <Link href={"/onboarding"} className="pt-2 px-5">
              <button className="bg-gradient-to-b from-[#1991fe] via-[#1183e8] to-[#0671cb] rounded-full text-white p-2">
                Edit Profile
              </button>
            </Link>
          </div>
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
            <h3 className="text-[16px] font-light text-white pt-2">
              {user.bio}
            </h3>
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
              <div className="flex items-center gap-1">
                <h3 className="text-white text-[14px] font-bold">
                  {user.following?.length}
                </h3>
                <h3 className="text-light-3 text-[14px]">Following</h3>
              </div>
              <div className="flex items-center gap-1">
                <h3 className="text-white text-[14px] font-bold">
                  {user.followers?.length}
                </h3>
                <h3 className="text-light-3 text-[14px]">Followers</h3>
              </div>
            </div>
          </div>
          <div className="lg:p-5">
            <Tabs defaultValue="Posts" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="Posts" className="w-full">
                  Posts
                </TabsTrigger>
                <TabsTrigger value="Replies" className="w-full">
                  Replies
                </TabsTrigger>
                <TabsTrigger value="Highlights" className="w-full">
                  Highlights
                </TabsTrigger>
                <TabsTrigger value="Media" className="w-full">
                  Media
                </TabsTrigger>
                <TabsTrigger value="Likes" className="w-full">
                  Likes
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Posts">
                <div className="flex flex-col gap-5 items-center justify-center p-5">
                  {user.hashes.map((hash: Hash) => (
                    <HashCard
                      key={hash._id}
                      author={author}
                      _id={hash._id}
                      comments={hash.children}
                      community={hash.community}
                      content={hash.text}
                      createdAt={hash.createdAt}
                      likes={hash.likes}
                      currentUserId={user._id.toString()}
                      id={hash._id}
                      media={hash.media}
                      reposts={hash.reposts}
                      views={hash.views}
                      parentId={null}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="Replies">
                <div className="flex flex-col gap-5 items-center justify-center p-5">
                  <h3>Replies</h3>
                </div>
              </TabsContent>
              <TabsContent value="Highlights">
                <div className="flex flex-col gap-5 items-center justify-center p-5">
                  <h3>Highlights</h3>
                </div>
              </TabsContent>
              <TabsContent value="Media">
                <div className="flex flex-col gap-5 items-center justify-center p-5">
                  <h3>Media</h3>
                </div>
              </TabsContent>
              <TabsContent value="Likes">
                <div className="flex flex-col gap-5 items-center justify-center p-5">
                  {user.likes.map((hash: Hash) => (
                    <HashCard
                      key={hash._id}
                      author={author}
                      _id={hash._id}
                      comments={hash.children}
                      community={hash.community}
                      content={hash.text}
                      createdAt={hash.createdAt}
                      likes={hash.likes}
                      currentUserId={user._id.toString()}
                      id={hash._id}
                      media={hash.media}
                      reposts={hash.reposts}
                      views={hash.views}
                      parentId={null}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
      {/* <pre>
      <code>{JSON.stringify(user, null, 2)}</code>
    </pre> */}
    </div>
  );
}

export default Profile;
