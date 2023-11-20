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
import { nanoid } from "nanoid";
import { MediaType } from "@/app/lib/types/hash.types";

interface PostProps {
  loggedInUser: string;
  profilePic: string;
}

export default function Post({ loggedInUser, profilePic }: PostProps) {
  const { toast } = useToast();

  const [text, setText] = useState<string>("");
  const [blob, setBlob] = useState<MediaType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    inputFileRef.current?.click();
  };

  useEffect(() => {
    if (inputFileRef.current?.files) {
      if (inputFileRef.current?.files?.length > 4) {
        toast({
          title: "Unable to upload",
          description: "You can only upload 4 media files with each Hash",
        });
      }
    }
  }, [inputFileRef.current?.files]);

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (inputFileRef.current?.files) {
      const files = Array.from(inputFileRef.current?.files);
      files.forEach(async (file) => {
        // const newBlob = await upload(file.name, file, {
        //   access: "public",
        //   handleUploadUrl: "/api/media/upload",
        // });
        fetch("/api/media/upload", {
          method: "POST",
          headers: { "content-type": file?.type || "application/octet-stream" },
          body: file,
        }).then(async (res) => {
          const { url } = (await res.json()) as PutBlobResult;
          const mediaBlob = {
            id: nanoid(),
            url: url,
            alt: "",
          };
          setBlob((prev) => [...prev, mediaBlob]);
        });
      });
    }
    const data = {
      text,
      author: loggedInUser,
      media: blob,
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
