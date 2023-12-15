"use client";

import {
  ArrowUpFromLine,
  ImageIcon,
  Loader2,
  SendHorizontal,
} from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import EmojiBtn from "../shared/triggers/EmojiBtn";
import { createHashAction } from "@/app/lib/actions/hash/hash.actions";
import { usePathname } from "next/navigation";
import { CreateHashParams } from "@/app/lib/types/hash.actions.types";
import { useToast } from "@/components/ui/use-toast";
import { customAlphabet, nanoid } from "nanoid";
import { ContentType, MediaType } from "@/app/lib/types/hash.types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUploadThing } from "@/app/lib/uploadthing/uploadThing";
import { getMediaType } from "@/app/utils/functions/functions";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { PutBlobResult } from "@vercel/blob";

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
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const [alertMessage, setAlertMessage] = useState(
    "We're getting your post ready to share with the world. Hold tight!"
  );

  const [blob, setBlob] = useState<MediaType[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { startUpload } = useUploadThing("hashMedia");

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    inputFileRef.current?.click();
  };

  async function uploadFiles(files: File[]): Promise<MediaType[]> {
    let media: MediaType[] = [];
    if (files.length === 0) {
      return media;
    }
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const response = await fetch(`/api/media/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = (await response.json()) as PutBlobResult;

      const mediaType = newBlob.contentType.split("/")[0] as ContentType;
      const mediaBlob = {
        id: file_nanoid(),
        url: newBlob.url,
        alt: newBlob.contentDisposition,
        mediaType,
      };
      media = [...media, mediaBlob];
    }
    return media;
  }

  async function createPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let files: File[] = [];

    if (text.length === 0 && inputFileRef.current?.files?.length === 0) {
      toast({
        title: "Unable to create Hash",
        description: "You must add some text or media to your Hash",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // File<Image, Video, Audio> Upload to @vercel/blob
    if (inputFileRef.current?.files?.length) {
      files = Array.from(inputFileRef.current?.files);
    }

    const media = await uploadFiles(files);

    if (text.length === 0 && media.length === 0) {
      toast({
        title: "Unable to create Hash",
        description: "You must add some text or media to your Hash",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const data = {
      text,
      author: loggedInUser,
      media,
      pathname,
    };

    await createHashAction(data as CreateHashParams);
    setText("");
    setLoading(false);
    setAlertMessage(
      "We're getting your post ready to share with the world. Hold tight!"
    );
  }

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        if (loading) {
          setAlertMessage(
            "Oops! It seems your post is taking a bit longer to upload than usual. We're working on it, but just hang in there a bit longer. We'll let you know when it's ready to share with the world."
          );
        }
      }, 30000);
    }
  }, [loading]);

  return (
    <section className="w-full pt-5">
      {loading && (
        <Alert className="mb-10 animate-pulse">
          <ArrowUpFromLine size={24} className="h-4 w-4 text-accent1" />
          <AlertTitle>Get Ready for Your Post to Shine</AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}
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
            <TextareaAutosize
              id="new-post-field"
              placeholder="What's on your mind?"
              minRows={1}
              maxRows={6}
              value={text}
              className="w-[80%] resize-none bg-transparent outline-none ring-0 border-none text-accent1 px-2"
              onChange={handleOnChange}
            />
            <button
              className="text-primary disabled:text-accent1/50 w-[20%] flex items-end justify-end"
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
