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
