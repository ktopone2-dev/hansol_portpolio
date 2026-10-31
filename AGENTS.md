# AGENTS.md — KIM portfolio (김한솔)

Handoff doc for coding agents (Codex, Claude Code, etc.). Read this first, then `docs/SPEC.md` for product decisions and history.

## What this is

Personal portfolio site for **김한솔 (KIM)**, a web/content designer, built to support a job search. Static site, no build step, no framework.

- Live: https://ktopone2-dev.github.io/hansol_portpolio/
- Repo: https://github.com/ktopone2-dev/hansol_portpolio (public)
- Deploy: GitHub Pages serves `main` from the repo root. Pushing to `main` redeploys in ~1–2 min.
- Layout inspired by eepark.org (minimal black/white index with Image/List view). Use it for layout ideas only. Never copy its logo, images, copy, or credits.

## Stack and run

- Plain HTML + CSS + vanilla JS (ES2020). No bundler, no package.json, no tests.
- Font: Pretendard from the jsDelivr CDN (`index.html` `<link>`).
- Run locally from the repo root:

```bash
python3 -m http.server 5173
# open http://localhost:5173/index.html
```

Browsers cache `css/style.css` and `js/main.js` aggressively on a reused localhost port. If an edit seems to have no effect, hard-reload or restart the server on a new port before debugging.

## Files

```
index.html        markup: sticky header (bar, logo, About drawer, Index filter drawer), index section, footer meta, modal shell
css/style.css     all styles (tokens in :root, then header, drawers, list/rows, views, modal, responsive)
js/main.js        data (projects[]), rendering, filters/sort, view toggle, drawers, modal + URL state
images/           real project images (JPG, web-optimized)
docs/SPEC.md      product decisions, user flow, history
```

## Data model (`projects[]` in js/main.js)

Display order is array order until the user clicks Latest/Oldest. Add or edit projects here only; the DOM is generated from it.

```js
{
  title: "Kasina x Crocs Echo II — Glow in the Dark",
  company: "카시나",              // shown as a modal tag only, not a list column
  desc: "…",                      // Korean prose
  credit: "Web Design: 김한솔",   // "\n" separated lines, shown in Image View
  disciplines: ["Web Design"],    // filter group 1 (list column)
  deliverables: ["Landing Page"], // filter group 2 (list column)
  year: 2026,                     // filter group 3 + sort key
  images: ["images/a.jpg", ...]   // array of paths = real images
          // OR a number N = N placeholder slides (hatch/gradient fill)
}
```

- `slug` is derived from `title` by `slugify()` and used for `?project=<slug>`. `slugify` strips non-ASCII, so a Korean-only title yields an empty slug. Give new projects an English title or add a fallback before using Korean-only titles.
- Filter option lists are built from the data (`collectListValues`), so new tags appear automatically.
- Current taxonomy: Disciplines = `Web Design`, `Content Design`, `KV Design`. Deliverables = `Landing Page`, `Identity System`, `Key Visual`, `Editorial Layout`, `Signage System`, `Poster`.

### Adding a real project

1. Export images (JPG, ~80% quality, target under 300 KB each) into `images/` with kebab-case names.
2. Add an entry to `projects[]` with `images: [paths]`.
3. Real images render with `contain` over `#101210` in the modal, so tall screenshots are not cropped. Image View list thumbnails use `cover` (`.project-thumb .thumb` has `background-size: cover !important`), so they crop. Check both.

## Behavior (as built)

- **Header** is sticky. The KIM wordmark shrinks on first scroll and stays shrunk. `--header-h` is kept in sync by a `ResizeObserver` so `.list-header` sticks directly under the header.
- **ABOUT** button toggles `body.about-open` (grid-rows 0fr→1fr animation). Open on load, auto-collapses when leaving the top, and reopens when returning to the top.
- **INDEX** button toggles `body.filters-open`. Panel has Disciplines / Deliverables / Year columns aligned to the list grid. Multi-select: OR within a column, AND across columns. Latest/Oldest reorders existing rows in place. Non-matching rows get `.is-hidden`. "Clear filters" resets.
- **View toggle**: `body.view-image` (default) or `body.view-list`.
  - Image View: 5-column grid `4fr 4fr 3fr 3fr 2fr` (thumb | project | disciplines | deliverables | year).
  - List View: stacked rows with a strip of 56×40 squares (one per image), title, and a "year, disciplines" line.
- **Modal**: clicking a row opens it. Desktop is a centered box (max 920 px) over a dim overlay.
  - Contents: image area at 5:4, dot pagination (active `#000`, inactive `#f4f4f4`), title, tags (company, disciplines, year), description.
  - Closing: × button, overlay click, Esc, swipe down (≤900 px only).
  - Swipe left/right changes slides. Arrows show on hover (always visible ≤900 px).
  - URL state: opening does `history.pushState(?project=slug)`. Closing uses `history.back()` if the modal was opened in-page, else `replaceState`. `popstate` keeps it in sync. Deep links open the modal on load.
- **Mobile (≤900 px)**: rows become one column in the order title → image → tags/desc/credit/counter (`.project-title-mobile` is a mobile-only duplicate of the title; the desktop `h2` is hidden). List header hidden. Footer meta and filter grid collapse to one column.
- **Footer meta** (`aside.about-meta`): Contact | Skills | Experience, 3 columns on desktop.

