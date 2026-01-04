'use client';

import { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

// Mock data - will be replaced with Google Sheets fetch
const MOCK_TESTIMONIALS = [
  {
    firstName: "Sarah",
    lastName: "M",
    businessName: "",
    rating: 5,
    projectType: "Kitchen Remodel",
    reviewText: "Reardon Builders transformed our outdated kitchen into a stunning modern space. Their attention to detail and professionalism throughout the project was outstanding.",
  },
  {
    firstName: "Michael",
    lastName: "T",
    businessName: "Valley Tech Solutions",
    rating: 5,
    projectType: "Commercial",
    reviewText: "We hired Reardon for our office renovation and couldn't be happier. They stayed on schedule, communicated clearly, and delivered exceptional quality.",
  },
  {
    firstName: "Jennifer",
    lastName: "K",
    businessName: "",
    rating: 5,
    projectType: "Deck",
    reviewText: "Our new deck is absolutely beautiful. The craftsmanship is top-notch and it's become the favorite gathering spot for our family.",
  },
  {
    firstName: "Robert",
    lastName: "P",
    businessName: "",
    rating: 5,
    projectType: "Bathroom",
    reviewText: "From design to completion, Reardon Builders made our bathroom renovation smooth and stress-free. The result exceeded our expectations.",
  },
  {
    firstName: "Lisa",
    lastName: "D",
    businessName: "",
    rating: 4,
    projectType: "Home Addition",
    reviewText: "Professional team, quality work, and reasonable pricing. Our home addition blends seamlessly with the original structure.",
  },
  {
    firstName: "David",
    lastName: "H",
    businessName: "",
    rating: 5,
    projectType: "Kitchen Remodel",
    reviewText: "Exceptional work on our kitchen. They helped us maximize our space and create a functional, beautiful room we love cooking in.",
  },
];

const PROJECT_TYPES = [
  "Kitchen Remodel",
  "Bathroom",
  "Deck",
  "Home Addition",
  "Commercial",
  "Other"
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'fill-foreground text-foreground' : 'text-muted'
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof MOCK_TESTIMONIALS[0] }) {
  return (
    <div className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">
            {testimonial.firstName} {testimonial.lastName}.
          </h3>
          {testimonial.businessName && (
            <p className="text-sm text-muted-foreground mt-0.5">{testimonial.businessName}</p>
          )}
        </div>
        <span className="bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-1 rounded-md whitespace-nowrap">
          {testimonial.projectType}
        </span>
      </div>
      
      <StarRating rating={testimonial.rating} />
      
      <p className="mt-3 text-muted-foreground leading-relaxed italic text-sm">
        "{testimonial.reviewText}"
      </p>
    </div>
  );
}

function ReviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    businessName: '',
    projectType: '',
    rating: 5,
    reviewText: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const showBusinessName = formData.projectType === 'Commercial';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Replace with actual N8N webhook URL
    const webhookUrl = 'YOUR_N8N_WEBHOOK_URL';
    
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          status: 'pending'
        })
      });
      
      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          businessName: '',
          projectType: '',
          rating: 5,
          reviewText: ''
        });
      }, 2000);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('There was an error submitting your review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center">
          <h2 className="text-2xl font-serif font-bold text-card-foreground tracking-tight">Share Your Experience</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {submitSuccess ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Thank You!</h3>
            <p className="text-muted-foreground">Your review has been submitted and will appear once approved.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md border border-border">
              <strong>Privacy Note:</strong> Only your first name and last initial will be displayed publicly. 
              Your email is optional and only used if we need to follow up on your review.
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  First Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:border-ring outline-none text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Last Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:border-ring outline-none text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:border-ring outline-none text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">Only used if we need to follow up regarding your review</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Project Type <span className="text-destructive">*</span>
              </label>
              <select
                required
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:border-ring outline-none text-sm"
              >
                <option value="">Select a project type...</option>
                {PROJECT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            {showBusinessName && (
              <div className="animate-in fade-in duration-200">
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Your business name"
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:border-ring outline-none text-sm"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Rating <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= formData.rating
                          ? 'fill-foreground text-foreground'
                          : 'text-muted hover:text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Your Review <span className="text-destructive">*</span>
              </label>
              <textarea
                required
                value={formData.reviewText}
                onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                rows={5}
                placeholder="Tell us about your experience with Reardon Builders..."
                className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:border-ring outline-none resize-none text-sm"
              />
            </div>
            
            <div className="flex gap-3 pt-3">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  const [displayedTestimonials, setDisplayedTestimonials] = useState<typeof MOCK_TESTIMONIALS>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Shuffle and select 5 random testimonials on mount
    const shuffled = shuffleArray(MOCK_TESTIMONIALS);
    setDisplayedTestimonials(shuffled.slice(0, 5));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header pageTitle="Testimonials" />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-block bg-secondary text-secondary-foreground text-sm font-medium px-4 py-1.5 rounded-md mb-6">
              CLIENT TESTIMONIALS
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
              Built on Trust,<br />
              Proven by Experience
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our clients have to say about working with Reardon Builders.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{ animationDelay: `${index * 80}ms` }}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/footer-blueprint.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6 tracking-tight">
            Worked with Reardon Builders?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            We'd love to hear about your experience. Share your story and help others discover the quality and craftsmanship that sets us apart.
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="inline-flex items-center gap-2"
          >
            <Star className="w-5 h-5" />
            Leave a Review
          </Button>
          <p className="text-sm text-primary-foreground/60 mt-4">
            Takes less than 2 minutes • Reviews are moderated before publishing
          </p>
        </div>
      </section>

      <Footer />

      {/* Review Modal */}
      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
