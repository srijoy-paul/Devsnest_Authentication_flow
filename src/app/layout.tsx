import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/Navbar";
import UserInfobar from "./_components/UserInfobar";
import Offersbar from "./_components/Offersbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Devsnest Ecom",
  description: "Made by Srijoy Paul",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} flex flex-col`}>
        <Navbar />
        <Offersbar />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
