import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OhmLabs",
  description: "Dynamic workflows built with Next.js & Tailwind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-indigo-500/30">
        {children}
      </body>
    </html>
  );
}