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
  title: "Hash",
  description: "An app for sharing your thoughts with the world.",
};

export default async function RootLayout({
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
            <section className="main lg:px-5 pb-20 lg:pb-0">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
