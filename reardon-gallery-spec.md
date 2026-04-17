Reardon Builders
Photo Gallery System — Build Spec
Prepared by Iron Desk Consulting  •  Version 1.0
1. System Overview
This spec covers the end-to-end photo management pipeline for reardonbuilders.com. The goal is a zero-friction workflow: drop photos into a Google Drive folder, let automation handle classification and naming, then publish to the website with one click.

Stack components involved:
•	Google Drive — photo storage and project organization
•	N8N (self-hosted on Hostinger VPS) — automation backbone
•	Claude API — AI classification, naming, alt text generation
•	Google Sheets — source of truth / CMS for the gallery
•	Next.js on Vercel — website rendering
•	Google Apps Script — one-click Publish button in the sheet

2. Google Drive Structure
Drive is the entry point. Folder name = project name. N8N reads the folder name automatically.

/Reardon Photos  (root watch folder)
  /Hooksett-Kitchen-Remodel-2024
  /Concord-Commercial-BuildOut-2025
  /Manchester-Bathroom-Reno-2025
  /Standalone   (one-off shots, no project)

Naming convention for folders:
[Location]-[Type]-[Year]
Example: Hooksett-Kitchen-Remodel-2024

Twilio SMS-to-Drive integration (future): When the SMS photo workflow is built, photos sent via Twilio will land in a designated folder (e.g. /SMS-Uploads). N8N will pick them up through the same pipeline. No changes needed to the gallery system at that time.

3. Google Sheets Schema
Sheet name: ReardonGallery. One row per photo. This sheet is the CMS — the website reads from it on every build.

Column	Type	Source	Notes
filename	string	Claude API	Generated clean name, see Section 5
drive_url	string	N8N	Direct Drive file URL (public)
category	string	Claude API	kitchen | bathroom | exterior | bedroom | living_room | construction | commercial
project_id	string	N8N	Slugified Drive folder name
project_name	string	N8N	Human-readable folder name
status	string	Default: active	active | hidden — hidden rows excluded from site
alt_text	string	Claude API	SEO-friendly image description
date_added	date	N8N	ISO timestamp of upload
sequence	number	N8N	Order within project (1, 2, 3…)
featured	string	Manual	residential | commercial | renovation | blank — flags hero photo for homepage

To remove a photo from the website: change status to "hidden". The file stays in Drive. Revert to "active" at any time.
For featured: only one photo per category should be flagged at a time (residential, commercial, renovation). Set via dropdown in the sheet. Homepage pulls exactly one per category.

4. Photo Naming Convention
Files are renamed by the automation. Original filenames from the camera/phone are discarded.

Format: [category]_[project-slug]_[sequence].jpg
Example: kitchen_hooksett-kitchen-remodel-2024_001.jpg
Example: exterior_concord-commercial-buildout-2025_003.jpg
Example: construction_standalone_001.jpg

Categories (valid values for the category field):
•	kitchen
•	bathroom
•	exterior
•	bedroom
•	living_room
•	construction
•	commercial

Claude may return "unknown" if the image is ambiguous (blurry, partial, etc.). N8N will flag these rows in the sheet with status = "needs_review" so you can manually set the category before publishing.

5. Claude API Classification Prompt
This is the exact prompt N8N sends to the Claude API (claude-sonnet-4-20250514) for each photo. The image is passed as base64.

System prompt:
You are a photo classification assistant for a residential and commercial
construction company based in Merrimack County, NH. You will be given a
photo from a job site or completed project. Your job is to classify it,
name it, and write alt text. Always respond with valid JSON only. No
preamble, no markdown fences.

User prompt (N8N fills in the variables):
Classify this construction/remodel photo.

Project folder name: {{$json.folderName}}

Return a JSON object with exactly these fields:
{
  "category": one of: kitchen | bathroom | exterior | bedroom |
              living_room | construction | commercial | unknown,
  "confidence": high | medium | low,
  "alt_text": "SEO-friendly description under 125 chars, mention
               Merrimack County NH if location context is clear",
  "notes": "optional: flag anything unusual about the image"
}

If confidence is "low", N8N will set status to "needs_review" instead of "active". You'll see these highlighted in the sheet before publishing.

6. N8N Workflow Spec
Build this as a single N8N workflow. Node-by-node breakdown:

Node 1 — Google Drive Trigger
•	Type: Google Drive Trigger node
•	Watch: /Reardon Photos folder (recursive, all subfolders)
•	Event: File Created
•	Filter: mimeType contains "image/" (jpg, png, heic, webp)

Node 2 — Get File & Folder Metadata
•	Type: Google Drive node (Get File)
•	Retrieve: file ID, name, parent folder ID, created time, webContentLink
•	Then: Google Drive Get Folder to get folder name from parent ID
•	Output: folderName, fileUrl, fileId, createdAt

Node 3 — Download Image as Base64
•	Type: HTTP Request node
•	URL: Google Drive download URL using fileId
•	Response format: Base64
•	Output: base64ImageData, mimeType

Node 4 — Claude API Classification
•	Type: HTTP Request node
•	URL: https://api.anthropic.com/v1/messages
•	Method: POST
•	Headers: x-api-key, anthropic-version: 2023-06-01, Content-Type: application/json
•	Body: model claude-sonnet-4-20250514, max_tokens 256, system prompt + user prompt from Section 5, image as base64 vision block
•	Output: Parse JSON from response content[0].text

Node 5 — Build Row Data
•	Type: Set node
•	Compute: project_id = slugify(folderName), sequence = count existing rows for this project + 1
•	Compute: filename = [category]_[project_id]_[padded sequence].jpg
•	Compute: status = "active" if confidence is high/medium, else "needs_review"
•	Assemble all fields from Section 3 schema

