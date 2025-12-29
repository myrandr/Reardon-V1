"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
           <img 
			  src="/reardon_logo.png" 
			  alt="Reardon Builders" 
			  className="h-16 brightness-0 invert"
			/>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-white hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/gallery" className="text-sm font-medium text-white hover:text-accent transition-colors">
              Gallery
            </Link>
            <Link href="/contact" className="text-sm font-medium text-white hover:text-accent transition-colors">
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
