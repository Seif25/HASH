import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-accent2 flex flex-col items-center justify-center w-full min-h-screen rounded-2xl">
      <h3 className="uppercase text-[20px] font-light">{"Oops! Looks Like the hash you are looking for doesn't exist"}</h3>
      <Image src="/assets/404.gif" width={500} height={500} alt="404" />
      <Link href="/" className="btn">Return Home</Link>
    </div>
  );
}
