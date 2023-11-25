import Navbar from "@/app/components/navigation/Navbar";
import RightSidebar from "@/app/components/navigation/RightSidebar";
import type { Metadata, ResolvingMetadata } from "next";
import LeftSidebar from "@/app/components/navigation/LeftSidebar";
import { Suspense } from "react";
import LeftSidebarSkeleton from "@/app/components/navigation/LeftSidebarSkeleton";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
// import BottomBar from "../components/navigation/BottomBar";
// import FloatingButton from "../components/navigation/FloatingButton";
import { fetchNotificationCountAction } from "@/app/lib/actions/notification/notification.actions";
import FloatingButton from "@/app/components/navigation/FloatingButton";
import BottomBar from "@/app/components/navigation/BottomBar";

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  return {
    title: `Messages / Hash`,
    description:
      "From breaking news and entertainment to sports and politics, get the full story with all the live commentary.",
    appleWebApp: true,
    applicationName: "Hash",
    creator: "Seif Ahmed",
    publisher: "Vercel",
  };
}

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
      {/* <FloatingButton /> */}
      <BottomBar notificationCount={notificationCount} />
    </div>
  );
}
