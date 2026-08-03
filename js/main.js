const GRADIENTS = [
  "linear-gradient(135deg, #1a1a1a, #4a4a4a)",
  "linear-gradient(135deg, #e63946, #f1a208)",
  "linear-gradient(135deg, #2b2d42, #8d99ae)",
  "linear-gradient(135deg, #006d77, #83c5be)",
  "linear-gradient(135deg, #6a4c93, #b298dc)",
  "linear-gradient(135deg, #3a3a3a, #c9c9c9)",
];

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function slideCount(p) {
  return Array.isArray(p.images) ? p.images.length : p.images;
}

function slideBackground(p, idx) {
  if (Array.isArray(p.images)) {
    return `url('${p.images[idx]}') center / contain no-repeat, #101210`;
  }
  return GRADIENTS[idx % GRADIENTS.length];
}

const projects = [
  {
    title: "Kasina x Crocs Echo II — Glow in the Dark",
    company: "카시나",
    desc: "카시나 x 크록스 콜라보 상품 출시를 위한 프리오더/릴리즈 랜딩페이지. 웹과 앱 두 가지 버전으로 제작했으며, 사전예약 카운트다운, 팝업 스토어 정보, 앱 다운로드 유도 흐름을 포함합니다.",
    credit: "Web Design: 김한솔",
    disciplines: ["Web Design"],
    deliverables: ["Landing Page"],
    year: 2026,
    images: [
      "images/kasina-crocs-echo-web.jpg",
      "images/kasina-crocs-echo-app-1.jpg",
      "images/kasina-crocs-echo-app-2.jpg",
    ],
  },
  {
    title: "Studio Rebrand 2025",
    company: "비케이브",
    desc: "부티크 스튜디오의 브랜드 아이덴티티 전면 개편. 로고, 타이포그래피, 명함 및 웹 적용까지 전체 시스템을 설계했습니다.",
    credit: "Creative Direction: 김한솔\nArt Direction & Design: S. Kim\nProject Management: M. Lee",
    disciplines: ["Content Design"],
    deliverables: ["Identity System"],
    year: 2025,
    images: 4,
  },
  {
    title: "Winter Campaign 2024",
    company: "비케이브",
    desc: "리테일 브랜드의 겨울 시즌 캠페인. 광고, 매장 그래픽, SNS 콘텐츠까지 통합된 비주얼 톤을 개발했습니다.",
    credit: "Art Direction: 김한솔\nPhotography: R. Choi\nStyling: H. Kang",
    disciplines: ["KV Design"],
    deliverables: ["Key Visual"],
    year: 2024,
    images: 6,
  },
  {
    title: "Type System vol.1",
    company: "데코큐비클",
    desc: "브랜드 전용 가변 타입페이스 개발 프로젝트. 디스플레이용 개성과 본문용 가독성을 동시에 만족시키는 시스템을 구축했습니다.",
    credit: "Type Design: 김한솔\nType Advisory: E. Noh",
    disciplines: ["Content Design"],
    deliverables: ["Identity System"],
    year: 2024,
    images: 3,
  },
  {
    title: "Editorial Series — Foundations",
    company: "데코큐비클",
    desc: "격월 발행 매거진의 편집 디자인. 그리드 시스템과 사진 편집 방향을 재정립하여 브랜드 톤을 일관되게 유지했습니다.",
    credit: "Editorial Design: 김한솔\nPhotography: Studio Placeholder",
    disciplines: ["Content Design"],
    deliverables: ["Editorial Layout"],
    year: 2023,
    images: 5,
  },
  {
    title: "Retail Space Signage",
    company: "데코큐비클",
    desc: "플래그십 스토어 오픈에 맞춘 사이니지 및 공간 그래픽 디자인. 브랜드 아이덴티티를 공간 경험으로 확장했습니다.",
    credit: "Environmental Design: 김한솔\nFabrication: Placeholder Studio",
    disciplines: ["Content Design"],
    deliverables: ["Signage System"],
    year: 2023,
    images: 4,
  },
  {
    title: "Digital Product Identity",
    company: "이공오",
    desc: "스타트업 제품 런칭을 위한 디지털 아이덴티티. 로고, 컬러 시스템, 웹사이트 디자인 방향을 함께 진행했습니다.",
    credit: "Creative Direction: 김한솔\nWeb Development: Placeholder Dev",
    disciplines: ["Web Design"],
    deliverables: ["Identity System"],
    year: 2022,
    images: 3,
  },
  {
    title: "New Year Visual 2021",
    company: "아이엠컴퍼니",
    desc: "새해를 맞이하는 브랜드 시즌 비주얼. 희망적이고 밝은 분위기를 그래픽 모티프로 표현했습니다.",
    credit: "Creative Direction: 김한솔\nIllustration: Placeholder Artist",
    disciplines: ["KV Design"],
    deliverables: ["Key Visual"],
    year: 2021,
    images: 2,
  },
  {
    title: "Independent Poster Project",
    company: "Independent",
    desc: "개인 작업으로 진행한 포스터 시리즈. 타이포그래피 실험을 중심으로 자유로운 형식을 탐구했습니다.",
    credit: "Design: 김한솔",
    disciplines: ["KV Design"],
    deliverables: ["Poster"],
    year: 2019,
    images: 3,
  },
];

