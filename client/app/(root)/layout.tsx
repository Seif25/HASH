import Navbar from "../components/navigation/Navbar";
import RightSidebar from "../components/navigation/RightSidebar";
import type { Metadata } from "next";
import LeftSidebar from "../components/navigation/LeftSidebar";
import { Suspense } from "react";
import LeftSidebarSkeleton from "../components/navigation/LeftSidebarSkeleton";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import BottomBar from "../components/navigation/BottomBar";
import FloatingButton from "../components/navigation/FloatingButton";
import { fetchNotificationCountAction } from "../lib/actions/notification/notification.actions";

export const metadata: Metadata = {
  title: "/ Hash",
  description:
    "From breaking news and entertainment to sports and politics, get the full story with all the live commentary.",
  appleWebApp: true,
  applicationName: "Hash",
  creator: "Seif Ahmed",
  publisher: "Vercel",
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const loggedInUser = await fetchUser(user?.username ?? "");

  const notificationCount = await fetchNotificationCountAction(
    loggedInUser?.username ?? ""
  );

  return (
    <div>
      {loggedInUser && <Navbar loggedUser={loggedInUser} />}
      <section className="app">
        <main className="flex flex-row w-full justify-between">
          <Suspense fallback={<LeftSidebarSkeleton />}>
            {loggedInUser && (
              <LeftSidebar
                username={loggedInUser.username}
                notificationCount={notificationCount}
              />
            )}
          </Suspense>
          <section className="main">
            <div className="w-full max-w-4xl">{children}</div>
          </section>
          <RightSidebar />
        </main>
      </section>
      <FloatingButton />
      <BottomBar notificationCount={notificationCount} />
    </div>
  );
}
