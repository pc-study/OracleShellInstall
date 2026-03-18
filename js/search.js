/* ============================
   Full-site Search Module
   ============================ */
(function () {
  let searchIndex = null;
  let indexLoading = false;
  let overlay, input, results, closeBtn;
  const isGuide = location.pathname.includes('/guides/');
  const prefix = isGuide ? '../' : '';

  // --- HTML entity escaping for XSS prevention ---
  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // --- Build DOM ---
  function createSearchUI() {
    overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
      <div class="search-modal">
        <div class="search-header">
          <svg class="search-icon" viewBox="0 0 24 24" width="20" height="20"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <input class="search-input" type="text" placeholder="${currentLang === 'zh' ? '搜索文档、教程、参数...' : 'Search docs, guides, params...'}" autocomplete="off" />
          <button class="search-close" aria-label="Close">ESC</button>
        </div>
        <div class="search-results"></div>
        <div class="search-footer">${currentLang === 'zh' ? '↑↓ 导航 · Enter 打开 · ESC 关闭' : '↑↓ Navigate · Enter Open · ESC Close'}</div>
      </div>`;
    document.body.appendChild(overlay);

    input = overlay.querySelector('.search-input');
    results = overlay.querySelector('.search-results');
    closeBtn = overlay.querySelector('.search-close');

    // Events
    closeBtn.addEventListener('click', hideSearch);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) hideSearch(); });
    input.addEventListener('input', debounce(doSearch, 200));
    input.addEventListener('keydown', handleNav);
  }

  // --- Show / Hide ---
  function showSearch() {
    if (!overlay) createSearchUI();
    overlay.classList.add('show');
    input.value = '';
    results.innerHTML = '';
    setTimeout(() => input.focus(), 50);
    document.body.style.overflow = 'hidden';
  }

  function hideSearch() {
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  // --- Keyboard shortcut (Ctrl/Cmd + K) ---
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      showSearch();
    }
    if (e.key === 'Escape' && overlay && overlay.classList.contains('show')) {
      hideSearch();
    }
  });

  // --- Load index lazily (with race condition guard) ---
  async function loadIndex() {
    if (searchIndex) return;
    if (indexLoading) {
      // Wait for in-flight load to finish
      while (indexLoading) await new Promise(r => setTimeout(r, 50));
      return;
    }
    indexLoading = true;
    try {
      const res = await fetch(prefix + 'search-index.json');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      searchIndex = await res.json();
    } catch (e) {
      console.error('Failed to load search index', e);
      searchIndex = [];
    } finally {
      indexLoading = false;
    }
  }

  // --- Search logic ---
  function doSearch() {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    loadIndex().then(() => {
      const terms = q.split(/\s+/);
      const scored = [];
      searchIndex.forEach((item) => {
        let score = 0;
        const title = (item.title || '').toLowerCase();
        const desc = (item.desc || '').toLowerCase();
        const text = (item.text || '').toLowerCase();
        terms.forEach(term => {
          if (title.includes(term)) score += 10;
          if (desc.includes(term)) score += 5;
          if (text.includes(term)) score += 1;
        });
        if (score > 0) scored.push({ ...item, score });
      });
      scored.sort((a, b) => b.score - a.score);
      renderResults(scored.slice(0, 20), terms);
    });
  }

  function highlight(text, terms) {
    if (!text) return '';
    let out = escapeHTML(text);
    terms.forEach(t => {
      const re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      out = out.replace(re, '<mark>$1</mark>');
    });
    return out;
  }

  function renderResults(items, terms) {
    if (items.length === 0) {
      results.innerHTML = `<div class="search-empty">${currentLang === 'zh' ? '没有找到相关结果' : 'No results found'}</div>`;
      return;
    }
    results.innerHTML = items.map((item, i) => {
      const url = escapeHTML(prefix + item.url);
      const title = highlight(item.title || item.url, terms);
      const desc = highlight((item.desc || item.text || '').substring(0, 120), terms);
      return `<a class="search-item${i === 0 ? ' active' : ''}" href="${url}">
        <div class="search-item-title">${title}</div>
        <div class="search-item-desc">${desc}</div>
      </a>`;
    }).join('');
  }

  // --- Keyboard navigation ---
  function handleNav(e) {
    const items = results.querySelectorAll('.search-item');
    if (!items.length) return;
    const cur = results.querySelector('.search-item.active');
    let idx = cur ? Array.from(items).indexOf(cur) : 0;
    if (idx < 0) idx = 0;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (idx < items.length - 1) idx++;
      items.forEach(el => el.classList.remove('active'));
      items[idx].classList.add('active');
      items[idx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx > 0) idx--;
      items.forEach(el => el.classList.remove('active'));
      items[idx].classList.add('active');
      items[idx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (cur) cur.click();
    }
  }

  // --- Utility ---
  function debounce(fn, ms) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, ms);
    };
  }

  // --- Expose globally ---
  window.openSearch = showSearch;

  // --- Update placeholder on lang change ---
  document.addEventListener('langchange', (e) => {
    if (input) {
      input.placeholder = e.detail.lang === 'zh' ? '搜索文档、教程、参数...' : 'Search docs, guides, params...';
    }
  });
})();