## Design tokens (css/style.css `:root`)

`--black #0a0a0a`, `--white #fff`, `--gray #6b6b6b`, `--line #d9d9d9`, `--hover-bg #f4f4f4`, `--gap 20px`. Base font 14 px Pretendard, letter-spacing −0.01em. Breakpoints: 900 px (mobile layout) and 560 px (tighter padding). Keep it monochrome and flat: no shadows, no gradients except placeholder fills.

## Hard constraints

1. **No personal data on the public site or repo.** Do not add phone number, home address, birth year/age, salary figures, GPA, or resume PDFs. The only contact is the email already on the page. `.gitignore` blocks `*.pdf` as a safety net.
2. **Most projects are placeholders.** Only "Kasina x Crocs Echo II" is real work. The other 8 entries (titles, descriptions, credits such as "S. Kim", "M. Lee", "R. Choi", company assignments, years) are invented demo content. Do not treat them as facts. Replace them with real work, and keep the About note saying content is being replaced until that is done.
3. **Employer work needs the owner's OK.** Only add campaigns/assets the owner confirms are public.
4. Do not copy third-party assets (eepark.org logo, fonts, images, credits).

## Git

- `main` is live. Commit small, descriptive messages. Pushing to `main` publishes.
- `explore-editorial-mono` exists **only on the owner's machine** (never pushed). It is an older alternate look: EB Garamond serif, paper `#f6f3ec`, terracotta `#b5502f`, numbered rows, diagonal-hatch placeholders, footer timestamp. It predates the filter panel, About drawer, and new List View, so merging it needs real work. Ask the owner before reviving it.

## Known issues / TODO

- [ ] Replace placeholder projects with real work and images (biggest gap).
- [ ] Taxonomy: owner proposed three categories — 웹디자인 / 컨텐츠 디자인 / 가이드 제작·운영관리. `Web Design`, `Content Design`, `KV Design` exist; a guide/operations category is not represented yet. Confirm names with the owner.
- [ ] Mobile modal is currently a 90vh rounded card with 16 px inset. The original decision was full-screen on mobile. Confirm which the owner wants.
- [ ] Dead code: `.thumb-nav` styles (slide arrows were removed from Image View rows), and `.project-counter` shows a static "1 / N".
- [ ] `slugify` empty-slug edge case for Korean-only titles; no uniqueness check.
- [ ] Accessibility: project rows are clickable `<article>`s without `tabindex`/`role="button"`/key handlers; modal has no focus trap or focus return.
- [ ] Missing favicon and Open Graph/Twitter meta (matters for link previews).
- [ ] Optional: WebP images, `loading="lazy"` once real images are `<img>` tags.

## 2026-10-13 — Current design update (supersedes older layout/modal notes)

- Wordmark is now KIMHANSOL, left aligned in a compact sticky header; navigation sits on the right.
- HuskyFox reference structure: a wide featured project visual followed by split project stories. Each story has a cover and description on the left and a taller supporting image on the right.
- The old Image/List view and modal were replaced with a URL-addressable second-level detail screen at `?project=<slug>` using the existing static index entry point, compatible with GitHub Pages.
- Details show large, uncropped project images, overview, credits, supporting gallery, return and next-project links. Returning restores list scroll position and preserves filters/sort.
- Mobile stacks project imagery; gallery is one column below 600px. White/black visual style remains. About still collapses on scroll and reopens at the top.
- Non-real projects are explicitly presented as sample content, not verified professional work. No third-party reference assets were copied.
- Implementation: index.html, css/style.css, js/main.js. Legacy modal/view notes above describe the previous version.

- 2026-10-13 follow-up: Removed the standalone featured Crocs banner from the top. The page now starts with the split project list below About. Crocs remains in the project list and detail route.

## 2026-10-31 — Current portfolio state (supersedes earlier UI notes)

- Single scrolling black main page with four independent sections: Promotion & Content Pages, Content Design, Photography, Workflow Improvement. Section/nav numbers removed.
- Six real supplied campaign entries remain in `projects` data in js/main.js. Ordinary’s Select and Playlist are excluded from the collection; archived HTML is retained.
- Cards dim their siblings on hover/focus. No card arrow badges. Opening expands the selected image with a perspective tilt; closing returns it to its original card.
- Full-screen detail has a translucent background, sticky left project information, numbered Design/Publishing credits, and a right image gallery. Unknown individual credits remain pending.
- Details use desktop screenshots split into JPEG sections under images/pages; images fit available width without cropping. Clicking opens the image at full resolution. No live iframe demos are rendered.
- `projects/` preserves the supplied HTML and capture copies. Screenshot PNGs are retained alongside optimized gallery JPEGs. Crocs release capture is not used because of missing/unstable content; Crocs uses teaser and app design images.
- Crocs/Polo covers use supplied local banner assets copied into images/. Other cover media may still be remote.
- Keep original campaign colors inside screenshots. Do not invent names, responsibilities, metrics, or new projects. Consult docs/SPEC.md for decisions; later owner instructions take precedence.
- No build step. Run `python3 -m http.server 5187` from this directory to preview. GitHub Pages serves the main branch.
