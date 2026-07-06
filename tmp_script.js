
// ════════════════════════════════════════════════════════════════
//  PORTFOLIO DATA
//  Категории: "professional" | "personal"
//  Добавляй работы: { img: "images/...", title: "Название", cat: "professional" }
// ════════════════════════════════════════════════════════════════
const WORKS = [
  // PROFESSIONAL
  {
    img: "promo_wargaming/promo_wargaming.png",
    title: "Autumn Essential",
    cat: "professional",
    desc: `Promotional illustration created for Wargaming as part of the World of Warships: Legends Autumn Essential campaign for Xbox and PlayStation Plus players.
    My work focused on scene assembly, composition, lighting, and final promotional render using existing materials.`,
    year: "2025",
    role: "2D Artist",
    tools: "Photoshop & Blender",
    extra: []
  },
  // { img: "images/pro/match3.jpg",        title: "Match 3 Game",             cat: "professional" },
  // { img: "images/pro/hidden-object.jpg", title: "Hidden Object Game",       cat: "professional" },
  // { img: "images/pro/casual-gate.png",   title: "Casual Gate — Overpaint",  cat: "professional" },
  // { img: "images/pro/cauldron.png",      title: "Witch's Cauldron",         cat: "professional" },
  // { img: "images/pro/textures.png",      title: "Casual Textures",          cat: "professional" },

  // PERSONAL
  // { img: "images/personal/photobash.png",    title: "Photobash",              cat: "personal" },
  // { img: "images/personal/anatomy.jpg",      title: "Anatomy Study",          cat: "personal" },
  // { img: "images/personal/portrait.jpg",     title: "Character Portrait",     cat: "personal" },
  // { img: "images/personal/forest-witch.png", title: "Book of the Forest Witch", cat: "personal" },
  // { img: "images/personal/autumn.jpg",       title: "Autumn Essential",       cat: "personal" },
];

const EXP_PRO = [
  {
    init: "ST",
    role: "2D Game Artist",
    company: "Your Studio Name",
    dates: "Month 20XX – Present",
    desc: "Add your job description here. What did you work on? What was your role? What tools did you use?"
  },
  {
    init: "FL",
    role: "Freelance 2D Artist",
    company: "Freelance",
    dates: "Month 20XX – Month 20XX",
    desc: "Concept art, stylized props, promotional illustrations, and character design for indie game studios and mobile game developers."
  },
];

const EXP_EDU = [
  {
    init: "U",
    role: "Your Degree / Course Name",
    company: "University / School Name",
    dates: "20XX – 20XX",
    desc: "Add relevant coursework, thesis, awards, or key skills developed here."
  },
];

const SOFTWARE = [
  { abbr: "PS",  name: "Photoshop"    },
  { abbr: "PC",  name: "Procreate"    },
  { abbr: "CSP", name: "Clip Studio"  },
  { abbr: "KR",  name: "Krita"        },
  { abbr: "BL",  name: "Blender"      },
  { abbr: "AI",  name: "Illustrator"  },
];

const ROLES = ["2D Game Artist", "Concept Artist", "Promo Illustrator", "Character Artist"];
const CAT_LABEL = { professional: "Professional", personal: "Personal" };


// ─── PORTFOLIO ────────────────────────────────────────────────────
const grid = document.getElementById('p-grid');
const moreBtn = document.getElementById('p-more');
const WORKS_PER_PAGE = 9;
let currentFilter = 'all';
let visibleWorks = WORKS_PER_PAGE;

function renderWorks(f) {
  currentFilter = f;
  const items = f === 'all' ? WORKS : WORKS.filter(w => w.cat === f);
  if (!items.length) {
    grid.innerHTML = `<div class="p-empty">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" opacity=".3">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <p>Add images to the WORKS array above</p>
    </div>`;
    moreBtn.classList.remove('show');
    return;
  }
  const shownItems = items.slice(0, visibleWorks);
  grid.innerHTML = shownItems.map(w => {
    const idx = WORKS.indexOf(w);
    return `<div class="p-card" data-idx="${idx}">
      <img src="${w.img}" alt="${w.title}" loading="lazy">
      <div class="p-ov"><div class="p-info">
        <span class="p-title">${w.title}</span>
        <span class="p-cat">${CAT_LABEL[w.cat] || w.cat}</span>
      </div></div>
    </div>`;
  }).join('');
  grid.querySelectorAll('.p-card').forEach(c =>
    c.addEventListener('click', () => openLB(WORKS[+c.dataset.idx])));
  moreBtn.classList.toggle('show', visibleWorks < items.length);
}
renderWorks('all');

moreBtn.addEventListener('click', () => {
  visibleWorks += WORKS_PER_PAGE;
  renderWorks(currentFilter);
});

