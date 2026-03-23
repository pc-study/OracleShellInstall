(function() {
'use strict';

/* ============================
   Shared JS - Theme, i18n, Nav
   ============================ */

// ---- i18n ----
let currentLang; try { currentLang = localStorage.getItem('lang'); } catch(e) {} currentLang = currentLang || 'zh';

const i18n = {
  zh: {
    home: '首页', generator: '命令生成器', docs: '使用文档', compat: '安装合集', pricing: '脚本订阅', download: '下载中心', contribute: '投稿分享', start: '开始使用',
    nav: '快速导航', versions: '支持版本', contact: '联系方式',
    wechat: '微信', email: '邮箱',
    expandAll: '展开全部', collapse: '收起', lines: '行',
    consultTitle: '扫码咨询适配需求', consultHint: '微信扫码添加，或通过 Telegram / Discord / WhatsApp 联系',
    footerDesc: 'Oracle 数据库一键自动化安装脚本，支持单机/ASM/RAC 三种部署模式，覆盖 20+ Linux 发行版。',
    docQsTitle: '快速入门',
    docQs1: '上传脚本和 Oracle 安装介质至服务器 /soft 目录',
    docQs2: '使用<a href="generator.html">命令生成器</a>配置安装参数',
    docQs3: '以 root 用户执行生成的命令，等待安装完成',
    copyright: 'Copyright \u00a9 2022-2099 Pengcheng Liu',
  },
  en: {
    // nav & shared
    home: 'Home', generator: 'Generator', docs: 'Docs', compat: 'Guides', pricing: 'Subscribe', download: 'Download', contribute: 'Contribute', start: 'Get Started',
    nav: 'Navigation', versions: 'Versions', contact: 'Contact',
    wechat: 'WeChat', email: 'Email',
    expandAll: 'Expand All', collapse: 'Collapse', lines: 'lines',
    consultTitle: 'Scan to Consult', consultHint: 'Add via WeChat, Telegram, Discord, or WhatsApp',
    footerDesc: 'One-click automated Oracle Database installation script. Supports Single/ASM/RAC modes across 20+ Linux distributions.',
    copyright: 'Copyright \u00a9 2022-2099 Pengcheng Liu',

    // 404
    err404Title: 'Page Not Found',
    err404Desc: 'The page you are looking for does not exist or has been moved',
    err404Back: 'Back to Home',

    // index - hero
    heroBadge: 'One-Click Install \u00b7 Production Ready',
    heroTitle: 'Oracle Database<br><span>One-Click Automated</span> Installation',
    heroDesc: 'From OS configuration to database creation, fully automated. Supports Single, ASM, RAC architectures, covering Oracle 11g to 26ai, compatible with 20+ mainstream Linux distributions.',
    btnGen: 'Command Generator &rarr;',
    btnDoc: 'View Docs',
    statO: 'Oracle Versions',
    statV: 'Linux Distros',
    statM: 'Deployment Modes',
    statA: 'Fully Automated',

    // index - features
    featEye: 'Core Features',
    featTitle: 'Powerful Features, Covering All Scenarios',
    featSub: 'Battle-tested in hundreds of production deployments, an automation solution built for DBAs',
    feat1t: 'Fully Automated',
    feat1d: 'One command handles everything: OS config, dependency install, user creation, software install, DB creation',
    feat2t: 'Multi-Version',
    feat4t: 'RAC Cluster',
    feat6t: 'Patch Upgrade',

    // index - steps
    stepsEye: 'Quick Start',
    stepsTitle: 'Get Started in 3 Steps',
    step1t: 'Upload Files',
    step1d: 'Upload OracleShellInstall.sh and Oracle installation media to /soft directory',
    step2t: 'Configure Parameters',
    step2d: 'Use the online command generator to visually configure all parameters',
    step3t: 'Execute Installation',
    step3d: 'Run the generated command as root, fully unattended',

    // index - cta
    ctaTitle: 'Start Using OracleShellInstall',
    ctaDesc: 'Configure parameters with the online command generator and create executable install commands',
    ctaBtn1: 'Open Command Generator &rarr;',
    ctaBtn2: 'Read Documentation',

    // index - trust
    trustTag: 'Trusted by Users',
    trustTitle: 'The Automation Tool Chosen by DBAs',
    trustUsers: 'Paid Users',
    trustDeploys: 'Production Deployments',
    trustGuides: 'Installation Tutorials',
    trustDistros: 'Linux Distros Supported',
    quote1: '\u201cRAC installation used to take two days. With this script, one command gets it done, saving tremendous time.\u201d',
    quote2: '\u201cGreat system coverage \u2014 our Kylin V10 and openEuler work out of the box. Excellent domestic OS support.\u201d',
    quote3: '\u201cThe command generator is incredibly convenient. Visual parameter configuration makes it easy even for beginners.\u201d',

    // generator
    genTitle: 'Installation Command Generator',
    genDesc: 'Select installation mode, configure parameters, generate executable Shell install commands in real time',
    selectMode: 'Select Installation Mode',
    modeSingle: 'Single Instance',
    modeSingleDesc: 'Single Instance \u00b7 Filesystem Storage',
    modeStandalone: 'Standalone ASM',
    modeStandaloneDesc: 'Standalone + ASM \u00b7 Grid Infra',
    modeRac: 'RAC Cluster',
    modeRacDesc: 'Real Application Clusters',
    genOutput: 'Generated Install Command',
    resetBtn: 'Reset',
    copyBtn: 'Copy Command',

    // docs quickstart cards
    docQsTitle: 'Quick Start',
    docQs1: 'Upload the script and Oracle installation media to the server /soft directory',
    docQs2: 'Use the <a href="generator.html">Command Generator</a> to configure install parameters',
    docQs3: 'Run the generated command as root and wait for installation to complete',

    // docs sidebar
    gdTitle: 'Documentation',
    gdSubtitle: 'Comprehensive guide from quick start to advanced configuration',
    gdEye: 'Browse',
    sbQuick: 'Quick Start',
    sbQuickstart: 'Getting Started',
    sbPrepare: 'Preparation',
    sbEnv: 'Environment',
    sbMedia: 'Install Media',
    sbHowworks: 'How It Works',
    sbHow: 'How It Works',
    sbInstall: 'Installation Guide',
    sbSingle: 'Single Instance',
    sbStandalone: 'Standalone ASM',
    sbAsm: 'Standalone ASM',
    sbRac: 'RAC Cluster',
    sbAdvanced: 'Advanced',
    sbVerify: 'Verification',
    sbParams: 'Parameters',
    sbCommon: 'Common',
    sbAsmP: 'ASM',
    sbRacP: 'RAC',
    sbOther: 'Other',
    sbTrouble: 'Troubleshooting',
    sbFaq: 'FAQ',
    sbChangelog: 'Changelog',

    // compat page
    cpTitle: 'Installation Gallery',
    cpDesc: 'Covering mainstream and domestic Linux distributions, each record is personally tested and verified. Continuously updated.',
    cpEye: 'Compatibility Matrix & Gallery',
    cpS1: 'Supported OS',
    cpS2: 'Oracle Versions',
    cpS3: 'Installation Tutorials',
    cpS4: 'Deployment Modes',
    cpBottom: '<strong>The above is not an exhaustive list of supported combinations</strong>, but rather those that have been personally tested and verified. More combinations await your discovery! If you have new compatibility results, feel free to contact the author to update.',
    fAll: 'All',
    fDomestic: 'Domestic OS',

    // compat - matrix
    mxTitle: 'Compatibility Matrix',
    mxEye: 'Known Supported OS & Version Combinations',
    mxCol0: 'Operating System',
    mxCatRh: 'Red Hat Family',
    mxCent6: 'CentOS 6 All',
    mxCent78: 'CentOS 7/8 All',
    mxRh6: 'RedHat 6 All',
    mxRh789: 'RedHat 7/8/9 All',
    mxOl6: 'OracleLinux 6 All',
    mxOl789: 'OracleLinux 7/8/9 All',
    mxRocky: 'RockyLinux 8/9 All',
    mxAlma: 'AlmaLinux 8/9 All',
    mxCatSuse: 'SUSE',
    mxSuse: 'SUSE 12/15 All',
    mxCatCn: 'Chinese OS',
    mxEuler: 'Huawei openEuler 20\u201324 All',
    mxEulerOS: 'Huawei EulerOS V2 All',
    mxTencent: 'Tencent TencentOS 2/3/4 All',
    mxKeyarch: 'Inspur KeyarchOS 5 All',
    mxAnolis: 'Alibaba Anolis 7/8 All',
    mxKylin: 'Kylin V10 All',
    mxNeoKylin: 'NeoKylin V7 All',
    mxUos: 'UOS V20 All',
    mxOcOS: 'OpenCloudOS 7/8/9 All',
    mxCatDeb: 'Debian Family',
    mxDebian: 'Debian All',
    mxDeepin: 'Deepin All',
    mxUbuntu: 'Ubuntu All',
    mxCatOther: 'Other',
    mxFedora: 'Fedora 13\u201339 All',
    mxAsianux: 'Asianux (Red Flag)',
    mxNfs: 'NFSChina',
    mxNote: '&#9432; The above are verified compatible combinations. &#10003; = supported, &#10005; = unsupported or unverified',

    // pricing
    prTitle: 'Choose Your Plan',
    prDesc: 'Open-source edition for basic needs. Professional edition unlocks RAC clusters, ARM architecture, domestic OS support, and all advanced features',
    prEye: 'Plan Comparison',
    planFreeName: 'Open Source Edition',
    planFreeDesc: 'For development and testing environments, covers basic Oracle installation',
    planFreePrice: 'Free',
    planFreeSub: 'Forever free \u00b7 Open on Gitee',
    planFreeBtn: 'Get Free Edition',
    planPaidName: 'Professional Edition',
    planPaidDesc: 'For production environments, unlock all advanced features with dedicated support',
    planPaidPrice: '\u00a599',
    planPaidSub: 'One-time payment \u00b7 Contact via TG/Discord/WhatsApp for purchase',
    planPaidBadge: 'Recommended',
    planPaidBtn: 'Subscribe Now',
    recommended: 'Recommended',
    pf1: 'Single / Single ASM Install',
    pf2: 'NON-CDB / CDB (PDB) Architecture',
    pf3: 'X86 Architecture',
    pf4: 'RHEL / OracleLinux / CentOS',
    pf5: 'Oracle Officially Certified Combinations',
    pf6: 'Fully Automated \u00b7 No Manual Intervention',
    pf7: 'RAC Cluster Deployment',
    pf8: 'ARM Architecture \u00b7 Domestic OS',
    pf9: 'One-Click Patch Install',
    pp1: 'Single / Single ASM Install',
    pp2: 'NON-CDB / CDB (PDB) Architecture',
    pp3: 'X86 Architecture',
    pp4: 'RAC Cluster Install (Unlimited Nodes)',
    pp5: 'ARM Architecture (aarch64)',
    pp6: 'Domestic OS Install (Kylin, openEuler, UOS, Anolis)',
    pp7: 'Automatic Patch Application (PSU/RU/OJVM)',
    pp8: 'Dedicated Technical Support',

    // pricing - comparison table
    cmpEye: 'Detailed Comparison',
    cmpTitle: 'Full Feature Comparison',
    cmpCol1: 'Feature',
    cmpCol2: 'Open Source',
    cmpCol3: 'Professional',
    catFunc: 'Features',
    r1: 'Script Help',
    r2: 'Installation Logs',
    r3: 'Parameter Configuration',
    r4: 'Parameter Validation',
    r5: 'Create Multiple Instances',
    r6: 'Configure Multipath, UDEV, ASM Disk Binding',
    r7: 'Repeatable Execution',
    r8: 'Fully Unattended',
    r9: 'Post-Install DB Optimization',
    catArch: 'Architecture',
    r10: 'Single / Single ASM',
    r11: 'NON-CDB / CDB (PDB)',
    r12: 'RAC (Unlimited Nodes)',
    catOs: 'Operating System',
    r16: 'RHEL / Oracle Linux / CentOS',
    r17: 'Domestic OS (Kylin, openEuler, UOS, Anolis, 20+)',
    catVer: 'Oracle Version',
    catCompat: 'Compatibility',
    r19: 'Oracle Officially Certified Combination Install',
    r20: 'Non-Officially Certified Combination Install',
    catPatch: 'Patching',
    r21: 'Grid/DB/OJVM One-Click Patch Install',
    catMedia: 'Install Media',
    r22: 'Provides OS ISO, Oracle Packages & Patches',
    catSupport: 'Support',
    r23: 'Log Troubleshooting, Private Group, Live Q&A',

    // pricing - FAQ
    faqEye: 'FAQ',
    faqTitle: 'Subscription FAQ',
    fq1: 'What is the key difference between the open-source and professional editions?',
    fa1: 'The open-source edition supports Single and Single ASM modes for x86 architecture and Red Hat family systems, covering basic installation needs. The professional edition adds RAC clusters (unlimited nodes), ARM architecture, 20+ domestic OS support, non-certified combination installs, one-click patching, install media, and dedicated technical support.',
    fq2: 'How do I purchase the professional edition?',
    fa2: 'Add the author on WeChat (Lucifer-0622) to inquire about subscription details, including pricing, licensing, and payment process.',
    fq3: 'What technical support does the professional edition include?',
    fa3: 'The professional edition includes a dedicated WeChat group, live Q&A sessions, and installation log troubleshooting guidance. You can get direct support from the author in the group for any installation issues.',
    fq4: 'What install media are included?',
    fa4: 'The professional edition provides OS ISO images, Oracle installation packages for all versions, and Grid/DB/OJVM patch files \u2014 saving you the hassle of downloading them yourself.',
    fq5: 'Can the open-source edition be used in production?',
    fa5: 'The open-source edition is free to use but only supports Single/Single ASM, x86 architecture, and Red Hat family systems. For production environments requiring RAC clusters, ARM architecture, or domestic OS support, the professional edition is recommended.',

    // pricing - CTA
    prCtaTitle: 'Get Full Professional Features',
    prCtaDesc: 'Contact via WeChat, Telegram, Discord, or WhatsApp to inquire about subscription details and unlock RAC clusters, domestic OS support, one-click patching, and all advanced features',
    qrLabel: 'Scan to add the author on WeChat',

    // download
    dlTitle: 'Download Center',
    dlDesc: 'Thank you for subscribing to OracleShellInstall. Below are the usage guidelines, download methods, and FAQs. Please read carefully before use.',
    dlNotice: '<strong>Tip:</strong> The author has spent significant time writing detailed documentation and step-by-step tutorials. We recommend reading the <a href="docs.html">Documentation</a> and <a href="compat.html">Installation Gallery</a> first, as most common issues are already covered.',
    dlSecDownload: 'Script Download',
    dlSecDownloadSub: 'The script is hosted in a private GitHub repository. Subscription grants access.',
    dlBtnGithub: 'Download from GitHub',
    dlBtnBaidu: 'Download Install Packages from Baidu Pan',
    dlBaiduNote: 'Baidu Pan code: 6666 | Oracle install packages provided as courtesy, not obligatory',
    dlSecAccess: 'How to Get Access',
    dlSecAccessSub: 'After purchasing a subscription, follow these steps to activate GitHub repository access',
    dlStep1T: 'Purchase Subscription',
    dlStep1D: 'Go to the <a href="pricing.html" style="color:var(--red)">Subscription Page</a> to complete your purchase',
    dlStep2T: 'Contact Author',
    dlStep2D: '<span style="font-family:var(--mono);font-size:.75rem;color:var(--accent2)">WeChat: Lucifer-0622</span>',
    dlStep3T: 'Provide GitHub Account',
    dlStep3D: 'Provide your GitHub username or email. No account? Register free at <a href="https://github.com" target="_blank" rel="noopener noreferrer" style="color:var(--red)">github.com</a>',
    dlStep4T: 'Confirm Invitation & Download',
    dlStep4D: 'Check your email for the repository invitation (valid for 7 days), then log in to GitHub to download the ZIP package',

    // download - usage guidelines
    dlSecGuide: 'Usage Guidelines',
    dlSecGuideSub: 'Please review the following before using the script for a better experience',
    dlG1T: 'Universal Script \u2014 No System-Specific Versions',
    dlG1D: 'The script command is universal and does not differentiate between OS or Oracle versions. Simply configure parameters via the <a href="generator.html">Command Generator</a> and run.',
    dlG2T: 'Read the Docs Before Using the Script',
    dlG2D: 'The author has written detailed <a href="docs.html">Documentation</a> and 170+ <a href="compat.html">hands-on tutorials</a> covering most use cases. Please consult the docs first when encountering issues \u2014 most questions are already answered.',
    dlG3T: 'Report Issues in the Group Chat',
    dlG3D: 'If you encounter issues during installation, please communicate in the user group during business hours and attach the installation logs (<code style="font-family:var(--mono);font-size:.78rem;background:var(--bg3);padding:2px 6px;border-radius:3px;color:var(--accent2)">print*.log</code> and <code style="font-family:var(--mono);font-size:.78rem;background:var(--bg3);padding:2px 6px;border-radius:3px;color:var(--accent2)">shell*.log</code> files). Issues reported without logs cannot be effectively diagnosed.',
    dlG4T: 'Subscription Fee Details',
    dlG4D: 'The subscription fee covers only the script usage license (already a discounted price) and does not include one-on-one guidance, remote assistance, or ongoing operational support. Help in the group is provided by the author in their spare time as a courtesy \u2014 please communicate respectfully.',
    dlG5T: 'Custom Requirements Welcome',
    dlG5D: 'If you have special adaptation needs or feature suggestions, feel free to contact the author. Complex custom development may incur additional fees \u2014 please discuss for details.',
    dlG6T: 'Please Respect Off-Hours',
    dlG6D: 'Group discussions are welcome during business hours. Please avoid private messages on weekends and holidays so everyone can have adequate rest. Thank you for your understanding.',

    // download - changelog
    dlSecChangelog: 'Changelog',
    dlSecChangelogSub: 'Major version update history for OracleShellInstall',
    cl50a: 'Added Oracle 26ai support',
    cl50b: 'Added Ubuntu 24.04 / Debian 12 support',
    cl50c: 'Optimized RAC cluster installation workflow',
    cl50d: 'Added online command generator',
    cl40a: 'Added Oracle 21c support',
    cl40b: 'Added openEuler / Kylin V10 / UOS domestic OS support',
    cl40c: 'Added Rocky Linux / AlmaLinux support',
    cl40d: 'Optimized ASM disk auto-configuration logic',
    cl30a: 'Added RHEL 9 / Oracle Linux 9 support',
    cl30b: 'Added ARM architecture support',
    cl30c: 'Optimized automatic patch application mechanism',

    // download - system requirements
    dlSecReq: 'System Requirements',
    dlSecReqSub: 'Please verify your server meets the following minimum requirements before running the script',
    dlReqOs: 'Operating System',
    dlReqOsVal: 'Linux x86_64 / ARM64 (minimal installation)',
    dlReqMem: 'Memory',
    dlReqMemVal: 'Minimum 2GB (production recommended 8GB+)',
    dlReqDisk: 'Disk Space',
    dlReqDiskVal: 'Minimum 30GB (recommended 50GB+)',
    dlReqBash: 'Bash Version',
    dlReqUser: 'Run As',
    dlReqNet: 'Network',
    dlReqNetVal: 'Can use local YUM/APT repo for offline installation',

    // download - FAQ
    dlSecFaq: 'FAQ',
    dlSecFaqSub: 'The most commonly encountered questions from users',
    dlFaq1Q: 'What should I do if the installation fails with an error?',
    dlFaq1A: '<ol><li>First check the <a href="docs.html">Documentation</a> and <a href="compat.html">Installation Gallery</a> tutorials \u2014 most issues are already explained in detail.</li><li>If you cannot find a solution in the docs, report the issue in the user group and <strong style="color:var(--red-glow)">be sure to provide installation logs</strong>: the script generates <code>print*.log</code> and <code>shell*.log</code> log files in the current directory \u2014 please provide both.</li><li>Issue reports without logs make it difficult to diagnose the cause and provide effective help.</li><li>Due to the large number of subscribers, the author has limited availability and cannot handle issues via private messages \u2014 please use the group chat.</li></ol>',
    dlFaq2Q: 'Where can I download Oracle installation packages?',
    dlFaq2A: 'Oracle installation packages can be downloaded via Baidu Pan: <a href="https://pan.baidu.com/s/1Eof4UreHPgAo3KhkC543Ng?pwd=6666" target="_blank" rel="noopener noreferrer">Click here</a> (code: 6666).<br>After downloading, upload the packages to the <code>/soft</code> directory on your server. This resource is shared as a courtesy, not an obligation \u2014 please do not make additional demands. Thank you.',
    dlFaq3Q: 'How do I download the script?',
    dlFaq3A: '<ol><li>The script is hosted in a private GitHub repository: <a href="https://github.com/DBAutoTask/OracleShellInstall" target="_blank" rel="noopener noreferrer">DBAutoTask/OracleShellInstall</a>. Once granted access, you can visit the repo.</li><li>On the repository page, click the green <strong style="color:var(--green)">&lt;&gt; Code</strong> button and select <strong>Download ZIP</strong>.</li><li>Make sure you are logged in with the authorized GitHub account, otherwise the repository will not be visible.</li><li>To get access, follow the steps in the "How to Get Access" section above.</li></ol>',
    dlFaq4Q: 'What if my GitHub invitation has expired?',
    dlFaq4A: 'GitHub repository invitations are valid for <strong style="color:var(--accent2)">7 days</strong>. Please check your registered email and accept the invitation promptly. If the invitation has expired, contact the author on WeChat (Lucifer-0622) to have it resent.',
    dlFaq5Q: 'What if I need support for a new OS or Oracle version?',
    dlFaq5A: 'If you need the script to support a new operating system or Oracle version, feel free to contact the author:<ol><li>Click the WeChat icon in the bottom-right corner of the page to scan and add the author.</li><li>Post your request in the user group \u2014 the author will evaluate and include it in future updates.</li><li>Complex custom requirements may incur additional fees \u2014 please discuss for details.</li></ol>',

    // pricing page - free/paid price note (mapped from planFreeSub/planPaidSub)
    planFreePriceNote: 'Forever free \u00b7 Open on Gitee',
    planPaidPriceNote: 'One-time payment \u00b7 Contact via TG/Discord/WhatsApp for purchase'
  }
};

function t(key) {
  const val = (i18n[currentLang] || i18n.zh)[key];
  if (val === undefined && location.hostname === 'localhost') {
    console.warn('[i18n] Missing key:', key, 'for lang:', currentLang);
  }
  return val || key;
}

function setLang(lang) {
  currentLang = lang;
  try { localStorage.setItem('lang', lang); } catch(e) {}
  // Update html lang attribute
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  // Update toggle button text
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'zh' ? 'EN' : '中';
  // Update all i18n elements — save original zh HTML on first visit so we can restore it
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (!el.dataset.i18nZh) el.dataset.i18nZh = el.innerHTML;
    const val = (i18n[lang] || i18n.zh)[el.dataset.i18n];
    el.innerHTML = val || el.dataset.i18nZh;
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
  if (theme !== 'dark' && theme !== 'light') theme = 'dark';
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('theme', theme); } catch(e) {}
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '\u2600' : '\u263E';
}

function toggleTheme() {
  document.documentElement.classList.add('theme-transitioning');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 500);
}

