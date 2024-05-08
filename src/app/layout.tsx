import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "@/asset/scss/globals.scss";
import Menu from "../components/menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ColorFlag",
  description: "My First next project",
  icons: {
    icon: "/favicon.ico",
  }
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${inter.className} flex` }>
        <Toaster position="top-right" containerStyle={{ textAlign: "end" }} />
        <Menu />
        <main className="relative flex flex-col gap-5 h-full w-full items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
