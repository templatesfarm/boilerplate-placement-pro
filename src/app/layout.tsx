"use client";

// import type { Metadata } from "next";
import "./globals.css";

// import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "portfolioui";

// const spaceGrotestk = Space_Grotesk({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Deepak Pahawa Portfolio",
//   description: "Full Stack Developer",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="system"
          disableTransitionOnChange
        >
          <AuthProvider
            accessKeyFromProject={
              process.env.NEXT_PUBLIC_PORTFOLIO_ACCESS_KEY ?? ""
            }
          >
            <main className="bg-white text-foreground">{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
