import type { Metadata } from "next";
import "./globals.css";
import DotsBackground from "@/components/DotsBackground";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "portfolio-nextjs",
  description: "My Portfolio Website",
};

export default function RootLayout({ children }:Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <body className="overflow-y-scroll">
        <Header/>
        <DotsBackground/>
        {children}
      </body>
    </html>
  );
}
