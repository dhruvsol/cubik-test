import "@ui/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {cn} from "@ui/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cubik Test",
  description: "Submitted by Sayan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
      )}>{children}</body>
    </html>
  );
}
