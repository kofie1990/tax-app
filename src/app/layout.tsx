import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghana Tax Calculator 2025",
  description: "A comprehensive salary/tax calculator for Ghana based on current GRA tax bands and SSNIT regulations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-atelier-accent/30 selection:text-atelier-light`}
      >
        <div className="relative min-h-screen flex flex-col bg-atelier-dark text-atelier-light overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
