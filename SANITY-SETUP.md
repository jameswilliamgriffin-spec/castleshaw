# Editing news, training and staff in Sanity

The website reads three things from Sanity when it is built:

- **News stories** (the News page and one page per story)
- **Training**: the courses, and upcoming course dates and prices
- **Staff**: the people in "Our team" on the About page

Everything else on the site stays in the code. Until Sanity is connected, the site uses the copies in the repository (`v2/src/content/news/*.md`, `v2/src/content/training.local.json` and `v2/src/content/staff.local.json`), so nothing breaks in the meantime. If Sanity can't be reached during a build, the build uses those copies too and says so in the Vercel build log.

## One-time setup (about 20 minutes)

1. **Create the Sanity project.** Sign up free at <https://www.sanity.io> and create a project called "Castleshaw website" with a dataset called `production`, set to **public**. Copy the **project ID** (eight letters and numbers, shown at <https://www.sanity.io/manage>).

2. **Point the editing app at it.** In `studio/`, copy `.env.example` to `.env` and paste the project ID after `SANITY_STUDIO_PROJECT_ID=`.

3. **Log in and load the current content** (from the `studio/` folder):
   ```bash
   npm install
   npx sanity login
   npm run import
   ```
   This copies the six news stories (with their photos), the six training courses and the staff team (with their photos) into Sanity. Photos are copied from the live site, so deploy the latest version of the website before importing.

   **Already imported news and training before staff moved to Sanity?** Don't run `npm run import` again: it replaces everything, including edits made since. Instead, from `studio/`, run:
   ```bash
   node seed/make-import.mjs
   grep '"_type":"staffMember"' seed/import.ndjson > seed/staff.ndjson
   npx sanity dataset import seed/staff.ndjson --dataset production --missing
   ```
   That adds only the staff, and leaves everything else as it is.

4. **Publish the editing app.** Still in `studio/`:
   ```bash
   npm run deploy
   ```
   It goes live at `https://castleshaw.sanity.studio` (pick another name if that one is taken). This is where staff log in to edit.

5. **Tell Vercel where the content is.** In Vercel → the castleshaw project → Settings → Environment Variables, add:
   - `SANITY_PROJECT_ID` = the project ID
   - `SANITY_DATASET` = `production`

   Then redeploy once. The build log should say `content: … from Sanity (your-id)`.

6. **Rebuild the site when someone presses Publish.**
   - In Vercel → Settings → Git → Deploy Hooks, create a hook called "Sanity" for the `main` branch and copy its URL.
   - In <https://www.sanity.io/manage> → the project → API → Webhooks, add a webhook: paste that URL, trigger on create, update and delete, filter `_type in ["newsStory", "trainingCourse", "trainingDate", "staffMember"]`, method POST.

   Now each publish rebuilds the site; changes are live in about a minute.

7. **Invite editors.** <https://www.sanity.io/manage> → the project → Members. On the free plan everyone invited is an Administrator (can edit everything in News, Training and Staff).

## For editors

- **News stories:** headline, date (and whether to show the day, the month or just the year), a photo with a short description, and the story. Press **Publish**.
- **Training → Courses:** the course cards on the Training page. "Position on the page" sets the order.
- **Staff:** name, job title, whether they show under "Our team" or "Tutors", a photo, and an optional line on their specialisms. "Position on the page" sets the order (1 first). After uploading a photo, click the crop icon and drag the circle onto their face, so it stays in view. To take someone off the site, open them and choose **Delete** from the menu beside Publish.
- **Training → Course dates and prices:** add one entry per date: the course, date, time, where, the two prices, and whether places are available, few, or full. Past dates disappear from the site on their own.

## Free plan limits that matter

20 editors, 10,000 items, and plenty of API use for a site that only reads Sanity when it is built. Content in a public dataset can be read by anyone with the project ID, so put nothing private in Sanity. Per-person permissions (for example "news only") need the paid Growth plan.
