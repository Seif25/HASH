import Link from "next/link";

export default function ComingSoon({
  page,
  isAre,
}: {
  page?: string;
  isAre?: "is" | "are";
}) {
  return (
    <div className="flex flex-col justify-center h-screen w-full gap-5">
      <h3 className={`text-heading text-primary uppercase`}>
        Stay tuned! We're cooking up something exciting here.
      </h3>
      <h1 className={`text-body text-accent1 uppercase`}>
        This page will be launching soon, so be sure to check back often for
        updates. We can't wait to share what we're working on with you!
      </h1>
      <h1 className={`text-body text-accent1 uppercase`}>
        In the meantime, feel free to explore the rest of our website or follow
        us on social media for sneak peeks and announcements.
      </h1>
      <Link href={"/"} className="btn w-40">
        Return Home
      </Link>
    </div>
  );
}
