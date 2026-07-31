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

const projects = [
  {
    title: "Studio Rebrand 2025",
    company: "비케이브",
    desc: "부티크 스튜디오의 브랜드 아이덴티티 전면 개편. 로고, 타이포그래피, 명함 및 웹 적용까지 전체 시스템을 설계했습니다.",
    credit: "Creative Direction: 김한솔\nArt Direction & Design: S. Kim\nProject Management: M. Lee",
    disciplines: ["Creative Direction", "Branding"],
    deliverables: ["Identity System", "Guidelines"],
    year: 2025,
    images: 4,
  },
  {
    title: "Winter Campaign 2024",
    company: "비케이브",
    desc: "리테일 브랜드의 겨울 시즌 캠페인. 광고, 매장 그래픽, SNS 콘텐츠까지 통합된 비주얼 톤을 개발했습니다.",
    credit: "Art Direction: 김한솔\nPhotography: R. Choi\nStyling: H. Kang",
    disciplines: ["Art Direction", "Visual Design"],
    deliverables: ["Campaign Visuals", "Motion"],
    year: 2024,
    images: 6,
  },
  {
    title: "Type System vol.1",
    company: "데코큐비클",
    desc: "브랜드 전용 가변 타입페이스 개발 프로젝트. 디스플레이용 개성과 본문용 가독성을 동시에 만족시키는 시스템을 구축했습니다.",
    credit: "Type Design: 김한솔\nType Advisory: E. Noh",
    disciplines: ["Type Design", "Branding"],
    deliverables: ["Custom Typeface", "Specimen"],
    year: 2024,
    images: 3,
  },
  {
    title: "Editorial Series — Foundations",
    company: "데코큐비클",
    desc: "격월 발행 매거진의 편집 디자인. 그리드 시스템과 사진 편집 방향을 재정립하여 브랜드 톤을 일관되게 유지했습니다.",
    credit: "Editorial Design: 김한솔\nPhotography: Studio Placeholder",
    disciplines: ["Editorial Design"],
    deliverables: ["Print Layout", "Cover Series"],
    year: 2023,
    images: 5,
  },
  {
    title: "Retail Space Signage",
    company: "데코큐비클",
    desc: "플래그십 스토어 오픈에 맞춘 사이니지 및 공간 그래픽 디자인. 브랜드 아이덴티티를 공간 경험으로 확장했습니다.",
    credit: "Environmental Design: 김한솔\nFabrication: Placeholder Studio",
    disciplines: ["Environmental Design"],
    deliverables: ["Signage System", "Wayfinding"],
    year: 2023,
    images: 4,
  },
  {
    title: "Digital Product Identity",
    company: "이공오",
    desc: "스타트업 제품 런칭을 위한 디지털 아이덴티티. 로고, 컬러 시스템, 웹사이트 디자인 방향을 함께 진행했습니다.",
    credit: "Creative Direction: 김한솔\nWeb Development: Placeholder Dev",
    disciplines: ["Digital Design", "Identity"],
    deliverables: ["Logo", "Web Design"],
    year: 2022,
    images: 3,
  },
  {
    title: "New Year Visual 2021",
    company: "아이엠컴퍼니",
    desc: "새해를 맞이하는 브랜드 시즌 비주얼. 희망적이고 밝은 분위기를 그래픽 모티프로 표현했습니다.",
    credit: "Creative Direction: 김한솔\nIllustration: Placeholder Artist",
    disciplines: ["Visual Design"],
    deliverables: ["Key Visual", "Poster Series"],
    year: 2021,
    images: 2,
  },
  {
    title: "Independent Poster Project",
    company: "Independent",
    desc: "개인 작업으로 진행한 포스터 시리즈. 타이포그래피 실험을 중심으로 자유로운 형식을 탐구했습니다.",
    credit: "Design: 김한솔",
    disciplines: ["Graphic Design", "Poster Design"],
    deliverables: ["Poster Series"],
    year: 2019,
    images: 3,
  },
];

projects.forEach((p) => {
  p.slug = slugify(p.title);
});

function renderProjects() {
  const list = document.getElementById("project-list");

  list.innerHTML = projects
    .map((p, pi) => {
      const disciplines = p.disciplines.map((d) => `<span>${d}</span>`).join("");
      const deliverables = p.deliverables.map((d) => `<span>${d}</span>`).join("");
      const mobileTags = [...p.disciplines, ...p.deliverables, String(p.year)]
        .map((t) => `<span>${t}</span>`)
        .join("");

      return `
        <article class="project-row" data-index="${pi}" data-current="0">
          <div class="project-thumb-wrap">
            <div class="project-thumb">
              <div class="thumb" style="background:${GRADIENTS[0]}"></div>
              <button class="thumb-nav prev" aria-label="이전 이미지"></button>
              <button class="thumb-nav next" aria-label="다음 이미지"></button>
            </div>
            <div class="thumb thumb-sm project-thumb-sm" style="background:${GRADIENTS[0]}"></div>
          </div>
          <div class="project-main">
            <h2>${p.title}</h2>
            <div class="project-tags-mobile">${mobileTags}</div>
            <p class="project-desc">${p.desc}</p>
            <p class="project-credit">${p.credit}</p>
            <div class="project-counter">1 / ${p.images}</div>
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
    const total = projects[pi].images;
    const bigThumb = row.querySelector(".project-thumb .thumb");
    const smThumb = row.querySelector(".project-thumb-sm");
    const counter = row.querySelector(".project-counter");

    const setSlide = (idx) => {
      const clamped = ((idx % total) + total) % total;
      row.dataset.current = clamped;
      const bg = GRADIENTS[clamped % GRADIENTS.length];
      bigThumb.style.background = bg;
      smThumb.style.background = bg;
      counter.textContent = `${clamped + 1} / ${total}`;
    };

    row.querySelector(".thumb-nav.prev").addEventListener("click", (e) => {
      e.stopPropagation();
      setSlide(Number(row.dataset.current) - 1);
    });
    row.querySelector(".thumb-nav.next").addEventListener("click", (e) => {
      e.stopPropagation();
      setSlide(Number(row.dataset.current) + 1);
    });

    row.addEventListener("click", () => {
      openModal(pi, Number(row.dataset.current));
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
  document.querySelectorAll(".nav-link, .to-top").forEach((el) => {
    el.addEventListener("click", () => {
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
  const clamped = ((idx % p.images) + p.images) % p.images;
  modalState.slide = clamped;
  document.getElementById("modal-thumb").style.background = GRADIENTS[clamped % GRADIENTS.length];
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
  buildModalDots(document.getElementById("modal-dots"), p.images, modalState.slide);
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
  initViewToggle();
  initNav();
  initModal();
  document.body.classList.add("view-image");
  openFromUrl();
});
