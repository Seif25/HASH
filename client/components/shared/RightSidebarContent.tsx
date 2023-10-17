"use client";
import { User } from "@/utils/types/user.types";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RightSidebarContentProps {
  recommendedUsers: User[] | undefined;
}

export default function RightSidebarContent({
  recommendedUsers,
}: RightSidebarContentProps) {
  const [offset, setOffset] = useState(0);
  const [div, setDiv] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const searchResults = document.getElementById("navbar-search-results");
    if (searchResults) {
      setDiv(searchResults);
      setOffset(searchResults.offsetHeight);
    }
  }, [offset]);

  const offsetClass = `top-[${offset}px]`;
  return (
    <div className={`right-sidebar-component ${offsetClass}`}>
      <section className={`custom-scrollbar right-sidebar`}>
        <div className="flex flex-1 flex-col gap-5 justify-start">
          <h3 className="font-bold text-[18px] text-accent1">
            {"People to follow"}
          </h3>
          {recommendedUsers?.map((user) => (
            <div className="flex items-center justify-between">
              <Link href={`/profile/${user.username}`}>
                <div className="flex items-center gap-2">
                  <Image
                    src={user?.image ?? "/assets/profile-pic.png"}
                    alt={user.username ?? ""}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="flex flex-col items-start gap-0">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[14px]">
                        {user.name ?? ""}
                      </span>
                      <BadgeCheck className="text-primary" size={"14px"} />
                    </div>
                    <span className="text-gray-500 text-[14px]">
                      @{user.username ?? ""}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="flex items-center justify-center">
                <button className="follow-btn" disabled>
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="custom-scrollbar right-sidebar">
        <div className="flex flex-1 flex-col justify-start">
          <h3 className="font-bold text-[18px] text-accent1">
            {"What's happening"}
          </h3>
          <pre>
            <code>
                {
                    JSON.stringify(div?.checkVisibility(), null, 2)
                }
            </code>
          </pre>
        </div>
      </section>
    </div>
  );
}
