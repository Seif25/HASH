"use client";

import { ArrowRight, MailPlus, Plus, Search } from "lucide-react";
import Image from "next/image";
import moment from "moment";
import ConversationPreview from "../components/ConversationPreview";
import Link from "next/link";
import { useState } from "react";
import {
  ConversationType,
  ConversationsType,
} from "@/app/lib/types/conversation.types";
import { UserFollowingType, UserType } from "@/app/lib/types/user.types";
import NewConversationWindow from "./NewConversationWindow";

interface UserConversationPageProps {
  loggedInUser: UserType;
  following: UserFollowingType;
  conversations: ConversationsType[];
}

export default function UserConversationsPage({
  loggedInUser,
  following,
  conversations,
}: UserConversationPageProps) {
  const [query, setQuery] = useState<string>("");
  const [queryResults, setQueryResults] = useState<ConversationsType[]>([]);

  const MostRecent = conversations.sort((a, b) =>
    moment(b.last_update).diff(moment(a.last_update))
  );
  const LatestConversations = conversations.filter(
    (user) => user.unread_messages > 0 || !user.opened
  );
  const OpenedConversations = conversations.filter((user) => user.opened);

  // const NewConversations = following
  //   .filter(
  //     (user) =>
  //       !conversations.some(
  //         (conversation) => conversation.username === user.username
  //       )
  //   )
  //   .sort((a, b) => a.name.localeCompare(b.name));

  function handleConversationSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    const results = conversations.filter(
      (user) =>
        user.participant_1.toLowerCase().includes(q.toLowerCase()) ||
        user.participant_2.toLowerCase().includes(q.toLowerCase())
    );
    setQueryResults(results);
  }

  return (
    <section className="flex flex-col gap-5 bg-white dark:bg-dark rounded-xl lg:mt-5">
      {/* Start new Conversation & Search */}
      <section className="bg-white dark:bg-dark rounded-t-2xl h-[10vh] lg:h-[15vh] p-5 flex flex-col gap-5">
        <div className="flex items-center justify-between gap-5">
          <Image
            src={loggedInUser.image ?? "/assets/profile-pic.png"}
            alt={loggedInUser.username}
            width={48}
            height={48}
            className="rounded-full size-10 object-cover"
          />
          <div className="flex items-center justify-between px-3 py-2 bg-white dark:bg-dark rounded-xl w-[70%] lg:w-[80%]">
            <input
              type="text"
              className="bg-transparent ring-0 outline-none border-none px-3 w-full"
              placeholder="Looking for a conversation?"
              onChange={handleConversationSearch}
            />
            <Search className="size-5 text-accent2 dark:text-accent1" />
          </div>
          {/* New Conversation */}
          <NewConversationWindow
            following={following.following}
            loggedInUser={loggedInUser.username}
          />
        </div>
      </section>
      {/* Conversations */}
      {/* Most Recent Conversations */}
      <div className="lg:hidden flex flex-col px-5 gap-3 border-b border-accent2/10 dark:border-accent1/10 pb-5">
        <h3 className="text-body text-accent2/50 dark:text-accent1/50">
          Most Recent
        </h3>
        <div className="flex items-center justify-center lg:justify-start gap-5">
          {MostRecent.slice(0, 4).map((conversation, index) => (
            <div className="rounded-full" key={`recent-${index}`}>
              <Link
                href={`/messages/${conversation.id}`}
                key={`recent-${index}`}
              >
                <Image
                  src={
                    conversation.receiver?.image ?? "/assets/profile-pic.png"
                  }
                  alt={conversation.receiver?.name ?? ""}
                  width={128}
                  height={128}
                  className="object-cover rounded-full"
                  style={{
                    borderRadius: "100%",
                    width: "64px",
                    height: "64px",
                  }}
                />
              </Link>
            </div>
          ))}
          <div className="flex items-center justify-center">
            <ArrowRight
              size={"24px"}
              className="text-accent2 dark:text-accent1"
            />
          </div>
        </div>
      </div>
      {/* Conversations & Search Results */}
      {query.length === 0 ? (
        <section className="flex flex-col gap-5">
          {/* New Conversations */}
          {LatestConversations.length > 0 && (
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-body text-accent2/50 dark:text-accent1/50 px-5">
                New
              </h3>
              {LatestConversations.map((conversation, index) => (
                <Link
                  href={`/messages/${conversation.id}`}
                  key={`new-${index}`}
                >
                  <ConversationPreview
                    conversation={conversation}
                    bottom={OpenedConversations.length === 0}
                  />
                </Link>
              ))}
            </div>
          )}
          {/* Opened Conversations */}
          {OpenedConversations.length > 0 && (
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-body text-accent2/50 dark:text-accent1/50 px-5">
                Opened
              </h3>
              {OpenedConversations.map((conversation, index) => (
                <Link
                  href={`/messages/${conversation.id}`}
                  key={`opened-${index}`}
                >
                  <ConversationPreview
                    conversation={conversation}
                    bottom={index === OpenedConversations.length - 1}
                  />
                </Link>
              ))}
            </div>
          )}
        </section>
      ) : (
        // Search Results
        <section
          className={`${
            queryResults.length === 0 &&
            "flex flex-col items-center justify-center p-5 w-full"
          }`}
        >
          <h3 className="text-body text-accent2/50 dark:text-accent1/50 px-5 w-full">
            {queryResults.length === 0
              ? "No Conversations Found"
              : "Search Results"}
          </h3>
          <div className="flex flex-col gap-3 w-full">
            {queryResults.map((conversation, index) => (
              <Link
                href={`/messages/${conversation.id}`}
                key={`search-${index}`}
              >
                <ConversationPreview
                  conversation={conversation}
                  bottom={index === queryResults.length - 1}
                />
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

// const conversations = [
//   {
//     id: "1",
//     image: "/assets/user1.jpg",
//     name: "Olivia",
//     username: "olivia",
//     messages: ["What's up"],
//     read: false,
//     unReadMessages: 1,
//     lastUpdated: new Date("10/29/2023 12:45 PM"),
//   },
//   {
//     id: "3",
//     image: "/assets/user3.jpg",
//     name: "Asher",
//     username: "asher",
//     messages: ["yeah sure", "I'm in"],
//     read: true,
//     unReadMessages: 0,
//     lastUpdated: new Date("10/30/2023 1:12 PM"),
//   },
//   {
//     id: "4",
//     image: "/assets/user4.jpg",
//     name: "Evelyn",
//     username: "evelyn",
//     messages: ["Can't wait", "see u there"],
//     read: false,
//     unReadMessages: 2,
//     lastUpdated: new Date("10/30/2023 12:01 AM"),
//   },
// ];

// const following = [
//   {
//     image: "/assets/user1.jpg",
//     name: "Olivia",
//     username: "olivia",
//   },
//   {
//     image: "/assets/user2.jpg",
//     name: "Kai",
//     username: "kai",
//   },
//   {
//     image: "/assets/user3.jpg",
//     name: "Asher",
//     username: "asher",
//   },
//   {
//     image: "/assets/user4.jpg",
//     name: "Evelyn",
//     username: "evelyn",
//   },
//   {
//     image: "/assets/user5.jpg",
//     name: "Liam",
//     username: "liam",
//   },
//   {
//     name: "Babatunde",
//     username: "babatunde",
//     image: "/assets/user6.webp",
//   },
//   {
//     name: "Sir Theadore III",
//     username: "sirtheadoreiii",
//     image: "/assets/user7.webp",
//   },
// ];
