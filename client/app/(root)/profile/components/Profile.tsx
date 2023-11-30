"use client";
import { HashType } from "@/app/lib/types/hash.types";
import { FetchUserReplies, UserType } from "@/app/lib/types/user.types";
import { useInView } from "react-intersection-observer";
import ProfileInformation from "./ProfileInformation";
import HashCard from "@/app/components/home/HashCard";
import { MoreVertical, Pin, Sparkles, UserPlus2 } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface ProfileProps {
  loggedInUser: string;
  user: UserType;
  replies: FetchUserReplies[];
  userHashes: HashType[];
  highlights: HashType[];
  mediaHashes: HashType[];
  likedHashes: HashType[];
}

export default function Profile({
  loggedInUser,
  user,
  replies,
  userHashes,
  highlights,
  mediaHashes,
  likedHashes,
}: ProfileProps) {
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const startRef = useRef<HTMLDivElement>(null);

  const [tabValue, setTabValue] = useState("posts");

  function changeTabs(value: string) {
    setTabValue(value);
    startRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }
  return (
    <div className="bg-accent2/50 rounded-2xl w-full h-full mt-5 mb-10 lg:mb-5 px-5 lg:px-0">
      <div ref={ref}>
        <ProfileInformation
          username={user.username}
          name={user.name}
          image={user.image}
          banner={user.banner}
          verified={user.verified}
          bio={user.bio}
          joinedAt={user.joinedAt}
          website={user.website}
          following={user.following.length}
          followers={user.followers.length}
        />
      </div>
      {!inView && (
        <div
          className="sticky top-0 flex items-center justify-between h-20 w-full p-5 rounded-t-2xl z-[100]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
              user.banner || `/assets/default-banner.png`
            })`,
            backgroundSize: "cover",
            width: "100%",
            height: "80px",
          }}
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-heading font-bold">{user?.name}</h1>
            <h3 className="font-bold text-[14px] text-accent1/50 capitalize">
              {tabValue === "posts"
                ? `${userHashes.length} posts`
                : tabValue === "replies"
                ? `${replies.length} replies`
                : tabValue === "highlights"
                ? `${highlights.length} highlighted hashes`
                : tabValue === "media"
                ? `${mediaHashes.length} photos & videos`
                : tabValue === "likes"
                ? `${likedHashes.length} likes`
                : ""}
            </h3>
          </div>
          {loggedInUser !== user.username &&
          !user.followers.includes(loggedInUser) ? (
            <button className="bg-accent1 text-dark hover:bg-primary hover:text-accent1 text-[14px] flex items-center justify-center gap-1 rounded-full py-2 px-5 hover:scale-105 transition-all w-auto">
              Follow
            </button>
          ) : (
            <MoreVertical size={16} className="text-accent1" />
          )}
        </div>
      )}
      <Tabs value={tabValue} className="w-full" onValueChange={changeTabs}>
        <div
          className={`sticky z-[100] top-20 h-20 flex items-center rounded-b-2xl ${
            !inView ? "bg-accent2 pt-5" : "bg-transparent pt-0"
          }`}
        >
          <TabsList
            className={`w-full lg:w-[90%] flex items-center justify-center lg:ml-10 mb-5 ${
              !inView ? "bg-accent1/5" : "bg-accent2"
            }`}
          >
            <TabsTrigger className="w-full" value="posts">
              Posts
            </TabsTrigger>
            <TabsTrigger className="w-full" value="replies">
              Replies
            </TabsTrigger>
            <TabsTrigger className="w-full" value="highlights">
              Highlights
            </TabsTrigger>
            <TabsTrigger className="w-full" value="media">
              Media
            </TabsTrigger>
            <TabsTrigger className="w-full" value="likes">
              Likes
            </TabsTrigger>
          </TabsList>
        </div>
        <div ref={startRef}></div>
        <TabsContent value="posts" className="lg:px-10 flex flex-col gap-5">
          {userHashes.map((hash) => (
            <div
              className="flex flex-col gap-1 bg-accent2 rounded-2xl"
              key={hash._id.toString()}
            >
              {hash.pinned && loggedInUser === hash.author.username && (
                <h3 className="gradient bg-clip-text text-transparent text-paragraph font-bold flex items-center gap-1 px-5 pt-5">
                  <Pin size={16} className="text-accent3" /> Pinned
                </h3>
              )}
              <HashCard loggedInUser={loggedInUser} hash={hash} />
            </div>
          ))}
        </TabsContent>
        <TabsContent value="replies" className="lg:px-10 flex flex-col gap-5">
          {replies.map((reply) => (
            <div
              className="bg-accent2 rounded-2xl pb-5"
              key={reply._id.toString()}
            >
              <div className="flex flex-col gap-5">
                <HashCard hash={reply.parentId} loggedInUser={loggedInUser} />
                <div className="flex flex-col gap-5 border-l border-accent1/10 px-3 lg:mx-10 mx-5">
                  <HashCard hash={reply as any} loggedInUser={loggedInUser} />
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent
          value="highlights"
          className="lg:px-10 flex flex-col gap-5"
        >
          {highlights.map((hash) => (
            <div
              className="flex flex-col gap-1 bg-accent2 rounded-2xl"
              key={hash._id.toString()}
            >
              <h3 className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-paragraph font-bold flex items-center gap-1 px-5 pt-5">
                <Sparkles size={16} className="text-pink-500" /> Highlighted
              </h3>
              <HashCard loggedInUser={loggedInUser} hash={hash} />
            </div>
          ))}
        </TabsContent>
        <TabsContent value="media" className="lg:px-10 flex flex-col gap-5">
          {mediaHashes?.map((hash) => (
            <HashCard
              key={hash._id.toString()}
              hash={hash}
              loggedInUser={loggedInUser}
            />
          ))}
        </TabsContent>
        <TabsContent value="likes" className="lg:px-10 flex flex-col gap-5">
          {likedHashes?.map((hash) => (
            <HashCard
              key={hash._id.toString()}
              hash={hash}
              loggedInUser={loggedInUser}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
