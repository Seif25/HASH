"use client";

import { ImageIcon, Loader2, SendHorizontal, Smile } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import EmojiBtn from "../shared/triggers/EmojiBtn";
import { createHashAction } from "@/lib/actions/hash/hash.actions";
import { usePathname } from "next/navigation";

interface PostProps {
  loggedInUser: string;
  profilePic: string;
}

export default function Post({ loggedInUser, profilePic }: PostProps) {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <section className="w-full pt-5">
      <form
        action={() => {
          createHashAction({
            text,
            author: loggedInUser,
            media: [],
            pathname,
          });
          setText("");
        }}
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
              value={text}
              className="w-[80%] resize-none bg-transparent outline-none ring-0 border-none text-accent1 px-2"
              onChange={handleOnChange}
            />
            <button
              className="text-primary disabled:text-accent1/50 w-[20%] flex items-center justify-end"
              type="submit"
              disabled={text.length === 0}
            >
              {!loading ? (
                <SendHorizontal size={"16px"} />
              ) : (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
            </button>
          </div>
          <div className="flex items-center gap-3 px-5">
            <EmojiBtn message={text} setMessage={setText} />
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
