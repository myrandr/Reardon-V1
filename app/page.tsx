"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Award, Users, Building2 } from "lucide-react"
import Link from "next/link"

const featureProjects = [
  {
    id: 1,
    title: "Residential",
    description: "Custom luxury homes and estates",
    image: "/feature-residential.webp",
    alt: "Residential construction",
    overlayColor: "from-primary/80",
  },
  {
    id: 2,
    title: "Commercial",
    description: "Office buildings and retail spaces",
    image: "/feature-commercial.webp",
    alt: "Commercial construction",
    overlayColor: "from-accent/80",
  },
  {
    id: 3,
    title: "Renovations",
    description: "Transforming existing spaces",
    image: "/feature-renovations.webp",
    alt: "Renovation projects",
    overlayColor: "from-primary/80",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70 z-10" />
        <img
          src="/hero-exterior.webp"
          alt="Custom home built by Reardon Builders"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-6 text-center text-white">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance leading-tight">
            Building Excellence,
            <br />
            <span className="text-accent">One Project at a Time</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto text-balance leading-relaxed">
            Premium construction and architectural services for large-scale commercial and residential developments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg"
            >
              <Link href="/contact">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-6 text-lg bg-transparent"
            >
              <Link href="/gallery">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground font-medium">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">40+</div>
              <div className="text-muted-foreground font-medium">Years Experience</div>
            </div>
           
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6 text-balance">
              Crafting Architectural Excellence Since 1985
            </h2>
            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
              <p>
                Reardon Builders delivers professional construction services across residential and commercial sectors. 
                From custom home builds and remodels to commercial renovations and tenant improvements, we bring quality 
                craftsmanship to projects of any scale. Our commitment to precision, clear communication, and client 
                satisfaction has built our reputation throughout the Greater Merrimack Valley.
              </p>
            </div>
          </div>

          {/* Feature Photos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featureProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${project.overlayColor} to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-serif text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-white/90">{project.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">Follow Our Journey</h2>
            <p className="text-lg text-muted-foreground">Stay updated with our latest projects and insights</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Instagram Card */}
            <a
              href="https://www.instagram.com/reardonbuilders/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="p-8 bg-card hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-2">Instagram</h3>
                  <p className="text-muted-foreground text-sm mb-4">@reardonbuilders</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Follow us for project updates, behind-the-scenes looks, and construction inspiration
                  </p>
                  <div className="inline-flex items-center text-accent font-semibold group-hover:gap-3 gap-2 transition-all">
                    <span>Follow on Instagram</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </Card>
            </a>

            {/* Facebook Card */}
            <a
              href="https://www.facebook.com/ReardonBuilders"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="p-8 bg-card hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-2">Facebook</h3>
                  <p className="text-muted-foreground text-sm mb-4">Reardon Builders</p>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Like our page for project showcases, company news, and community engagement
                  </p>
                  <div className="inline-flex items-center text-accent font-semibold group-hover:gap-3 gap-2 transition-all">
                    <span>Follow on Facebook</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Start Your Project?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-balance leading-relaxed">
            Let's discuss how we can bring your vision to life with our proven expertise and commitment to excellence.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg"
          >
            <Link href="/contact">
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
