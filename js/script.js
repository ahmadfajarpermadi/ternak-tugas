/* ============================================
   Ternak Tugas — JavaScript
   ============================================ */

'use strict';

// ============================================
// DATA: Services & Pricing
// ============================================
const services = [
  {
    id: 'coding',
    name: 'Coding / Pemrograman',
    desc: 'Python, Java, C++, PHP, JavaScript, HTML/CSS, dan lainnya. Per fitur/modul atau per program.',
    icon: 'fa-code',
    basePrice: 100000,
    unit: 'modul/program',
    tags: ['Python', 'Java', 'C++', 'PHP', 'JS', 'HTML/CSS'],
    params: [
      { id: 'quantity', label: 'Jumlah Modul/Program', type: 'number', min: 1, max: 50, default: 1 },
      { id: 'language', label: 'Bahasa Pemrograman', type: 'select', options: ['Python', 'Java', 'C++', 'PHP', 'JavaScript', 'HTML/CSS', 'Kotlin', 'Swift', 'Lainnya'] }
    ]
  },
  {
    id: 'database',
    name: 'Basis Data (SQL)',
    desc: 'MySQL, PostgreSQL, SQL Server. Per tabel, query complexity, store procedure, trigger.',
    icon: 'fa-database',
    basePrice: 80000,
    unit: 'soal/project',
    tags: ['MySQL', 'PostgreSQL', 'Query', 'SP', 'Trigger'],
    params: [
      { id: 'quantity', label: 'Jumlah Soal/Tabel', type: 'number', min: 1, max: 30, default: 1 },
      { id: 'queryType', label: 'Tipe Query', type: 'select', options: ['SELECT Dasar', 'JOIN (Multi Tabel)', 'Subquery', 'Store Procedure', 'Trigger', 'Full Project DB'] }
    ]
  },
  {
    id: 'network',
    name: 'Jaringan & Keamanan',
    desc: 'Konfigurasi Cisco/GNS3, analisis paket Wireshark, write-up keamanan, dan forensik.',
    icon: 'fa-network-wired',
    basePrice: 150000,
    unit: 'topologi/laporan',
    tags: ['Cisco', 'GNS3', 'Wireshark', 'Security'],
    params: [
      { id: 'quantity', label: 'Jumlah Topologi/Laporan', type: 'number', min: 1, max: 10, default: 1 },
      { id: 'networkType', label: 'Jenis Pekerjaan', type: 'select', options: ['Konfigurasi Cisco', 'Simulasi GNS3', 'Analisis Paket', 'Write-up Keamanan', 'Forensik Digital', 'Laporan Keamanan'] }
    ]
  },
  {
    id: 'paper',
    name: 'Makalah / Laporan IT',
    desc: 'Laporan praktikum, proposal, skripsi bab, literature review IT. Format IEEE/APA.',
    icon: 'fa-file-alt',
    basePrice: 50000,
    unit: 'halaman',
    tags: ['Skripsi', 'Laporan', 'Review', 'IEEE', 'APA'],
    params: [
      { id: 'quantity', label: 'Jumlah Halaman', type: 'number', min: 1, max: 100, default: 5 },
      { id: 'paperType', label: 'Jenis Makalah', type: 'select', options: ['Laporan Praktikum', 'Proposal', 'Bab Skripsi', 'Literature Review', 'Jurnal', 'Dokumentasi IT'] },
      { id: 'format', label: 'Format Sitasi', type: 'select', options: ['IEEE', 'APA', 'MLA', 'Tidak Ada'] }
    ]
  },
  {
    id: 'ppt',
    name: 'PPT Presentasi IT',
    desc: 'Presentasi menarik dengan diagram, flowchart, arsitektur sistem, dan animasi.',
    icon: 'fa-file-powerpoint',
    basePrice: 30000,
    unit: 'slide',
    tags: ['Presentasi', 'Diagram', 'Flowchart', 'Arsitektur'],
    params: [
      { id: 'quantity', label: 'Jumlah Slide', type: 'number', min: 1, max: 50, default: 10 },
      { id: 'needDiagram', label: 'Butuh Diagram/Flowchart?', type: 'select', options: ['Tidak', 'Ya, sederhana', 'Ya, detail'] },
      { id: 'pptTheme', label: 'Tema Presentasi', type: 'select', options: ['Teknologi (Biru)', 'Modern (Dark)', 'Minimalis', 'Korporat', 'Sesuai Request'] }
    ]
  },
  {
    id: 'algorithm',
    name: 'Algoritma & Struktur Data',
    desc: 'Sorting, searching, graph, DP, tree, dan kompleksitas algoritma. Siap pakai.',
    icon: 'fa-sitemap',
    basePrice: 80000,
    unit: 'soal',
    tags: ['Sorting', 'Graph', 'DP', 'Tree', 'Search'],
    params: [
      { id: 'quantity', label: 'Jumlah Soal', type: 'number', min: 1, max: 20, default: 1 },
      { id: 'algoType', label: 'Tipe Algoritma', type: 'select', options: ['Sorting / Searching', 'Struktur Data (Tree, Stack, Queue)', 'Graph (BFS/DFS)', 'Dynamic Programming', 'Greedy', 'Divide & Conquer', 'Campuran'] }
    ]
  },
  {
    id: 'uiux',
    name: 'UI/UX Design (Figma)',
    desc: 'Desain antarmuka aplikasi/web, prototype interaktif, design system, wireframe.',
    icon: 'fa-paint-brush',
    basePrice: 100000,
    unit: 'screen/halaman',
    tags: ['Figma', 'Prototype', 'Wireframe', 'Design System'],
    params: [
      { id: 'quantity', label: 'Jumlah Screen/Halaman', type: 'number', min: 1, max: 50, default: 3 },
      { id: 'uiType', label: 'Tipe Design', type: 'select', options: ['Wireframe (Low-fidelity)', 'Mockup (High-fidelity)', 'Prototype Interaktif', 'Design System', 'Redesign Aplikasi'] },
      { id: 'platform', label: 'Platform', type: 'select', options: ['Mobile (Android/iOS)', 'Website/Desktop', 'Responsive Web', 'Dashboard/Admin'] }
    ]
  }
];

