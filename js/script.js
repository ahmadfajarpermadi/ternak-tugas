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
  id: 'video-task',
  name: 'Pembuatan Tugas Video',
  desc: 'Jasa pembuatan tugas video presentasi, video pembelajaran, editing tugas kuliah, dokumentasi, dan konten edukasi dengan hasil profesional.',
  icon: 'fa-video',
  basePrice: 75000,
  unit: 'video',
  tags: ['Editing', 'Presentasi', 'Video Tugas', 'Motion', 'Konten Edukasi'],
  params: [
    { 
      id: 'duration', 
      label: 'Durasi Video (menit)', 
      type: 'number', 
      min: 1, 
      max: 120, 
      default: 5 
    },

    { 
      id: 'videoType', 
      label: 'Jenis Video', 
      type: 'select', 
      options: [
        'Video Presentasi',
        'Video Pembelajaran',
        'Editing Tugas',
        'Video Dokumentasi',
        'Motion Graphic',
        'Video Seminar'
      ] 
    },

    { 
      id: 'editingLevel', 
      label: 'Tingkat Editing', 
      type: 'select', 
      options: [
        'Basic',
        'Standard',
        'Professional',
        'Cinematic'
      ] 
    }
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
  payNowBtn: $('#payNowBtn'),
  paymentTabs: $('#paymentTabs'),
  paymentMethodGroups: $('#paymentMethodGroups'),
  paymentMethods: [],
  selectedPaymentIcon: $('#selectedPaymentIcon'),
  selectedPaymentName: $('#selectedPaymentName'),
  selectedPaymentCategory: $('#selectedPaymentCategory'),
  paymentTotalDisplay: $('#paymentTotalDisplay'),
  paymentAdminFeeDisplay: $('#paymentAdminFeeDisplay'),
  paymentSummaryStatus: $('#paymentSummaryStatus'),
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

const API_BASE_URL = 'https://ternak-tugas.up.railway.app';

const paymentMethods = {
  SP: { name: 'ShopeePay QRIS', category: 'QRIS', icon: 'QRIS', badge: 'Recommended', description: 'Scan dan bayar instan', fee: 'Mulai Rp 0' },
  NQ: { name: 'Nobu QRIS', category: 'QRIS', icon: 'QR', badge: 'QRIS', description: 'Scan QR Nobu', fee: 'Sesuai kanal' },
  GQ: { name: 'Gudang Voucher QRIS', category: 'QRIS', icon: 'GV', badge: 'QRIS', description: 'Scan QR merchant', fee: 'Sesuai kanal' },
  SQ: { name: 'Nusapay QRIS', category: 'QRIS', icon: 'NP', badge: 'QRIS', description: 'Pembayaran QR cepat', fee: 'Sesuai kanal' },
  OV: { name: 'OVO', category: 'E-Wallet', icon: 'OVO', badge: 'Wallet', description: 'Bayar via saldo OVO', fee: 'Sesuai kanal' },
  DA: { name: 'DANA', category: 'E-Wallet', icon: 'DANA', badge: 'Wallet', description: 'Bayar via saldo DANA', fee: 'Sesuai kanal' },
  SA: { name: 'ShopeePay Apps', category: 'E-Wallet', icon: 'SPay', badge: 'Apps', description: 'Buka aplikasi ShopeePay', fee: 'Sesuai kanal' },
  LF: { name: 'LinkAja Fixed Fee', category: 'E-Wallet', icon: 'LA', badge: 'Fixed', description: 'Bayar via LinkAja', fee: 'Fixed fee' },
  LA: { name: 'LinkAja Percentage', category: 'E-Wallet', icon: 'LA', badge: 'Percent', description: 'Bayar via LinkAja', fee: 'Persentase' },
  SL: { name: 'ShopeePay Account Link', category: 'E-Wallet', icon: 'SL', badge: 'Link', description: 'Account link ShopeePay', fee: 'Sesuai kanal' },
  OL: { name: 'OVO Account Link', category: 'E-Wallet', icon: 'OL', badge: 'Link', description: 'Account link OVO', fee: 'Sesuai kanal' },
  BC: { name: 'BCA VA', category: 'Virtual Account', icon: 'BCA', badge: 'VA', description: 'Virtual account BCA', fee: 'Sesuai bank' },
  M2: { name: 'Mandiri VA', category: 'Virtual Account', icon: 'MDR', badge: 'VA', description: 'Virtual account Mandiri', fee: 'Sesuai bank' },
  VA: { name: 'Maybank VA', category: 'Virtual Account', icon: 'MYB', badge: 'VA', description: 'Virtual account Maybank', fee: 'Sesuai bank' },
  I1: { name: 'BNI VA', category: 'Virtual Account', icon: 'BNI', badge: 'VA', description: 'Virtual account BNI', fee: 'Sesuai bank' },
  B1: { name: 'CIMB Niaga VA', category: 'Virtual Account', icon: 'CIMB', badge: 'VA', description: 'Virtual account CIMB', fee: 'Sesuai bank' },
  BT: { name: 'Permata VA', category: 'Virtual Account', icon: 'PMT', badge: 'VA', description: 'Virtual account Permata', fee: 'Sesuai bank' },
  A1: { name: 'ATM Bersama', category: 'Virtual Account', icon: 'ATM', badge: 'VA', description: 'Transfer ATM Bersama', fee: 'Sesuai bank' },
  AG: { name: 'Artha Graha', category: 'Virtual Account', icon: 'AG', badge: 'VA', description: 'Virtual account Artha Graha', fee: 'Sesuai bank' },
  NC: { name: 'Bank Neo Commerce', category: 'Virtual Account', icon: 'NEO', badge: 'VA', description: 'Virtual account Neo Commerce', fee: 'Sesuai bank' },
  BR: { name: 'BRIVA', category: 'Virtual Account', icon: 'BRI', badge: 'VA', description: 'Virtual account BRI', fee: 'Sesuai bank' },
  S1: { name: 'Sahabat Sampoerna', category: 'Virtual Account', icon: 'SS', badge: 'VA', description: 'Virtual account Sampoerna', fee: 'Sesuai bank' },
  DM: { name: 'Danamon VA', category: 'Virtual Account', icon: 'DMN', badge: 'VA', description: 'Virtual account Danamon', fee: 'Sesuai bank' },
  BV: { name: 'BSI VA', category: 'Virtual Account', icon: 'BSI', badge: 'VA', description: 'Virtual account BSI', fee: 'Sesuai bank' },
  FT: { name: 'Pegadaian / ALFA / POS', category: 'Retail', icon: '<i class="fas fa-store"></i>', badge: 'Retail', description: 'Bayar di gerai retail', fee: 'Sesuai gerai' },
  IR: { name: 'Indomaret', category: 'Retail', icon: 'IDM', badge: 'Retail', description: 'Bayar di Indomaret', fee: 'Sesuai gerai' },
  VC: { name: 'Visa / Mastercard / JCB', category: 'Credit Card', icon: '<i class="fas fa-credit-card"></i>', badge: 'Card', description: 'Kartu kredit internasional', fee: 'Sesuai kartu' },
  DN: { name: 'Indodana', category: 'Paylater', icon: 'DN', badge: 'Paylater', description: 'Cicilan Indodana', fee: 'Sesuai tenor' },
  AT: { name: 'ATOME', category: 'Paylater', icon: 'AT', badge: 'Paylater', description: 'Bayar nanti dengan ATOME', fee: 'Sesuai tenor' },
  JP: { name: 'Jenius Pay', category: 'E-Banking', icon: 'JEN', badge: 'Banking', description: 'Bayar via Jenius Pay' },
  T1: { name: 'Tokopedia Card', category: 'E-Commerce', icon: 'T1', badge: 'Tokopedia', description: 'Kartu Tokopedia' },
  T2: { name: 'Tokopedia E-Wallet', category: 'E-Commerce', icon: 'T2', badge: 'Tokopedia', description: 'E-wallet Tokopedia' },
  T3: { name: 'Tokopedia Others', category: 'E-Commerce', icon: 'T3', badge: 'Tokopedia', description: 'Metode lain Tokopedia' }
};

const paymentGroups = [
  { name: 'QRIS', codes: ['SP', 'NQ', 'GQ', 'SQ'] },
  { name: 'E-Wallet', codes: ['OV', 'DA', 'SA', 'LF', 'LA', 'SL', 'OL'] },
  { name: 'Virtual Account', codes: ['BC', 'M2', 'VA', 'I1', 'B1', 'BT', 'A1', 'AG', 'NC', 'BR', 'S1', 'DM', 'BV'] },
  { name: 'Retail', codes: ['FT', 'IR'] },
  { name: 'Credit Card', codes: ['VC'] },
  { name: 'Paylater', codes: ['DN', 'AT'] }
];

let selectedPaymentMethod = 'SP';
let activePaymentCategory = 'QRIS';

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

function getSelectedPayment() {
  return paymentMethods[selectedPaymentMethod] || paymentMethods.SP;
}

function categorySlug(category) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function renderPaymentTabs() {
  if (!dom.paymentTabs) return;

  dom.paymentTabs.innerHTML = paymentGroups.map(group => {
    const isActive = group.name === activePaymentCategory;
    return `
      <button type="button" class="payment-tab${isActive ? ' active' : ''}" data-payment-category="${group.name}" role="tab" aria-selected="${isActive ? 'true' : 'false'}">
        <span>${group.name}</span>
        <small>${group.codes.length}</small>
      </button>
    `;
  }).join('');
}

function renderPaymentMethods() {
  if (!dom.paymentMethodGroups) return;

  const group = paymentGroups.find(item => item.name === activePaymentCategory) || paymentGroups[0];
  dom.paymentMethodGroups.innerHTML = `
    <div class="payment-method-group active" data-payment-panel="${group.name}">
      <div class="payment-group-title">
        <span>${group.name}</span>
        <small>${group.codes.length} metode tersedia</small>
      </div>
      <div class="payment-method-grid">
        ${group.codes.map(code => {
          const method = paymentMethods[code];
          const isActive = code === selectedPaymentMethod;
          return `
            <button type="button" class="payment-method${isActive ? ' active' : ''}" data-payment-method="${code}" role="radio" aria-checked="${isActive ? 'true' : 'false'}">
              <span class="payment-check"><i class="fas fa-check"></i></span>
              <span class="payment-icon ${categorySlug(method.category)}">${method.icon}</span>
              <span class="payment-copy">
                <strong>${method.name}</strong>
                <small>${method.description}</small>
              </span>
              <span class="payment-meta">
                <span class="payment-badge ${code === 'SP' ? '' : 'subtle'}">${method.badge}</span>
                <span class="payment-instant"><i class="fas fa-bolt"></i> Instant</span>
              </span>
              <span class="payment-fee">${method.fee || 'Sesuai kanal'}</span>
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;

  dom.paymentMethods = $$('.payment-method', dom.paymentMethodGroups);
}

function bindPaymentCards() {
  dom.paymentMethods.forEach(card => {
    card.addEventListener('click', event => {
      const ripple = document.createElement('span');
      const rect = card.getBoundingClientRect();
      ripple.className = 'payment-ripple';
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 620);
      setSelectedPaymentMethod(card.dataset.paymentMethod);
    });

    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setSelectedPaymentMethod(card.dataset.paymentMethod);
      }
    });
  });
}

