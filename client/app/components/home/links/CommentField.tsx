"use client";

import { newCommentAction } from "@/app/lib/actions/user/user.actions";
import { Button } from "@/components/ui/button";
import { Loader2, SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CommentFieldProps {
  commenter: string;
  hashId: string;
}

export default function CommentField({ commenter, hashId }: CommentFieldProps) {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  async function handleComment() {
    if (value.length > 0) {
      setLoading(true);
      await newCommentAction({ commenter, hashId, text: value, media: [] });
      setLoading(false);
      setValue("");
      router.push(`/hash/${hashId}`);
    }
  }
  return (
    <div className="bg-accent2 rounded-xl flex items-center justify-between px-5">
      <input
        type="text"
        id="comment-field"
        className="w-full rounded-xl p-2 bg-accent2 border-none outline-none ring-0 text-accent1"
        placeholder="Write a comment..."
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
          <SendHorizontal size={"16px"} className="text-primary" />
        )}
      </Button>
    </div>
  );
}
