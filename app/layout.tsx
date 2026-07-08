import type { Metadata } from "next";
import "./globals.css"; // Your Tailwind styles loaded globally

export const metadata: Metadata = {
  title: "PlatformX",
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