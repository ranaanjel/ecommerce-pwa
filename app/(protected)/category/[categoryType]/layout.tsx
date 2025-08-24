import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quikcrats",
  description: "Quikcrats | Ecommerce"
}


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
        {children}
    </div>
  )
}
