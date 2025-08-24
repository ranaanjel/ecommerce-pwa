
import type { Metadata } from "next";
import {  Geist_Mono } from "next/font/google";
import { Inter, DM_Sans } from "next/font/google";
import "@/app/globals.css";
import FallbackUIDesktop from "@/app/(protected)/ui/fallback-desktop";
import { SessionProvider } from "next-auth/react";
const inter = Inter({
  subsets:[ "latin" ], 
  weight:["200", "300","500","800"]
})
const dm_sans = DM_Sans({
  subsets:[ "latin" ], 
  weight:["200", "500","800"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quikcrats",
  description: "Quikcrats | Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <SessionProvider>
        <FallbackUIDesktop>
          {children}
        </FallbackUIDesktop>
        </SessionProvider> 

  );
}
