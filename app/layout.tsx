import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { GlobalContextProvider } from "@/context/store";
import { Toaster } from "@/components/ui/toaster";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
// import { ModalProvider } from "@/providers/modal-provider";
// import { BtlsContextProvider } from "@/context/BtlsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test mySQL",
  description: "Test mySQL & Prisma 5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const queryClient = new QueryClient();

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            // "min-h-screen bg-red-400 font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <GlobalContextProvider>
              {/* <ModalProvider /> */}
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1">{children}</div>
              </div>
              <TailwindIndicator />
              <Toaster />
            </GlobalContextProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
