# Open questions: blanks to fill in the v2 inner pages

Every gap below shows on the site as an amber **To confirm** marker, so nothing has been made up. Once the centre answers, search the page file for `<TBC` and replace the marker with the real detail.

Page files are in `site/v2/src/pages/`. The educational visits advice landing page is `Landing` in `site/v2/src/pages/advice.jsx`, and its shared facts are in `site/v2/src/content/advice.mjs`. The PDF guide's source is `site/guide/guide.html`; rebuild it with `npm run guide`.

---

## Educational visits advice: questions for client sign-off

The rebuilt advice section (landing page, homepage band, "For schools" tag in the header, pointers on activity pages, PDF guide and enquiry form) is built for review. Everything unconfirmed is placeholder copy and shows as **To confirm** or **Placeholder quote**.

### Set-up we need from the client (before launch)

1. **Mail delivery for the enquiry forms.** The forms currently run in preview mode and send nothing. To make them work, the council needs to sign up for a mail delivery service. We recommend **GOV.UK Notify**: it is free for councils, already used across local government, and built for this. Alternatives are Resend, Postmark, or Microsoft 365 via Power Automate.
   - Who will own the account?
   - Which inbox should enquiries go to (for example castleshaw.centre@oldham.gov.uk)?
   - The developer then sets three values in Vercel (`NOTIFY_API_KEY`, `NOTIFY_TEMPLATE_ID`, `ENQUIRY_TO`) plus `VITE_ENQUIRY_ENDPOINT=/api/enquiry`. The endpoint (`site/api/enquiry.js`) is written and ready.
2. **Council IT and data protection sign-off.** Does a DPIA or data processing agreement need completing for the mail service? Who signs it off? How long should enquiries be kept?
3. **An enquiries log (optional).** Should each enquiry also be added to a SharePoint list or Excel sheet, for example via Power Automate?
4. **Analytics.** May we add cookieless analytics (Plausible or Vercel Web Analytics), so that no cookie banner is needed? These events are already wired up:
   - enquiry sent
   - guide downloaded
   - phone tapped
   - email tapped
   - quote button clicked
5. **The domain.** The 301 redirects from the old `.html` pages are in `vercel.json`. They only take effect once castleshawcentre.com points at the new site. At launch they also need re-pointing from `/v2/...` to the final paths.

### Content to confirm or supply

6. **Audience priority.** Is the main target new academies and trusts outside Oldham, or renewals from existing Oldham schools? This sets the hero message.
7. **Success measure.** Which matters most: quote requests a month, guide downloads, or calls?
8. **Testimonials.** We need 2–4 real, attributed quotes from EVCs, heads or business managers to replace the placeholder quote. Which wording and attribution is allowed, for example "EVC, St Anywhere Primary, Oldham"?
9. **Proof figures.**
   - How many establishments currently use the service?
   - What does the annual survey say, behind "most schools rate it Outstanding"?
   - Are there any trusts or schools we may name?
10. **Pricing language.** Is "Prices depend on the size and type of your establishment. Contact us for a quote" right? Are there packages or bands we can show? When does the agreement year run?
11. **Facts still marked To confirm in this section:**
    - out-of-term cover for the 24/7 line
    - whether Evolve+ is included
    - the advisers' OEAP accredited adviser status
    - the AALA licence number (L71687 or L137899)
    - the Evolve login URL
    - lengths of MoVE and head teacher and governor sessions
    - current course dates and prices
    - whether maintained schools receive the service or buy it
    - whole-trust agreements
    - how far in-person support reaches
12. **The PDF guide**, *Planning safe educational visits: a guide for schools and settings*.
    - Who approves its content: the advisers, council comms, or both?
    - The pre-submission checklist is a draft based on the four checks, and needs the advisers' review.
    - Recommended submission lead times are needed for residential and overseas visits.
    - What edition or version label should it carry?
13. **Branding.** Should the page and the guide carry Oldham Council branding (logo, brand guidelines) alongside Castleshaw's?
14. **Photography.**
    - Seven photos on the advice pages are AI-generated placeholders (listed in `site/public/shared/images/generated/README.md`). Are they acceptable for sign-off, or should we arrange a short real photo shoot, or use the centre's own photos?
    - Are higher-resolution adviser portraits available?
15. **The nav label.** Is "Visits advice" with a "For schools" tag right, or would "Visits advice for schools" be clearer?
16. **The guide download.** It is currently free, with no sign-up (our recommendation). Would the client rather ask for an email address before the download?

---

## Most important (they affect bookings and revenue)

1. **Educational visits advice pricing.**
   - Is the agreement priced per establishment, per pupil, or in bands?
   - Are there packages by school type: primary, secondary and college, or trusts and youth services?
   - *Pages:* Service agreement, Questions.
