# Product spec and decision history

Background for `AGENTS.md`. These are the decisions the owner made while the site was built, in the order they were made. Where the code has since changed, the "Status" line says so.

## 1. Purpose and audience

- Purpose: job search / career change. A recruiter or hiring manager should grasp skills and career flow quickly.
- Not a sales site for clients, and not just an archive. Contact stays minimal (one email).
- Language: Korean body copy, English labels (Disciplines, Deliverables, Year).

## 2. Sitemap

- Single page. No separate project detail pages.
- Project detail = a modal over the index (this replaced an earlier "detail page per project" plan).
- Sections top to bottom: sticky header (nav, KIM wordmark, About drawer, Index filter drawer) → project index → footer meta (Contact, Skills, Experience) → footer.

## 3. Content organization

- One list of projects, newest first by default. Not grouped by company.
- Company, discipline, and year are tags; viewers slice with the Index filter panel instead of the site fixing one hierarchy.
- Open proposal from the owner: three categories — 웹디자인 (web design), 컨텐츠 디자인 (content design), 가이드 제작·운영관리 (guide production / operations management).
- Status: `Web Design`, `Content Design`, `KV Design` are in the data; the guide/operations category is not.

## 4. Project card fields

Title, company, year, disciplines, deliverables, short description, credit lines, images. A "My Role" field (what the owner personally did inside a team credit) was suggested for recruiters but never confirmed or built.

## 5. Modal spec

Trigger: click or tap a project row.

| | Desktop | Mobile |
|---|---|---|
| Form | Centered box, dim backdrop | Originally full-screen |
| Image area | 5:4 fixed ratio | 5:4 at the top |
| Order | Image slider → title → tags (company, discipline, year) → description | Same |
| Slide control | Arrows + swipe + dots | Swipe + dots |
| Dots | Active `#000000`, inactive `#f4f4f4`, bottom center of the image | Same |
| Close | × button, backdrop click, Esc | × button, swipe down |
| URL | `?project=<slug>`; Back closes it; shared links open it | Same |

Whole-box aspect ratio is not fixed (description length varies). Only the image area is 5:4; the box scrolls if content overflows.

Status: built as specified, except mobile is currently a 90vh rounded card, not full-screen. Real images use `contain` so tall screenshots are not cropped.

## 6. User flow

```
Land on index (Image View, About drawer open)
  ├─ scroll → About drawer collapses, wordmark shrinks
  ├─ return to top → About drawer reopens
  ├─ INDEX → filter drawer: pick tags (OR in column, AND across), sort Latest/Oldest, Clear
  ├─ Image View / List View toggle
  └─ click a project row
        → modal opens, URL gets ?project=slug
           ├─ swipe / arrows / dots → change slide
           └─ ×, backdrop, Esc, swipe down, browser Back → modal closes, URL restored
```

## 7. Visual direction

- Minimal black/white index, Pretendard, Image/List view toggle, grid of thumb | project | disciplines | deliverables | year. Inspired by eepark.org layout only.
- Wordmark: "KIM" on both sides of the header (the owner chose KIM over KIMM/K–M initials).
- An alternate editorial look (EB Garamond serif, paper/terracotta palette) was explored on the unpushed branch `explore-editorial-mono`. The owner returned to the sans-serif version for the live site and kept the other for reference.

## 8. Content sources

Career and skills come from the owner's resume (excluding personal data). Current Experience block:

| Period | Company | Role |
|---|---|---|
| 2024.11 – present | ㈜카시나 | 웹디자인 · 사원 |
| 2024.03 – 2024.10 | ㈜비케이브 | 앱디자인 · 사원 |
| 2022.12 – 2024.02 | ㈜데코큐비클 | 브랜드디자인 · 대리 |
| 2022.04 – 2022.12 | ㈜이공오 | 포토그래퍼 · 사원 |
| 2021.02 – 2022.03 | ㈜아이엠컴퍼니 | 콘텐츠디자인 · 팀원 |

