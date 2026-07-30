const GRADIENTS = [
  "linear-gradient(135deg, #1a1a1a, #4a4a4a)",
  "linear-gradient(135deg, #e63946, #f1a208)",
  "linear-gradient(135deg, #2b2d42, #8d99ae)",
  "linear-gradient(135deg, #006d77, #83c5be)",
  "linear-gradient(135deg, #6a4c93, #b298dc)",
  "linear-gradient(135deg, #3a3a3a, #c9c9c9)",
];

const projects = [
  {
    title: "Studio Rebrand 2025",
    desc: "부티크 스튜디오의 브랜드 아이덴티티 전면 개편. 로고, 타이포그래피, 명함 및 웹 적용까지 전체 시스템을 설계했습니다.",
    credit: "Creative Direction: J. Han\nArt Direction & Design: S. Kim\nProject Management: M. Lee",
    disciplines: ["Creative Direction", "Branding"],
    deliverables: ["Identity System", "Guidelines"],
    year: 2025,
    images: 4,
  },
  {
    title: "Winter Campaign 2024",
    desc: "리테일 브랜드의 겨울 시즌 캠페인. 광고, 매장 그래픽, SNS 콘텐츠까지 통합된 비주얼 톤을 개발했습니다.",
    credit: "Art Direction: J. Han\nPhotography: R. Choi\nStyling: H. Kang",
    disciplines: ["Art Direction", "Visual Design"],
    deliverables: ["Campaign Visuals", "Motion"],
    year: 2024,
    images: 6,
  },
  {
    title: "Type System vol.1",
    desc: "브랜드 전용 가변 타입페이스 개발 프로젝트. 디스플레이용 개성과 본문용 가독성을 동시에 만족시키는 시스템을 구축했습니다.",
    credit: "Type Design: J. Han\nType Advisory: E. Noh",
    disciplines: ["Type Design", "Branding"],
    deliverables: ["Custom Typeface", "Specimen"],
    year: 2024,
    images: 3,
  },
  {
    title: "Editorial Series — Foundations",
    desc: "격월 발행 매거진의 편집 디자인. 그리드 시스템과 사진 편집 방향을 재정립하여 브랜드 톤을 일관되게 유지했습니다.",
    credit: "Editorial Design: J. Han\nPhotography: Studio Placeholder",
    disciplines: ["Editorial Design"],
    deliverables: ["Print Layout", "Cover Series"],
    year: 2023,
    images: 5,
  },
  {
    title: "Retail Space Signage",
    desc: "플래그십 스토어 오픈에 맞춘 사이니지 및 공간 그래픽 디자인. 브랜드 아이덴티티를 공간 경험으로 확장했습니다.",
    credit: "Environmental Design: J. Han\nFabrication: Placeholder Studio",
    disciplines: ["Environmental Design"],
    deliverables: ["Signage System", "Wayfinding"],
    year: 2023,
    images: 4,
  },
  {
    title: "Digital Product Identity",
    desc: "스타트업 제품 런칭을 위한 디지털 아이덴티티. 로고, 컬러 시스템, 웹사이트 디자인 방향을 함께 진행했습니다.",
    credit: "Creative Direction: J. Han\nWeb Development: Placeholder Dev",
    disciplines: ["Digital Design", "Identity"],
    deliverables: ["Logo", "Web Design"],
    year: 2022,
    images: 3,
  },
  {
    title: "New Year Visual 2021",
    desc: "새해를 맞이하는 브랜드 시즌 비주얼. 희망적이고 밝은 분위기를 그래픽 모티프로 표현했습니다.",
    credit: "Creative Direction: J. Han\nIllustration: Placeholder Artist",
    disciplines: ["Visual Design"],
    deliverables: ["Key Visual", "Poster Series"],
    year: 2021,
    images: 2,
  },
  {
    title: "Independent Poster Project",
    desc: "개인 작업으로 진행한 포스터 시리즈. 타이포그래피 실험을 중심으로 자유로운 형식을 탐구했습니다.",
    credit: "Design: J. Han",
    disciplines: ["Graphic Design", "Poster Design"],
    deliverables: ["Poster Series"],
    year: 2019,
    images: 3,
  },
];

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

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initViewToggle();
  initNav();
  document.body.classList.add("view-image");
});
