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
    consultTitle: '扫码咨询适配需求', consultHint: '微信扫码添加，或通过 Telegram / Discord 联系',
    footerDesc: 'Oracle 数据库一键自动化安装脚本，支持单机/ASM/RAC 三种部署模式，覆盖 20+ Linux 发行版。',
    copyright: 'Copyright \u00a9 2022-2099 Pengcheng Liu',
  },
  en: {
    home: 'Home', generator: 'Generator', docs: 'Docs', compat: 'Guides', pricing: 'Subscribe', download: 'Download', start: 'Get Started',
    nav: 'Navigation', versions: 'Versions', contact: 'Contact',
    wechat: 'WeChat', email: 'Email',
    expandAll: 'Expand All', collapse: 'Collapse', lines: 'lines',
    consultTitle: 'Scan to Consult', consultHint: 'Add via WeChat, Telegram, or join our Discord community',
    footerDesc: 'One-click automated Oracle Database installation script. Supports Single/ASM/RAC modes across 20+ Linux distributions.',
    copyright: 'Copyright \u00a9 2022-2099 Pengcheng Liu',
  }
};

function t(key) { return (i18n[currentLang] || i18n.zh)[key] || key; }

function setLang(lang) {
  currentLang = lang;
  try { localStorage.setItem('lang', lang); } catch(e) {}
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
  try { localStorage.setItem('theme', theme); } catch(e) {}
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
      <button class="nav-search-btn" onclick="openSearch()" title="Search" aria-label="Search"><svg viewBox="0 0 24 24" width="16" height="16"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><kbd>⌘K</kbd></button>
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
      <a href="https://t.me/LUCIFERLPC" target="_blank" rel="noopener noreferrer">\u2708\uFE0F Telegram: @LUCIFERLPC</a>
      <a href="https://discord.gg/x9fNVzf4N" target="_blank" rel="noopener noreferrer">\uD83D\uDCAC Discord Community</a>
      <a href="https://gitee.com/luciferlpc/OracleShellInstall" target="_blank" rel="noopener noreferrer">\u2B50 Gitee</a>
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
  const qrPath = isGuide ? '../img/wechat-qr.webp' : 'img/wechat-qr.webp';
  const fab = document.createElement('button');
  fab.className = 'wechat-fab';
  fab.title = t('consultTitle');
  fab.setAttribute('aria-label', t('consultTitle'));
  fab.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.56 2.78 4.66L4 17l2.5-1.5c.89.31 1.87.5 2.89.5h.27A6.48 6.48 0 0 1 9.5 15c0-3.59 3.36-6.5 7.5-6.5.17 0 .33.01.5.02C16.46 5.88 13.27 4 9.5 4zm-2 3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM17 10c-3.31 0-6 2.24-6 5s2.69 5 6 5c.67 0 1.31-.1 1.92-.28L21 21l-.62-2.12C21.94 17.79 23 16.47 23 15c0-2.76-2.69-5-6-5zm-2 3.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm4 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/></svg>';
  document.body.appendChild(fab);

  const popup = document.createElement('div');
  popup.className = 'wechat-popup';
  popup.innerHTML = `<button class="wechat-popup-close" aria-label="Close">&times;</button>
    <div class="wechat-popup-title" data-i18n="consultTitle">${t('consultTitle')}</div>
    <img class="wechat-popup-qr" src="${qrPath}" alt="WeChat QR" width="200" height="262" loading="lazy">
    <div class="wechat-popup-id">WeChat: Lucifer-0622</div>
    <a class="consult-tg-link" href="https://t.me/LUCIFERLPC" target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
      Telegram: @LUCIFERLPC
    </a>
    <a class="consult-discord-link" href="https://discord.gg/x9fNVzf4N" target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"/></svg>
      Discord Community
    </a>
    <div class="wechat-popup-hint" data-i18n="consultHint">${t('consultHint')}</div>`;
  document.body.appendChild(popup);

  fab.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.toggle('show');
    fab.classList.toggle('active');
  });
  const popupCloseBtn = popup.querySelector('.wechat-popup-close');
  if (popupCloseBtn) popupCloseBtn.addEventListener('click', () => {
    popup.classList.remove('show');
    fab.classList.remove('active');
  });
  document.addEventListener('click', (e) => {
    if (!popup.contains(e.target) && !fab.contains(e.target)) {
      popup.classList.remove('show');
      fab.classList.remove('active');
    }
  });

  let scrollTick = false;
  window.addEventListener('scroll', () => {
    if (!scrollTick) {
      scrollTick = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (nav) nav.classList.toggle('scrolled', y > 10);
        btt.classList.toggle('visible', y > 400);
        scrollTick = false;
      });
    }
  }, { passive: true });

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('anim-up'); obs.unobserve(e.target); }});
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // --- Counter animation for stat numbers ---
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        counterObs.unobserve(el);
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();
        function step(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.classList.add('counted');
        }
        requestAnimationFrame(step);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObs.observe(el));

  // --- Button ripple effect ---
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

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
    // Add line numbers to code blocks (>1 line)
    const codeEl = pre.querySelector('code') || pre;
    const rawText = codeEl.textContent;
    const lineCount = rawText.split('\n').length;
    if (lineCount > 1) {
      pre.classList.add('has-lines');
      // Wrap each line in a span for numbering
      const codeContent = codeEl.innerHTML;
      const codeLines = codeContent.split('\n');
      codeEl.innerHTML = codeLines.map(l => '<span class="code-line">' + l + '</span>').join('\n');
    }
    // Auto-collapse long code blocks (>15 lines)
    const lines = rawText.split('\n').length;
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
