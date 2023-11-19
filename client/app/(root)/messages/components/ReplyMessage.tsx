"use client";

interface ReplyMessageProps {
  sender: string;
  replyMessage: string;
  replyId: string;
  message: string;
  color: string;
  rounded: string;
}

export default function ReplyMessage({
  sender,
  replyMessage,
  replyId,
  message,
  color,
  rounded,
}: ReplyMessageProps) {
  function handleScroll() {
    const element = document.getElementById(replyId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      element.classList.add("animate-pulse");

      setTimeout(() => {
        element.classList.remove("animate-pulse");
      }, 3000);
    }
  }
  return (
    <div
      className={`flex flex-col gap-2 ${rounded} p-2 w-auto max-w-80 select-none ${color}`}
    >
      <div
        className="flex flex-col flex-grow border-l-accent1 border-l-4 pl-2 cursor-pointer"
        onClick={handleScroll}
      >
        <h1 className="text-body text-accent1 font-bold">@{sender}</h1>
        <p className="text-[14px] text-accent1/50">{replyMessage}</p>
      </div>
      <p>{message}</p>
    </div>
  );
}
