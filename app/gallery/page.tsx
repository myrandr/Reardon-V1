"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

const galleryImages = [
  {
    src: "/gallery-04.webp",
    alt: "Custom home front elevation",
  },
  {
    src: "/gallery-03.webp",
    alt: "Custom home exterior",
  },
  {
    src: "/gallery-01.webp",
    alt: "Custom mudroom with built-in storage",
  },
  {
    src: "/gallery-02.webp",
    alt: "Butler's pantry with custom cabinetry",
  },
  {
    src: "/gallery-05.webp",
    alt: "Modern kitchen with large island",
  },
  {
    src: "/gallery-06.webp",
    alt: "Kitchen detail with custom tile backsplash",
  },
  {
    src: "/gallery-08.webp",
    alt: "Kitchen with professional appliances",
  },
  {
    src: "/gallery-07.webp",
    alt: "Dining room with custom millwork",
  },
  {
    src: "/gallery-09.webp",
    alt: "Master bedroom suite",
  },
  {
    src: "/gallery-11.webp",
    alt: "Custom bathroom with dual vanity",
  },
  {
    src: "/gallery-10.webp",
    alt: "Covered front porch",
  },
]

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <div className="min-h-screen bg-background">
		<Header pageTitle="Our Portfolio" />

      {/* Hero Section */}
		<section className="relative pt-32 pb-20 bg-primary overflow-hidden">
		  <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70 z-10" />
		  <img
			src="/hero-blueprint.png"
			alt="Blueprint background"
			className="absolute inset-0 w-full h-full object-cover"
		  />
		  <div className="relative z-20 container mx-auto px-6 text-center text-primary-foreground">
			<h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
			  Our <span className="text-accent">Portfolio</span>
			</h1>
			<p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto text-balance leading-relaxed">
			  Explore our collection of exceptional construction projects that showcase our commitment to quality and
			  craftsmanship
			</p>
		  </div>
		</section>

      {/* Gallery Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <Card key={index} className="overflow-hidden group cursor-pointer" onClick={() => openLightbox(index)}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-accent-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-50"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-50"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-50"
            aria-label="Next image"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="max-w-7xl max-h-[90vh] mx-auto px-20" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[currentImageIndex].src || "/placeholder.svg"}
              alt={galleryImages[currentImageIndex].alt}
              className="w-full h-full object-contain"
            />
            <p className="text-center text-white mt-4 text-lg">
              {galleryImages[currentImageIndex].alt} ({currentImageIndex + 1} / {galleryImages.length})
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
