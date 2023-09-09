"use client";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";

import { CommentValidation } from "@/lib/validations/hash";

import { useState } from "react";

import { addComment } from "@/lib/actions/hash.actions";
import CommentField from "./components/CommentField";
import Image from "next/image";
import Link from "next/link";

interface Props {
  userId: string;
  parentId: string;
  image: string
}

const CreateComment: NextPage<Props> = ({ userId, parentId, image }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      hash: "",
    },
  });

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    setLoading(true);
    
    try {
      await addComment({
        text: values.hash,
        id: userId,
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
            {/* TODO: fetch image of commenter */}
            <Link href={`/profile/${userId}`}>
              <Image
                src={image}
                alt={""}
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
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateComment;
