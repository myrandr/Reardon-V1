# Reardon Builders Website Project - Backlog

**Last Updated:** January 11, 2026

## NEXT SESSION PRIORITIES

1. **N8N Email Update** - Update contact form webhook to send to info@reardonbuilders.com


## CRITICAL (Ongoing)
 Update site copy from "Greater Merrimack Valley area" to "Merrimack County, New Hampshire" or "Merrimack County and surrounding areas"
 

## Backlog (Ongoing)

- [] text/sms notifcation of submissions - Need to verify Twilio Toll Free Number
- [] text/sms submissions to social Media - Need to verify Twilio Toll Free Number
- [ ] Think about pre-sales calls information that will be helpful to gather, we can create a form landing page for you to direct people to.
- [ ] Photo repository - Google Drive / OneDrive style
- [ ] Pictures, pictures, pictures
- [ ] Potentially missing business from out of towners looking to do local work.
- [ ] Photo Section - for renderings
- [ ] Email Signature w/logo - for Jack to use in email signiture
- [] Social Media Feeds** - Not yet connected
   - [] Requires API setup after getting real account info
- [] Add recovery email to Gmail account
- [] How to add new photo to Gallery / how to move photos in gallery?  Should we be tagging photo for use when we start getting enough photos to do a search by type:  Kitchen, bathroom, living room, etc?


   
## Client QUESTIONS (Ongoing)

Tomorrow's Action Items (clean list for morning-brain):

- [] Text client: Ask for EIN + admin access to Instagram/Facebook
- [] Complete Twilio verification: Submit form with EIN
- [] Get added as admin: Instagram Business + Facebook Page
- [] Ping me (claude): We'll pick up right where we left off

### Content & Photos


### Social Media
- [x] **Instagram Handle** - Get actual Instagram username
  - Currently placeholder: @reardonbuilders
- [x] **Facebook Page** - Get actual Facebook page name/URL
  - Currently placeholder: ReardonBuilders

---

## COMPLETED ✅

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
- [x] Establish Email account - need to setup jack@reardonbuilders.com
- [x] ~~Set up N8N workflow~~ - DONE
- [x] ~~Configure webhook URL~~ - DONE (https://n8n.srv1013834.hstgr.cloud/webhook/reardon-contact)
- [x] N8N webhook: Update contact form submission email to: info@reardonbuilders.com
- [x] Change Page Contact - Contact Information - Email to: info@reardonbuilders.com
- [x] Testimonial form for adding to website - add a header level navigation for it
	- [x] Need ability to do a review prior to posting
- [x] **Responsive Design Fixes** - Test and fix display issues on mobile phones and iPads
- [x] **Testimonials Google Sheets Integration**
   - [x] Connect testimonial submission form to Google Sheet via N8N
   - [x] Implement approval workflow (Pending/Approved/Ignore)
   - [x] Update testimonials page to populate from approved sheet entries
---

## IN PROGRESS / BLOCKED 🚧

---

## FUTURE - Technical Items (Post-Launch)

### Contact Form
- [x] ~~Set up N8N workflow~~ - DONE
- [x] ~~Configure webhook URL~~ - DONE (https://n8n.srv1013834.hstgr.cloud/webhook/reardon-contact)
- [x] Test form on live site after deployment fixed
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


### Analytics & SEO
- [x] ~~Google Analytics installed~~ - DONE
- [x] ~~Form submission tracking~~ - DONE  
- [ ] Add Google Search Console
- [ ] Basic SEO optimization
- [ ] Submit sitemap

---

## QUESTIONS TO ASK AT TOMORROW'S MEETING

---

## KNOWN ISSUES
   
1. **Social Media Feeds** - Not yet connected
   - Requires API setup after getting real account info

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


