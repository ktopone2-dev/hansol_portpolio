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

## 2026-10-31 — Additional campaign banners and pages
- Imported supplied PC banners and page images for Black Friday 2025, Summer Vacation 2026, Mid-Season Sale 2026, Holiday Market 2026 and LE SSERAFIM. Optimized copies stored in images/campaigns; original files unchanged.
- New five projects are in Promotion & Content Pages, with desktop pages split into proportional JPEG sections. Unknown personal credits remain pending; no results or roles invented.
- Source Total90 banner depicts a different product campaign and was not assigned to the T90 Shox Magia project.

- Removed standalone cover from every project detail to avoid repeating the banner already in the page screenshot. Collection covers retained. Opening motion now targets the first page image.

- Collection covers updated to supplied Features images for Crocs, Black Friday, Mid-Season Sale and Holiday Market; Summer Vacation uses its supplied 1200×900 asset. Other six covers retained because corresponding Features assets were not found. Detail page images unchanged.

- Collection ordered with sales promotions first (Black Friday, Summer Vacation, Mid-Season Sale, Holiday Market), followed by collaboration/content editorial pages. Sports Things removed from rendered projects; original files retained.

## Folder refresh — 2026-10-31
- Regenerated supplied campaign desktop page images from current source files; Crocs now uses supplied release page and Adidas supplied final PC image with Features cover.
- Added ATM and Clearance Sale. Their covers are source-page header excerpts because no matching Features still was supplied. Promotions stay before editorial pages.
- Source hashes recorded in docs/campaign-assets.json, new image filenames avoid stale browser cache. Originals are unchanged. Sports Things, Ordinary’s Select, Playlist remain excluded.

- Rechecked source pages: all nine supplied PC source hashes unchanged. Updated LE SSERAFIM Features cover and Clearance Features video still. Trimmed narrow edge artifacts on site-only page images with distinct filenames to avoid cached copies. Promotion order change pending clarification because Clearance was specified twice.

- Confirmed promotion order: Clearance Sale → Mid-Season Sale → Summer Vacation → Black Friday, followed by Holiday Market and remaining content projects.

- Holiday Market moved immediately before Black Friday in the promotion collection.

- Holiday Market screenshot outer decorations cropped an additional 2.7% on each side at owner request. Adidas screenshot blank hero replaced by the verified original PC MP4 between the captured header and following page content; muted autoplay/loop/inline playback and controls enabled.

- Clearance Sale desktop hero replaced with supplied local banner_pc.mp4, preserving the captured Kasina header above it and the rest of the static page below. Muted autoplay, looping, inline playback and controls enabled.

- AFTERMATH cover replaced with supplied atm/baner_feature.jpg and project title expanded from ATM. Black Friday hero replaced with supplied PC MP4 while preserving the captured header and remaining static page.

## Confirmed personal contribution — 2026-10-31
- Clearance Sale / Mid-Season Sale: KV production by 김한솔.
- Holiday Market / Kasina Crocs / Kasina Adidas / Kasina Polo / LE SSERAFIM: page design by 김한솔.
- ATM (AFTERMATH): page design and publishing by 김한솔.
- For confirmed entries without a publishing credit, display an em dash rather than claiming personal publishing. Other projects remain unconfirmed.

- Owner clarified specified roles are design only unless publishing was explicitly included. Only ATM has confirmed publishing; hide the publishing row on other project details rather than showing pending/dash.

- Summer Vacation contribution confirmed: Keyvisual Design and Page Design by 김한솔; no publishing credit.

- 2026-11-04: Replaced Polo detail images with a fresh desktop capture from https://www.kasina.co.kr/discover/61944 after scrolling through all content. Included campaign plus styling products, excluded corporate footer. Kept intrinsic aspect ratio and existing cover.

- Removed STYLING ITEMS product listing from Polo detail at owner request; page now ends after brunch event information.

- 2026-11-04: At viewport widths <=850px, eight projects with supplied mobile pages now show mobile image sets. Clearance, Black Friday and Adidas also use their mobile hero videos with preserved mobile headers. Other projects retain desktop images. Resizing across the breakpoint switches the detail media.

- Removed Nike T90 Shox Magia and Nike Superfly MOC from the portfolio collection at owner request; source assets retained.

