import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobPack AI | Precision Engineering Job Packs",
  description: "AI-powered platform for oilfield industry diagram extraction and job pack generation. Upload your stick diagram — AI reads every tool, shear pressure, and parameter.",
  keywords: ["job pack", "oilfield", "AI extraction", "liner hanger", "stick diagram", "import tool"],
  openGraph: {
    title: "JobPack AI | Precision Engineering Job Packs",
    description: "AI-powered platform for oilfield industry diagram extraction and job pack generation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
