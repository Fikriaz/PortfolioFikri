/* ============================================================
   script.js — Fikri Achmad Fauzi Portfolio
   ============================================================ */

/* =====================================================================
   📸 DATA PROJECT
   Di sinilah kamu menambahkan foto untuk setiap project.

   Setiap project punya:
     - thumb   : path foto thumbnail di grid (rasio 16:10, ≥800×500px)
     - images  : array berisi [foto_utama, thumb1, thumb2, thumb3]
                 yang muncul di panel detail

   Contoh path:
     thumb: 'images/projects/bpmn-thumb.jpg'
     images: [
       'images/projects/bpmn-main.jpg',   ← gambar besar
       'images/projects/bpmn-screen1.jpg', ← thumbnail 1
       'images/projects/bpmn-screen2.jpg', ← thumbnail 2
       'images/projects/bpmn-screen3.jpg', ← thumbnail 3
     ]

   Kalau belum punya foto, biarkan array kosong [] atau hapus key-nya,
   maka tampilan fallback teks akan muncul seperti sebelumnya.
   ===================================================================== */
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
    thumb: '',                  // 📸 ISI: 'images/projects/maliva-thumb.jpg'
    images: ['', '', '', ''],   // 📸 ISI: [main, thumb1, thumb2, thumb3]
problem: 'Many users, especially those visiting Malang, are not familiar with the city’s tourist attractions and often struggle to plan trips that match their personal preferences.',
solution: 'Developed an Android application that helps users plan personalized travel itineraries based on their preferences while promoting tourist destinations in Malang.',
role: 'Designed and developed the application UI/UX, integrated REST APIs, and connected the machine learning model to the user interface.',
impact: 'Bangkit Academy 2024 Capstone Project — selected as a final product and received positive feedback from industry mentors.',
stack: ['Android', 'Kotlin', 'REST API', 'Machine Learning'],
  },
  cypress: {
    title: 'Basic CRUD Cypress',
    thumb: '',                  // 📸 ISI: 'images/projects/cypress-thumb.jpg'
    images: ['', '', '', ''],   // 📸 ISI: [main, thumb1, thumb2, thumb3]
    problem: 'Testing manual pada operasi CRUD membutuhkan waktu berulang dan rentan human error saat regression testing.',
    solution: 'Automated end-to-end test suite menggunakan Cypress yang mengcover seluruh skenario CRUD secara konsisten dan repeatable.',
    role: 'Merancang test structure, menulis test scripts, dan menyiapkan test data serta environment setup.',
    impact: 'Waktu regression testing berkurang signifikan; bug terdeteksi lebih awal di siklus development.',
    stack: ['Cypress', 'JavaScript', 'E2E Testing', 'Mocha', 'CI/CD'],
  },
  jubelio: {
    title: 'Jubelio QA Testing',
    thumb: '',                  // 📸 ISI: 'images/projects/jubelio-thumb.jpg'
    images: ['', '', '', ''],   // 📸 ISI: [main, thumb1, thumb2, thumb3]
    problem: 'Platform e-commerce Jubelio memerlukan validasi menyeluruh pada fitur-fitur kritis seperti login dan manajemen produk.',
    solution: 'Penyusunan manual test cases yang komprehensif dan API testing menggunakan Postman untuk memvalidasi backend endpoint.',
    role: 'Membuat test plan, menulis manual test cases, mengeksekusi API testing, dan membuat bug report yang terstruktur.',
    impact: 'Mengidentifikasi dan mendokumentasikan bug kritis sebelum production release; meningkatkan kepercayaan tim QA.',
    stack: ['Postman', 'API Testing', 'Manual Testing', 'Jubelio Platform', 'Test Case Design'],
  },
  bangkit: {
    title: 'Bangkit Capstone Project',
    thumb: '',                  // 📸 ISI: 'images/projects/bangkit-thumb.jpg'
    images: ['', '', '', ''],   // 📸 ISI: [main, thumb1, thumb2, thumb3]
    problem: 'Dibutuhkan platform yang menggabungkan UI modern dengan kemampuan AI untuk memenuhi kebutuhan pengguna secara real-time.',
    solution: 'Aplikasi terintegrasi dengan desain UI yang clean dan pipeline ML yang teroptimasi untuk memberikan pengalaman user terbaik.',
    role: 'Bertanggung jawab atas pengembangan UI, integrasi API, dan optimasi performa model ML di sisi client.',
    impact: 'Berhasil lulus program Bangkit Academy 2024 dengan capstone project yang siap dipresentasikan ke industri.',
    stack: ['Android', 'TensorFlow Lite', 'REST API', 'Figma', 'Kotlin'],
  },
  prd: {
    title: 'PRD & System Analysis',
    thumb: '',                  // 📸 ISI: 'images/projects/prd-thumb.jpg'
    images: ['', '', '', ''],   // 📸 ISI: [main, thumb1, thumb2, thumb3]
    problem: 'Tim development memerlukan dokumentasi yang jelas dan terstruktur sebagai panduan pengembangan produk dari awal hingga selesai.',
    solution: 'Penyusunan PRD lengkap mencakup user story, acceptance criteria, task breakdown, dan flow diagram untuk memandu tim development.',
    role: 'Membuat PRD, breakdown task, desain UI wireframe, dan menyusun manual test cases untuk validasi kualitas produk.',
    impact: 'PRD yang dihasilkan menjadi acuan utama tim development dan memperlancar komunikasi antara stakeholder dan engineer.',
    stack: ['Figma', 'Notion', 'Trello', 'Manual Testing', 'BPMN 2.0'],
  },
};

