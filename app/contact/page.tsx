import type { Metadata } from "next"
import { ContactContent } from "./contact-content"

export const metadata: Metadata = {
  title: "Contact Us | Free Construction Estimates",
  description:
    "Contact Reardon Builders for a free construction estimate in Concord, NH and Merrimack County. Call 603-731-9096 or fill out our form. Residential and commercial projects welcome.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Reardon Builders | Free Construction Estimates",
    description:
      "Get a free estimate for your construction project in Merrimack County, NH. Custom homes, renovations, and commercial construction.",
    url: "https://reardonbuilders.com/contact",
    images: [
      {
        url: "/hero-exterior.webp",
        width: 1200,
        height: 630,
        alt: "Contact Reardon Builders for construction services in NH",
      },
    ],
  },
}

export default function ContactPage() {
  return <ContactContent />
}
