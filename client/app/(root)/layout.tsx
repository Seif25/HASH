import Navbar from "../components/navigation/Navbar";
import RightSidebar from "../components/navigation/RightSidebar";
import type { Metadata } from "next";
import LeftSidebar from "../components/navigation/LeftSidebar";
import { Suspense } from "react";
import LeftSidebarSkeleton from "../components/navigation/LeftSidebarSkeleton";

export const metadata: Metadata = {
  title: "/ Hash",
  description:
    "From breaking news and entertainment to sports and politics, get the full story with all the live commentary.",
  appleWebApp: true,
  applicationName: "Hash",
  creator: "Seif Ahmed",
  publisher: "Vercel",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dummy = {
    username: "dummy",
    image: "/assets/profile-pic.png",
    name: "Lord Dummy",
    following: [],
    followers: [],
    verified: true,
    bio: "I'm a dummy account.",
    location: "Dummyville, Dummyland",
    website: "https://dummy.com",
    createdAt: Date.now().toString(),
  };
  return (
    // TODO: Bottom Navigation
    <div>
      <Navbar loggedUser={dummy} />
      <section className="app">
        <main className="flex flex-row w-full justify-between">
          <Suspense fallback={<LeftSidebarSkeleton />}>
            <LeftSidebar username={dummy.username} />
          </Suspense>
          <section className="main">
            <div className="w-full max-w-4xl">{children}</div>
          </section>
          <RightSidebar />
        </main>
      </section>
    </div>
  );
}
