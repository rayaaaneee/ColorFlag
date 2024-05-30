import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "@/asset/scss/globals.scss";
import Menu from "../components/menu";
import { Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import LoadingFallback from "@/components/boundaries/loading-fallback";
import CustomErrorBoundary from "@/components/boundaries/error-boundary";

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
        <main className="relative flex flex-col gap-5 h-full w-full items-center justify-center overflow-hidden">
          {/* <ErrorBoundary errorComponent={<CustomErrorBoundary />}> */}
            <Suspense fallback={<LoadingFallback />}>
              {children}
            </Suspense>
          {/* </ErrorBoundary> */}
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