const difficultyFactors = {
  'easy': 1,
  'medium': 1.5,
  'hard': 2.5,
  'very-hard': 4
};

const deadlineFactors = {
  1: 2.5,
  2: 1.8,
  3: 1.3,
  4: 1.3,
  5: 1.0,
  6: 1.0,
  7: 1.0,
  8: 0.9,
  9: 0.9,
  10: 0.85,
  11: 0.85,
  12: 0.8,
  13: 0.8,
  14: 0.8
};

// ============================================
// DOM REFERENCES
// ============================================
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const dom = {
  servicesGrid: $('#servicesGrid'),
  serviceType: $('#serviceType'),
  dynamicParams: $('#dynamicParams'),
  difficulty: $('#difficulty'),
  deadline: $('#deadline'),
  deadlineDisplay: $('#deadlineDisplay'),
  notes: $('#notes'),
  charCount: $('#charCount'),
  name: $('#name'),
  whatsapp: $('#whatsapp'),
  email: $('#email'),
  orderForm: $('#orderForm'),
  basePriceDisplay: $('#basePriceDisplay'),
  diffFactorDisplay: $('#diffFactorDisplay'),
  diffPriceDisplay: $('#diffPriceDisplay'),
  deadlineFactorDisplay: $('#deadlineFactorDisplay'),
  deadlinePriceDisplay: $('#deadlinePriceDisplay'),
  totalPriceDisplay: $('#totalPriceDisplay'),
  waOrderBtn: $('#waOrderBtn'),
  copyWaBtn: $('#copyWaBtn'),
  waNumber: $('#waNumber'),
  navToggle: $('#navToggle'),
  navMenu: $('#navMenu'),
  themeToggle: $('#themeToggle'),
  scrollTop: $('#scrollTop'),
  navbar: $('#navbar'),
};

