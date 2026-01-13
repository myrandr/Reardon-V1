import type { Metadata } from "next"
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TestimonialsGrid, Testimonial } from './components';

export const metadata: Metadata = {
  title: "Client Testimonials | Reviews & Feedback",
  description:
    "Read reviews from satisfied Reardon Builders clients in Concord, NH and Merrimack County. See why homeowners and businesses trust us for custom homes, renovations, and commercial construction.",
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    title: "Client Testimonials | Reardon Builders",
    description:
      "See what our clients say about Reardon Builders. Trusted construction services in Merrimack County, NH since 1985.",
    url: "https://reardonbuilders.com/testimonials",
    images: [
      {
        url: "/hero-exterior.webp",
        width: 1200,
        height: 630,
        alt: "Reardon Builders client testimonials",
      },
    ],
  },
};

const SPREADSHEET_ID = '1xn8P11_od5PXrwI-QIOtW2hHx0jYHamHmgNlwXAAv6o';
const SHEET_NAME = 'Sheet1';

interface SheetsResponse {
  values?: string[][];
}

async function getApprovedTestimonials(): Promise<Testimonial[]> {
  try {
    // Check for API key
    const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

    if (!apiKey) {
      console.error('Google Sheets API key not configured');
      return [];
    }

    // Fetch directly from Google Sheets API (A1:I fetches columns A-I from first sheet)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A:I?key=${apiKey}`;

    const response = await fetch(url, {
      headers: {
        'Referer': 'https://reardonbuilders.com',
      },
      next: { revalidate: 0 }, // No caching for now
    });

    if (!response.ok) {
      console.error('Google Sheets API error:', response.status, await response.text());
      return [];
    }

    const data: SheetsResponse = await response.json();
    const rows = data.values;
    if (!rows || rows.length <= 1) {
      console.log('No data found in spreadsheet');
      return [];
    }

    // Skip header row, filter for approved, and map to testimonial format
    const testimonials: Testimonial[] = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      // Column indices: 0=Timestamp, 1=FirstName, 2=LastName, 3=Business Name, 4=Email, 5=Review Text, 6=Rating, 7=Project Type, 8=Status
      const status = row[8]?.toString().toLowerCase().trim();

      if (status === 'approved') {
        const firstName = row[1]?.toString() || '';
        const lastName = row[2]?.toString() || '';

        testimonials.push({
          firstName: firstName,
          lastName: lastName.charAt(0) || '', // Just the first initial
          businessName: row[3]?.toString() || '',
          rating: parseInt(row[6]?.toString() || '5', 10),
          projectType: row[7]?.toString() || 'Other',
          reviewText: row[5]?.toString() || '',
        });
      }
    }

    return testimonials;
  } catch (error) {
    console.error('Error fetching testimonials from Google Sheets:', error);
    return [];
  }
}

export default async function TestimonialsPage() {
  const testimonials = await getApprovedTestimonials();

  return (
    <div className="min-h-screen bg-background">
      <Header pageTitle="Testimonials" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-primary">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/footer-blueprint.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 leading-tight tracking-tight">
              Client <span className="text-[#ae7400]">Testimonials</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto mb-4 leading-relaxed">
              Built on Trust, Proven by Experience
            </p>
            <p className="text-base text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our clients have to say about working with Reardon Builders.
            </p>
          </div>
        </div>
      </section>

      <TestimonialsGrid testimonials={testimonials} />

      <Footer />
    </div>
  );
}
