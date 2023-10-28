import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image
        src="/logo.png"
        alt="HASH"
        width={128}
        height={128}
        className="animate-pulse"
      />
    </div>
  );
}
