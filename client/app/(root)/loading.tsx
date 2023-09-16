import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Image
        src={"/logo.png"}
        alt="Hash"
        width={200}
        height={200}
        className="animate-pulse"
      />
    </div>
  );
}
