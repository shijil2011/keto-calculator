import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/toaster"
import { SchemaMarkup } from "@/components/schema-markup"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Keto Calculator | Free Macro Calculator for Ketogenic Diet",
    template: "%s | Keto Calculator",
  },
  description:
    "Free Keto Calculator to find your perfect macros for fat loss, maintenance, or muscle gain. Get calories, fat, protein, and carb targets instantly.",
  generator: "v0.app",
  keywords: [
    "keto calculator",
    "keto macro calculator",
    "keto diet calculator",
    "ketogenic calculator",
    "keto carb calculator",
    "free keto calculator",
    "keto weight loss calculator",
    "macro calculator",
    "ketogenic diet macros",
    "keto macronutrients",
  ],
  authors: [{ name: "Keto Calculator Team" }],
  creator: "Keto Calculator",
  publisher: "Keto Calculator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ketocalculator.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ketocalculator.vercel.app",
    title: "Keto Calculator | Free Macro Calculator for Ketogenic Diet",
    description:
      "Free Keto Calculator to find your perfect macros for fat loss, maintenance, or muscle gain. Get calories, fat, protein, and carb targets instantly.",
    siteName: "Keto Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Keto Calculator - Free Macro Calculator for Ketogenic Diet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keto Calculator | Free Macro Calculator for Ketogenic Diet",
    description: "Free Keto Calculator to find your perfect macros for fat loss, maintenance, or muscle gain.",
    images: ["/og-image.png"],
    creator: "@ketocalculator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "GVEP02H-vizy8NQQlzcud9EZ9wxDjVfPQpaS2u_FlKM",
    yandex: "your-yandex-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://ketocalculator.vercel.app" />
        <meta name="theme-color" content="#059669" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Keto Calculator" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        
        <meta name="google-site-verification" content="GVEP02H-vizy8NQQlzcud9EZ9wxDjVfPQpaS2u_FlKM" />
      </head>
      <body className={`font-sans ${inter.variable}`}>
        <SchemaMarkup type="website" />
        <SchemaMarkup type="webapp" />
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster />
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MYK2L6DFYT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MYK2L6DFYT');
          `}
        </Script>
      </body>
    </html>
  )
}
