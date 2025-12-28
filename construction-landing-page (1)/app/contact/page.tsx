"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic will be added here
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            Let's Build Something <span className="text-accent">Extraordinary</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto text-balance leading-relaxed">
            Get in touch to discuss your next project. Our team is ready to turn your vision into reality.
          </p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 md:p-12 bg-card">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8">Start Your Project</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground font-medium">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border-input focus:border-accent focus:ring-accent"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-medium">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-input focus:border-accent focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground font-medium">
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="border-input focus:border-accent focus:ring-accent"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectType" className="text-foreground font-medium">
                        Project Type <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                        required
                      >
                        <SelectTrigger className="border-input focus:border-accent focus:ring-accent">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential-new">Residential - New Construction</SelectItem>
                          <SelectItem value="residential-renovation">Residential - Renovation</SelectItem>
                          <SelectItem value="commercial-new">Commercial - New Construction</SelectItem>
                          <SelectItem value="commercial-renovation">Commercial - Renovation</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="mixed-use">Mixed-Use Development</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground font-medium">
                      Project Details <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="border-input focus:border-accent focus:ring-accent resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-12 py-6 text-lg"
                  >
                    Submit Request
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="p-8 bg-card">
                <h3 className="font-serif text-2xl font-bold text-primary mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                      <a href="tel:+15551234567" className="text-muted-foreground hover:text-accent transition-colors">
                        (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Email</h4>
                      <a
                        href="mailto:info@reardonbuilders.com"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        info@reardonbuilders.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Office</h4>
                      <p className="text-muted-foreground">
                        123 Builder's Lane
                        <br />
                        Suite 400
                        <br />
                        Springfield, ST 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Business Hours</h4>
                      <p className="text-muted-foreground">
                        Monday - Friday: 7:00 AM - 6:00 PM
                        <br />
                        Saturday: 8:00 AM - 2:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-primary text-primary-foreground">
                <h3 className="font-serif text-2xl font-bold mb-4">Request a Consultation</h3>
                <p className="text-primary-foreground/90 leading-relaxed mb-6">
                  Schedule a free consultation with our team to discuss your project goals, timeline, and budget. We'll
                  provide expert guidance every step of the way.
                </p>
                <div className="text-3xl font-bold text-accent mb-2">Free Estimates</div>
                <p className="text-sm text-primary-foreground/80">No obligation, comprehensive project assessment</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Areas We Serve</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Proudly serving communities across the region with exceptional construction services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                region: "Northern District",
                cities: ["Springfield", "Northville", "Lakeside", "Greenfield", "Maple Grove"],
              },
              {
                region: "Eastern District",
                cities: ["Riverside", "Eastwood", "Harbor Point", "Clearwater", "Bayview"],
              },
              {
                region: "Southern District",
                cities: ["Southbridge", "Oakmont", "Hillcrest", "Valley View", "Sunset Hills"],
              },
              {
                region: "Western District",
                cities: ["Westfield", "Mountain View", "Canyon Ridge", "Desert Springs", "Pine Valley"],
              },
            ].map((area, index) => (
              <Card key={index} className="p-6 bg-card hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-bold text-primary mb-4">{area.region}</h3>
                <ul className="space-y-2">
                  {area.cities.map((city, cityIndex) => (
                    <li key={cityIndex} className="text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {city}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-lg">
              Don't see your area listed?{" "}
              <a href="#" className="text-accent hover:underline font-semibold">
                Contact us
              </a>{" "}
              to discuss your project location.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
