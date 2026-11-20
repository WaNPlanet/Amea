import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Nunito, Great_Vibes } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["300","400","500","600"], style: ["normal","italic"], variable: "--serif" });
const sans = Nunito({ subsets: ["latin"], variable: "--sans" });
const script = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--script" });

export const metadata: Metadata = {
  title: "Our Wedding · Order of Service",
  description: "With love, we invite you to celebrate our wedding day.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#2d4a38" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} ${script.variable}`}>{children}</body>
    </html>
  );
}
