import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "@/asset/scss/globals.scss";
import Menu from "../components/menu";
import { Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import LoadingFallback from "@/components/boundaries/loading-fallback";
import CustomErrorBoundary from "@/components/boundaries/error-boundary";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "WorldMaster";
const APP_DEFAULT_TITLE = "WorldMaster";
const APP_TITLE_TEMPLATE = "%s - WorldMaster";
const APP_DESCRIPTION = "WorldMaster is a Progressive Web Application (PWA) built with Next.js, Tailwind CSS, and TypeScript.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
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