projects.forEach((p) => {
  p.slug = slugify(p.title);
});

const filterState = { disciplines: new Set(), deliverables: new Set(), years: new Set() };

function collectListValues(field) {
  const seen = new Set();
  projects.forEach((p) => p[field].forEach((v) => seen.add(v)));
  return [...seen];
}

function renderFilterList(containerId, values, group) {
  document.getElementById(containerId).innerHTML = values
    .map((v) => `<button type="button" class="filter-item" data-group="${group}" data-value="${v}">${v}</button>`)
    .join("");
}

function renderFilterLists() {
  renderFilterList("filter-disciplines", collectListValues("disciplines"), "disciplines");
  renderFilterList("filter-deliverables", collectListValues("deliverables"), "deliverables");
  const years = [...new Set(projects.map((p) => p.year))].sort((a, b) => a - b);
  renderFilterList("filter-year", years.map(String), "years");
}

function matchesFilters(p) {
  const discOk = filterState.disciplines.size === 0 ||
    p.disciplines.some((d) => filterState.disciplines.has(d));
  const delivOk = filterState.deliverables.size === 0 ||
    p.deliverables.some((d) => filterState.deliverables.has(d));
  const yearOk = filterState.years.size === 0 || filterState.years.has(String(p.year));
  return discOk && delivOk && yearOk;
}

function applyFilters() {
  const rows = document.querySelectorAll("#project-list .project-row");
  let visible = 0;
  rows.forEach((row) => {
    const match = matchesFilters(projects[Number(row.dataset.index)]);
    row.classList.toggle("is-hidden", !match);
    if (match) visible++;
  });
  document.getElementById("filter-empty").hidden = visible > 0;
}

function clearFilters() {
  filterState.disciplines.clear();
  filterState.deliverables.clear();
  filterState.years.clear();
  document.querySelectorAll(".filter-item.active").forEach((c) => c.classList.remove("active"));
  applyFilters();
}

function sortProjectsByYear(order) {
  const list = document.getElementById("project-list");
  const rows = [...list.querySelectorAll(".project-row")];
  rows.sort((a, b) => {
    const ya = projects[Number(a.dataset.index)].year;
    const yb = projects[Number(b.dataset.index)].year;
    return order === "oldest" ? ya - yb : yb - ya;
  });
  rows.forEach((row) => list.appendChild(row));
}

function initFilters() {
  renderFilterLists();
  const panel = document.getElementById("filter-panel");
  panel.addEventListener("click", (e) => {
    const item = e.target.closest(".filter-item");
    if (item) {
      const { group, value } = item.dataset;
      if (filterState[group].has(value)) {
        filterState[group].delete(value);
      } else {
        filterState[group].add(value);
      }
      item.classList.toggle("active");
      applyFilters();
      return;
    }
    const sortBtn = e.target.closest(".sort-btn");
    if (sortBtn) {
      document.querySelectorAll(".sort-btn").forEach((b) => b.classList.remove("active"));
      sortBtn.classList.add("active");
      sortProjectsByYear(sortBtn.dataset.sort);
      return;
    }
    if (e.target.closest("#filter-clear")) clearFilters();
  });
}

