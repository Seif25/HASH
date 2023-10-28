import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

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
    // TODO: Add clerk provider
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${rubik.className} app`}>
        <main>
          <QueryProvider>{children}</QueryProvider>
        </main>
      </body>
    </html>
  );
}
