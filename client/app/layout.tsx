import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/app/providers/QueryProvider";
import { ClerkProvider } from "@clerk/nextjs";
import Image from "next/image";

const rubik = Rubik({
  weight: ["300", "400", "700", "900"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hash. Your portal to the world.",
  description:
    "From breaking news and entertainment to sports and politics, get the full story with all the live commentary.",
  appleWebApp: true,
  applicationName: "Hash",
  creator: "Seif Ahmed",
  publisher: "Vercel",
};

export default function RootLayout({
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
        <body className={`${rubik.className} app pb-10`}>
          <main>
            <QueryProvider>{children}</QueryProvider>
          </main>
        </body>
        <footer className="grid grid-cols-2 lg:flex items-center justify-center lg:justify-between p-5 bg-black pb-24 lg:pb-5">
          <Image src="/logo.png" alt="hash" width={50} height={50} />
          <p className="text-[12px] lg:text-paragraph text-accent1/50">
            &copy; {new Date().getFullYear()} Hash. All rights reserved.
          </p>
          <p className="lg:hidden text-transparent">HASH</p>
          <p className="text-[12px] lg:text-paragraph text-accent1/50 font-bold">
            Hash v1.5.0-alpha.1
          </p>
        </footer>
      </html>
    </ClerkProvider>
  );
}