document.querySelectorAll('.f-btn').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.f-btn').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    visibleWorks = WORKS_PER_PAGE;
    renderWorks(b.dataset.f);
  });
});


// ─── EXPERIENCE ───────────────────────────────────────────────────
function expHTML(arr) {
  return arr.map(e => `
    <div class="e-item">
      <div class="e-logo">
        ${e.logo ? `<img src="${e.logo}" alt="${e.company}">` : `<span class="e-logo-init">${e.init}</span>`}
      </div>
      <div>
        <p class="e-role">${e.role}</p>
        <p class="e-company">${e.company}</p>
        <p class="e-dates">${e.dates}</p>
        <p class="e-desc">${e.desc}</p>
      </div>
    </div>`).join('');
}
document.getElementById('exp-pro-list').innerHTML = expHTML(EXP_PRO);
document.getElementById('exp-edu-list').innerHTML = expHTML(EXP_EDU);

document.querySelectorAll('.e-tab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.e-tab').forEach(x => x.classList.remove('on'));
    document.querySelectorAll('.e-panel').forEach(x => x.classList.remove('on'));
    t.classList.add('on');
    document.getElementById('ep-' + t.dataset.ep).classList.add('on');
  });
});


// ─── SOFTWARE ─────────────────────────────────────────────────────
document.getElementById('sw-row').innerHTML = SOFTWARE.map(s =>
  `<div class="sw-item"><div class="sw-box">${s.abbr}</div>${s.name}</div>`
).join('');


// ─── TYPEWRITER ───────────────────────────────────────────────────
const tw = document.getElementById('tw');
let ri = 0, ci = 0, del = false;
function tick() {
  const w = ROLES[ri];
  tw.textContent = del ? w.slice(0, ci--) : w.slice(0, ci++);
  if (!del && ci > w.length) { setTimeout(() => { del = true; tick(); }, 1700); return; }
  if (del  && ci < 0)        { del = false; ri = (ri+1) % ROLES.length; ci = 0; setTimeout(tick, 350); return; }
  setTimeout(tick, del ? 40 : 70);
}
tick();


// ─── NAV + ACTIVE SECTION ─────────────────────────────────────────
const navEl = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = ['intro','portfolio','experience','about','contact'];

window.addEventListener('scroll', () => {
  navEl.classList.toggle('solid', window.scrollY > 60);
  let curr = 'intro';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) curr = id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + curr));
}, { passive: true });


// ─── SCROLL REVEAL ────────────────────────────────────────────────
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));


// ─── LIGHTBOX ─────────────────────────────────────────────────────
const lb   = document.getElementById('lb');
const lbCat = document.getElementById('lb-cat');
const lbTitle = document.getElementById('lb-title');
const lbCanvas = document.getElementById('lb-canvas');

function renderProjectBlocks(work) {
  const blocks = work.blocks || [
    { type: "image", src: work.img, alt: work.title },
    { type: "text", text: work.desc || "Project description will be added soon." },
    ...(work.extra || []).map(src => ({ type: "image", src, alt: `${work.title} additional image` }))
  ];

  const meta = [
    work.year ? ["Year", work.year] : null,
    work.role ? ["Role", work.role] : null,
    work.tools ? ["Tools", work.tools] : null,
  ].filter(Boolean);

  const blocksHTML = blocks.map(block => {
    if (block.type === "image") {
      return `<img class="lb-block-img" src="${block.src}" alt="${block.alt || work.title}" loading="lazy">`;
    }
    if (block.type === "text") {
      const paragraphs = String(block.text || "")
        .split("\n")
        .filter(Boolean)
        .map(p => `<p>${p}</p>`)
        .join("");
      return `<div class="lb-block-text">${paragraphs}</div>`;
    }
    return "";
  }).join("");

  const metaHTML = meta.length ? `<div class="lb-meta">${meta.map(([label, value]) =>
    `<div class="lb-meta-row"><span>${label}</span><span>${value}</span></div>`
  ).join("")}</div>` : "";

  return blocksHTML + metaHTML || `<div class="lb-empty">Project content will be added soon</div>`;
}

function openLB(work) {
  lbCat.textContent = CAT_LABEL[work.cat] || work.cat;
  lbTitle.textContent = work.title;
  lbCanvas.innerHTML = renderProjectBlocks(work);
  document.querySelector('.lb-box').scrollTop = 0;
  lb.classList.add('open'); document.body.style.overflow = 'hidden';
}
function closeLB() {
  lb.classList.remove('open'); document.body.style.overflow = '';
}
document.getElementById('lb-x').addEventListener('click', closeLB);
lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });

