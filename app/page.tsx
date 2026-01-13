import type { Metadata } from "next"
import { HomeContent } from "./home-content"

export const metadata: Metadata = {
  title: "Reardon Builders | General Contractor Concord NH | Since 1985",
  description:
    "Trusted general contractor in Concord, NH serving Merrimack County since 1985. Custom homes, renovations, kitchen and bathroom remodeling, and commercial construction. Free estimates.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Reardon Builders | General Contractor Concord NH",
    description:
      "Trusted general contractor serving Merrimack County since 1985. Custom homes, renovations, and commercial construction. 500+ projects completed.",
    url: "https://reardonbuilders.com",
    images: [
      {
        url: "/hero-exterior.webp",
        width: 1200,
        height: 630,
        alt: "Custom home built by Reardon Builders in Concord NH",
      },
    ],
  },
}

export default function HomePage() {
  return <HomeContent />
}