/* ── Inject thumbnail ke card grid ── */
function injectThumbs() {
  document.querySelectorAll('.project-card').forEach(card => {
    const key = card.dataset.project;
    const p   = projects[key];
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

  document.getElementById('detail-title').textContent    = p.title;
  document.getElementById('detail-problem').textContent  = p.problem;
  document.getElementById('detail-solution').textContent = p.solution;
  document.getElementById('detail-role').textContent     = p.role;
  document.getElementById('detail-impact').textContent   = p.impact;
  document.getElementById('detail-stack').innerHTML =
    p.stack.map(s => `<span class="stack-tag">${s}</span>`).join('');

  /* ── Gambar utama detail ── */
  const mainImg = document.getElementById('detail-main-img');
  if (p.images && p.images[0]) {
    mainImg.innerHTML = `<img src="${p.images[0]}" alt="${p.title}">`;
  } else {
    mainImg.textContent = 'Preview Utama';
  }

  /* ── 3 Thumbnail detail ── */
  const thumbsEl = document.querySelector('.detail-thumbs');
  if (thumbsEl) {
    thumbsEl.innerHTML = [1, 2, 3].map(i => {
      const src = p.images && p.images[i];
      return src
        ? `<div class="detail-thumb"><img src="${src}" alt="Screen ${i}"></div>`
        : `<div class="detail-thumb">Screen ${i}</div>`;
    }).join('');
  }

  document.getElementById('detail-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDetail() {
  document.getElementById('detail-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

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
const navbar   = document.getElementById('navbar');

/* ── Photo frame morph (rect → circle on scroll) ── */
const homeSection  = document.getElementById('home');
const aboutSection = document.getElementById('about');
const stickyFrame  = document.getElementById('stickyFrame');
const scrollHint   = document.getElementById('scrollHint');

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
  const homeTop  = homeSection.offsetTop;
  const homeH    = homeSection.offsetHeight;
  const aboutTop = aboutSection.offsetTop;
  const aboutH   = aboutSection.offsetHeight;

  const startY = homeTop + homeH * 0.4;
  const endY   = aboutTop + aboutH * 0.1;

  let t = (sy - startY) / (endY - startY);
  t = Math.max(0, Math.min(1, t));
  const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  const radiusPx = lerp(24, 999, ease);
  const arW      = lerp(3, 1, ease);
  const arH      = lerp(4, 1, ease);
  const alpha    = lerp(0.14, 0.6, ease);

  stickyFrame.style.borderRadius = radiusPx + 'px';
  stickyFrame.style.aspectRatio  = `${arW}/${arH}`;
  stickyFrame.style.borderColor  = `rgba(241,62,147,${alpha})`;
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ── Init ── */
injectThumbs();
onScroll();