// ============================================
// RENDER SERVICES
// ============================================
function renderServices() {
  dom.servicesGrid.innerHTML = services.map(s => `
    <div class="service-card reveal">
      <div class="service-icon"><i class="fas ${s.icon}"></i></div>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <div class="service-price">Mulai Rp ${formatPrice(s.basePrice)} / ${s.unit}</div>
      <div class="service-meta">
        ${s.tags.map(t => `<span>${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// ============================================
// PRICE CALCULATOR
// ============================================
function formatPrice(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function getSelectedService() {
  return services.find(s => s.id === dom.serviceType.value) || null;
}

function calculatePrice() {
  const service = getSelectedService();
  if (!service) {
    dom.basePriceDisplay.textContent = 'Rp 0';
    dom.diffFactorDisplay.textContent = '0x';
    dom.diffPriceDisplay.textContent = 'Rp 0';
    dom.deadlineFactorDisplay.textContent = '0x';
    dom.deadlinePriceDisplay.textContent = 'Rp 0';
    dom.totalPriceDisplay.textContent = 'Rp 0';
    return;
  }

  const qtyEl = $('#quantity');
  const quantity = qtyEl ? parseInt(qtyEl.value) || 1 : 1;

  const base = service.basePrice * quantity;

  const diff = dom.difficulty.value;
  const diffFactor = difficultyFactors[diff] || 1;
  const diffPrice = base * (diffFactor - 1);

  const days = parseInt(dom.deadline.value);
  const ddlFactor = deadlineFactors[days] || 1;
  const ddlPrice = base * (ddlFactor - 1);

  const total = base * diffFactor * ddlFactor;

  dom.basePriceDisplay.textContent = `Rp ${formatPrice(base)}`;
  dom.diffFactorDisplay.textContent = `${diffFactor}x`;
  dom.diffPriceDisplay.textContent = `Rp ${formatPrice(Math.round(diffPrice))}`;
  dom.deadlineFactorDisplay.textContent = `${ddlFactor}x`;
  dom.deadlinePriceDisplay.textContent = `Rp ${formatPrice(Math.round(ddlPrice))}`;
  dom.totalPriceDisplay.textContent = `Rp ${formatPrice(Math.round(total))}`;
}

// ============================================
// DYNAMIC FORM
// ============================================
function renderDynamicParams() {
  const service = getSelectedService();
  dom.dynamicParams.innerHTML = '';

  if (!service) return;

  service.params.forEach(p => {
    const wrapper = document.createElement('div');
    wrapper.className = 'dynamic-param';
    wrapper.id = `param-${p.id}`;

    const label = document.createElement('label');
    label.setAttribute('for', p.id);
    label.textContent = p.label;

    wrapper.appendChild(label);

    if (p.type === 'number') {
      const input = document.createElement('input');
      input.type = 'number';
      input.id = p.id;
      input.min = p.min;
      input.max = p.max || 999;
      input.value = p.default;
      wrapper.appendChild(input);
    } else if (p.type === 'select') {
      const select = document.createElement('select');
      select.id = p.id;
      p.options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        select.appendChild(option);
      });
      wrapper.appendChild(select);
    }

    dom.dynamicParams.appendChild(wrapper);
  });

  // Add event listeners to dynamic params
  $$('.dynamic-param input, .dynamic-param select', dom.dynamicParams).forEach(el => {
    el.addEventListener('input', calculatePrice);
    el.addEventListener('change', calculatePrice);
  });

  calculatePrice();
}

// ============================================
// DARK MODE
// ============================================
function initTheme() {
  const saved = localStorage.getItem('ternak-tugas-theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    dom.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    dom.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ternak-tugas-theme', next);
  dom.themeToggle.innerHTML = next === 'dark'
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

// ============================================
// SMOOTH SCROLL (via nav links)
// ============================================
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        dom.navMenu.classList.remove('active');
      }
    });
  });
}

// ============================================
// INTERSECTION OBSERVER (reveal animations)
// ============================================
function initRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  $$('.reveal').forEach(el => observer.observe(el));
}

