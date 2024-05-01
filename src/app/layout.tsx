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
      </header>
      <body className={`${inter.className} flex` }>
        <Menu />
        <main className=" flex flex-col gap-5 h-full w-full items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
