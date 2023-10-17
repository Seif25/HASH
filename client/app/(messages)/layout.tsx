import Navbar from "@/components/shared/Navbar";
import "../globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Footer from "@/components/shared/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hash / Messages",
  description: "Messaging app for users to chat with each other.",
};

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className={`${lato.className} app`}>
          <Navbar />
          <main className="flex flex-row w-full justify-between">
            <LeftSidebar />
            <section className="main lg:pl-5 pb-20 lg:pb-0">
              <div className="w-full">{children}</div>
            </section>
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