- 2026-11-05: Project details updated to image-backed introductory hero, right-aligned role metadata, centered proportional gallery and thumbnail navigation, following owner-supplied Alephstudio layout reference. Mobile media selection retained.

- 2026-11-08: Applied Nothing-inspired editorial text hierarchy: serif display headings, small metadata labels, alternate section introduction alignments, narrow description columns and varied whitespace. Project detail two-column structure retained.


## 2026-11-13 — Content audit and source replacement
- Consolidated content scenes into 28 unique project entries. Banner and SNS variants now share one entry; duplicate image paths are removed within each gallery. Distinct works from the same brand remain separate.
- Preview and enlarged gallery use the same cover-first source list. Added 17 optimized exports from verified external-drive source folders for HYMNIKE, Air Max Muse, Midorikawa, UGG and Jordan Jumpman Jack. Original external-drive files remain unchanged. Source mapping: docs/content-replacement-audit.json.
- Existing 4:5 SNS artwork takes priority. Six projects have no matching 4:5 export in the searched content folders: Air Max 95, MM6, Imshop Hoka, UGG, Jordan Jumpman Jack and Clearance Sale. Use their available portrait source with contain, preserving the complete artwork rather than cropping to imitate 4:5.
- Guarded project-opening motion against unloaded zero-height gallery images. Escape in a native image dialog no longer closes the underlying project detail.
- Validation: JavaScript syntax, 226 active project/content asset paths, source dimensions, duplicate project keys and gallery paths passed. Additional literal local asset links passed. Desktop list and artwork preview rendered in Chrome. Mobile and full navigation interaction coverage remains unverified. No deployment performed.

- 2026-11-13: Multi-image content entries now include previous/next buttons and a current/total counter in the desktop preview and expanded mobile card. Selection persists per project, wraps at either end, and opening the enlarged gallery starts at the selected image. Single-image entries hide controls.

- 2026-11-13 follow-up: Replaced the zero-height floated content preview with a two-column grid and an explicit rows wrapper. The sticky artwork and controls now occupy real layout height and stay within their discipline, preventing overlap with Photography. Desktop preview height reserves space for title and controls. JS syntax and preview navigation checks passed; final browser visual verification was interrupted by a blank/loading browser surface.

- 2026-11-13: At owner request, PC-size content banners are excluded from both collection previews and enlarged content galleries. Portrait/mobile/SNS artwork remains; source files are retained.

- 2026-11-13: Removed inline preview arrow controls and the selected-row arrow prefix at owner request. Multi-image rows use compact +Nimg labels; single-image rows omit the count. Enlarged gallery navigation remains available.

- 2026-11-13: Restored only previous/next controls over the image, inset 16px from its left/right edges, with no slide counter. Compact list +Nimg labels retained. Controls hide for single-image entries.

- 2026-11-13: Merged the two Our Legacy content entries into one project gallery at owner request; both original artwork images are retained.

- 2026-11-13: Content Graphic Design and Photography groups use horizontal representative-image carousels, with touch/trackpad scrolling, keyboard arrows and plain navigation chevrons. Multi-image covers show +N at the upper right; opening a cover shows its gallery directly on mobile and desktop. The Details exclusion retained.

- 2026-11-13: Removed the Air Max 95 story-format image from its content gallery at owner request; retained the portrait cover. Source file retained.

- 2026-11-13: Hero wordmark now reveals from left to right with a horizontal clip sweep; supporting copy enters horizontally with staggered delays. Reduced-motion preference skips the entrance animation.

- 2026-11-13: Content carousel media frames have a fixed 4:5 aspect ratio. Images are positioned within the frame and use contain, so intrinsic dimensions cannot stretch the frame or crop artwork.

- 2026-11-13: All project detail credits use 기획 / 디자인 / 퍼블리싱 rows. Removed 역할 / 담당 / 브랜드 fields. Confirmed design and publishing names retained; unconfirmed credits show 확인 중.

- 2026-11-13: Detail 기획 / 디자인 / 퍼블리싱 values now render percentage contributions from optional project.contribution fields (planning, design, publishing). Unknown percentages show 확인 중 until the owner supplies values; named credits are preserved in source data.

