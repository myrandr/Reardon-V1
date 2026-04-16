"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import type { Photo, Project, Category } from "@/lib/gallery"

type InitialFilter = "residential" | "commercial" | "renovation" | null

const PROJECT_TYPE_CODE: Record<NonNullable<InitialFilter>, string> = {
  residential: "RES",
  commercial: "COM",
  renovation: "REN",
}

const ACTIVE_TYPE_LABEL: Record<NonNullable<InitialFilter>, string> = {
  residential: "Residential Projects",
  commercial: "Commercial Projects",
  renovation: "Renovation Projects",
}

interface GalleryContentProps {
  allPhotos: Photo[]
  projects: Project[]
  initialFilter?: InitialFilter
}

type ViewMode = "projects" | "all"
type FilterCategory = Category | "all"

const CATEGORY_LABELS: Record<Category, string> = {
  exterior: "Exterior",
  interior: "Interior",
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  basement: "Basement",
  garage: "Garage",
  commercial: "Commercial",
  construction: "Construction",
  outdoor: "Outdoor",
}

const ALL_CATEGORIES: Category[] = [
  "exterior",
  "interior",
  "kitchen",
  "bathroom",
  "basement",
  "garage",
  "commercial",
  "construction",
  "outdoor",
]

export function GalleryContent({ allPhotos, projects, initialFilter = null }: GalleryContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(initialFilter ? "all" : "projects")
  const [activeTypeFilter, setActiveTypeFilter] = useState<InitialFilter>(initialFilter)
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxPhotos, setLightboxPhotos] = useState<Photo[]>([])
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const basePhotos =
    activeTypeFilter === null
      ? allPhotos
      : allPhotos.filter((p) => p.project_type_code === PROJECT_TYPE_CODE[activeTypeFilter])

  const filteredPhotos =
    categoryFilter === "all"
      ? basePhotos
      : basePhotos.filter((p) => p.category === categoryFilter)

  const filteredProjects = projects

  const openLightbox = (photos: Photo[], index: number) => {
    setLightboxPhotos(photos)
    setCurrentPhotoIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % lightboxPhotos.length)
  }

  const prevImage = () => {
    setCurrentPhotoIndex(
      (prev) => (prev - 1 + lightboxPhotos.length) % lightboxPhotos.length
    )
  }

  // Get categories that actually have photos
  const activeCategories = ALL_CATEGORIES.filter((cat) =>
    allPhotos.some((p) => p.category === cat)
  )

  return (
    <div className="min-h-screen bg-[#f7f4f2]">
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
            Explore our collection of exceptional construction projects that
            showcase our commitment to quality and craftsmanship
          </p>
        </div>
      </section>

      {/* View Mode Tabs */}
      <section className="py-8 bg-[#f7f4f2] border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => { setViewMode("projects"); setActiveTypeFilter(null); }}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                viewMode === "projects"
                  ? "bg-[#ae7400] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              By Project
            </button>
            <button
              onClick={() => setViewMode("all")}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                viewMode === "all"
                  ? "bg-[#ae7400] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All Photos
            </button>
          </div>
        </div>
      </section>

      {/* Active type filter breadcrumb */}
      {activeTypeFilter !== null && (
        <div className="bg-[#f7f4f2] pt-4 pb-0">
          <div className="container mx-auto px-6 flex justify-center">
            <p className="text-sm text-[#1a2744]/70">
              Showing:{" "}
              <span className="font-medium text-[#1a2744]">
                {ACTIVE_TYPE_LABEL[activeTypeFilter]}
              </span>
              <button
                onClick={() => { setActiveTypeFilter(null); setViewMode("all"); }}
                className="ml-3 px-4 py-1 rounded-full text-sm font-medium border border-[#ae7400] bg-white text-[#1a2744] hover:bg-gray-50 transition-colors"
              >
                Clear Filter
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Category Filter (All Photos view only) */}
      {viewMode === "all" && (
        <section className="py-6 bg-[#f7f4f2]">
          <div className="container mx-auto px-6">
            <div className="flex justify-center">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as FilterCategory)}
                className="appearance-none pl-4 pr-8 py-2 rounded-full text-sm font-medium border border-[#ae7400] bg-white text-[#1a2744] focus:outline-none focus:ring-2 focus:ring-[#ae7400] cursor-pointer bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22><path d=%22M1 1l5 5 5-5%22 stroke=%22%23ae7400%22 stroke-width=%221.5%22 fill=%22none%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')] bg-no-repeat bg-[right_0.75rem_center]"
              >
                <option value="all">All Categories</option>
                {activeCategories.map((category) => (
                  <option key={category} value={category}>
                    {CATEGORY_LABELS[category]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="py-12 bg-[#f7f4f2]">
        <div className="container mx-auto px-6">
          {viewMode === "projects" ? (
            /* Projects View */
            selectedProject ? (
              /* Project Detail View */
              <div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="mb-6 flex items-center gap-2 text-gray-700 hover:text-[#ae7400] font-medium transition-colors"
                >
                  ← Back to Projects
                </button>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8">
                  {selectedProject.photos[0]?.project_name_common || selectedProject.project_name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {selectedProject.photos.map((photo, index) => (
                    <Card
                      key={photo.filename}
                      className="overflow-hidden group cursor-pointer bg-white"
                      onClick={() => openLightbox(selectedProject.photos, index)}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <img
                          src={photo.drive_url}
                          alt={photo.alt_text || photo.filename}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-12 h-12 rounded-full bg-[#ae7400] flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-white"
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
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => {
                  const heroPhoto = project.photos[0]
                  if (!heroPhoto) return null

                  return (
                    <Card
                      key={project.project_id}
                      className="overflow-hidden group cursor-pointer bg-white"
                      onClick={() => { setSelectedProject(project); setActiveTypeFilter(null); }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <img
                          src={heroPhoto.drive_url}
                          alt={heroPhoto.alt_text || project.project_name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Photo count badge */}
                        <div className="absolute top-3 right-3 bg-black/70 text-white text-sm px-3 py-1 rounded-full z-20">
                          {project.photos.length}{" "}
                          {project.photos.length === 1 ? "photo" : "photos"}
                        </div>
                        {/* Hover overlay */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-12 h-12 rounded-full bg-[#ae7400] flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-white"
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
                      <div className="p-4">
                        <h3 className="font-serif text-lg font-semibold text-gray-900">
                          {project.photos[0].project_name_common || project.project_name}
                        </h3>
                      </div>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-12">
                No projects available yet.
              </p>
            )
          ) : /* All Photos View */
          filteredPhotos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredPhotos.map((photo, index) => (
                <Card
                  key={photo.filename}
                  className="overflow-hidden group cursor-pointer bg-white"
                  onClick={() => openLightbox(filteredPhotos, index)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <img
                      src={photo.drive_url}
                      alt={photo.alt_text || photo.filename}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-20">
                      {CATEGORY_LABELS[photo.category]}
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-[#ae7400] flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
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
          ) : (
            <p className="text-center text-gray-500 py-12">
              No photos in this category.
            </p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && lightboxPhotos.length > 0 && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-50"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {lightboxPhotos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-50"
                aria-label="Previous image"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
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
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          <div
            className="flex flex-col items-center max-w-7xl w-full mx-auto px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxPhotos[currentPhotoIndex].drive_url}
              alt={
                lightboxPhotos[currentPhotoIndex].alt_text ||
                lightboxPhotos[currentPhotoIndex].filename
              }
              className="max-h-[80vh] max-w-full w-auto h-auto object-contain"
            />
            <p className="text-center text-white mt-4 text-lg">
              {lightboxPhotos[currentPhotoIndex].alt_text ||
                lightboxPhotos[currentPhotoIndex].project_name_common ||
                lightboxPhotos[currentPhotoIndex].project_name}{" "}
              ({currentPhotoIndex + 1} / {lightboxPhotos.length})
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