function toggleBodyPanel(bodyClass, btnSelector, forceState) {
  const next = typeof forceState === "boolean" ? forceState : !document.body.classList.contains(bodyClass);
  document.body.classList.toggle(bodyClass, next);
  const btn = document.querySelector(btnSelector);
  btn.classList.toggle("active", next);
  btn.setAttribute("aria-expanded", String(next));
}

function toggleFilterPanel(forceState) {
  toggleBodyPanel("filters-open", '.nav-link[data-target="index-section"]', forceState);
}

function toggleAbout(forceState) {
  toggleBodyPanel("about-open", '.nav-link[data-target="about"]', forceState);
}

function initHeaderScrollShrink() {
  const header = document.querySelector(".site-header");
  let hasScrolled = false;
  const sync = () => {
    if (window.scrollY > 0) hasScrolled = true;
    header.classList.toggle("scrolled", hasScrolled);
  };
  window.addEventListener("scroll", sync, { passive: true });
  sync();
}

function initAboutScrollCollapse() {
  let scrollCollapsed = false;
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 0 && !scrollCollapsed) {
        scrollCollapsed = true;
        toggleAbout(false);
      }
    },
    { passive: true }
  );
}

function initHeaderOffsetSync() {
  const header = document.querySelector(".site-header");
  const sync = () => {
    document.documentElement.style.setProperty("--header-h", `${header.getBoundingClientRect().height}px`);
  };
  new ResizeObserver(sync).observe(header);
  sync();
}

function renderThumbStrip(p) {
  const total = slideCount(p);
  let html = "";
  for (let i = 0; i < total; i++) {
    html += `<div class="thumb-sq" style="background:${slideBackground(p, i)}"></div>`;
  }
  return html;
}

function renderProjects() {
  const list = document.getElementById("project-list");

  list.innerHTML = projects
    .map((p, pi) => {
      const disciplines = p.disciplines.map((d) => `<span>${d}</span>`).join("");
      const deliverables = p.deliverables.map((d) => `<span>${d}</span>`).join("");
      const mobileTags = [...p.disciplines, ...p.deliverables, String(p.year)]
        .map((t) => `<span>${t}</span>`)
        .join("");
      const metaLine = [String(p.year), ...p.disciplines].join(", ");

      const total = slideCount(p);

      return `
        <article class="project-row" data-index="${pi}">
          <h2 class="project-title-mobile">${p.title}</h2>
          <div class="project-thumb-wrap">
            <div class="project-thumb">
              <div class="thumb" style="background:${slideBackground(p, 0)}"></div>
            </div>
            <div class="project-thumb-strip">${renderThumbStrip(p)}</div>
          </div>
          <div class="project-main">
            <h2>${p.title}</h2>
            <div class="project-tags-mobile">${mobileTags}</div>
            <p class="project-desc">${p.desc}</p>
            <p class="project-credit">${p.credit}</p>
            <div class="project-counter">1 / ${total}</div>
            <div class="project-meta-line">${metaLine}</div>
          </div>
          <div class="project-tags">${disciplines}</div>
          <div class="project-deliverables">${deliverables}</div>
          <div class="project-year">${p.year}</div>
        </article>
      `;
    })
    .join("");

  list.querySelectorAll(".project-row").forEach((row) => {
    const pi = Number(row.dataset.index);

    row.addEventListener("click", () => {
      openModal(pi);
    });
  });
}

function initViewToggle() {
  const buttons = document.querySelectorAll(".view-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const view = btn.dataset.view;
      document.body.classList.toggle("view-image", view === "image");
      document.body.classList.toggle("view-list", view === "list");
    });
  });
}

function initNav() {
  document.querySelectorAll(".nav-link, .to-top, [data-target='top']").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (el.dataset.target === "index-section") toggleFilterPanel();
      if (el.dataset.target === "about") toggleAbout();
      if (el.dataset.target === "top") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = document.getElementById(el.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ---- Modal ---- */
const MOBILE_BREAKPOINT = 900;
let modalState = { index: null, slide: 0, openedByUs: false };

function buildModalDots(container, total, current) {
  container.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.className = "dot" + (i === current ? " active" : "");
    dot.setAttribute("aria-label", `${i + 1}번째 이미지`);
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      setModalSlide(i);
    });
    container.appendChild(dot);
  }
}

