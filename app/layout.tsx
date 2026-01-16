import type React from "react"
import type { Metadata } from "next"
import { GoogleAnalytics } from "@/components/google-analytics"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "Reardon Builders | General Contractor in Concord NH | Since 1985",
    template: "%s | Reardon Builders",
  },
  description:
    "Licensed general contractor serving Concord, NH and Merrimack County since 1985. Custom homes, renovations, and commercial construction. Free estimates.",
  keywords: [
    "general contractor Concord NH",
    "home builder New Hampshire",
    "custom home builder Merrimack County",
    "residential contractor NH",
    "commercial contractor Concord",
    "home renovation NH",
    "kitchen remodeling Concord NH",
    "bathroom remodeling New Hampshire",
    "home additions Merrimack County",
    "licensed contractor NH",
  ],
  authors: [{ name: "Reardon Builders" }],
  creator: "Reardon Builders",
  publisher: "Reardon Builders",
  metadataBase: new URL("https://reardonbuilders.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Reardon Builders | General Contractor in Concord NH",
    description:
      "Licensed general contractor serving Merrimack County since 1985. Custom homes, renovations, and commercial construction.",
    url: "https://reardonbuilders.com",
    siteName: "Reardon Builders",
    images: [
      {
        url: "/hero-exterior.webp",
        width: 1200,
        height: 630,
        alt: "Custom home built by Reardon Builders in Concord NH",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reardon Builders | General Contractor in Concord NH",
    description:
      "Licensed general contractor serving Merrimack County since 1985. Custom homes, renovations, and commercial construction.",
    images: ["/hero-exterior.webp"],
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
  icons: {
    icon: "/ReardonBuilders-favicon-32x32.png",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "Reardon Builders",
  description:
    "Licensed and insured general contractor serving Merrimack County, NH since 1985. Residential and commercial construction, remodeling, and renovations.",
  url: "https://reardonbuilders.com",
  telephone: "603-731-9096",
  email: "info@reardonbuilders.com",
  foundingDate: "1985",
  address: {
    "@type": "PostalAddress",
    streetAddress: "PO Box 1124",
    addressLocality: "Concord",
    addressRegion: "NH",
    postalCode: "03302",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "43.2081",
    longitude: "-71.5376",
  },
  areaServed: [
    { "@type": "City", name: "Concord", addressRegion: "NH" },
    { "@type": "City", name: "Hooksett", addressRegion: "NH" },
    { "@type": "City", name: "Franklin", addressRegion: "NH" },
    { "@type": "City", name: "Bow", addressRegion: "NH" },
    { "@type": "City", name: "Pembroke", addressRegion: "NH" },
    { "@type": "City", name: "Henniker", addressRegion: "NH" },
    { "@type": "City", name: "Hopkinton", addressRegion: "NH" },
    { "@type": "City", name: "Loudon", addressRegion: "NH" },
    { "@type": "City", name: "Northfield", addressRegion: "NH" },
    { "@type": "City", name: "Epsom", addressRegion: "NH" },
    { "@type": "City", name: "Allenstown", addressRegion: "NH" },
    { "@type": "City", name: "New London", addressRegion: "NH" },
    { "@type": "City", name: "Boscawen", addressRegion: "NH" },
    { "@type": "City", name: "Pittsfield", addressRegion: "NH" },
    { "@type": "City", name: "Dunbarton", addressRegion: "NH" },
  ],
  serviceType: [
    "Custom Home Building",
    "Home Renovation",
    "Kitchen Remodeling",
    "Bathroom Remodeling",
    "Home Additions",
    "Commercial Construction",
    "Commercial Remodeling",
  ],
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "14:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/reardonbuilders/",
    "https://www.facebook.com/ReardonBuilders",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
