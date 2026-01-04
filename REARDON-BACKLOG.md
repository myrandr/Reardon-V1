# Reardon Builders Website Project - Backlog

**Last Updated:** January 1, 2026
**Client Meeting:** Tomorrow (January 2) at 12:00 PM

---

## CRITICAL - Need for Tomorrow's Meeting

### Contact Information
- [ ] **Google Voice Number** - Set up business phone number (free via Google Voice)
  - Currently shows: "Contact via Email"
  - Need: Real phone number to display
  
- [ ] **Physical Address** - Get actual business address
  - Currently shows: "Concord, NH 03301"
  - Confirm if this is sufficient or get full street address
  
- [ ] **Verify Email Address** - Confirm sales@reardonbuilders.com is active
  - Make sure client has access to check submissions

### Business Details
- [ ] **Business Hours** - What are actual operating hours?
  - Currently placeholder: Mon-Fri 7am-6pm, Sat 8am-2pm, Sun Closed
  
- [ ] **Company History** - Verify founding year
  - Currently says "Since 1985" (updated from 1993)
  - Verify years in business count
  
- [ ] **Tagline** - Confirm or change
  - Current: "Building Excellence, One Project at a Time"

### Service Areas
- [ ] **Areas Served** - Get real list of cities/towns they serve
  - Currently shows: "Greater Merrimack Valley - Concord, Manchester, Nashua, and surrounding communities"
  
- [ ] **Service Types** - Confirm service offerings
  - Current: Custom Home, Home Addition, Home Renovation, Commercial Project

### Content & Photos
- [ ] **About Us Copy** - Current version is placeholder/generic
  - Get real company story, values, differentiators
  
- [ ] **Commercial Project Photos** - Need real commercial work photos
  - Currently using butler's pantry as placeholder for "Commercial" feature card
  
- [ ] **Better Feature Card Photos** - After getting more content
  - Residential (currently using kitchen - good)
  - Renovations (currently using mudroom - OK)
  - Commercial (needs actual commercial project photo)
  
- [ ] **Company Stats** - Verify real numbers
  - Projects completed: Currently "500+"
  - Years experience: Currently "40+"

### Social Media
- [ ] **Instagram Handle** - Get actual Instagram username
  - Currently placeholder: @reardonbuilders
  
- [ ] **Facebook Page** - Get actual Facebook page name/URL
  - Currently placeholder: ReardonBuilders

---

## COMPLETED TODAY ✅

- [x] Set up GitHub repository (Reardon-V1)
- [x] Local development environment running
- [x] Company logo added and working
- [x] Updated contact info (sales@reardonbuilders.com)
- [x] Fixed stats to show 500+ projects, 40+ years
- [x] Added 11 professional photos from spec home to gallery
- [x] Updated "Since 1985" throughout site
- [x] Contact form built with all required fields
- [x] Google Analytics installed (G-3K8ERF0212)
- [x] Form submission tracking for Google Analytics
- [x] N8N webhook integration configured
- [x] All code committed to Git

---

## IN PROGRESS / BLOCKED 🚧

### Hostinger Deployment - Completed - Deployed on Vercel
- Issue: Logo and updated code not displaying on live site
- Status: Build succeeds but app serving errors (500 on chunks)
- Next Steps:
  - Try cache clear + app restart in AM
  - If that fails, consider static export via FTP instead of Node.js deployment

---

## FUTURE - Technical Items (Post-Launch)

### Contact Form
- [x] ~~Set up N8N workflow~~ - DONE
- [x] ~~Configure webhook URL~~ - DONE (https://n8n.srv1013834.hstgr.cloud/webhook/reardon-contact)
- [x ] Test form on live site after deployment fixed
- [ ] Set up autoresponder/acknowledgement email (on backlog)

### Photo Management Strategy
- [ ] Decide on solution for client to add/update photos:
  - Option A: Google Drive + N8N automation
  - Option B: Simple admin upload portal  
  - Option C: SMS-to-website workflow
  - Option D: Cap updates photos manually (current state)

### Social Media Strategy
- [ ] Set up easy cross-posting workflow
  - Help client post to Instagram + Facebook + website simultaneously
  - Tool recommendations TBD after meeting

### Domain & Hosting
- [x] ~~Domain exists~~ - reardonbuilders.com
- [x] Fix Hostinger Node.js deployment issues
- [x] Set up SSL certificate (auto via Hostinger)
- [x] Point domain to production site

### Analytics & SEO
- [x] ~~Google Analytics installed~~ - DONE
- [x] ~~Form submission tracking~~ - DONE  
- [ ] Add Google Search Console
- [ ] Basic SEO optimization
- [ ] Submit sitemap

---

## QUESTIONS TO ASK AT TOMORROW'S MEETING

1. **Phone:** Do you have a business phone, or should we set up Google Voice (free)?
2. **Address:** Do customers come to you, or is this contact-only business?
3. **Form submissions:** How do you want to receive leads - Email? Text? Both?
4. **Photos:** Who updates website photos - you, them, or me?
5. **Social media:** Do you have Instagram/Facebook already, or create new?
6. **Content updates:** Who writes/approves website copy changes?
7. **Budget:** Any budget for ongoing maintenance/updates/features?

---

## KNOWN ISSUES
   
1. **Social Media Feeds** - Not yet connected
   - Requires API setup after getting real account info

---

## NEXT DEVELOPMENT PRIORITIES (After Meeting)

2. Connect real Instagram/Facebook feeds (if accounts exist)
3. Update content based on client feedback
5. Implement photo management solution

---

## TECH STACK REFERENCE

**Frontend:** Next.js 16 (React)
**Styling:** Tailwind CSS
**Hosting:** Versel
**Form Backend:** N8N webhook
**Analytics:** Google Analytics (G-3K8ERF0212)
**Version Control:** GitHub (Reardon-V1 repo)
**Local Dev:** npm run dev on localhost:3000

---

## FILE LOCATIONS (for reference)

- Home Page: `app/page.tsx`
- Gallery: `app/gallery/page.tsx`
- Contact: `app/contact/page.tsx`
- Header: `components/header.tsx`
- Footer: `components/footer.tsx`
- Images: `public/` folder
- Google Analytics: `components/google-analytics.tsx`

---

## REMINDERS

- Client doesn't have web dev experience - keep explanations simple
- They're looking for professional, large-scale builder feel
- Budget conscious - started with simple site, can add features later
- Main goal: Professional online presence + lead generation
