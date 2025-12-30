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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    // Contact Info
    fullName: "",
    email: "",
    phone: "",
    preferredContact: "",
    
    // Project Basics
    projectType: "",
    projectTypeOther: "",
    projectLocation: "",
    
    // Project Description
    projectDescription: "",
    
    // Timeline
    timeline: "",
    
    // Budget (optional)
    budgetRange: "",
    
    // Referral (optional)
    hearAboutUs: "",
    referralName: "",
    socialPlatform: "",
    otherSource: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic will be added here (N8N webhook)
    console.log("Form submitted:", formData)
  }
	
  return (
    <div className="min-h-screen">
      <Header pageTitle="Contact" />

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
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">
                  Let's discuss your Project
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* 1. Contact Info */}
                  <div className="space-y-6">
                    <h3 className="font-semibold text-xl text-foreground border-b pb-2">
                      1. Contact Info <span className="text-sm font-normal text-muted-foreground">(can't build without this)</span>
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-foreground font-medium">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="border-input focus:border-accent focus:ring-accent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground font-medium">
                          Email <span className="text-destructive">*</span>
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
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground font-medium">
                        Preferred Contact Method <span className="text-destructive">*</span>
                      </Label>
                      <RadioGroup 
                        value={formData.preferredContact}
                        onValueChange={(value) => setFormData({ ...formData, preferredContact: value })}
                        className="flex gap-6"
                        required
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="call" id="call" />
                          <Label htmlFor="call" className="font-normal cursor-pointer">Call</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="text" id="text" />
                          <Label htmlFor="text" className="font-normal cursor-pointer">Text</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="email-contact" />
                          <Label htmlFor="email-contact" className="font-normal cursor-pointer">Email</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* 2. Project Basics */}
                  <div className="space-y-6">
                    <h3 className="font-semibold text-xl text-foreground border-b pb-2">
                      2. Project Basics <span className="text-sm font-normal text-muted-foreground">(the big picture)</span>
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="projectType" className="text-foreground font-medium">
                        Project Type <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => setFormData({ ...formData, projectType: value, projectTypeOther: "" })}
                        required
                      >
                        <SelectTrigger className="border-input focus:border-accent focus:ring-accent">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remodel-addition">Home Remodel/Addition</SelectItem>
                          <SelectItem value="new-home">New Home Build</SelectItem>
                          <SelectItem value="commercial">Commercial Construction</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Conditional: Other Project Type */}
                    {formData.projectType === "other" && (
                      <div className="space-y-2 animate-in fade-in duration-300">
                        <Label htmlFor="projectTypeOther" className="text-foreground font-medium">
                          Please specify project type <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="projectTypeOther"
                          type="text"
                          placeholder="Describe your project type"
                          required
                          value={formData.projectTypeOther}
                          onChange={(e) => setFormData({ ...formData, projectTypeOther: e.target.value })}
                          className="border-input focus:border-accent focus:ring-accent"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="projectLocation" className="text-foreground font-medium">
                        Project Location <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="projectLocation"
                        type="text"
                        placeholder="City, State (e.g., Concord, NH)"
                        required
                        value={formData.projectLocation}
                        onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                        className="border-input focus:border-accent focus:ring-accent"
                      />
                    </div>
                  </div>

                  {/* 3. Project Description */}
                  <div className="space-y-6">
                    <h3 className="font-semibold text-xl text-foreground border-b pb-2">
                      3. What Are You Looking To Do?
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="projectDescription" className="text-foreground font-medium">
                        Brief Project Description <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="projectDescription"
                        placeholder="Tell us what you want to build or change, and why."
                        rows={5}
                        required
                        value={formData.projectDescription}
                        onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                        className="border-input focus:border-accent focus:ring-accent resize-none"
                      />
                      <p className="text-sm text-muted-foreground italic">
                        Don't worry about being perfect — we'll help you refine the details.
                      </p>
                    </div>
                  </div>

                  {/* 4. Timeline */}
                  <div className="space-y-6">
                    <h3 className="font-semibold text-xl text-foreground border-b pb-2">
                      4. Timeline <span className="text-sm font-normal text-muted-foreground">(expectations check)</span>
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="timeline" className="text-foreground font-medium">
                        When would you like to start? <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                        required
                      >
                        <SelectTrigger className="border-input focus:border-accent focus:ring-accent">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="1-3-months">1–3 months</SelectItem>
                          <SelectItem value="3-6-months">3–6 months</SelectItem>
                          <SelectItem value="exploring">Just exploring/timeline still TBD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* 5. Budget Range */}
                  <div className="space-y-6">
                    <h3 className="font-semibold text-xl text-foreground border-b pb-2">
                      5. Budget Range <span className="text-sm font-normal text-muted-foreground">(optional but highly recommended)</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">You'll save everyone time.</p>

                    <div className="space-y-2">
                      <Label htmlFor="budgetRange" className="text-foreground font-medium">
                        Estimated Budget Range
                      </Label>
                      <Select
                        value={formData.budgetRange}
                        onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}
                      >
                        <SelectTrigger className="border-input focus:border-accent focus:ring-accent">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-25k">Under $25k</SelectItem>
                          <SelectItem value="25k-75k">$25k–$75k</SelectItem>
                          <SelectItem value="75k-150k">$75k–$150k</SelectItem>
                          <SelectItem value="150k-plus">$150k+</SelectItem>
                          <SelectItem value="not-sure">Not sure yet</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground italic">
                        Please note, this is a general range and non-committal
                      </p>
                    </div>
                  </div>

                  {/* 6. How Did You Hear About Us */}
                  <div className="space-y-6">
                    <h3 className="font-semibold text-xl text-foreground border-b pb-2">
                      6. How Did You Hear About Us? <span className="text-sm font-normal text-muted-foreground">(optional)</span>
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="hearAboutUs" className="text-foreground font-medium">
                        Source
                      </Label>
                      <Select
                        value={formData.hearAboutUs}
                        onValueChange={(value) => setFormData({ 
                          ...formData, 
                          hearAboutUs: value,
                          referralName: "",
                          socialPlatform: "",
                          otherSource: ""
                        })}
                      >
                        <SelectTrigger className="border-input focus:border-accent focus:ring-accent">
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google">Google</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="social-media">Social Media</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Conditional: Referral Name */}
                    {formData.hearAboutUs === "referral" && (
                      <div className="space-y-2 animate-in fade-in duration-300">
                        <Label htmlFor="referralName" className="text-foreground font-medium">
                          Who referred you?
                        </Label>
                        <Input
                          id="referralName"
                          type="text"
                          placeholder="Name of person or company"
                          value={formData.referralName}
                          onChange={(e) => setFormData({ ...formData, referralName: e.target.value })}
                          className="border-input focus:border-accent focus:ring-accent"
                        />
                      </div>
                    )}

                    {/* Conditional: Social Media Platform */}
                    {formData.hearAboutUs === "social-media" && (
                      <div className="space-y-2 animate-in fade-in duration-300">
                        <Label htmlFor="socialPlatform" className="text-foreground font-medium">
                          Which platform?
                        </Label>
                        <Select
                          value={formData.socialPlatform}
                          onValueChange={(value) => setFormData({ ...formData, socialPlatform: value })}
                        >
                          <SelectTrigger className="border-input focus:border-accent focus:ring-accent">
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Conditional: Other Source */}
                    {formData.hearAboutUs === "other" && (
                      <div className="space-y-2 animate-in fade-in duration-300">
                        <Label htmlFor="otherSource" className="text-foreground font-medium">
                          Please tell us how you found us
                        </Label>
                        <Input
                          id="otherSource"
                          type="text"
                          placeholder="How did you hear about us?"
                          value={formData.otherSource}
                          onChange={(e) => setFormData({ ...formData, otherSource: e.target.value })}
                          className="border-input focus:border-accent focus:ring-accent"
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-12 py-6 text-lg"
                  >
                    Request a Consultation
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
                    <a href="mailto:sales@reardonbuilders.com" className="text-muted-foreground hover:text-accent transition-colors">
					  Contact via Email
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
                        href="mailto:sales@reardonbuilders.com"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        sales@reardonbuilders.com
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
					  Concord, NH 03301
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
                <h3 className="font-serif text-2xl font-bold mb-4">Free Consultation</h3>
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
              Proudly serving the Greater Merrimack Valley with exceptional construction services
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <Card className="p-8 bg-card">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">Greater Merrimack Valley</h3>
              <p className="text-muted-foreground text-lg">
                Serving Concord, Manchester, Nashua, and surrounding communities throughout the Merrimack Valley region.
              </p>
            </Card>
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
