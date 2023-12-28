import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/app/providers/QueryProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "./utils/theme/theme-provider";
import NotificationAlert from "./components/shared/schedule/NotificationAlert";
import { SocketProvider } from "./providers/SocketProvider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"],
  subsets: ["latin", "devanagari", "latin-ext"],
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
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
      <QueryProvider>
        <html lang="en">
          <head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </head>
          <body className={`${poppins.className} app pb-10`}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {/* <NotificationAlert /> */}
              {/* <SocketProvider> */}
              <main>{children}</main>
              {/* </SocketProvider> */}
            </ThemeProvider>
            <SpeedInsights />
            <Toaster />
            <SonnerToaster />
          </body>
          {/* <footer className="grid grid-cols-2 lg:flex items-center justify-center lg:justify-between p-5 bg-dark pb-24 lg:pb-5">
            <Image src="/logo.png" alt="hash" width={50} height={50} />
            <p className="text-[12px] lg:text-paragraph text-accent1/50">
            &copy; {new Date().getFullYear()} Hash. All rights reserved.
            </p>
            <p className="lg:hidden text-transparent">HASH</p>
            <p className="text-[12px] lg:text-paragraph text-accent1/50 font-bold">
            Hash v1.5.0-alpha.1
            </p>
          </footer> */}
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
