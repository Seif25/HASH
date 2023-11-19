import { Forward } from "lucide-react";

interface ForwardBtnProps {}

export default function ForwardBtn({}: ForwardBtnProps) {
  return (
    <button className="flex items-center w-full gap-5 hover:text-primary">
      <Forward size={"16px"} />
      Forward
    </button>
  );
}
