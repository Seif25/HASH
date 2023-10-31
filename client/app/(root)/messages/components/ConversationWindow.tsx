"use client";

import {
  BadgeCheck,
  ImageIcon,
  Mail,
  MoreVertical,
  Phone,
  SendHorizonal,
  Smile,
  Video,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ConversationWindow({
  conversationId,
}: {
  conversationId: string;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const loggedInUser = "seif";
  const conversation = conversations.find((c) => c.id === conversationId);

  useEffect(() => {
    // scroll to the end of the messages section
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);
  return (
    <>
      {conversation && (
        <div className="w-full flex items-center justify-center">
          <nav className="fixed top-20 p-5 h-[10vh] lg:h-[13vh] bg-accent2 rounded-t-2xl w-full lg:w-[60%] z-30 border-b border-accent1/10">
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <Link href="/messages" className="mr-5 self-center">
                  <Mail
                    size={"24px"}
                    className="text-accent1 hover:text-primary"
                  />
                </Link>
                <Image
                  src={conversation.image}
                  alt={conversation.name}
                  width={48}
                  height={48}
                  className="rounded-full w-[48px] h-[48px] object-cover"
                />
                <div className="flex flex-col gap-1 ml-2">
                  <h3 className="text-accent1 text-heading">
                    {conversation.name}
                  </h3>
                  <span className="text-accent1/50 text-paragraph">
                    @{conversation.username}
                  </span>
                </div>
                <BadgeCheck size={"16px"} className="text-primary mt-1" />
              </div>
              <div className="flex items-center gap-5">
                <button>
                  <Phone
                    size={"20px"}
                    className="text-accent1 hover:text-primary"
                  />
                </button>
                <button>
                  <Video
                    size={"20px"}
                    className="text-accent1 hover:text-primary"
                  />
                </button>
                <button>
                  <MoreVertical
                    size={"20px"}
                    className="text-accent1 hover:text-primary"
                  />
                </button>
              </div>
            </div>
          </nav>
          <div className="fixed flex flex-col gap-3 top-32 h-[80vh] lg:h-[68vh] bg-accent2 w-full lg:w-[60%] pt-14 pb-10 px-5 overflow-y-scroll custom-scrollbar">
            {conversation.messages.map((message, index) => (
              <div
                key={`message-${index}`}
                className={`flex flex-col justify-center w-full ${
                  message.sender === loggedInUser ? "items-end" : "items-start"
                }`}
              >
                <p
                  className={`rounded-2xl text-accent1 w-auto max-w-80 p-2 ${
                    message.sender === loggedInUser
                      ? "gradient"
                      : "dark-gradient"
                  }`}
                >
                  {message.message}
                </p>
                <span className="text-[10px] font-light text-accent1/50 px-2">
                  {moment(message.timestamp).isSame(moment(), "day")
                    ? moment(message.timestamp).format("hh:mm A")
                    : moment(message.timestamp).format("ddd - hh:mm A")}
                </span>
                {conversation.messages.length - 1 === index && (
                  <div ref={messagesEndRef} />
                )}
              </div>
            ))}
          </div>
          <footer className="fixed bottom-5 flex items-center p-5 h-[10vh] bg-accent2 rounded-b-2xl w-full lg:w-[60%] z-30 border-t border-accent1/10">
            <div className="flex items-center justify-between bg-dark rounded-2xl p-2 w-full">
              {/* Emoji & Image */}
              <div className="flex items-center gap-2">
                <button>
                  <Smile
                    size={"20px"}
                    className="text-accent1 hover:text-primary"
                  />
                </button>
                <button>
                  <ImageIcon
                    size={"20px"}
                    className="text-accent1 hover:text-primary"
                  />
                </button>
              </div>
              {/* Input Field */}
              <textarea
                // type="text"
                className="bg-transparent w-full ring-0 outline-none border-none px-3 rounded-2xl resize-none"
                rows={1}
                placeholder="Send a message..."
              />
              <button>
                <SendHorizonal size={"20px"} className="text-primary" />
              </button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

const conversations = [
  {
    id: "1",
    image: "/assets/user1.jpg",
    name: "Olivia",
    username: "olivia",
    messages: [],
    read: false,
    unReadMessages: 1,
    lastUpdated: new Date("10/29/2023 12:45 PM"),
  },
  {
    id: "3",
    image: "/assets/user3.jpg",
    name: "Asher",
    username: "asher",
    messages: [],
    read: true,
    unReadMessages: 0,
    lastUpdated: new Date("10/30/2023 1:12 PM"),
  },
  {
    id: "4",
    image: "/assets/user4.jpg",
    name: "Evelyn",
    username: "evelyn",
    messages: [
      {
        message: "Can't wait",
        sender: "evelyn",
        timestamp: new Date("10/30/2023 12:01 PM"),
      },
      {
        message: "see u there",
        sender: "seif",
        timestamp: new Date("10/30/2023 12:41 PM"),
      },
      {
        message: "Hey!",
        sender: "evelyn",
        timestamp: new Date("10/30/2023 4:21 PM"),
      },
      {
        message: "I arrived",
        sender: "evelyn",
        timestamp: new Date("10/30/2023 4:21 PM"),
      },
      {
        message: "Hey! I'm pulling up right now",
        sender: "seif",
        timestamp: new Date("10/30/2023 4:21 PM"),
      },
      {
        message: "Pick a table and I'll be there in a sec",
        sender: "seif",
        timestamp: new Date("10/30/2023 4:22 PM"),
      },
      {
        message: "2nd table on the left",
        sender: "evelyn",
        timestamp: new Date("10/30/2023 4:24 PM"),
      },
    ],
    read: false,
    unReadMessages: 2,
    lastUpdated: new Date("10/30/2023 12:01 AM"),
  },
];
