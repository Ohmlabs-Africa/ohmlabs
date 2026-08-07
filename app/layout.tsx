import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";


const montserrat = Montserrat({ subsets: ['latin'],variable: "--font-montserrat",
  display: "swap", });

export const metadata: Metadata = {
  title: "OhmLabs",
  description: "Ohm Labs is a software development and consulting company that specializes in building scalable web applications, business systems, data pipelines, and AI solutions.",
  icons: {
    icon: [
      { url: "/Ohm-logo.png", type: "image/png" }, 
    ],
    apple: [
      { url: "/Ohm-logo.png", type: "image/png", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased selection:bg-indigo-500/30 ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}