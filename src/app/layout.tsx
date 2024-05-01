import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/asset/scss/globals.scss";
import Menu from "../components/menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ColorFlag",
  description: "My First next project",
  icons: {
    icon: "/favicon.png",
  }
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <header>
        <Menu />
      </header>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export default RootLayout;
