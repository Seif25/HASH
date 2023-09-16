"use client";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";

import { HashValidation } from "@/lib/validations/hash";
import HashField from "./components/HashField";

import { useState } from "react";

import { createHash } from "@/lib/actions/hash.actions";
import Image from "next/image";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

// TODO: change userId to username
interface Props {
  username: string;
  image: string | undefined;
}

const CreateNewHash: NextPage<Props> = ({ username, image }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(HashValidation),
    defaultValues: {
      hash: "",
      username: username,
    },
  });

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const onSubmit = async (values: z.infer<typeof HashValidation>) => {
    setLoading(true);
    await createHash({
      text: values.hash,
      username: username,
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
          className="flex items-start justify-start gap-5 p-10 bg-accent2 rounded-lg"
        >
          <Image
            src={image ?? ""}
            alt=""
            width={42}
            height={42}
            className="rounded-full"
          />
          <div className="flex flex-col gap-2 w-full">
            <HashField
              control={form.control}
              name="hash"
              placeholder="What's on your mind?"
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

export default CreateNewHash;