// ============================================
// FAQ ACCORDION
// ============================================
function initFaq() {
  $$('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');

      $$('.faq-item.active').forEach(el => el.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// ============================================
// COPY WHATSAPP
// ============================================
function initCopyWa() {
  dom.copyWaBtn.addEventListener('click', async () => {
    const number = dom.waNumber.textContent.trim();
    try {
      await navigator.clipboard.writeText(number);
      dom.copyWaBtn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
      setTimeout(() => {
        dom.copyWaBtn.innerHTML = '<i class="fas fa-copy"></i> Salin Nomor';
      }, 2000);
    } catch {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = number;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      dom.copyWaBtn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
      setTimeout(() => {
        dom.copyWaBtn.innerHTML = '<i class="fas fa-copy"></i> Salin Nomor';
      }, 2000);
    }
  });
}

// ============================================
// FORM VALIDATION & SUBMIT
// ============================================
function initFormSubmit() {
  dom.orderForm.addEventListener('submit', e => {
    e.preventDefault();

    const service = getSelectedService();
    const name = dom.name.value.trim();
    const wa = dom.whatsapp.value.trim();
    const difficulty = dom.difficulty.options[dom.difficulty.selectedIndex].text;
    const days = dom.deadline.value;
    const notes = dom.notes.value.trim();

    if (!service) {
      alert('Silakan pilih jenis tugas terlebih dahulu!');
      dom.serviceType.focus();
      return;
    }

    if (!name) {
      alert('Silakan masukkan nama lengkap Anda!');
      dom.name.focus();
      return;
    }

    if (!wa) {
      alert('Silakan masukkan nomor WhatsApp Anda!');
      dom.whatsapp.focus();
      return;
    }

    if (wa.length < 10) {
      alert('Nomor WhatsApp tidak valid!');
      dom.whatsapp.focus();
      return;
    }

    // Build message
    let paramDetails = '';
    if (service) {
      service.params.forEach(p => {
        const el = document.getElementById(p.id);
        if (el) {
          paramDetails += `- ${p.label}: ${el.value}\n`;
        }
      });
    }

    const total = dom.totalPriceDisplay.textContent;

    const message = `Halo Ternak Tugas! Saya ingin pesan jasa *${service.name}*:\n\n`
      + `*Detail Pemesanan:*\n${paramDetails}`
      + `- Tingkat Kesulitan: ${difficulty}\n`
      + `- Deadline: ${days} hari\n`
      + `- Catatan: ${notes || '-'}\n\n`
      + `*Estimasi Harga: ${total}*\n\n`
      + `Nama: ${name}\n`
      + `WA: ${wa}\n`
      + `Email: ${dom.email.value.trim() || '-'}\n\n`
      + `Mohon infonya lebih lanjut. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/6281234567890?text=${encoded}`;
    window.open(waUrl, '_blank');
  });
}

// ============================================
// CHAR COUNT
// ============================================
function initCharCount() {
  dom.notes.addEventListener('input', () => {
    dom.charCount.textContent = dom.notes.value.length;
  });
}

// ============================================
// NAVBAR TOGGLE
// ============================================
function initNavToggle() {
  dom.navToggle.addEventListener('click', () => {
    dom.navMenu.classList.toggle('active');
    const icon = dom.navToggle.querySelector('i');
    icon.className = dom.navMenu.classList.contains('active')
      ? 'fas fa-times'
      : 'fas fa-bars';
  });
}

// ============================================
// SCROLL EVENTS
// ============================================
function initScrollEvents() {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar shadow
    dom.navbar.classList.toggle('scrolled', scrollY > 50);

    // Scroll to top button
    dom.scrollTop.classList.toggle('visible', scrollY > 500);
  });

  dom.scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// EVENT LISTENERS for calculator
// ============================================
function initCalculatorEvents() {
  dom.serviceType.addEventListener('change', () => {
    renderDynamicParams();
  });

  dom.difficulty.addEventListener('change', calculatePrice);
  dom.deadline.addEventListener('input', () => {
    const val = dom.deadline.value;
    dom.deadlineDisplay.textContent = `${val} hari`;
    calculatePrice();
  });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Populate service options
  services.forEach(s => {
    const option = document.createElement('option');
    option.value = s.id;
    option.textContent = s.name;
    dom.serviceType.appendChild(option);
  });

  renderServices();
  initTheme();
  initRevealObserver();
  initSmoothScroll();
  initFaq();
  initCopyWa();
  initFormSubmit();
  initCharCount();
  initNavToggle();
  initScrollEvents();
  initCalculatorEvents();

  // Set initial deadline display
  dom.deadlineDisplay.textContent = `${dom.deadline.value} hari`;

  // Render default params if none selected
  calculatePrice();
});