function bindPaymentTabs() {
  if (!dom.paymentTabs) return;

  const tabs = $$('.payment-tab', dom.paymentTabs);

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      activePaymentCategory = tab.dataset.paymentCategory;
      const group = paymentGroups.find(item => item.name === activePaymentCategory);
      if (group && !group.codes.includes(selectedPaymentMethod)) {
        selectedPaymentMethod = group.codes[0];
      }
      renderPaymentTabs();
      renderPaymentMethods();
      bindPaymentTabs();
      bindPaymentCards();
      setSelectedPaymentMethod(selectedPaymentMethod);
    });

    tab.addEventListener('keydown', event => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (index + direction + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    });
  });
}

function updatePaymentSummary(total = calculatePrice()) {
  const payment = getSelectedPayment();

  if (dom.selectedPaymentIcon) {
    dom.selectedPaymentIcon.innerHTML = payment.icon;
  }

  if (dom.selectedPaymentName) {
    dom.selectedPaymentName.textContent = payment.name;
  }

  if (dom.selectedPaymentCategory) {
    dom.selectedPaymentCategory.textContent = payment.category;
  }

  if (dom.paymentTotalDisplay) {
    dom.paymentTotalDisplay.textContent = `Rp ${formatPrice(total)}`;
  }

  if (dom.paymentAdminFeeDisplay) {
    dom.paymentAdminFeeDisplay.textContent = payment.fee || 'Sesuai kanal';
  }

  if (dom.paymentSummaryStatus) {
    dom.paymentSummaryStatus.textContent = `${payment.category} aktif`;
  }
}