2. **Oldham maintained schools.**
   - Do they get the advice service as part of the Council's duty as employer, or do they buy the agreement?
   - What is extra for them?
   - *Page:* Who it's for.
3. **Whole-trust agreements.** Can a multi-academy trust buy for all its schools? *Pages:* Who it's for, Questions.
4. **Agreement year.** Does it run April to March, or September to August? *Page:* Questions.
5. **Critical incident line.**
   - Is it staffed 24/7 all year, or in term time only? The 2025 leaflet says "during term time".
   - What happens in school holidays?
   - *Pages:* Emergency support, Questions, advice landing.
6. **Visit prices.**
   - What do day visits and residentials cost?
   - What does the Oldham schools Outdoor and Environmental Education agreement include?
   - *Pages:* Plan your visit, and the "Cost" box on the Land, Water and Bushcraft pages.
7. **Accommodation prices.**
   - What is the price per night: per person, or for the whole building?
   - Is there a minimum stay?
   - What are the venue hire and day rates for the classroom and yurt?
   - *Page:* Stay and hire.
8. **The AALA licence number.** The website says L71687, but the leaflet says L137899. *Pages:* Accreditation, advice landing.

## Educational visits advice and guidance

| Page | Question |
|---|---|
| How it works | Do any other visit types need adviser approval, such as visits near water? How far in advance should visits be submitted? |
| How it works, Get a quote | What is the Evolve login address for Oldham members? |
| Service agreement | Is Evolve+ (the MIS link) included, or an optional upgrade? |
| Service agreement | For each package (primary, secondary and college, trusts and youth): what is included, and what is the price band? |
| Service agreement | Can the formal agreement be offered as a download for business managers? |
| Who it's for | How far does in-person support reach for schools outside Oldham? |
| Training | How often should EVCs refresh their training? |
| Training, advice landing | How long are the MoVE and head teacher and governor sessions? |
| Training | What are the upcoming course dates, and the prices for members and non-members? The last published date was an EVC course on 6 November 2025. |
| Emergency support | Would the centre like a printable "save this number" card for visit leaders? |
| Guidance and resources | Which policies and templates can be public, and which are for members only? |
| Our advisers | Do Rod and Joseph hold OEAP accredited adviser status? |
| Advice landing | The survey claim "rated outstanding by most schools": can we have the real figure, and the number of establishments covered? |
| Advice landing | Two quotes are marked **Placeholder quote**. Can we replace them with real, attributed quotes from an EVC or head teacher? |
| (not on the site yet) | Are there member extras, such as termly updates, an EVC network or webinars? |

## Activities and school visits

| Page | Question |
|---|---|
| Adventure on land | What are the suitable ages for each activity, the session lengths, and the prices? |
| Adventure on water | What are the suitable ages, and is there a swimming requirement? What are the session lengths and prices? |
| Adventure on water | Which reservoirs and rivers are used for each activity? |
| Bushcraft | What is the full programme: which activities suit which ages, and is tool use included? Also the ages, lengths and prices. |
| Plan your visit | See items 6 and 7 above. |

## Stay and hire

- Can the centre provide catering? If so, which meals, and at what cost? The old site only mentions a self-catering kitchen.
- See item 7 above for prices.

## Courses and holiday clubs

| Page | Question |
|---|---|
| Holiday clubs | For the HAF club in 2026: what are the dates and ages, and how do families book? |
| Holiday clubs | For the paid summer club in 2026: what are the dates, ages and daily price, and how does booking work? |
| Activity courses | What are the 2026 course dates, ages and prices? |
| Outdoor awards | Which qualification specifications are current? The old site lists 2010 and 2011 BTEC units. |
| Outdoor awards | What are the dates and prices for leader training, such as First Aid, Countryside Leader and British Canoeing? |

## About us

| Page | Question |
|---|---|
| Where we are | What are the directions from the M62 and from Oldham? Where do coaches drop off and park? Which bus and train stops are nearest? |
| Our team | Is the team list current? It comes from the old site. Can we have a line on each person's role and specialisms? |
| Accreditation | See item 8 above (the AALA licence number). |
| News | Is there any news since April 2024? Who will keep the page up to date, or should it show the Facebook feed instead? |

## Contact and privacy

| Page | Question |
|---|---|
| Contact | What are the office opening hours? |
| Privacy | Can we have the privacy notice as a web page, rather than a Word download? Also a cookie statement and an accessibility statement for the new site. |

## Things that would improve the pages (not blanks)

- **Photos:**
  - bushcraft sessions (only three photos exist);
  - stand up paddleboarding with a school group;
  - the climbing tower and caving system with recent groups;
  - the yurt inside.

- **Higher-resolution versions** of the team portraits and older archive photos.
- **A short real quote** from an accommodation-only group from the last few years. The current ones are from 2018 and 2019.
- **Current testimonials** for every page. Most on the old site date from 2018 to 2020.
