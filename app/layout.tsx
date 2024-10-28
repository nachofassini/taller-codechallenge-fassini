import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "./_components/Header";
import { ThemeModeScript } from "flowbite-react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Payments dashboard | Taller",
  description: "Payments dashboard for Taller interview | Ignacio Fassini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <html lang="en" className="h-screen max-h-screen">
        <head>
          <ThemeModeScript />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased h-full max-h-dvh overflow-y-scroll w-screen font-[family-name:var(--font-geist-sans)] bg-gray-100 dark:bg-black flex flex-col`}
        >
          <Header />
          <main className="flex w-full md:max-w-screen-xl flex-grow mx-auto md:my-12 p-4 sm:p-12 md:border md:rounded-lg md:shadow-lg text-gray-700 dark:text-white">
            {children}
          </main>
        </body>
      </html>
    </html>
  );
}
