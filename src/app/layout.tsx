import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import WhatsAppFAB from "@/components/WhatsAppFAB";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const baseUrl = "https://tradepivotgroup.com"; // Update with actual domain if different

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Tradepivot | Engineering & Construction Excellence",
    template: "%s | Tradepivot",
  },
  description: "TradePivot Melds Zimbabwean ingenuity with global structural standards. Leading construction company delivering top-tier finished products in Architecture, Civil Engineering, and Project Management.",
  keywords: [
    "Construction Zimbabwe",
    "Architecture Harare",
    "Civil Engineering Zimbabwe",
    "Project Management Construction",
    "Structural Engineering",
    "Tradepivot",
    "Building Contractor Zimbabwe",
  ],
  authors: [{ name: "Tradepivot Team" }],
  creator: "Tradepivot",
  publisher: "Tradepivot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_ZW",
    url: baseUrl,
    siteName: "Tradepivot",
    title: "Tradepivot | Engineering & Construction Excellence",
    description: "Leading construction company delivering top-tier finished products in Architecture, Civil Engineering, and Project Management.",
    images: [
      {
        url: "/images/Background.jpg",
        width: 1200,
        height: 630,
        alt: "Tradepivot Construction Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tradepivot | Engineering & Construction Excellence",
    description: "Leading construction company in Zimbabwe for Architecture and Civil Engineering.",
    images: ["/images/Background.jpg"],
  },
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ConstructionBusiness",
    "name": "Tradepivot",
    "image": `${baseUrl}/images/Background.jpg`,
    "@id": `${baseUrl}`,
    "url": baseUrl,
    "telephone": "+263777777777", // Replace with actual
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Harare",
      "addressLocality": "Harare",
      "addressCountry": "ZW"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -17.8252,
      "longitude": 31.0335
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://www.facebook.com/tradepivot",
      "https://www.instagram.com/tradepivot",
      "https://www.linkedin.com/company/tradepivot"
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body 
        className="min-h-full flex flex-col grainy-overlay font-outfit"
        suppressHydrationWarning
      >
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
        <WhatsAppFAB />
      </body>
    </html>
  );
}
