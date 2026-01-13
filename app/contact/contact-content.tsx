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
import { Mail, Phone, MapPin, Clock, CheckCircle, XCircle } from "lucide-react"
import { useState, useRef } from "react"

export function ContactContent() {
  const [formData, setFormData] = useState({
    // Contact Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContact: "",
    
    // Project Basics
    projectType: "",
    projectTypeOther: "",
    city: "",
    zipCode: "",
    
    // Project Description
    projectDescription: "",
    
    // Timeline
    timeline: "",
    
    // Referral (optional)
    hearAboutUs: "",
    referralName: "",
    socialPlatform: "",
    otherSource: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const formCardRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Submit to N8N webhook
      const response = await fetch('https://n8n.srv1013834.hstgr.cloud/webhook/reardon-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Submission failed')

      // Fire Google Analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submission', {
          form_type: 'contact',
          project_type: formData.projectType,
          timeline: formData.timeline,
          source: formData.hearAboutUs || 'not_specified'
        })
      }

      setSubmitStatus('success')

      // Scroll to top of form card to show success message
      formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        preferredContact: "",
        projectType: "",
        projectTypeOther: "",
        city: "",
        zipCode: "",
        projectDescription: "",
        timeline: "",
        hearAboutUs: "",
        referralName: "",
        socialPlatform: "",
        otherSource: "",
      })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }
	
  return (
    <div className="min-h-screen">
      <Header pageTitle="Contact" />

      {/* Hero Section */}
      <section className="relative py-32 bg-primary text-primary-foreground overflow-hidden">
		  <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70 z-10" />
		  <img
			src="/hero-blueprint.png"
			alt="Blueprint background"
			className="absolute inset-0 w-full h-full object-cover"
		  />
		  <div className="relative z-20 container mx-auto px-6 text-center">
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
              <Card ref={formCardRef} className="p-8 md:p-12 bg-card">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">
                  Tell Us About Your Project
                </h2>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-green-900">Thank you for contacting us!</h3>
                      <p className="text-sm text-green-800 mt-1">
                        We've received your inquiry and will get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-900">Submission failed</h3>
                      <p className="text-sm text-red-800 mt-1">
                        Please try again or email us directly at info@reardonbuilders.com
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* 1. Contact Info */}
                  <div className="space-y-6">
                    <h3 className="font-semibold text-xl text-foreground border-b pb-2">
                      1. Contact Info <span className="text-sm font-normal text-muted-foreground">(can't build without this)</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-foreground font-medium">
                          First Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="border-input focus:border-accent focus:ring-accent"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-foreground font-medium">
                          Last Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="border-input focus:border-accent focus:ring-accent"
                        />
                      </div>
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
                      <Label className="text-foreground font-medium">
                        Project Type <span className="text-destructive">*</span>
                      </Label>
                      <RadioGroup 
                        value={formData.projectType}
                        onValueChange={(value) => setFormData({ ...formData, projectType: value, projectTypeOther: "" })}
                        className="space-y-3"
                        required
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="custom-home" id="custom-home" />
                          <Label htmlFor="custom-home" className="font-normal cursor-pointer">Custom Home</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="home-addition" id="home-addition" />
                          <Label htmlFor="home-addition" className="font-normal cursor-pointer">Home Addition</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="home-renovation" id="home-renovation" />
                          <Label htmlFor="home-renovation" className="font-normal cursor-pointer">Home Renovation</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="commercial-project" id="commercial-project" />
                          <Label htmlFor="commercial-project" className="font-normal cursor-pointer">Commercial Project</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other-type" />
                          <Label htmlFor="other-type" className="font-normal cursor-pointer">Other</Label>
                        </div>
                      </RadioGroup>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-foreground font-medium">
                          City <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="city"
                          type="text"
                          placeholder="Concord"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="border-input focus:border-accent focus:ring-accent"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zipCode" className="text-foreground font-medium">
                          Zip Code <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="zipCode"
                          type="text"
                          placeholder="03301"
                          required
                          pattern="[0-9]{5}"
                          maxLength={5}
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          className="border-input focus:border-accent focus:ring-accent"
                        />
                      </div>
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

                  {/* 5. How Did You Hear About Us */}
                  <div className="space-y-6">
                    <h3 className="font-semibold text-xl text-foreground border-b pb-2">
                      5. How Did You Hear About Us? <span className="text-sm font-normal text-muted-foreground">(optional)</span>
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
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-12 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request a Consultation'}
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
                    <a href="mailto:info@reardonbuilders.com" className="text-muted-foreground hover:text-accent transition-colors">
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
					  PO Box 1124, Concord NH, 03302
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
              Proudly serving Merrimack County, NH with exceptional construction services
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <Card className="p-8 bg-card">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">Merrimack County, NH</h3>
              <p className="text-muted-foreground text-lg">
                Serving Concord and surrounding communities throughout Merrimack County and beyond.
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
