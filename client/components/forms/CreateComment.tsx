"use client";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";

import { CommentValidation } from "@/lib/validations/hash";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ImageIcon from "@mui/icons-material/Image";
import GifBoxIcon from "@mui/icons-material/GifBox";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { createHash } from "@/lib/actions/hash.actions";
import { Loader2 } from "lucide-react";
import CommentField from "./components/CommentField";
import Image from "next/image";
import Link from "next/link";

interface Props {
  userId: string;
  parentId: string;
}

const CreateComment: NextPage<Props> = ({ userId, parentId }) => {
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
    await createHash({
      text: values.hash,
      author: userId,
      community: null,
      pathname: pathname,
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
          className="flex flex-col justify-start gap-2 px-10 pb-10"
        >
          <div className="flex items-center gap-2 w-full">
            {/* TODO: fetch image of commenter */}
            <Link href={`/profile/${userId}`}>
              <Image
                src={"/assets/profile-pic.jpg"}
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
            />
          </div>
          <div className="grid grid-cols-2 gap-10 pl-10">
            <div className="flex items-center w-full gap-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="rounded-full p-1 hover:bg-accent1 hover:bg-opacity-30">
                      <ImageIcon className="text-accent1" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Media</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="rounded-full p-1 hover:bg-accent1 hover:bg-opacity-30">
                      <GifBoxIcon className="text-accent1" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GIF</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="rounded-full p-1 hover:bg-accent1 hover:bg-opacity-30">
                      <InsertEmoticonIcon className="text-accent1" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Emojis</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center justify-end">
              <Button
                className="rounded-full w-40"
                variant={"default"}
                type="submit"
                disabled={form.getValues().hash.length < 1 || loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Post
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateComment;
