"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface HeaderProps {
  pageTitle?: string
}

export function Header({ pageTitle }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-primary/95 backdrop-blur-sm shadow-md" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="/reardon-logo.png" 
              alt="Reardon Builders" 
              className="h-22 brightness-0 invert"
            />
          </Link>

          {/* Page Title - Shows when scrolled */}
          {pageTitle && isScrolled && (
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-white animate-in fade-in duration-300 tracking-tight">
			  {pageTitle}
			</h1>
            </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-lg font-medium text-white hover:text-accent transition-colors">
              Home
            </Link>
			
            <Link href="/gallery" className="text-lg font-medium text-white hover:text-accent transition-colors">
              Gallery
            </Link>
			
			<Link href="/testimonials" className="text-lg font-medium text-white hover:text-accent transition-colors">
			  Testimonials
			</Link>
			
            <Link href="/contact" className="text-lg font-medium text-white hover:text-accent transition-colors">
              Contact
            </Link>
			
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:text-accent hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-primary border-primary">
              <nav className="flex flex-col gap-6 mt-8">
                <Link
                  href="/"
                  className="text-lg font-medium text-primary-foreground hover:text-accent transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/gallery"
                  className="text-lg font-medium text-primary-foreground hover:text-accent transition-colors"
                >
                  Gallery
                </Link>
				
				<Link href="/testimonials" className="text-lg font-medium text-white hover:text-accent transition-colors">
				  Testimonials
				</Link>
				
                <Link
                  href="/contact"
                  className="text-lg font-medium text-primary-foreground hover:text-accent transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}