"use client"; // Error components must be Client Components

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-fit h-screen overflow-hidden">
      <nav className="w-[80%] h-[20vh] flex items-center justify-between p-5">
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="Hash" width={64} height={64} />
        </Link>
      </nav>
      <div className="flex flex-col justify-center gap-5 p-10 w-full">
        <div className="flex flex-col gap-0 w-full">
          <h2 className="text-title-sm lg:text-title">{"Hmmm..."}</h2>
          <div className="flex items-center justify-center gap-5 w-full">
            <h2 className="text-[30px] lg:text-[48px]">
              {"Something went wrong."}
            </h2>
            <button
              className="hidden lg:flex btn w-40"
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
            >
              Try again
            </button>
          </div>
        </div>
        <div className="lg:hidden flex items-center justify-end">
          <button
            className="btn w-40"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
