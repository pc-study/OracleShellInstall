/* ============================
   Shared JS - Theme, i18n, Nav
   ============================ */

// ---- i18n ----
let currentLang = localStorage.getItem('lang') || 'zh';

const i18n = {
  zh: {
    home: '首页', generator: '命令生成器', docs: '使用文档', start: '开始使用',
    nav: '快速导航', versions: '支持版本', contact: '联系方式',
    wechat: '微信', email: '邮箱',
    footerDesc: 'Oracle 数据库一键自动化安装脚本，支持单机/ASM/RAC 三种部署模式，覆盖 20+ Linux 发行版。',
    copyright: 'Copyright \u00a9 2022-2099 Pengcheng Liu',
  },
  en: {
    home: 'Home', generator: 'Generator', docs: 'Docs', start: 'Get Started',
    nav: 'Navigation', versions: 'Versions', contact: 'Contact',
    wechat: 'WeChat', email: 'Email',
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
let currentTheme = localStorage.getItem('theme') || 'dark';

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
    { href: 'index.html', key: 'home', id: 'home' },
    { href: 'generator.html', key: 'generator', id: 'generator' },
    { href: 'docs.html', key: 'docs', id: 'docs' },
  ];
  const themeIcon = currentTheme === 'dark' ? '\u2600' : '\u263E';
  const langLabel = currentLang === 'zh' ? 'EN' : '\u4E2D';
  return `<nav class="nav"><div class="nav-inner">
    <a href="index.html" class="nav-logo"><div class="logo-icon">OS</div>Oracle<span>Shell</span>Install</a>
    <div class="nav-links">${pages.map(p =>
      `<a href="${p.href}" class="${active===p.id?'active':''}" data-i18n="${p.key}">${t(p.key)}</a>`
    ).join('')}<a href="generator.html" class="nav-cta" data-i18n="start">${t('start')}</a></div>
    <div class="nav-actions">
      <button class="nav-toggle" id="themeToggle" onclick="toggleTheme()" title="Toggle theme" aria-label="Toggle theme">${themeIcon}</button>
      <button class="nav-toggle" id="langToggle" onclick="toggleLang()" title="Language" aria-label="Toggle language">${langLabel}</button>
      <button class="nav-hamburger" aria-label="Open menu">\u2630</button>
    </div>
  </div></nav>`;
}

// ---- Footer HTML ----
function footerHTML() {
  return `<footer class="footer"><div class="container"><div class="footer-inner">
    <div class="footer-brand">
      <div class="footer-logo">Oracle<span>Shell</span>Install</div>
      <p data-i18n="footerDesc">${t('footerDesc')}</p>
    </div>
    <div class="footer-col"><h4 data-i18n="nav">${t('nav')}</h4>
      <a href="index.html" data-i18n="home">${t('home')}</a>
      <a href="generator.html" data-i18n="generator">${t('generator')}</a>
      <a href="docs.html" data-i18n="docs">${t('docs')}</a>
    </div>
    <div class="footer-col"><h4 data-i18n="versions">${t('versions')}</h4>
      <a href="docs.html">Oracle 26ai</a>
      <a href="docs.html">Oracle 21c</a>
      <a href="docs.html">Oracle 19c</a>
      <a href="docs.html">Oracle 12cR2</a>
    </div>
    <div class="footer-col"><h4 data-i18n="contact">${t('contact')}</h4>
      <a href="mailto:pc1107750981@163.com">\u2709 pc1107750981@163.com</a>
      <a>\uD83D\uDCF1 WeChat: Lucifer-0622</a>
      <a href="https://github.com/pc-study/OracleShellInstall" target="_blank" rel="noopener">\u2B50 GitHub</a>
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
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 10);
    btt.classList.toggle('visible', y > 400);
  }, { passive: true });

  // Mobile hamburger
  const ham = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  if (ham && links) {
    ham.addEventListener('click', () => {
      links.classList.toggle('open');
      ham.textContent = links.classList.contains('open') ? '\u2715' : '\u2630';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open'); ham.textContent = '\u2630';
    }));
  }

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('anim-up'); obs.unobserve(e.target); }});
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

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
