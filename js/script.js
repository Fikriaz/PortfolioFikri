
const projects = {
  bpmn: {
    title: 'BPMN Generate Test Scenario',
    thumb: 'images/thumb_bpmn.png',                  // 📸 ISI: 'images/projects/bpmn-thumb.jpg'
    images: [
      'images/2_bpmn.png',                       // 📸 ISI: gambar utama detail
      'images/3_bpmn.png',                       // 📸 ISI: thumbnail 1
      'images/4_bpmn.png',                       // 📸 ISI: thumbnail 2
      'images/1_BPMN.png',                       // 📸 ISI: thumbnail 3
    ],
    problem: 'The process of creating test scenarios by testers from BPMN diagrams is time-consuming and prone to human error, making the creation process inefficient.',
    solution: 'Building a tool that can read and generate test scenarios based on the paths traversed in a BPMN diagram using a Depth First Search (DFS) algorithm, then passing them to an AI to make them easier to understand.',
    role: 'Designing the architecture, writing the node & edge extraction logic from BPMN XML, and developing a complete test scenario output template.',
    impact: 'Reducing test scenario creation time and improving coverage consistency across sessions.',
    stack: ['Java', 'BPMN 2.0', 'Camunda Modeler', 'XML Parsing', 'OpenAI API'],
  },
  maliva: {
    title: 'MALIVA',
    thumb: 'images/thumb_mall.png',                  // 📸 ISI: 'images/projects/maliva-thumb.jpg'
    images: [
      'images/1-mal.png',
      'images/1_malll.png',                       // 📸 ISI: thumbnail 1
      'images/2_malll.png',                       // 📸 ISI: thumbnail 2
      'images/3_malll.png', 
      ],   // 📸 ISI: [main, thumb1, thumb2, thumb3]
    problem: 'Many users, especially those visiting Malang, are not familiar with the city’s tourist attractions and often struggle to plan trips that match their personal preferences.',
    solution: 'Developed an Android application that helps users plan personalized travel itineraries based on their preferences while promoting tourist destinations in Malang.',
    role: 'Designed and developed the application UI/UX, integrated REST APIs, and connected the machine learning model to the user interface.',
    impact: 'Bangkit Academy 2024 Capstone Project — selected as a final product and received positive feedback from industry mentors.',
    stack: ['Android', 'Kotlin', 'REST API', 'Machine Learning'],
  },
  cypress: {
    title: 'Basic CRUD Cypress',
    thumb: 'images/thumb_orangehrm.png',                  // 📸 ISI: 'images/projects/cypress-thumb.jpg'
    images: ['images/1_orangehrm.png', 'images/2_orangehrm.png', '', ''],   // 📸 ISI: [main, thumb1, thumb2, thumb3]
    problem: 'Manual testing for CRUD operations is time-consuming, repetitive, and prone to human error during regression testing.',
    solution: 'Automated end-to-end test suite using Cypress that covers all CRUD scenarios consistently and repeatably.',
    role: 'Designed the test structure, wrote test scripts, and prepared test data and environment setup.',
    impact: 'Regression testing time reduced significantly; bugs detected earlier in the development cycle.',
    stack: ['Cypress', 'JavaScript', 'E2E Testing', 'Mocha', 'CI/CD'],
  },
  jubelio: {
    title: 'Jubelio QA Testing',
    thumb: 'images/coming_soon.png',                  // 📸 ISI: 'images/projects/jubelio-thumb.jpg'
    images: ['', '', '', ''],   // 📸 ISI: [main, thumb1, thumb2, thumb3]
    problem: 'The Jubelio e-commerce platform requires comprehensive validation of critical features such as login and product management.',
    solution: 'Preparation of comprehensive manual test cases and API testing using Postman to validate backend endpoints.',
    role: 'Creating test plans, writing manual test cases, executing API testing, and generating structured bug reports.',
    impact: 'Identifying and documenting critical bugs before production release; increasing the QA team\'s confidence.',
    stack: ['Postman', 'API Testing', 'Manual Testing', 'Jubelio Platform', 'Test Case Design'],
  },

  prd: {
    title: 'PRD & System Analysis',
    thumb: 'images/coming_soon.png',                  // 📸 ISI: 'images/projects/prd-thumb.jpg'
    images: ['', '', '', ''],   // 📸 ISI: [main, thumb1, thumb2, thumb3]
    problem: 'The development team requires clear and structured documentation as a guide for product development from start to finish.',
    solution: 'Preparation of a complete PRD including user stories, acceptance criteria, task breakdowns, and flow diagrams to guide the development team.',
    role: 'Creating the PRD, task breakdowns, UI wireframe designs, and drafting manual test cases for product quality validation.',
    impact: 'The resulting PRD became the main reference for the development team and smoothed communication between stakeholders and engineers.',
    stack: ['Figma', 'Notion', 'Trello', 'Manual Testing', 'BPMN 2.0'],
  },
};

/* ── Inject thumbnail ke card grid ── */
function injectThumbs() {
  document.querySelectorAll('.project-card').forEach(card => {
    const key = card.dataset.project;
    const p = projects[key];
    if (!p || !p.thumb) return;          // skip jika foto belum diisi
    const thumbEl = card.querySelector('.project-thumb');
    if (!thumbEl) return;
    thumbEl.innerHTML = `<img src="${p.thumb}" alt="${p.title}">`;
  });
}

