import type { Metadata } from "next";
import "./globals.css";

// import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";

// const spaceGrotestk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deepak Pahawa Portfolio",
  description: "Full Stack Developer",
};

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
          <main className="bg-white text-foreground">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
