import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import PageMotion from "@/components/PageMotion";

export const metadata: Metadata = {
  title: "Sarvesh M — Finance • Strategy • Creativity",
  description: "The personal portfolio of Sarvesh M, combining finance, business thinking and creative execution.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteChrome /><PageMotion>{children}</PageMotion></body></html>;
}
