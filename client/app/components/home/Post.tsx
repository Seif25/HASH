"use client";

import { ImageIcon, SendHorizontal, Smile } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import EmojiBtn from "../shared/triggers/EmojiBtn";

interface PostProps {
  loggedInUser: string;
  profilePic: string;
}

export default function Post({ loggedInUser, profilePic }: PostProps) {
  const [text, setText] = useState<string>("");

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <section className="w-full pt-5">
      <form
        action=""
        className="flex items-start justify-start gap-5 rounded-2xl"
      >
        <Image
          src={profilePic}
          alt={loggedInUser}
          width={42}
          height={42}
          className="rounded-full"
        />
        <div className="flex flex-col w-full bg-accent2 rounded-2xl pb-3">
          {/* Text Field and Post Button */}
          <div className="post-field rounded-r-2xl rounded-bl-2xl rounded-tl-none px-2">
            <textarea
              id="new-post-field"
              placeholder="What's on your mind?"
              rows={1}
              className="w-[80%] resize-none bg-transparent outline-none ring-0 border-none text-accent1 px-2"
              onChange={handleOnChange}
            />
            <button
              className="text-primary disabled:text-accent1/50 w-[20%] flex items-center justify-end"
              onClick={handleSubmit}
              disabled={text.length === 0}
            >
              <SendHorizontal size={"16px"} />
            </button>
          </div>
          <div className="flex items-center gap-3 px-5">
            <EmojiBtn message="" setMessage={() => {}} />
            <button>
              <ImageIcon
                size={"20px"}
                className="text-accent1 hover:text-primary"
              />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
