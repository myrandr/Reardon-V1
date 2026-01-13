import type { Metadata } from "next"
import { GalleryContent } from "./gallery-content"

export const metadata: Metadata = {
  title: "Project Gallery | Custom Homes & Renovations",
  description:
    "View our portfolio of custom homes, renovations, and commercial construction projects in Concord, NH and Merrimack County. Quality craftsmanship since 1985.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Project Gallery | Reardon Builders",
    description:
      "Browse our portfolio of custom homes, kitchen remodels, bathroom renovations, and commercial projects throughout Merrimack County, NH.",
    url: "https://reardonbuilders.com/gallery",
    images: [
      {
        url: "/gallery-04.webp",
        width: 1200,
        height: 630,
        alt: "Custom home project by Reardon Builders",
      },
    ],
  },
}

export default function GalleryPage() {
  return <GalleryContent />
}
