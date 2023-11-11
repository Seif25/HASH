"use client";

import { ArrowRight, MailPlus, Plus, Search } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import moment from "moment";
import ConversationPreview from "../components/ConversationPreview";
import Link from "next/link";
import { useState } from "react";
import { ConversationType } from "@/app/lib/types/conversation.types";
import { UserType } from "@/app/lib/types/user.types";

interface UserConversationPageProps {
  loggedInUser: UserType;
}

export default function UserConversationsPage({
  loggedInUser,
}: UserConversationPageProps) {
  const [query, setQuery] = useState<string>("");
  const [queryResults, setQueryResults] = useState<ConversationType[]>([]);

  const MostRecent = conversations.sort((a, b) =>
    moment(b.lastUpdated).diff(moment(a.lastUpdated))
  );
  const LatestConversations = conversations.filter(
    (user) => user.unReadMessages > 0
  );
  const OpenedConversations = conversations.filter((user) => user.read);

  const NewConversations = following
    .filter(
      (user) =>
        !conversations.some(
          (conversation) => conversation.username === user.username
        )
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  function handleConversationSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    const results = conversations.filter((user) =>
      user.name.toLowerCase().includes(q.toLowerCase())
    );
    setQueryResults(results);
  }

  return (
    <section className="flex flex-col gap-5 bg-accent2 rounded-2xl lg:mt-5">
      {/* Start new Conversation & Search */}
      <section className="dark-gradient rounded-t-2xl h-[10vh] lg:h-[15vh] p-5 flex flex-col gap-5">
        <div className="flex items-center justify-between gap-5">
          <Image
            src={loggedInUser.image ?? "/assets/profile-pic.png"}
            alt={loggedInUser.username}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="flex items-center justify-between px-3 py-2 bg-dark rounded-2xl w-[70%] lg:w-[80%]">
            <input
              type="text"
              className="bg-transparent ring-0 outline-none border-none px-3 w-full"
              placeholder="Looking for a conversation?"
              onChange={handleConversationSearch}
            />
            <Search size={"24px"} className="text-accent1" />
          </div>
          {/* <h3 className="text-[24px]">Conversations</h3> */}
          {/* New Conversation */}
          <TooltipProvider>
            <Tooltip>
              <Dialog>
                <DialogTrigger asChild>
                  <TooltipTrigger asChild>
                    <button className="rounded-full border border-dashed border-accent1 w-[48px] h-[48px] bg-dark flex items-center justify-center">
                      <MailPlus className="text-accent1" size={"24px"} />
                    </button>
                  </TooltipTrigger>
                </DialogTrigger>
                <DialogContent className="max-h-96 overflow-y-scroll custom-scrollbar">
                  <DialogHeader>
                    <DialogTitle>Start A New Conversation</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-5">
                    {NewConversations.map((user, index) => (
                      <div
                        className="flex items-center cursor-pointer"
                        key={`user-${index}`}
                      >
                        <Image
                          src={user.image}
                          alt={user.name}
                          width={48}
                          height={48}
                          className="rounded-full w-[48px] h-[48px] object-cover"
                        />
                        <h3 className="text-heading text-accent1 ml-5 mr-2">
                          {user.name}
                        </h3>
                        <span className="text-paragraph text-accent1/50">
                          @{user.username}
                        </span>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              <TooltipContent>
                <p>Start a Conversation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>
      {/* Conversations */}
      {/* Most Recent Conversations */}
      <div className="lg:hidden flex flex-col px-5 gap-3 border-b border-accent1/10 pb-5">
        <h3 className="text-heading text-accent1/50 font-bold">Most Recent</h3>
        <div className="flex items-center justify-center lg:justify-start gap-5">
          {MostRecent.slice(0, 4).map((conversation, index) => (
            <div className="rounded-full" key={`recent-${index}`}>
              <Link
                href={`/messages/${conversation.id}`}
                key={`recent-${index}`}
              >
                <Image
                  src={conversation.image}
                  alt={conversation.name}
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
            <ArrowRight size={"24px"} className="text-accent1" />
          </div>
        </div>
      </div>
      {/* Conversations & Search Results */}
      {query.length === 0 ? (
        <section className="flex flex-col gap-5">
          {/* New Conversations */}
          <div className="flex flex-col gap-3 w-full">
            <h3 className="text-heading text-accent1/50 font-bold px-5">New</h3>
            {LatestConversations.map((conversation, index) => (
              <Link href={`/messages/${conversation.id}`} key={`new-${index}`}>
                <ConversationPreview conversation={conversation} />
              </Link>
            ))}
          </div>
          {/* Opened Conversations */}
          <div className="flex flex-col gap-3 w-full">
            <h3 className="text-heading text-accent1/50 font-bold px-5">
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
        </section>
      ) : (
        // Search Results
        <section
          className={`${
            queryResults.length === 0 &&
            "flex flex-col items-center justify-center p-5 w-full"
          }`}
        >
          <h3 className="text-heading text-accent1/50 font-bold px-5 w-full">
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

const conversations = [
  {
    id: "1",
    image: "/assets/user1.jpg",
    name: "Olivia",
    username: "olivia",
    messages: ["What's up"],
    read: false,
    unReadMessages: 1,
    lastUpdated: new Date("10/29/2023 12:45 PM"),
  },
  {
    id: "3",
    image: "/assets/user3.jpg",
    name: "Asher",
    username: "asher",
    messages: ["yeah sure", "I'm in"],
    read: true,
    unReadMessages: 0,
    lastUpdated: new Date("10/30/2023 1:12 PM"),
  },
  {
    id: "4",
    image: "/assets/user4.jpg",
    name: "Evelyn",
    username: "evelyn",
    messages: ["Can't wait", "see u there"],
    read: false,
    unReadMessages: 2,
    lastUpdated: new Date("10/30/2023 12:01 AM"),
  },
];

const following = [
  {
    image: "/assets/user1.jpg",
    name: "Olivia",
    username: "olivia",
  },
  {
    image: "/assets/user2.jpg",
    name: "Kai",
    username: "kai",
  },
  {
    image: "/assets/user3.jpg",
    name: "Asher",
    username: "asher",
  },
  {
    image: "/assets/user4.jpg",
    name: "Evelyn",
    username: "evelyn",
  },
  {
    image: "/assets/user5.jpg",
    name: "Liam",
    username: "liam",
  },
  {
    name: "Babatunde",
    username: "babatunde",
    image: "/assets/user6.webp",
  },
  {
    name: "Sir Theadore III",
    username: "sirtheadoreiii",
    image: "/assets/user7.webp",
  },
];
