"use client";

import { NextPage } from "next";
// *HOOKS
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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

interface CreateCommentProps {
  currentUser: string;
  parentId: string;
  image: string;
  parentAuthor: string;
}

export default function CreateComment({
  currentUser,
  parentId,
  image,
  parentAuthor,
}: CreateCommentProps) {
  // Hooks
  const router = useRouter();
  const pathname = usePathname();
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      hash: "",
    },
  });

  // Handlers
  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    setLoading(true);
    setFocused(true)

    try {
      await addComment({
        text: values.hash,
        author: currentUser,
        parentId: parentId,
        community: null,
        pathname: pathname,
      });
      setLoading(false);
      form.reset();
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
          className="flex flex-col justify-start gap-2 px-5 py-5"
        >
          <div className="flex items-center gap-2 w-full">
            <Link href={`/profile/${currentUser}`}>
              <Image
                src={image || "/assets/profile-pic.png"}
                alt={currentUser}
                width={42}
                height={42}
                className="rounded-full"
              />
            </Link>
            <CommentField
              control={form.control}
              name="hash"
              placeholder="Post your comment"
              maxLength={250}
              rows={5}
              handleFocus={onFocus}
              handleBlur={onBlur}
              focused={focused}
              loading={loading}
              length={form.getValues().hash.length}
              parentAuthor={parentAuthor}
            />
          </div>
        </form>
      </Form>
    </>
  );
}
