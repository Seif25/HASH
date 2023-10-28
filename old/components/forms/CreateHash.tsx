"use client";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";

import { HashValidation } from "@/lib/validations/hash";
import HashField from "./components/HashField";

import { ChangeEvent, useState } from "react";

import { createHash } from "@/lib/actions/hash.actions";
import Image from "next/image";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useUploadThing } from "@/lib/uploadThing";
import { Media } from "@/utils/types/hash.types";
import { Tag } from "@/utils/types/tag.types";
import { suggestTags } from "@/lib/actions/tag.actions";

interface Props {
  username: string;
  image: string | undefined;
}

const CreateNewHash: NextPage<Props> = ({ username, image }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openHashSuggestions, setOpenHashSuggestions] = useState(false);
  const { startUpload } = useUploadThing("hashMedia");
  const [suggestedTags, setSuggestedTags] = useState<Tag[]>([])

  const [hashMedia, setHashMedia] = useState<File[]>([]);
  // *Handle Profile Picture Upload
  const uploadHashMedia = async (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string[]) => void
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;

      setHashMedia(Array.from(e.target.files));

      const fieldValue: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader();
        if (!files[i].type.includes("image")) return;

        fileReader.onload = async (event) => {
          const imageDataUrl = event.target?.result?.toString() ?? "";
          fieldValue.push(imageDataUrl);
        };
        fieldChange(fieldValue);
        fileReader.readAsDataURL(files[i]);
      }
    }
  };

  // *Handle Text Change
  const handleTextChange = async (
    e: ChangeEvent<HTMLTextAreaElement>,
    fieldChange: (value: string) => void
  ) => {
    const text = e.target.value;
    const matches = text.match(/#\w+\b/g);
    if (matches !== null) {
      const lastMatch = matches[matches.length - 1];
      const words = lastMatch.split(" ");
      const lastWord = words[words.length - 1];
      if (lastWord.length > 0) {
        setOpenHashSuggestions(true);
        const res = await suggestTags(lastWord)
        setSuggestedTags(res)
      } else {
        setOpenHashSuggestions(false);
      }
    } else {
      setOpenHashSuggestions(false);
    }

    fieldChange(text);
  };

  const form = useForm({
    resolver: zodResolver(HashValidation),
    defaultValues: {
      hash: "",
      username: username,
      media: [],
    },
  });

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setTimeout(() => {
      setFocused(false);
    }, 2000);
  };

  // *Handle Form Submit
  const onSubmit = async (values: z.infer<typeof HashValidation>) => {
    setLoading(true);

    if (hashMedia) {
      const imgRes = await startUpload(hashMedia);
      const media: Media[] = [];
      if (imgRes) {
        imgRes.forEach((img) => {
          media.push({ url: img.url, alt: img.name, id: img.key });
        });
        values.media = media;
      }
    }

    await createHash({
      text: values.hash,
      username: username,
      community: null,
      pathname: pathname,
      media: values.media,
    });

    setLoading(false);
    form.reset();

    router.push("/");
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-start justify-start gap-5 rounded-lg"
        >
          <Image
            src={image ?? ""}
            alt=""
            width={42}
            height={42}
            className="rounded-full"
            priority
            placeholder="blur"
            blurDataURL="/assets/profile-pic.png"
          />
          <div className="flex flex-col gap-2 w-full">
            <HashField
              control={form.control}
              name="hash"
              placeholder="What's on your mind?"
              maxLength={280}
              rows={5}
              handleFocus={onFocus}
              handleBlur={onBlur}
              focused={focused}
              loading={loading}
              length={form.getValues().hash.length}
              handleImageChange={uploadHashMedia}
              handleTextChange={handleTextChange}
              openHashSuggestions={openHashSuggestions}
              setOpenHashSuggestions={setOpenHashSuggestions}
              suggestedTags={suggestedTags}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateNewHash;