function setSelectedPaymentMethod(method) {
  if (!paymentMethods[method]) {
    selectedPaymentMethod = 'SP';
  } else {
    selectedPaymentMethod = method;
  }

  dom.paymentMethods.forEach(card => {
    const isActive = card.dataset.paymentMethod === selectedPaymentMethod;
    card.classList.toggle('active', isActive);
    card.setAttribute('aria-checked', isActive ? 'true' : 'false');
  });

  updatePaymentSummary(calculatePrice());
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
    if (dom.paymentTotalDisplay) {
      dom.paymentTotalDisplay.textContent = 'Rp 0';
    }
    return 0;
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
  if (dom.paymentTotalDisplay) {
    dom.paymentTotalDisplay.textContent = `Rp ${formatPrice(Math.round(total))}`;
  }
  return Math.round(total);
}

function showToast(message, type = 'info') {
  let toastRoot = $('#toastRoot');
  if (!toastRoot) {
    toastRoot = document.createElement('div');
    toastRoot.id = 'toastRoot';
    toastRoot.className = 'toast-root';
    document.body.appendChild(toastRoot);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'error' ? 'fa-triangle-exclamation' : type === 'success' ? 'fa-check-circle' : 'fa-circle-info'}"></i>
    <span>${message}</span>
  `;
  toastRoot.appendChild(toast);

  setTimeout(() => toast.classList.add('visible'), 20);
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 250);
  }, 3600);
}

function setPaymentLoading(isLoading) {
  if (!dom.payNowBtn) return;

  dom.payNowBtn.disabled = isLoading;
  dom.paymentMethods.forEach(card => {
    card.disabled = isLoading;
  });
  dom.payNowBtn.innerHTML = isLoading
    ? '<span class="spinner"></span><span>Memproses Pembayaran...</span>'
    : '<i class="fas fa-lock"></i><span>Bayar Sekarang</span>';
}

function collectParamDetails(service) {
  const details = {};

  service.params.forEach(p => {
    const el = document.getElementById(p.id);
    if (el) {
      details[p.label] = el.value;
    }
  });

  return details;
}

function initPaymentMethods() {
  renderPaymentTabs();
  renderPaymentMethods();

  if (!dom.paymentMethods.length) return;

  bindPaymentTabs();
  bindPaymentCards();

  setSelectedPaymentMethod(selectedPaymentMethod);
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
function getSavedTheme() {
  try {
    return localStorage.getItem('ternak-tugas-theme');
  } catch (e) {
    return null;
  }
}

function setSavedTheme(theme) {
  try {
    localStorage.setItem('ternak-tugas-theme', theme);
  } catch (e) {
    // localStorage unavailable
  }
}

function initTheme() {
  const saved = getSavedTheme();
  if (saved === 'dark') {
    dom.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else if (saved === 'light') {
    dom.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    dom.themeToggle.innerHTML = prefersDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  dom.themeToggle.innerHTML = next === 'dark'
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  setSavedTheme(next);
}

function initThemeListener() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!getSavedTheme()) {
      var theme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      dom.themeToggle.innerHTML = e.matches ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
  });
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
  dom.orderForm.addEventListener('submit', async e => {
    e.preventDefault();

    const service = getSelectedService();
    const name = dom.name.value.trim();
    const wa = dom.whatsapp.value.trim();
    const difficulty = dom.difficulty.options[dom.difficulty.selectedIndex].text;
    const days = dom.deadline.value;
    const notes = dom.notes.value.trim();
    const email = dom.email.value.trim();
    const totalPrice = calculatePrice();
    const paymentMethod = selectedPaymentMethod;

    if (!service) {
      showToast('Silakan pilih jenis tugas terlebih dahulu.', 'error');
      dom.serviceType.focus();
      return;
    }

    if (!name) {
      showToast('Silakan masukkan nama lengkap Anda.', 'error');
      dom.name.focus();
      return;
    }

    if (!wa) {
      showToast('Silakan masukkan nomor WhatsApp Anda.', 'error');
      dom.whatsapp.focus();
      return;
    }

    if (wa.length < 10) {
      showToast('Nomor WhatsApp tidak valid.', 'error');
      dom.whatsapp.focus();
      return;
    }

    if (!totalPrice) {
      showToast('Total pembayaran belum valid.', 'error');
      return;
    }

    if (!paymentMethods[paymentMethod]) {
      showToast('Silakan pilih metode pembayaran terlebih dahulu.', 'error');
      return;
    }

    const payload = {
      customerName: name,
      customerEmail: email,
      customerPhone: wa,
      serviceType: service.name,
      difficulty,
      deadline: `${days} hari`,
      totalPrice,
      paymentMethod,
      notes: JSON.stringify({
        catatan: notes || '-',
        metodePembayaran: paymentMethods[paymentMethod].name,
        kategoriPembayaran: paymentMethods[paymentMethod].category,
        detail: collectParamDetails(service)
      })
    };

    try {
      setPaymentLoading(true);
      showToast('Membuat invoice pembayaran...', 'info');

      const response = await fetch(`${API_BASE_URL}/api/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Gagal membuat pembayaran.');
      }

      localStorage.setItem('ternak-tugas-last-order', JSON.stringify({
        orderId: result.orderId,
        amount: result.amount,
        customerName: name,
        serviceType: service.name,
        paymentMethod
      }));

      showToast('Invoice siap. Mengalihkan ke Duitku...', 'success');
      window.location.href = result.paymentUrl;
    } catch (error) {
      showToast(error.message || 'Terjadi kesalahan saat memproses pembayaran.', 'error');
      setPaymentLoading(false);
    }
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
  dom.themeToggle.addEventListener('click', toggleTheme);
  initThemeListener();
  initRevealObserver();
  initSmoothScroll();
  initFaq();
  initCopyWa();
  initFormSubmit();
  initPaymentMethods();
  initCharCount();
  initNavToggle();
  initScrollEvents();
  initCalculatorEvents();

  // Set initial deadline display
  dom.deadlineDisplay.textContent = `${dom.deadline.value} hari`;

  // Render default params if none selected
  calculatePrice();
});
