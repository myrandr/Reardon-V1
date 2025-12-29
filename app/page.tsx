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

      {/* Social Media Feed Placeholders */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">Follow Our Journey</h2>
            <p className="text-lg text-muted-foreground">Stay updated with our latest projects and insights</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Instagram Feed Placeholder */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center">
                  <span className="text-white text-xl">📷</span>
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-primary">Instagram</h3>
                  <p className="text-muted-foreground text-sm">@reardonbuilders</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="aspect-square overflow-hidden bg-muted">
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <span className="text-4xl">📷</span>
                    </div>
                  </Card>
                ))}
              </div>
              <p className="text-center mt-6 text-sm text-muted-foreground">
                Instagram feed will be integrated via API
              </p>
            </div>

            {/* Facebook Feed Placeholder */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-xl">f</span>
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-primary">Facebook</h3>
                  <p className="text-muted-foreground text-sm">Reardon Builders</p>
                </div>
              </div>
              <Card className="bg-card p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                    <div className="flex gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0" />
                      <div className="flex-1">
                        <div className="h-4 bg-muted rounded w-32 mb-2" />
                        <div className="h-3 bg-muted rounded w-24" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded w-full" />
                      <div className="h-3 bg-muted rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </Card>
              <p className="text-center mt-6 text-sm text-muted-foreground">Facebook feed will be integrated via API</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Start Your Project?</h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto text-balance leading-relaxed">
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