function setModalSlide(idx) {
  const p = projects[modalState.index];
  const total = slideCount(p);
  const clamped = ((idx % total) + total) % total;
  modalState.slide = clamped;
  document.getElementById("modal-thumb").style.background = slideBackground(p, clamped);
  document.querySelectorAll("#modal-dots .dot").forEach((d, i) => {
    d.classList.toggle("active", i === clamped);
  });
}

function renderModalContent() {
  const p = projects[modalState.index];
  document.getElementById("modal-title").textContent = p.title;
  document.getElementById("modal-desc").textContent = p.desc;
  document.getElementById("modal-tags").innerHTML = [p.company, ...p.disciplines, String(p.year)]
    .map((t) => `<span>${t}</span>`)
    .join("");
  buildModalDots(document.getElementById("modal-dots"), slideCount(p), modalState.slide);
  setModalSlide(modalState.slide);
}

function openModal(index, startSlide = 0, opts = {}) {
  const { fromPopstate = false } = opts;
  modalState.index = index;
  modalState.slide = startSlide;
  renderModalContent();

  const overlay = document.getElementById("modal-overlay");
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add("open"));

  if (!fromPopstate) {
    const slug = projects[index].slug;
    history.pushState({ project: slug }, "", `?project=${slug}`);
    modalState.openedByUs = true;
  }

  document.getElementById("modal-close").focus();
}

function closeModal(opts = {}) {
  const { fromPopstate = false } = opts;
  const overlay = document.getElementById("modal-overlay");
  if (overlay.hidden) return;

  overlay.classList.remove("open");
  setTimeout(() => {
    overlay.hidden = true;
  }, 200);

  if (!fromPopstate) {
    if (modalState.openedByUs) {
      history.back();
    } else {
      history.replaceState(null, "", location.pathname);
    }
  }
  modalState.index = null;
  modalState.openedByUs = false;
}

function initModal() {
  const overlay = document.getElementById("modal-overlay");
  const box = document.getElementById("modal-box");

  document.getElementById("modal-close").addEventListener("click", () => closeModal());

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) closeModal();
  });

  document.querySelector(".modal-nav.prev").addEventListener("click", (e) => {
    e.stopPropagation();
    setModalSlide(modalState.slide - 1);
  });
  document.querySelector(".modal-nav.next").addEventListener("click", (e) => {
    e.stopPropagation();
    setModalSlide(modalState.slide + 1);
  });

  let touchStartX = 0;
  let touchStartY = 0;
  let touchDX = 0;
  let touchDY = 0;

  box.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchDX = 0;
    touchDY = 0;
  });

  box.addEventListener("touchmove", (e) => {
    touchDX = e.touches[0].clientX - touchStartX;
    touchDY = e.touches[0].clientY - touchStartY;
  });

  box.addEventListener("touchend", () => {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const absX = Math.abs(touchDX);
    const absY = Math.abs(touchDY);

    if (isMobile && absY > 90 && absY > absX && touchDY > 0) {
      closeModal();
      return;
    }
    if (absX > 60 && absX > absY) {
      if (touchDX < 0) setModalSlide(modalState.slide + 1);
      else setModalSlide(modalState.slide - 1);
    }
  });

  window.addEventListener("popstate", () => {
    const params = new URLSearchParams(location.search);
    const slug = params.get("project");
    if (slug) {
      const idx = projects.findIndex((p) => p.slug === slug);
      if (idx !== -1) openModal(idx, 0, { fromPopstate: true });
    } else {
      closeModal({ fromPopstate: true });
    }
  });
}

function openFromUrl() {
  const params = new URLSearchParams(location.search);
  const slug = params.get("project");
  if (!slug) return;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx !== -1) openModal(idx, 0, { fromPopstate: true });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initFilters();
  initViewToggle();
  initNav();
  initModal();
  initHeaderScrollShrink();
  initHeaderOffsetSync();
  initAboutScrollCollapse();
  document.body.classList.add("view-image");
  toggleAbout(true);
  openFromUrl();
});
