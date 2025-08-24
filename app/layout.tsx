import type { Metadata, Viewport } from "next";
export const viewport: Viewport = {
  themeColor: "white",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export const metadata:Metadata = {
  manifest:"/manifest.json",
  title:"Quickcrats",
  description:"Quickcrats | Ecommerce"
}

import { Geist, Geist_Mono } from "next/font/google";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { RootChild } from "./(protected)/ui/rootLayoutClient";
import { RegisterServiceWorker } from "./registerService";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "500", "800"]
})

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["200", "500", "800"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>

      <body
        className={`${dm_sans.className} antialiased m-0 bg-[#e7f8ff] text-black overscroll-none select-none`}
      >
        <RegisterServiceWorker></RegisterServiceWorker>
        {/* <SessionProvider> */}
        <RootChild>
          {children}
        </RootChild>
        {/* </SessionProvider> */}
      </body>
    </html>
  )
}