Skills shown: Photoshop, Illustrator, After Effects, Lightroom, Figma (InDesign, XD, Cinema4D were removed at the owner's request).

The only real project is the 카시나 × 크록스 "Echo II – Glow in the Dark" release landing page (web + two app states), exported from the owner's Figma and cropped to the clean artboards. All other projects are placeholders.

## 9. Things that were deliberately excluded

Phone number, home address, birth year/age, salary history, GPA, military record, and the resume PDFs themselves. Keep it that way: this repo is public.

## 2026-10-13 — Current design update (supersedes older layout/modal notes)

- Wordmark is now KIMHANSOL, left aligned in a compact sticky header; navigation sits on the right.
- HuskyFox reference structure: a wide featured project visual followed by split project stories. Each story has a cover and description on the left and a taller supporting image on the right.
- The old Image/List view and modal were replaced with a URL-addressable second-level detail screen at `?project=<slug>` using the existing static index entry point, compatible with GitHub Pages.
- Details show large, uncropped project images, overview, credits, supporting gallery, return and next-project links. Returning restores list scroll position and preserves filters/sort.
- Mobile stacks project imagery; gallery is one column below 600px. White/black visual style remains. About still collapses on scroll and reopens at the top.
- Non-real projects are explicitly presented as sample content, not verified professional work. No third-party reference assets were copied.
- Implementation: index.html, css/style.css, js/main.js. Legacy modal/view notes above describe the previous version.

- 2026-10-13 follow-up: Removed the standalone featured Crocs banner from the top. The page now starts with the split project list below About. Crocs remains in the project list and detail route.


## 2026-10-26 — Category sections and full-screen project view

- Main is a continuous page with intro, four independent sections (Promotion & Content Pages, Content Design, Photography, Workflow Improvement), and About/contact. Category anchors jump to each section.
- Large project covers open a full-screen dark project view: sticky description/credits on desktop, stacked content on mobile, uncropped image gallery. Close/Escape/browser Back returns to the prior list position; project URLs remain shareable.
- Removed invented demo projects from the rendered collection. Only the existing Crocs project is shown; other sections explicitly state that work is being organized. No new employer assets added.
- Crocs currently uses its existing design images, not a live HTML demo. Photography globe deferred until verified photographs are supplied.
- Existing working files were backed up in the current chat workspace outputs/portfolio-backup-20261026 before edits. No deployment performed.

### Project click transition
- Shared-image View Transition morphs the clicked cover into the large detail image; the background dims/fades. Closing and browser Back reverse to the original card and restore scroll/focus.
- Uses browser View Transitions API with immediate navigation fallback. Reduced-motion users receive immediate navigation. No third-party animation code copied.

- Detail background uses 90% black over the retained, inert collection (94% on mobile). The left text stays opaque; the underlying collection is faintly visible. Closing restores normal layout and accessibility.

## 2026-10-26 — Supplied campaign HTML integration
- Added eight project cards under Promotion & Content Pages from the supplied portpolio folder. T90 duplicate omitted; Crocs teaser and release combined.
- Site copies in projects/ add UTF-8/viewport and iframe height messaging. Originals remain unchanged. Embedded documents are isolated from portfolio styles; external link clicks and form submissions are blocked in archive copies.
- Detail includes a cover followed by live responsive HTML; iframe height follows document size to keep one outer scroll.
- Remote media and original host CSS remain dependencies. Campaign-specific layout defects and video loading need further review; no claims of complete runtime verification.
- Per-project personal contribution remains marked pending where unconfirmed. No publishing or Git push.

- Removed Ordinary’s Select from the collection at owner request (archive source retained). Adidas archive uses a fixed 1440px viewport scaled to its available column width, including on mobile.

- Adidas updated to native responsive behavior at owner request; removed fixed desktop viewport. Its layout now follows the available archive width (original breakpoint 1023px). Supersedes the 1440px desktop-only setting.

## Black theme and layered transition update
- Black global background, light type, charcoal dividers and footer. Campaign HTML retains its original visual design.
- Replaced basic image crossfade with custom shared-cover motion: clicked image expands with a subtle perspective tilt, then settles into the detail column. Archive content enters behind it with staggered movement; close returns the cover to the original card.
- Implemented with Web Animations, based on observed interaction rather than copying reference site source. Reduced-motion falls back to immediate navigation.

## 2026-10-27 — Project selection emphasis
- Removed circular arrow badges and card-caption arrows. Whole project cards remain links.
- Hover/focus keeps the selected project at full opacity and dims sibling projects to 22%. Removed hover image zoom. Touch displays all cards at normal opacity; reduced motion skips the fade.

- 2026-10-27: Removed Kasina Playlist 2024 from the project collection at owner request. Archive source retained.

- 2026-10-27: Replaced Crocs and Polo covers with owner-supplied desktop banner WebPs, copied into images/. Preserve 4:3 banner composition. Magia banner not yet located.

- 2026-10-27: Detail left column changed to compact project name + archive jump link, large overview text, and numbered Design / Publishing credits. Confirmed Crocs design credit retained; unconfirmed names marked pending. Removed generic role/deliverables/archive-note block from the left column.

## 2026-10-27 — Image-based project details
- Replaced live HTML iframes with image galleries captured from local archive copies. Long captures are split into 2000px sections, compressed as JPEG and lazy loaded. Clicking an image opens it at original resolution for zoom.
- Retained project covers, black theme, left credits, click transition and dimmed collection.
- Crocs uses the teaser capture and existing app mockups; broken release capture excluded. T90/Superfly captures omit video wrappers. These are static archive captures, not exact captures of every live state. Original HTML files retained.

- Desktop-version captures remain the source on every device. Detail cover and gallery scale to the column width with intrinsic aspect ratios; removed fixed maximum cover heights and cropping. Mobile shows the same desktop artwork fitted to its available width.
