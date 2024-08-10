import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Outfit } from "next/font/google";

// import { DataProvider } from "@/context/DataContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Briqs",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            {/* <DataProvider></DataProvider> */}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