- 2026-11-13: Owner confirmed contribution percentages: design is 50% for either KV or page design alone, 100% for both. AFTERMATH and LE SSERAFIM publishing are confirmed at 100%. Planning and unconfirmed Black Friday contribution remain pending.

- 2026-11-13: Fixed first-project grid specificity on mobile so Clearance uses the same cover dimensions as other cards. Project list now shows confirmed design/publishing contribution percentages alongside the work type, outside the detail page.

- 2026-11-13: Promotion list covers retain their intrinsic image aspect ratios at desktop and mobile widths. Removed fixed cover heights/cropping; content carousel 4:5 frames remain as requested.

- 2026-11-13: Removed negative tracking from individual hero letter flex items and added a small inner gutter, preventing the final M glyph from being clipped by the left-to-right reveal.

- 2026-11-13: Replaced the deeply nested type-decision flowchart with a compact three-step introduction and two condition/result tables for release and promotion templates. Mobile stacks the two tables. Preserved decision criteria and exception notes; removed the redundant introductory AS-IS → TO-BE kicker.

- 2026-11-13: Workflow portfolio now leads with four large, concrete improvement titles (release production process, request data sheet, Slack automation, banner operating guide), each linked to its case. Detailed template/condition logic is expandable supporting material. Retained the existing before/after evidence without inventing performance metrics.

- 2026-11-13: Workflow section now opens with an original SVG explanation of the release production improvement: previous handoffs, direct structured requests via data sheet/Slack, and AI input → type selection/code generation → designer review. Separate desktop/mobile diagrams use plain-language labels and retain source artwork in images/workflow. No numerical results claimed.

- 2026-11-13: Added owner-confirmed brand asset collection as a workflow improvement that reduced preparation time. Specific collection methods, AI/automation usage and measured time savings await owner details; no unconfirmed steps or metrics are shown.

- 2026-11-13: Owner requested the landscape Jordan Jumpman Jack banner alongside its portrait artwork. Restored only that PC original in the content gallery; other PC banners remain excluded.

- 2026-11-13: Owner confirmed brand asset automation: manually checking incoming inventory emails, visiting brand sites, saving images, organizing folders and creating PSD files took 20 minutes per 10 items; automation reduces this to 10 minutes and allows other work concurrently. Incoming inventory email automation is connected to initiate the workflow. Displayed the 50% time reduction and an original code-native workflow visual; no unconfirmed AI method or private source documents added.

- 2026-11-13: Owner requested horizontal user-flow structure, not the reference styling. Created original monochrome SVG diagrams for release page production and brand asset collection with connected steps, AI stages and a parallel-work branch. Small viewports scroll horizontally to preserve readability.

- 2026-11-13: Workflow step strips now use outlined rounded-rectangle nodes, with pill-shaped start/end nodes and connectors. Mobile stacks these nodes vertically. Rounded SVG and supplementary process nodes use the same shape language.

- 2026-11-13: Before/after comparisons reveal once on viewport entry in reading order: before panel, connecting arrow, after panel, with staggered list steps. Reduced-motion users see static content. Observer initialization follows rendering; no layout dimensions animate.

- 2026-11-13: Unified UI palette to black/gray/white without desaturating project artwork. Added restrained one-time viewport reveals across headings, cards, flow nodes, results and contact information; gallery media fades on slide changes. Flow SVG connectors draw in on load. Navigation chevrons use a consistent 1.5px stroke; comparison arrows use a shared SVG icon. All new motion respects reduced-motion preferences.

- 2026-11-13: Owner confirmed page planning credit as 온라인 MD for all project pages. Planning displays that credit; design and publishing retain confirmed contribution percentages.

- 2026-11-13: Imported motion work from the same owner-supplied external-drive content source. Deduplicated exact files and selected representative SNS/mobile formats rather than repeating PC versions; grouped 16 videos into 11 motion projects. Source hashes/paths recorded in docs/motion-assets.json. H.264/AAC web copies total about 23 MB; originals unchanged. Motion carousel uses 4:5 contain frames, visible-only muted looping previews, and click/tap-to-enlarge native video controls. Multi-video works share the existing prev/next modal. Previews pause for hidden tabs/detail/dialog and respect reduced motion. All 16 video copies decode and posters exist.

