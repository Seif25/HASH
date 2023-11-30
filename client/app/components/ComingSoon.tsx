import { Coming_Soon } from "next/font/google";

const ComingSoonFont = Coming_Soon({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

export default function ComingSoon({
  page,
  isAre,
}: {
  page: string;
  isAre: "is" | "are";
}) {
  return (
    <div className="flex flex-col gap-5">
      <h3
        className={`text-heading text-primary uppercase ${ComingSoonFont.className}`}
      >
        Stay Tuned - {page} {isAre}
      </h3>
      <h1
        className={`text-title text-primary uppercase ${ComingSoonFont.className}`}
      >
        Coming Soon
      </h1>
    </div>
  );
}
