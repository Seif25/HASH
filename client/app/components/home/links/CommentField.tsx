"use client";

import { newCommentAction } from "@/app/lib/actions/user/user.actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

interface CommentFieldProps {
  commenter: string;
  hashId: string;
  setOpen?: (value: boolean) => void;
}

export default function CommentField({
  commenter,
  hashId,
  setOpen,
}: CommentFieldProps) {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
  }

  async function handleComment(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (value.length > 0) {
      setLoading(true);
      await newCommentAction({ commenter, hashId, text: value, media: [] });
      setLoading(false);
      setValue("");
      if (setOpen) {
        setOpen(false);
      }
      router.push(`/hash/${hashId}`);
    }
  }
  return (
    <div className="bg-accent1 dark:bg-accent2 rounded-2xl flex items-center justify-between px-5">
      <TextareaAutosize
        id="comment-field"
        className="w-full rounded-2xl p-2 resize-none bg-accent1 dark:bg-accent2 border-none outline-none ring-0 text-accent2 dark:text-accent1"
        placeholder="Write a comment..."
        minRows={1}
        maxRows={5}
        maxLength={280}
        value={value}
        onChange={handleInputChange}
      />
      <Button
        variant={"icon"}
        size={"icon"}
        onClick={handleComment}
        disabled={loading || value.length === 0}
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" />
        ) : (
          <PaperAirplaneIcon className="size-4 text-primary" />
        )}
      </Button>
    </div>
  );
}
