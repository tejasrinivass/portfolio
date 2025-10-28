import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teja Srinivas — Full‑Stack Developer & UI/UX",
  description:
    "Portfolio of Teja Srinivas, full‑stack developer with strong UI/UX focus. Projects, skills, and contact.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Teja Srinivas — Full‑Stack Developer & UI/UX",
    description:
      "Portfolio of Teja Srinivas, full‑stack developer with strong UI/UX focus.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teja Srinivas — Full‑Stack Developer & UI/UX",
    description:
      "Portfolio of Teja Srinivas, full‑stack developer with strong UI/UX focus.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-foreground/15`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
