"use client";

import { NextPage } from "next";
// *HOOKS
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

// *VALIDATIONS
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation } from "@/lib/validations/hash";

// *SHARED COMPONENTS
import { Form } from "@/components/ui/form";

// *COMPONENTS
import CommentField from "./components/CommentField";
import Image from "next/image";
import Link from "next/link";

// *ACTIONS
import { addComment } from "@/lib/actions/hash.actions";
import { useUploadThing } from "@/lib/uploadThing";
import { Media } from "@/utils/types/hash.types";

interface CreateCommentProps {
  currentUser: string;
  parentId: string;
  image: string;
  parentAuthor: string;
  handleDialogClose?: () => void;
}

export default function CreateComment({
  currentUser,
  parentId,
  image,
  parentAuthor,
  handleDialogClose,
}: CreateCommentProps) {
  // Hooks
  const router = useRouter();
  const pathname = usePathname();
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const { startUpload } = useUploadThing("hashMedia");

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

  // Form
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      hash: "",
      media: [],
    },
  });

  // Handlers
  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setTimeout(() => {
      setFocused(false);
    }, 2000);
  };

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    setLoading(true);
    setFocused(true);

    try {
      if (hashMedia) {
        if (startUpload) { // add null check
          const imgRes = await startUpload(hashMedia);
          const media: Media[] = [];
          if (imgRes) {
            imgRes.forEach((img) => {
              media.push({ url: img.url, alt: img.name, id: img.key });
            });
            values.media = media;
          }
        }
      }
      await addComment({
        text: values.hash,
        author: currentUser,
        parentId: parentId,
        community: null,
        pathname: pathname,
        media: values.media,
      });
      setLoading(false);
      form.reset();
      handleDialogClose && handleDialogClose();
      router.refresh();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-start justify-start gap-2 px-5 py-5"
        >
          <div className="flex items-start gap-2 w-full">
            <Link href={`/profile/${currentUser}`} className="pt-2">
              <Image
                src={image || "/assets/profile-pic.png"}
                alt={currentUser}
                width={42}
                height={42}
                className="rounded-full"
                priority
                placeholder="blur"
                blurDataURL="/assets/profile-pic.png"
              />
            </Link>
            <CommentField
              control={form.control}
              name="hash"
              placeholder="Post your comment"
              maxLength={280}
              rows={5}
              handleFocus={onFocus}
              handleBlur={onBlur}
              focused={focused}
              loading={loading}
              length={form.getValues().hash.length}
              parentAuthor={parentAuthor}
              handleImageChange={uploadHashMedia}
            />
          </div>
        </form>
      </Form>
    </>
  );
}