Node 6 — Rename File in Drive
•	Type: Google Drive node (Update File)
•	Set filename to the computed filename from Node 5

Node 7 — Append Row to Google Sheet
•	Type: Google Sheets node (Append Row)
•	Sheet: ReardonGallery
•	Map all fields from Node 5 output

Node 8 — Error Handler (optional but recommended)
•	Type: Error Trigger node
•	On failure: append a row to a separate "Errors" sheet tab with filename, error message, timestamp
•	Keeps failures visible without crashing the whole workflow

7. Publish Button (Google Apps Script)
A single button in the Google Sheet triggers a Vercel rebuild. No manual deploys needed.

Setup steps:
•	In Google Sheets: Extensions → Apps Script
•	Paste the script below
•	Add a drawing/button to the sheet, assign it to the triggerDeploy function
•	Get the Deploy Hook URL from: Vercel dashboard → Project Settings → Git → Deploy Hooks

Script:
function triggerDeploy() {
  var hookUrl = "https://api.vercel.com/v1/integrations/deploy/YOUR_HOOK_ID";
  var response = UrlFetchApp.fetch(hookUrl, { method: "post" });
  var result = JSON.parse(response.getContentText());
  SpreadsheetApp.getUi().alert(
    result.job ? "Deploy triggered! Site updates in ~1 min." : "Deploy failed."
  );
}

Replace YOUR_HOOK_ID with the actual hook ID from Vercel. The hook is project-specific and triggers a full rebuild pulling the latest sheet data.

8. Next.js Integration
The website fetches from Google Sheets at build time. Two files need to be created or updated.

lib/gallery.js — data fetching
Create a utility that fetches the sheet via the Google Sheets API (same pattern as testimonials). Filter rows where status === "active". Group by project_id. Return two data shapes:
•	allPhotos — flat array, sorted by date_added desc, for the filterable grid
•	projects — array of project objects, each with name, id, and photos[] array

pages/gallery.js (or app/gallery/page.js) — the gallery page
Two display modes on the same page, toggled by the user:

•	Project view (default): Cards showing one hero photo per project with project name and photo count. Click a card to expand and see all photos in that project as a lightbox grid.
•	All photos view: Flat masonry or uniform grid. Filter buttons at top for each category. Clicking a filter shows only photos of that type.

Use getStaticProps to call lib/gallery.js at build time. No client-side API calls needed.

V0 prompt for the gallery component is in Section 9 — scaffold the UI there, then bring it into the codebase.

Google Sheets API call pattern (same as testimonials):
const url = `https://sheets.googleapis.com/v4/spreadsheets/
  ${SHEET_ID}/values/ReardonGallery?key=${API_KEY}`;
const res = await fetch(url);
const data = await res.json();
// Row 0 is headers, rows 1+ are data
const photos = data.values.slice(1).map(row => ({
  filename:     row[0],
  drive_url:    row[1],
  category:     row[2],
  project_id:   row[3],
  project_name: row[4],
  status:       row[5],
  alt_text:     row[6],
  date_added:   row[7],
  sequence:     row[8],
  featured:     row[9],  // residential | commercial | renovation | blank
})).filter(p => p.status === "active");

Homepage featured photo fetch (one per category):
const featured = {
  residential: photos.find(p => p.featured === "residential"),
  commercial:  photos.find(p => p.featured === "commercial"),
  renovation:  photos.find(p => p.featured === "renovation"),
};

9. V0 Prompt — Gallery Component
Use this prompt in V0 to scaffold the gallery UI. Then bring the component into the Next.js codebase and wire up real data.

Copy everything between the dashes into V0 as the prompt.

Build a Next.js photo gallery component for a construction company. Design system: background #F7F4F2, accent color #AE7400, clean sans-serif, minimal. Two modes toggled by a tab switcher at the top: (1) Projects view — grid of project cards, each showing a hero image, project name, location, and photo count badge. Clicking a card opens a lightbox modal showing all photos in that project as a grid. (2) All Photos view — uniform grid of all photos with filter pill buttons at the top (All, Kitchen, Bathroom, Exterior, Bedroom, Living Room, Construction, Commercial). Active filter highlighted in #AE7400. Clicking any photo opens a lightbox. Data comes in as props: projects[] and allPhotos[]. Each photo has: filename, drive_url, category, project_id, project_name, alt_text. Mobile responsive. No external UI libraries, Tailwind only.

10. Build Order
Recommended sequence to avoid rework:

•	Create the Google Sheet with the schema from Section 3. Add 3-4 test rows manually. Step 1
•	Build the N8N workflow using Section 6. Test with a single photo upload. Step 2
•	Verify the Sheet is being populated correctly, including category and filename. Step 3
•	Set up the Vercel Deploy Hook and add the Apps Script button to the sheet. Step 4
•	Build the gallery page in Next.js using getStaticProps + the Sheet API. Step 5
•	Scaffold the UI in V0 using the prompt in Section 9, integrate into Next.js. Step 6
•	End-to-end test: upload photo → check sheet → hit Publish → verify on site. Step 7

11. Environment Variables Needed
Add these to Vercel project settings and .env.local for local dev:

Variable	Value Source
GALLERY_SHEET_ID	Google Sheets URL → the long ID in the URL
GOOGLE_API_KEY	Google Cloud Console → same key used for testimonials
ANTHROPIC_API_KEY	Anthropic Console (for N8N, stored in N8N credentials)

The Anthropic API key lives in N8N credentials, not in Vercel. Vercel only needs the Sheets API key to read the gallery data at build time.