/* ── Detail modal ── */
function openDetail(key) {
  const p = projects[key];
  if (!p) return;

  document.getElementById('detail-title').textContent = p.title;
  document.getElementById('detail-problem').textContent = p.problem;
  document.getElementById('detail-solution').textContent = p.solution;
  document.getElementById('detail-role').textContent = p.role;
  document.getElementById('detail-impact').textContent = p.impact;
  document.getElementById('detail-stack').innerHTML =
    p.stack.map(s => `<span class="stack-tag">${s}</span>`).join('');

  /* ── Gambar utama detail ── */
  const mainImg = document.getElementById('detail-main-img');
  const allImgs = (p.images || []).filter(Boolean);
  if (allImgs[0]) {
    mainImg.innerHTML = `<img src="${allImgs[0]}" alt="${p.title}">`;
    mainImg.onclick = () => openLightbox(allImgs, 0);
  } else {
    mainImg.textContent = 'Preview Utama';
    mainImg.onclick = null;
  }

  /* ── 3 Thumbnail detail ── */
  const thumbsEl = document.querySelector('.detail-thumbs');
  if (thumbsEl) {
    thumbsEl.innerHTML = [1, 2, 3].map(i => {
      const src = p.images && p.images[i];
      return src
        ? `<div class="detail-thumb" onclick="openLightbox(currentImgs, ${i})"><img src="${src}" alt="Screen ${i}"></div>`
        : `<div class="detail-thumb">Screen ${i}</div>`;
    }).join('');
  }

  window.currentImgs = allImgs;

  document.getElementById('detail-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDetail() {
  document.getElementById('detail-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── LIGHTBOX ── */
let _lbImgs = [];
let _lbIdx  = 0;

function openLightbox(imgs, idx) {
  if (!imgs || !imgs.length) return;
  _lbImgs = imgs;
  _lbIdx  = idx;
  _setLightboxImg();
  document.getElementById('lightbox-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox-overlay').classList.remove('open');
}

function lightboxNav(dir, e) {
  if (e) e.stopPropagation();
  _lbIdx = (_lbIdx + dir + _lbImgs.length) % _lbImgs.length;
  _setLightboxImg();
}

function _setLightboxImg() {
  const img = document.getElementById('lightbox-img');
  const wrap = document.getElementById('lightbox-img-wrap');
  const counter = document.getElementById('lightbox-counter');
  img.style.opacity = '0';
  wrap.classList.remove('zoom-in');
  void wrap.offsetWidth; // reflow to retrigger animation
  wrap.classList.add('zoom-in');
  setTimeout(() => {
    img.src = _lbImgs[_lbIdx];
    img.onload = () => { img.style.opacity = '1'; };
    img.onerror = () => { img.style.opacity = '1'; };
  }, 60);
  counter.textContent = _lbImgs.length > 1 ? `${_lbIdx + 1} / ${_lbImgs.length}` : '';
  document.getElementById('lightbox-prev').style.display = _lbImgs.length > 1 ? 'flex' : 'none';
  document.getElementById('lightbox-next').style.display = _lbImgs.length > 1 ? 'flex' : 'none';
}

/* Keyboard nav for lightbox */
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox-overlay');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowRight')  lightboxNav(1);
  if (e.key === 'ArrowLeft')   lightboxNav(-1);
});

/* ── Close overlay on backdrop click ── */
document.getElementById('detail-overlay').addEventListener('click', function (e) {
  if (e.target === this) closeDetail();
});

/* ── Click project card to open detail ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function () {
    const key = this.dataset.project;
    if (key) openDetail(key);
  });
});

/* ── Filter ── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const cats = card.dataset.cat.split(' ');
      card.style.display = (f === 'all' || cats.includes(f)) ? '' : 'none';
    });
  });
});

/* ── Scroll reveal (IntersectionObserver) ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Nav & active link ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const navbar = document.getElementById('navbar');

/* ── Photo frame morph (rect → circle on scroll) ── */
const homeSection = document.getElementById('home');
const aboutSection = document.getElementById('about');
const stickyFrame = document.getElementById('stickyFrame');
const scrollHint = document.getElementById('scrollHint');

function lerp(a, b, t) { return a + (b - a) * t; }

function onScroll() {
  const sy = window.scrollY;

  // nav border
  navbar.classList.toggle('scrolled', sy > 40);

  // active nav link
  let cur = '';
  sections.forEach(s => { if (sy >= s.offsetTop - 120) cur = s.id; });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });

  // scroll hint: hide after 80px
  scrollHint.classList.toggle('hidden', sy > 80);

  // frame morph
  const homeTop = homeSection.offsetTop;
  const homeH = homeSection.offsetHeight;
  const aboutTop = aboutSection.offsetTop;
  const aboutH = aboutSection.offsetHeight;

  const startY = homeTop + homeH * 0.4;
  const endY = aboutTop + aboutH * 0.1;

  let t = (sy - startY) / (endY - startY);
  t = Math.max(0, Math.min(1, t));
  const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  const radiusPx = lerp(24, 999, ease);
  const arW = lerp(3, 1, ease);
  const arH = lerp(4, 1, ease);
  const alpha = lerp(0.14, 0.6, ease);

  stickyFrame.style.borderRadius = radiusPx + 'px';
  stickyFrame.style.aspectRatio = `${arW}/${arH}`;
  stickyFrame.style.borderColor = `rgba(241,62,147,${alpha})`;
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ── Init ── */
injectThumbs();
onScroll();