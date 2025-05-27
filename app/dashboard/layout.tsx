
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Lusitana, DM_Sans } from "next/font/google";
import "@/app/globals.css";
import FallbackUIDesktop from "@/app/ui/fallback-desktop";
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
    
        <FallbackUIDesktop>
          {children}
        </FallbackUIDesktop>

  );
}