- 2026-11-13: Audited all 10 project media sets. Corrected Clearance and Adidas mobile header clipping using original navigation artwork overlays, preserved Black Friday header, removed screenshot clipping from video headers, and set all six PC/mobile video aspect ratios from actual media dimensions. Local optimized Adidas copies replace the two remote video dependencies. Checked 98 project image files and all video dimensions; responsive browser screenshots remain unverified. Original project colors and header artwork preserved.

- 2026-11-13: Owner confirmed Black Friday key visual production by 김한솔. List shows KEY VISUAL; detail design contribution is 50% under the previously confirmed rule for a single design discipline.

- 2026-11-13: Owner specified Black Friday design contribution as 30%, superseding the generic single-discipline 50% rule for this project.

- 2026-11-14: Owner confirmed release-page production time as AS IS 30 minutes and TO BE 10 minutes. Added these values to the process diagram and corresponding before/after case. Brand asset collection remains a separate 20 → 10 minute measure.

- 2026-11-14: Owner clarified the request-workflow improvement: departments previously sent requests verbally or via individual Slack DMs. Owner established one Slack channel and a defined workflow for standardized requests. Replaced the unconfirmed MD-centric role allocation narrative with this actual AS IS / TO BE flow; no unsupported metrics included.

- 2026-11-14: Owner supplied actual Slack workflow screenshots showing form collection, management-sheet row creation, channel notifications with request metadata and a completion button, followed by requester completion messaging. Updated request-channel case to reflect these stages and generic form fields; no employee identities, internal links or unreleased campaign details copied.

- 2026-11-14: Reviewed public copy for clarity and factual scope. Campaign descriptions now match confirmed contributions (KV only vs page design/front-end). Standardized page-type terminology to 페이지 유형, shortened request/automation copy, and removed the outdated claim that all production times still await confirmation. Confirmed percentages, durations, uppercase work labels and ownership are unchanged.

- 2026-11-14: Owner chose the side-by-side AS IS → TO BE comparison as the shared layout. Applied the existing dark-left/light-right panels, centered arrow and numbered left-aligned lists to request workflow and supporting release workflow sections. Main release comparison and confirmed times retained.

- 2026-11-14: Content carousels now advance horizontally toward later items on downward page scroll and reverse on upward scroll. Native page scrolling is not intercepted. Only visible tracks respond; direct carousel input pauses the linkage temporarily, automatic rolling pauses during page-driven progress, and reduced-motion preference disables the effect.

- 2026-11-14: Unified all project detail contribution labels without names: actual design discipline + confirmed percentage, frontend percentage or 미참여 for explicit zero/nonparticipation. Planning stays 온라인 MD. Preserved per-project percentages, including Black Friday 30% and Adidas page design 100%; unknown frontend values remain 확인 중.

- 2026-11-14: Owner confirmed frontend nonparticipation for all projects except previously specified AFTERMATH and LE SSERAFIM (both 100%). All remaining frontend contributions are explicit zero and display 미참여.

- 2026-11-14: Owner specified key visual design participation as 100%. Applied to confirmed KV projects, including Black Friday, superseding its earlier 30% value. Other page-design percentages remain unchanged.

- 2026-11-14: Removed the top release-process SVG and repeated workflow inside supporting details because they duplicated the chosen side-by-side AS IS → TO BE case. Retained the case summary, confirmed 30 → 10 minute values and supporting template details.

- 2026-11-14: Owner revised brand asset preparation time to 30 → 10 minutes per 10 assets, superseding the prior 20 → 10 value. Updated result cards, diagram and alt text; reduction is approximately 67%.

- 2026-11-14: Visual polish pass: unified 16px page gutters, rebalanced the header after view-toggle removal, standardized category/carousel spacing and readable project metadata, refined mobile comparison typography and detail credits, enlarged close/navigation touch targets, added carousel boundary states, and prevented restored thumbnail focus from leaving sibling cards blurred. Preserved all confirmed copy, participation values, 4:5 frames, original campaign image ratios, automatic sliding and prior motion exclusions. JS syntax/media-path/CSS-balance/SVG checks passed. Browser visual QA was unavailable because the computer-use host could not connect.
