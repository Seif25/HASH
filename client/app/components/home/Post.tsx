"use client";

import { ImageIcon, Loader2, SendHorizontal, Smile } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import EmojiBtn from "../shared/triggers/EmojiBtn";
import { createHashAction } from "@/app/lib/actions/hash/hash.actions";
import { usePathname } from "next/navigation";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { CreateHashParams } from "@/app/lib/types/hash.actions.types";
import { useToast } from "@/components/ui/use-toast";
import { customAlphabet, nanoid } from "nanoid";
import { MediaType } from "@/app/lib/types/hash.types";
import supabase from "@/app/lib/supabase/supabase";
import { useUploadThing } from "@/app/lib/uploadthing/uploadThing";

interface PostProps {
  loggedInUser: string;
  profilePic: string;
}

const file_nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);

export default function Post({ loggedInUser, profilePic }: PostProps) {
  const { toast } = useToast();

  const [text, setText] = useState<string>("");
  const [blob, setBlob] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const { startUpload } = useUploadThing("hashMedia");

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    inputFileRef.current?.click();
  };

  useEffect(() => {
    if (inputFileRef.current?.files) {
      setBlob(Array.from(inputFileRef.current?.files));
      if (inputFileRef.current?.files?.length > 4) {
        toast({
          title: "Unable to upload",
          description: "You can only upload 4 media files with each Hash",
        });
      }
    }
  }, [inputFileRef.current]);

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.length === 0 && inputFileRef.current?.files?.length === 0) {
      toast({
        title: "Unable to create Hash",
        description: "You must add some text or media to your Hash",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const media: MediaType[] = [];

    if (inputFileRef.current?.files) {
      const files = Array.from(inputFileRef.current?.files);

      const res = await startUpload(files);

      res?.forEach((file) => {
        const mediaBlob = {
          id: file_nanoid(),
          url: file.url,
          alt: file.name,
        };
        media.push(mediaBlob);
      });
    }
    const data = {
      text,
      author: loggedInUser,
      media,
      pathname,
    };
    await createHashAction(data as CreateHashParams);
    setLoading(false);
    setText("");
    setBlob([]);
  };

  return (
    <section className="w-full pt-5">
      <form
        onSubmit={createPost}
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
              // disabled={text.length === 0 && blob.length === 0}
            >
              {!loading ? (
                <SendHorizontal size={"16px"} />
              ) : (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
            </button>
          </div>
          <div className="flex items-center gap-3 px-5">
            <EmojiBtn setMessage={setText} />
            <button onClick={triggerUpload}>
              <ImageIcon
                size={"20px"}
                className="text-accent1 hover:text-primary"
              />
            </button>
            <input
              type="file"
              name="media-upload"
              id="media-upload"
              ref={inputFileRef}
              accept="image/*,video/*"
              multiple
              hidden
            />
          </div>
        </div>
      </form>
    </section>
  );
}
