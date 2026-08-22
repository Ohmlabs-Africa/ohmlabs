import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: "--font-montserrat",
  display: "swap",
});

const siteUrl = "https://ohmlabs.africa";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OhmLabs Africa | Software, Data, ERP & AI Solutions",
    template: "%s | OhmLabs Africa",
  },
  description:
    "OhmLabs Africa designs custom software, ERP systems, cloud infrastructure, data pipelines and AI automation for businesses across Africa.",
  keywords: [
    "Software development Kenya",
    "ERP implementation Africa ( Odoo, SAP, Oracle ,Zoho)",
    "AI and automation East Africa",
    "Data engineering Africa",
    "Cloud solutions Africa",
    "digital transformation Africa",
    "business systems Kenya",
  ],
  alternates: {
    canonical: "/",
  },
  applicationName: "OhmLabs Africa",
  authors: [{ name: "OhmLabs Africa" }],
  creator: "OhmLabs Africa",
  publisher: "OhmLabs Africa",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "OhmLabs Africa | Software,Data, ERP & AI Solutions",
    description:
      "Custom software development, ERP modernization, cloud architecture, analytics and AI automation for growing businesses.",
    url: siteUrl,
    siteName: "OhmLabs Africa",
    locale: "en_US",
    type: "website",
    images: [{ url: "/Ohmlabs.svg", width: 512, height: 512, alt: "OhmLabs Africa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OhmLabs Africa | Software, ERP & AI Solutions",
    description:
      "Custom software development, cloud solutions, ERP systems, and AI automation for businesses ready to scale.",
    images: ["/Ohmlabs.svg"],
  },
  icons: {
    icon: [{ url: "/Ohmlabs.svg", type: "image/svg+xml" }],
    apple: [{ url: "/Ohmlabs.svg", type: "image/svg+xml" }],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OhmLabs Africa',
  url: siteUrl,
  logo: `${siteUrl}/Ohmlabs.svg`,
  sameAs: ['https://www.linkedin.com/company/135717760/'],
  email: 'admin@ohmlabs.africa',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  description:
    'OhmLabs Africa builds custom software, ERP systems, cloud infrastructure, data platforms, and AI solutions for businesses across Africa.',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'OhmLabs Africa',
  url: siteUrl,
  description:
    'Software development, ERP implementation, cloud, data engineering and AI automation services in Africa.',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
      </body>
    </html>
  );
}