# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for Reardon Builders, a construction company in Concord, NH. The site serves as a professional online presence for lead generation.

## Development Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run lint     # Run ESLint
npm start        # Start production server
```

## Architecture

**Next.js 16 App Router** with React 19, TypeScript, and Tailwind CSS v4.

### Key Directories
- `app/` - Pages using App Router (page.tsx files are client components with "use client")
- `components/ui/` - Shadcn/ui components (New York style, RSC enabled)
- `components/` - Custom components (header, footer, google-analytics)
- `hooks/` - Custom React hooks (use-mobile, use-toast)
- `lib/utils.ts` - `cn()` utility for Tailwind class merging
- `public/` - Static assets (images, logo)

### Import Aliases
```typescript
@/components  // components/
@/components/ui  // components/ui/
@/lib  // lib/
@/hooks  // hooks/
```

## Styling

- **Tailwind CSS v4** with PostCSS plugin
- **OkLch color space** for theme variables in `app/globals.css`
- **Color scheme**: Navy blue primary, gold/brass accent
- **Fonts**: Playfair Display (serif headings), Inter (sans body)
- Dark mode support configured via CSS variables

## Form Submission Flow

Contact form (`app/contact/page.tsx`) submits to N8N webhook:
1. Form data validated with React Hook Form + Zod
2. POST to `https://n8n.srv1013834.hstgr.cloud/webhook/reardon-contact`
3. Google Analytics event fired (`form_submission`)
4. Success/error toast displayed

## External Integrations

- **Google Analytics**: G-3K8ERF0212 (configured in `components/google-analytics.tsx`)
- **Vercel Analytics**: Included in layout
- **N8N**: Webhook for form submissions
- **Planned**: Google Sheets integration for testimonials

## Deployment

- **Hosting**: Vercel (production)
- **Domain**: reardonbuilders.com
- **Branch**: dev (primary development branch)

## Critical Tasks (from REARDON-BACKLOG.md)

1. Testimonials Google Sheets integration:
  a. Connect submission form to Google Sheet for new testimonial entries
  b. Build approval workflow in sheet
  c. Populate testimonials display from approved sheet entries
3. SEO keywords need expansion, keywords that should be incorporated for SEO are: contractor, general contractor, home builder, construction, home builder, builder, renovation, remodeling, home remodeling, kitched remodeling, bathroom remodeling, home additions, home renovation, commercial builder, commercial contractor, commercial remodeling, business remodeling, business construction


## Business Context

- Phone: 603-731-9096
- Email: info@reardonbuilders.com
- Location: PO Box 1124, Concord NH, 03302
- Founded: 1985

## SEO Implementation (January 2026)

### Metadata Structure
- **Root layout** (`app/layout.tsx`): Default metadata with title template `"%s | Reardon Builders"`
- **Page-specific metadata**: Each page exports its own `Metadata` object that overrides defaults
- Client components refactored to `*-content.tsx` files, allowing `page.tsx` to be server components that export metadata

### JSON-LD Structured Data
`GeneralContractor` schema in root layout includes:
- Business info (name, phone, email, address, founding date)
- Geo coordinates for Concord, NH
- All 15 service areas (Concord, Hooksett, Franklin, Bow, Pembroke, Henniker, Hopkinton, Loudon, Northfield, Epsom, Allenstown, New London, Boscawen, Pittsfield, Dunbarton)
- Service types (Custom Home Building, Renovations, Kitchen/Bathroom Remodeling, Commercial)
- Business hours and social media links

### Page Titles (optimized 55-60 chars)
| Page | Title |
|------|-------|
| Home | Reardon Builders \| General Contractor Concord NH \| Since 1985 |
| Contact | Contact Us \| Free Construction Estimates |
| Gallery | Project Gallery \| Custom Homes & Renovations |
| Testimonials | Client Testimonials \| Reviews & Feedback |

### Open Graph / Social
All pages include OG tags with:
- Title, description, canonical URL
- Image: `/hero-exterior.webp` (1200x630)
- Twitter card: `summary_large_image`

### File Structure Change
```
app/
├── page.tsx              # Server component with metadata, renders HomeContent
├── home-content.tsx      # Client component with page UI
├── contact/
│   ├── page.tsx          # Server component with metadata
│   └── contact-content.tsx
├── gallery/
│   ├── page.tsx          # Server component with metadata
│   └── gallery-content.tsx
└── testimonials/
    └── page.tsx          # Server component (already was), metadata added
```

