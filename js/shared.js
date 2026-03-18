/* ============================
   Shared JS - Theme, i18n, Nav
   ============================ */

// ---- i18n ----
let currentLang; try { currentLang = localStorage.getItem('lang'); } catch(e) {} currentLang = currentLang || 'zh';

const i18n = {
  zh: {
    home: '首页', generator: '命令生成器', docs: '使用文档', compat: '安装合集', pricing: '脚本订阅', download: '下载中心', start: '开始使用',
    nav: '快速导航', versions: '支持版本', contact: '联系方式',
    wechat: '微信', email: '邮箱',
    expandAll: '展开全部', collapse: '收起', lines: '行',
    consultTitle: '扫码咨询适配需求', consultHint: '如需新的 OS / Oracle 版本适配，欢迎扫码添加微信咨询',
    footerDesc: 'Oracle 数据库一键自动化安装脚本，支持单机/ASM/RAC 三种部署模式，覆盖 20+ Linux 发行版。',
    copyright: 'Copyright \u00a9 2022-2099 Pengcheng Liu',
  },
  en: {
    home: 'Home', generator: 'Generator', docs: 'Docs', compat: 'Guides', pricing: 'Subscribe', download: 'Download', start: 'Get Started',
    nav: 'Navigation', versions: 'Versions', contact: 'Contact',
    wechat: 'WeChat', email: 'Email',
    expandAll: 'Expand All', collapse: 'Collapse', lines: 'lines',
    consultTitle: 'Scan to Consult', consultHint: 'Need a new OS / Oracle version adaptation? Scan to add WeChat for consultation',
    footerDesc: 'One-click automated Oracle Database installation script. Supports Single/ASM/RAC modes across 20+ Linux distributions.',
    copyright: 'Copyright \u00a9 2022-2099 Pengcheng Liu',
  }
};

function t(key) { return (i18n[currentLang] || i18n.zh)[key] || key; }

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  // Update html lang attribute
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  // Update toggle button text
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'zh' ? 'EN' : '中';
  // Update all i18n elements (use innerHTML to preserve HTML tags in translations)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.innerHTML = t(el.dataset.i18n);
  });
  // Fire custom event for page-specific i18n (after shared updates)
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function toggleLang() {
  setLang(currentLang === 'zh' ? 'en' : 'zh');
}

// ---- Theme ----
let currentTheme; try { currentTheme = localStorage.getItem('theme'); } catch(e) {} currentTheme = currentTheme || 'dark';

function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '\u2600' : '\u263E';
}

