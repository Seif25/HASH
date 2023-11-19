"use client";

import { Copy } from "lucide-react";
import { useClipboard } from "@reactuses/core";

interface CopyBtnProps {
  message: string;
}

export default function CopyBtn({ message }: CopyBtnProps) {
  const [_, copy] = useClipboard();

  return (
    <button
      className="flex items-center w-full gap-5 hover:text-primary"
      onClick={() => copy(message)}
    >
      <Copy size={"16px"} />
      Copy
    </button>
  );
}
