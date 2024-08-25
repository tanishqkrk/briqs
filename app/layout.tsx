import type { Metadata } from "next";
import { Inter, Raleway, Roboto } from "next/font/google";
import "./globals.css";
import { Outfit } from "next/font/google";
// import { SpeedInsights } from "@vercel/speed-insights/next"
// import { DataProvider } from "@/context/DataContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Outfit({
  subsets: ["latin"],
  // weight: ["100", "300", "400", "500", "700", "900"],
});

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
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        </ThemeProvider> */}
        <AuthProvider>
          {children}
          {/* <DataProvider></DataProvider> */}
        </AuthProvider>
      </body>
    </html>
  );
}