function toggleTheme() {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

// ---- Nav HTML ----
function navHTML(active) {
  const pages = [
    { href: 'index.html', key: 'home', id: 'home', icon: '&#9750;' },
    { href: 'generator.html', key: 'generator', id: 'generator', icon: '&#9881;' },
    { href: 'docs.html', key: 'docs', id: 'docs', icon: '&#9782;' },
    { href: 'compat.html', key: 'compat', id: 'compat', icon: '&#9776;' },
    { href: 'pricing.html', key: 'pricing', id: 'pricing', icon: '&#9733;' },
    { href: 'download.html', key: 'download', id: 'download', icon: '&#8615;' },
  ];
  const isGuide = location.pathname.includes('/guides/');
  const prefix = isGuide ? '../' : '';
  const themeIcon = currentTheme === 'dark' ? '\u2600' : '\u263E';
  const langLabel = currentLang === 'zh' ? 'EN' : '\u4E2D';
  // Desktop nav
  const nav = `<nav class="nav"><div class="nav-inner">
    <a href="${prefix}index.html" class="nav-logo"><div class="logo-icon">OS</div>Oracle<span>Shell</span>Install</a>
    <div class="nav-links">${pages.map(p =>
      `<a href="${prefix}${p.href}" class="${active===p.id?'active':''}" data-i18n="${p.key}"><span class="nav-icon">${p.icon}</span>${t(p.key)}</a>`
    ).join('')}<a href="${prefix}pricing.html" class="nav-cta" data-i18n="start">${t('start')}</a></div>
    <div class="nav-actions">
      <button class="nav-toggle" id="themeToggle" onclick="toggleTheme()" title="Toggle theme" aria-label="Toggle theme">${themeIcon}</button>
      <button class="nav-toggle" id="langToggle" onclick="toggleLang()" title="Language" aria-label="Toggle language">${langLabel}</button>
    </div>
  </div></nav>`;
  // Mobile bottom tab bar
  const tabbar = `<div class="mobile-tabbar">${pages.map(p =>
    `<a href="${prefix}${p.href}" class="${active===p.id?'active':''}" data-i18n="${p.key}"><span class="tab-icon">${p.icon}</span>${t(p.key)}</a>`
  ).join('')}</div>`;
  return nav + tabbar;
}

// ---- Footer HTML ----
function footerHTML() {
  const isGuide = location.pathname.includes('/guides/');
  const p = isGuide ? '../' : '';
  return `<footer class="footer"><div class="container"><div class="footer-inner">
    <div class="footer-brand">
      <div class="footer-logo">Oracle<span>Shell</span>Install</div>
      <p data-i18n="footerDesc">${t('footerDesc')}</p>
    </div>
    <div class="footer-col"><h4 data-i18n="nav">${t('nav')}</h4>
      <a href="${p}index.html" data-i18n="home">${t('home')}</a>
      <a href="${p}generator.html" data-i18n="generator">${t('generator')}</a>
      <a href="${p}docs.html" data-i18n="docs">${t('docs')}</a>
      <a href="${p}compat.html" data-i18n="compat">${t('compat')}</a>
      <a href="${p}pricing.html" data-i18n="pricing">${t('pricing')}</a>
      <a href="${p}download.html" data-i18n="download">${t('download')}</a>
    </div>
    <div class="footer-col"><h4 data-i18n="versions">${t('versions')}</h4>
      <a href="${p}docs.html">Oracle 26ai</a>
      <a href="${p}docs.html">Oracle 21c</a>
      <a href="${p}docs.html">Oracle 19c</a>
      <a href="${p}docs.html">Oracle 12cR2</a>
    </div>
    <div class="footer-col"><h4 data-i18n="contact">${t('contact')}</h4>
      <a href="mailto:pc1107750981@163.com">\u2709 pc1107750981@163.com</a>
      <a>\uD83D\uDCF1 WeChat: Lucifer-0622</a>
      <a href="https://github.com/pc-study/OracleShellInstall" target="_blank" rel="noopener noreferrer">\u2B50 GitHub</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span data-i18n="copyright">${t('copyright')}</span>
    <span>Lucifer &amp; Contributors</span>
  </div></div></footer>`;
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme
  setTheme(currentTheme);

  // Scroll shadow + back to top (combined listener)
  const nav = document.querySelector('.nav');
  const btt = document.createElement('button');
  btt.className = 'back-to-top';
  btt.innerHTML = '\u2191';
  btt.title = 'Back to top';
  btt.setAttribute('aria-label', 'Back to top');
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(btt);

  // WeChat consult floating widget
  const isGuide = location.pathname.includes('/guides/');
  const qrPath = isGuide ? '../img/wechat-qr.jpg' : 'img/wechat-qr.jpg';
  const fab = document.createElement('button');
  fab.className = 'wechat-fab';
  fab.title = t('consultTitle');
  fab.setAttribute('aria-label', t('consultTitle'));
  fab.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.56 2.78 4.66L4 17l2.5-1.5c.89.31 1.87.5 2.89.5h.27A6.48 6.48 0 0 1 9.5 15c0-3.59 3.36-6.5 7.5-6.5.17 0 .33.01.5.02C16.46 5.88 13.27 4 9.5 4zm-2 3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM17 10c-3.31 0-6 2.24-6 5s2.69 5 6 5c.67 0 1.31-.1 1.92-.28L21 21l-.62-2.12C21.94 17.79 23 16.47 23 15c0-2.76-2.69-5-6-5zm-2 3.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm4 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/></svg>';
  document.body.appendChild(fab);

  const popup = document.createElement('div');
  popup.className = 'wechat-popup';
  popup.innerHTML = `<button class="wechat-popup-close">&times;</button>
    <div class="wechat-popup-title" data-i18n="consultTitle">${t('consultTitle')}</div>
    <img class="wechat-popup-qr" src="${qrPath}" alt="WeChat QR">
    <div class="wechat-popup-id">WeChat: Lucifer-0622</div>
    <div class="wechat-popup-hint" data-i18n="consultHint">${t('consultHint')}</div>`;
  document.body.appendChild(popup);

  fab.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.toggle('show');
    fab.classList.toggle('active');
  });
  popup.querySelector('.wechat-popup-close').addEventListener('click', () => {
    popup.classList.remove('show');
    fab.classList.remove('active');
  });
  document.addEventListener('click', (e) => {
    if (!popup.contains(e.target) && !fab.contains(e.target)) {
      popup.classList.remove('show');
      fab.classList.remove('active');
    }
  });

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 10);
    btt.classList.toggle('visible', y > 400);
  }, { passive: true });

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('anim-up'); obs.unobserve(e.target); }});
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // macOS terminal wrapper for pre blocks (skip hero terminal and already-wrapped)
  document.querySelectorAll('pre').forEach(pre => {
    if (pre.closest('.hero-terminal') || pre.closest('.mac-term') || pre.closest('.hero-term-body')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'mac-term';
    const bar = document.createElement('div');
    bar.className = 'mac-term-bar';
    bar.innerHTML = '<span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span><span class="mac-term-title">Terminal</span>';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(bar);
    wrapper.appendChild(pre);
    // Auto-collapse long code blocks (>15 lines)
    const lines = pre.textContent.split('\n').length;
    if (lines > 15) {
      wrapper.classList.add('collapsible');
      const btn = document.createElement('div');
      btn.className = 'mac-term-expand';
      btn.textContent = '\u25BC ' + t('expandAll') + ' (' + lines + ' ' + t('lines') + ')';
      wrapper.appendChild(btn);
      btn.addEventListener('click', () => {
        const expanded = wrapper.classList.toggle('expanded');
        btn.textContent = expanded ? '\u25B2 ' + t('collapse') : '\u25BC ' + t('expandAll') + ' (' + lines + ' ' + t('lines') + ')';
      });
    }
  });

  // Responsive table cards: add data-label to td, add resp-cards class
  document.querySelectorAll('.guide-body table, .doc-content .param-table, .doc-content .media-table, .cmp-table').forEach(table => {
    const headers = [];
    table.querySelectorAll('thead th').forEach(th => headers.push(th.textContent.trim()));
    if (headers.length < 2) return;
    table.querySelectorAll('tbody tr').forEach(tr => {
      if (tr.classList.contains('cmp-cat')) return;
      tr.querySelectorAll('td').forEach((td, i) => {
        if (headers[i]) td.setAttribute('data-label', headers[i]);
      });
    });
    table.classList.add('resp-cards');
  });

  // Hide broken images in guides
  document.querySelectorAll('.guide-body img').forEach(img => {
    img.addEventListener('error', () => img.classList.add('img-broken'));
    if (img.complete && img.naturalWidth === 0) img.classList.add('img-broken');
  });

  // Docs scroll spy
  const sidebar = document.querySelector('.doc-sidebar');
  if (sidebar) {
    const sideLinks = sidebar.querySelectorAll('a[href^="#"]');
    let spyObs;
    function setupScrollSpy() {
      if (spyObs) spyObs.disconnect();
      const lang = currentLang;
      const sections = [];
      sideLinks.forEach(a => {
        const baseId = a.getAttribute('href').slice(1);
        // Try en- prefixed id first when in English, fallback to base id
        const el = (lang === 'en' ? document.getElementById('en-' + baseId) : null)
                   || document.getElementById(baseId);
        if (el) sections.push({ el, link: a });
      });
      if (sections.length) {
        spyObs = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              sideLinks.forEach(l => l.classList.remove('active'));
              const match = sections.find(s => s.el === e.target);
              if (match) match.link.classList.add('active');
            }
          });
        }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });
        sections.forEach(s => spyObs.observe(s.el));
      }
    }
    setupScrollSpy();
    document.addEventListener('langchange', setupScrollSpy);
  }
});
