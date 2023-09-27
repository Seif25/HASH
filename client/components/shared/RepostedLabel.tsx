import { Repeat2 } from "lucide-react"

export default function RepostedLabel({ label }: {label: string}) {
  return (
    <p className="italic font-bold text-green-500 flex items-center gap-1">
      <Repeat2 size={"20px"} className="text-green-500" />
      {label}
    </p>
  );
}
