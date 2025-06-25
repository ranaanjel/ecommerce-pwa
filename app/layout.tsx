"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Lusitana, DM_Sans } from "next/font/google";
import "./globals.css";
import FallbackUIDesktop from "./ui/fallback-desktop";
import { createContext, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  subsets:[ "latin" ], 
  weight:["200", "300","500","800"]
})

export const dm_sans = DM_Sans({
  subsets:[ "latin" ], 
  weight:["200", "500","800"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Quikcrats",
  description: "Quikcrats | Ecommerce",
};
export const CrateContext = createContext<{
  crateLength: number;
  setCrateLength: React.Dispatch<React.SetStateAction<number>>;
} | undefined>(undefined);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [crateLength, setCrateLength] = useState(0);
  
  return (
    <html lang="en">
      <body
        className={`${dm_sans.className} antialiased m-0 bg-[#e7f8ff] text-black overscroll-none select-none`}
      >
        <FallbackUIDesktop>
          <CrateContext.Provider value={{crateLength, setCrateLength}} >
          {children}
          </CrateContext.Provider>
        </FallbackUIDesktop>
      </body>
    </html>
  );
}
