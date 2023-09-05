"use client";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";

import { HashValidation } from "@/lib/validations/hash";
import HashField from "./components/HashField";

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

interface Props {
  userId: string;
}

const CreateNewHash: NextPage<Props> = ({ userId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [focused, setFocused] = useState(false);

  const form = useForm({
    resolver: zodResolver(HashValidation),
    defaultValues: {
      hash: "",
      accountId: userId,
    },
  });

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const onSubmit = async (values: z.infer<typeof HashValidation>) => {
    await createHash({
      text: values.hash,
      author: userId,
      community: null,
      pathname: pathname,
    });

    router.push("/");
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-start gap-5 p-10"
        >
          <HashField
            control={form.control}
            name="hash"
            placeholder="What's on your mind?"
            maxLength={250}
            rows={5}
            handleFocus={onFocus}
            handleBlur={onBlur}
            focused={focused}
          />
          <div className="grid grid-cols-2 gap-10">
            <div className="flex items-center w-full gap-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="rounded-full p-1 hover:bg-[#CBCCFF] hover:bg-opacity-30">
                      <ImageIcon className="text-[#CBCCFF]" />
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
                    <button className="rounded-full p-1 hover:bg-[#CBCCFF] hover:bg-opacity-30">
                      <GifBoxIcon className="text-[#CBCCFF]" />
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
                    <button className="rounded-full p-1 hover:bg-[#CBCCFF] hover:bg-opacity-30">
                      <InsertEmoticonIcon className="text-[#CBCCFF]" />
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
                disabled={form.getValues().hash.length < 1}
              >
                Post
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateNewHash;