// ---- Nav HTML ----
function navHTML(active) {
  const navPages = [
    { href: 'index.html', key: 'home', id: 'home', icon: '&#9750;' },
    { href: 'generator.html', key: 'generator', id: 'generator', icon: '&#9881;' },
    { href: 'docs.html', key: 'docs', id: 'docs', icon: '&#9782;' },
    { href: 'compat.html', key: 'compat', id: 'compat', icon: '&#9776;' },
    { href: 'pricing.html', key: 'pricing', id: 'pricing', icon: '&#9733;' },
  ];
  const tabPages = [
    { href: 'index.html', key: 'home', id: 'home', icon: '&#9750;' },
    { href: 'generator.html', key: 'generator', id: 'generator', icon: '&#9881;' },
    { href: 'docs.html', key: 'docs', id: 'docs', icon: '&#9782;' },
    { href: 'pricing.html', key: 'pricing', id: 'pricing', icon: '&#9733;' },
  ];
  const isGuide = location.pathname.includes('/guides/');
  const prefix = isGuide ? '../' : '';
  const themeIcon = currentTheme === 'dark' ? '\u2600' : '\u263E';
  const langLabel = currentLang === 'zh' ? 'EN' : '\u4E2D';
  // Desktop nav
  const nav = `<nav class="nav"><a href="#main-content" class="skip-link">跳转到主内容</a><div class="nav-inner">
    <a href="${prefix}index.html" class="nav-logo"><div class="logo-icon">OS</div>Oracle<span>Shell</span>Install</a>
    <div class="nav-links">${navPages.map(p =>
      `<a href="${prefix}${p.href}" class="${active===p.id?'active':''}" data-i18n="${p.key}"><span class="nav-icon">${p.icon}</span>${t(p.key)}</a>`
    ).join('')}<a href="${prefix}docs.html#quickstart" class="nav-cta" data-i18n="start">${t('start')}</a></div>
    <div class="nav-actions">
      <button class="nav-search-btn" onclick="openSearch()" title="Search" aria-label="搜索"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><kbd>\u2318K</kbd></button>
      <button class="nav-toggle" id="themeToggle" onclick="toggleTheme()" title="Toggle theme" aria-label="切换主题">${themeIcon}</button>
      <button class="nav-toggle" id="langToggle" onclick="toggleLang()" title="Language" aria-label="切换语言">${langLabel}</button>
    </div>
  </div></nav>`;
  // Mobile bottom tab bar
  const tabbar = `<div class="mobile-tabbar">${tabPages.map(p =>
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
      <a href="${p}contribute.html" data-i18n="contribute">${t('contribute')}</a>
    </div>
    <div class="footer-col"><h4 data-i18n="versions">${t('versions')}</h4>
      <a href="${p}docs.html">Oracle 26ai</a>
      <a href="${p}docs.html">Oracle 21c</a>
      <a href="${p}docs.html">Oracle 19c</a>
      <a href="${p}docs.html">Oracle 12cR2</a>
      <a href="${p}docs.html">Oracle 11gR2</a>
    </div>
    <div class="footer-col"><h4 data-i18n="contact">${t('contact')}</h4>
      <a href="mailto:pc1107750981@163.com">\u2709 pc1107750981@163.com</a>
      <a>\uD83D\uDCF1 WeChat: Lucifer-0622</a>
      <div class="footer-social">
        <a href="https://t.me/LUCIFERLPC" target="_blank" rel="noopener noreferrer" class="tg-icon" title="Telegram" aria-label="Telegram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></a>
        <a href="https://discord.gg/jumXJDmW" target="_blank" rel="noopener noreferrer" class="dc-icon" title="Discord" aria-label="Discord"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.076-.14.003-.3-.141-.354a13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.373-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.1.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"/></svg></a>
        <a href="https://wa.me/8616619904622" target="_blank" rel="noopener noreferrer" class="wa-icon" title="WhatsApp" aria-label="WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg></a>
        <a href="https://gitee.com/luciferlpc/OracleShellInstall" target="_blank" rel="noopener noreferrer" class="gt-icon" title="Gitee" aria-label="Gitee"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.016zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .329.266.593.593.593h5.19c.327 0 .592-.264.593-.592v-1.482a.593.593 0 0 0-.593-.593h-3.112a.593.593 0 0 1-.593-.592v-1.482a.593.593 0 0 1 .593-.593h4.519c.327 0 .593.266.593.593v6.667a1.78 1.78 0 0 1-1.778 1.778H6.518a.593.593 0 0 1-.593-.593V8.296c0-1.636 1.327-2.963 2.963-2.963h9.186z"/></svg></a>
        <a href="https://github.com/pc-study/OracleShellInstall" target="_blank" rel="noopener noreferrer" class="gh-icon" title="GitHub" aria-label="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
        <a href="mailto:pc1107750981@163.com" class="em-icon" title="Email" aria-label="Email"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/></svg></a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <span data-i18n="copyright">${t('copyright')}</span>
    <span>Lucifer &amp; Contributors</span>
  </div></div></footer>`;
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  // Theme already applied by inline <head> script; sync JS state
  setTheme(currentTheme);

  // Scroll shadow + back to top with progress ring
  const nav = document.querySelector('.nav');
  const btt = document.createElement('button');
  btt.className = 'back-to-top';
  btt.innerHTML = '\u2191';
  btt.title = 'Back to top';
  btt.setAttribute('aria-label', '返回顶部');
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(btt);

  // Progress ring around back-to-top
  const bttRing = document.createElement('div');
  bttRing.className = 'btt-progress';
  const circ = 2 * Math.PI * 22;
  bttRing.innerHTML = `<svg width="52" height="52"><circle cx="26" cy="26" r="22" stroke-dasharray="${circ}" stroke-dashoffset="${circ}"/></svg>`;
  document.body.appendChild(bttRing);
  const ringCircle = bttRing.querySelector('circle');

  // Contribute floating button + popup
  const isGuide = location.pathname.includes('/guides/');
  const isContributePage = location.pathname.includes('contribute');
  if (!isContributePage) {
    const ctPath = isGuide ? '../contribute.html' : 'contribute.html';
    const ctFab = document.createElement('button');
    ctFab.className = 'contribute-fab';
    ctFab.title = t('contribute');
    ctFab.setAttribute('aria-label', t('contribute'));
    ctFab.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';
    document.body.appendChild(ctFab);

    const ctPopup = document.createElement('div');
    ctPopup.className = 'contribute-popup';
    const ctZh = currentLang === 'zh';
    ctPopup.innerHTML = `<button class="contribute-popup-close" aria-label="关闭">&times;</button>
      <div class="contribute-popup-icon">&#9997;</div>
      <div class="contribute-popup-title">${ctZh ? '分享您的安装体验' : 'Share Your Install Experience'}</div>
      <div class="contribute-popup-desc">${ctZh ? '安装完成后，脚本会自动生成报告模板。分享您的安装实录，帮助更多 DBA。' : 'The script auto-generates a report after installation. Share your experience to help more DBAs.'}</div>
      <div class="contribute-popup-steps">
        <span>1. ${ctZh ? '找到报告' : 'Find Report'}</span>
        <span>2. ${ctZh ? '补充内容' : 'Add Content'}</span>
        <span>3. ${ctZh ? '提交分享' : 'Submit'}</span>
      </div>
      <a href="${ctPath}" class="contribute-popup-btn">${ctZh ? '查看投稿指南 →' : 'View Contribute Guide →'}</a>`;
    document.body.appendChild(ctPopup);

    ctFab.addEventListener('click', (e) => {
      e.stopPropagation();
      ctPopup.classList.toggle('show');
      ctFab.classList.toggle('active');
      // Close WeChat popup if open
      var wp = document.querySelector('.wechat-popup');
      if (wp) wp.classList.remove('show');
      var wf = document.querySelector('.wechat-fab');
      if (wf) wf.classList.remove('active');
    });
    const ctClose = ctPopup.querySelector('.contribute-popup-close');
    if (ctClose) ctClose.addEventListener('click', () => {
      ctPopup.classList.remove('show');
      ctFab.classList.remove('active');
    });
    document.addEventListener('click', (e) => {
      if (!ctPopup.contains(e.target) && !ctFab.contains(e.target)) {
        ctPopup.classList.remove('show');
        ctFab.classList.remove('active');
      }
    });
  }

  // WeChat consult floating widget
  const qrPath = isGuide ? '../img/wechat-qr.webp' : 'img/wechat-qr.webp';
  const fab = document.createElement('button');
  fab.className = 'wechat-fab';
  fab.title = t('consultTitle');
  fab.setAttribute('aria-label', '联系咨询');
  fab.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.56 2.78 4.66L4 17l2.5-1.5c.89.31 1.87.5 2.89.5h.27A6.48 6.48 0 0 1 9.5 15c0-3.59 3.36-6.5 7.5-6.5.17 0 .33.01.5.02C16.46 5.88 13.27 4 9.5 4zm-2 3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM17 10c-3.31 0-6 2.24-6 5s2.69 5 6 5c.67 0 1.31-.1 1.92-.28L21 21l-.62-2.12C21.94 17.79 23 16.47 23 15c0-2.76-2.69-5-6-5zm-2 3.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm4 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/></svg>';
  document.body.appendChild(fab);

  const popup = document.createElement('div');
  popup.className = 'wechat-popup';
  popup.innerHTML = `<button class="wechat-popup-close" aria-label="关闭">&times;</button>
    <div class="wechat-popup-title" data-i18n="consultTitle">${t('consultTitle')}</div>
    <img class="wechat-popup-qr" src="${qrPath}" alt="WeChat QR" width="200" height="262" loading="lazy">
    <div class="wechat-popup-id">WeChat: Lucifer-0622</div>
    <div class="popup-social">
      <a href="https://t.me/LUCIFERLPC" target="_blank" rel="noopener noreferrer" class="popup-social-icon tg-icon" title="Telegram"><svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></a>
      <a href="https://discord.gg/jumXJDmW" target="_blank" rel="noopener noreferrer" class="popup-social-icon dc-icon" title="Discord"><svg viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.076-.14.003-.3-.141-.354a13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.373-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.1.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"/></svg></a>
      <a href="https://wa.me/8616619904622" target="_blank" rel="noopener noreferrer" class="popup-social-icon wa-icon" title="WhatsApp"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg></a>
      <a href="https://gitee.com/luciferlpc/OracleShellInstall" target="_blank" rel="noopener noreferrer" class="popup-social-icon gt-icon" title="Gitee"><svg viewBox="0 0 24 24"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.016zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .329.266.593.593.593h5.19c.327 0 .592-.264.593-.592v-1.482a.593.593 0 0 0-.593-.593h-3.112a.593.593 0 0 1-.593-.592v-1.482a.593.593 0 0 1 .593-.593h4.519c.327 0 .593.266.593.593v6.667a1.78 1.78 0 0 1-1.778 1.778H6.518a.593.593 0 0 1-.593-.593V8.296c0-1.636 1.327-2.963 2.963-2.963h9.186z"/></svg></a>
      <a href="https://github.com/pc-study/OracleShellInstall" target="_blank" rel="noopener noreferrer" class="popup-social-icon gh-icon" title="GitHub"><svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
      <a href="mailto:pc1107750981@163.com" class="popup-social-icon em-icon" title="Email"><svg viewBox="0 0 24 24"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/></svg></a>
    </div>
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
        bttRing.classList.toggle('visible', y > 400);
        // Update progress ring
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docH > 0 ? Math.min(y / docH, 1) : 0;
        ringCircle.style.strokeDashoffset = circ * (1 - progress);
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
      // Fallback: remove ripple after 1s in case animationend never fires
      setTimeout(() => { if (ripple.parentNode) ripple.remove(); }, 1000);
    });
  });

  // macOS terminal wrapper for pre blocks (skip hero terminal and already-wrapped)
  document.querySelectorAll('pre').forEach(pre => {
    if (pre.closest('.hero-terminal, .mac-term, .hero-term-body, .ct-template')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'mac-term';
    const bar = document.createElement('div');
    bar.className = 'mac-term-bar';
    bar.innerHTML = '<span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span><span class="mac-term-title">Terminal</span>';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(bar);
    wrapper.appendChild(pre);
    // Add copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copy';
    const copySvg = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';
    const doneSvg = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
    copyBtn.addEventListener('click', () => {
      const text = (pre.querySelector('code') || pre).textContent;
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = doneSvg + 'Copied!';
        setTimeout(() => { copyBtn.classList.remove('copied'); copyBtn.innerHTML = copySvg + 'Copy'; }, 2000);
      }).catch(() => {
        // Fallback for browsers without clipboard API permission
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); copyBtn.classList.add('copied');
          copyBtn.innerHTML = doneSvg + 'Copied!';
          setTimeout(() => { copyBtn.classList.remove('copied'); copyBtn.innerHTML = copySvg + 'Copy'; }, 2000);
        } catch(e) { /* silently fail */ }
        ta.remove();
      });
    });
    wrapper.appendChild(copyBtn);
    // Add line numbers to code blocks (>1 line)
    const codeEl = pre.querySelector('code') || pre;
    const rawText = codeEl.textContent;
    const lineCount = rawText.split('\n').length;
    if (lineCount > 1) {
      pre.classList.add('has-lines');
      // Wrap each line in a span for numbering (use DocumentFragment to batch DOM ops)
      const textLines = rawText.split('\n');
      // Remove trailing empty line from split
      if (textLines.length && textLines[textLines.length - 1] === '') textLines.pop();
      const frag = document.createDocumentFragment();
      textLines.forEach(line => {
        const span = document.createElement('span');
        span.className = 'code-line';
        span.textContent = line;
        frag.appendChild(span);
      });
      codeEl.textContent = '';
      codeEl.appendChild(frag);
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

// Expose public API to window
Object.defineProperty(window, 'currentLang', {
  get: function() { return currentLang; },
  set: function(v) { currentLang = v; }
});
Object.defineProperty(window, 'currentTheme', {
  get: function() { return currentTheme; },
  set: function(v) { currentTheme = v; }
});
window.i18n = i18n;
window.t = t;
window.setLang = setLang;
window.toggleLang = toggleLang;
window.setTheme = setTheme;
window.toggleTheme = toggleTheme;
window.navHTML = navHTML;
window.footerHTML = footerHTML;
})();
