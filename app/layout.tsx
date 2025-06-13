
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Lusitana, DM_Sans } from "next/font/google";
import "./globals.css";
import FallbackUIDesktop from "./ui/fallback-desktop";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dm_sans.className} antialiased m-0 bg-[#e7f8ff] text-black overscroll-none`}
      >
        <FallbackUIDesktop>
          {children}
        </FallbackUIDesktop>
      </body>
    </html>
  );
}
