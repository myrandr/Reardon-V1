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
2. Responsive design: Fix display issues on mobile phones and iPads
	a. Reduce Logo size - size set to H-22 for web
	b. Reduce Hero Text on Home page
	c. Increase hero imaage text padding on home page
3. SEO keywords need expansion (contractor, builder, renovation, etc.)

## Business Context

- Phone: 603-731-9096
- Email: info@reardonbuilders.com
- Location: PO Box 1124, Concord NH, 03302
- Founded: 1985
  



