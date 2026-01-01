import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
		  <div 
			className="absolute inset-0 opacity-10"
			style={{
			  backgroundImage: 'url(/footer-blueprint.png)',
			  backgroundSize: 'cover',
			  backgroundPosition: 'center',
			  backgroundRepeat: 'no-repeat'
			}}
		  />
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
			  <img 
				src="/reardon_logo.png" 
				alt="Reardon Builders" 
				className="h-20 mb-4 brightness-0 invert"
			  />
			  <p className="text-primary-foreground/80 leading-relaxed max-w-md">
			  Turning ideas into well-built spaces. With decades of experience in residential and commercial construction, we bring precision, accountability, and quality to every project.
			</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex gap-4">
			  <a 
				href="https://www.facebook.com/ReardonBuilders" 
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary-foreground/80 hover:text-accent transition-colors"
			  >
				<Facebook className="h-6 w-6" />
			  </a>
			  <a 
				href="https://www.instagram.com/reardonbuilders/" 
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary-foreground/80 hover:text-accent transition-colors"
			  >
				<Instagram className="h-6 w-6" />
			  </a>
			</div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Reardon Builders. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
