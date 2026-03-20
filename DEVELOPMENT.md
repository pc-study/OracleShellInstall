# OracleShellInstall 官方网站 — 开发文档

> 本文档记录 OracleShellInstall 官方网站 (www.oracleshellinstall.com) 从零开始的完整开发过程、技术架构、搭建步骤与日常维护指南。

---

## 目录

1. [项目概述](#1-项目概述)
2. [技术栈与架构](#2-技术栈与架构)
3. [目录结构](#3-目录结构)
4. [开发历程](#4-开发历程)
5. [页面详解](#5-页面详解)
6. [核心模块技术细节](#6-核心模块技术细节)
7. [搭建部署指南](#7-搭建部署指南)
8. [日常维护指南](#8-日常维护指南)
9. [常见问题](#9-常见问题)

---

## 1. 项目概述

### 1.1 项目信息

| 项目 | 说明 |
|------|------|
| **名称** | OracleShellInstall 官方网站 |
| **域名** | www.oracleshellinstall.com |
| **托管** | GitHub Pages (仓库: pc-study/OracleShellInstall, main 分支) |
| **脚本版本** | v5.0.0 |
| **脚本作者** | Lucifer (刘鹏程) & bak724 |
| **联系邮箱** | pc1107750981@163.com |
| **源码仓库** | GitHub: pc-study/OracleShellInstall / Gitee: luciferlpc/OracleShellInstall |

### 1.2 网站定位

本网站是 OracleShellInstall 一键安装脚本的官方主页，核心功能包括：

- **产品展示**: 展示脚本功能、支持的系统/数据库版本、安装模式
- **命令生成器**: 可视化配置参数，一键生成安装命令
- **使用文档**: 完整的参数说明、环境准备、安装指南
- **兼容矩阵**: 操作系统 × Oracle 版本支持情况，含 182 篇实战教程
- **下载中心**: 付费用户下载脚本，含更新日志与常见问题
- **订阅定价**: 开源版与付费版功能对比

### 1.3 脚本能力概要

- **安装模式**: 单机 (Single)、单机 ASM (Standalone)、RAC 集群 (RAC)
- **Oracle 版本**: 11gR2、12cR1、12cR2、18c、19c、21c、23ai
- **Linux 发行版**: CentOS、RHEL、OracleLinux、Rocky、Alma、Anolis、openEuler、Kylin、UOS、Ubuntu、Debian 等 20+ 种
- **自动化范围**: OS 配置 → 软件安装 → 建库 → 打补丁，全流程一条命令

## 2. 技术栈与架构

### 2.1 技术选型

| 层面 | 技术 | 说明 |
|------|------|------|
| **前端框架** | 原生 HTML/CSS/JS | 无构建工具依赖，纯静态站点 |
| **托管平台** | GitHub Pages | 推送 main 分支自动部署 |
| **域名解析** | CNAME | 指向 www.oracleshellinstall.com |
| **字体** | Noto Sans SC + JetBrains Mono + Orbitron | 中文正文 + 代码等宽 + 数字展示 |
| **图标** | 内联 SVG | 无外部图标库依赖 |
| **PWA** | Service Worker + manifest.json | 离线访问 + 可安装 |
| **搜索** | 客户端全文搜索 (search-index.json) | 无服务端依赖 |
| **分析** | 百度统计 + Google Analytics 4 | 双统计平台 |
| **SEO** | sitemap.xml + robots.txt + Schema.org | 搜索引擎优化 |
| **AI 索引** | llms.txt + llms-full.txt + ai-prompts.txt | LLM/AI 爬虫友好 |

### 2.2 架构特点

**纯静态无构建**: 所有文件直接编写，不使用 Webpack/Vite 等打包工具，Git 推送即部署。

**模块化 JS 设计**:
- `js/shared.js` — 核心共享模块 (i18n、主题、导航、页脚、代码块增强、滚动效果)
- `js/search.js` — 独立搜索模块 (懒加载索引、评分排序、键盘导航)
- `sw.js` — Service Worker (离线缓存策略)
- 各页面内联 `<script>` — 页面特定逻辑 (如 generator.html 的表单联动)

**双语言系统 (i18n)**:
- HTML 元素通过 `data-i18n="key"` 标记
- 共享翻译字典在 `shared.js` 中，页面专属字典在各页面内联脚本中
- 语言切换存储在 `localStorage`，页面加载时恢复
- 切换时派发 `langchange` CustomEvent 通知各模块

**主题系统**:
- CSS 变量定义在 `:root` (暗色) 和 `[data-theme="light"]` (亮色)
- 终端/代码块区域在亮色主题下仍保持暗色背景
- 主题存储在 `localStorage`

**缓存策略 (Service Worker)**:
- 静态资源 (CSS/JS/图片/字体): Cache-First — 优先从缓存读取
- HTML 页面: Network-First — 优先从网络获取，失败后回退缓存
- LRU 淘汰: 缓存上限 80 条，自动清理最旧条目
- 离线回退: 网络不可用时显示中英双语离线提示页

### 2.3 CSS 设计系统

```css
:root {
  /* 品牌色 */
  --red: #C74634;          /* Oracle 品牌红 */
  --red-glow: #e05a48;     /* 高亮红 */
  --red-dark: #a83a2b;     /* 深红 */

  /* 背景层级 */
  --bg: #0a0a0e;           /* 最深底色 */
  --bg2: #111118;          /* 次级背景 */
  --bg3: #181822;          /* 三级背景 */
  --card: #14141d;         /* 卡片背景 */

  /* 文字层级 */
  --text: #e8e6e3;         /* 主文字 */
  --text-dim: #9a9aaa;     /* 次要文字 */
  --text-muted: #5a5a6e;   /* 最弱文字 */

  /* 字体 */
  --font: 'Noto Sans SC', system-ui, sans-serif;
  --mono: 'JetBrains Mono', 'Fira Code', monospace;
  --display: 'Orbitron', sans-serif;

  /* 圆角 */
  --r: 10px; --r-sm: 6px; --r-lg: 14px;
}
```

### 2.4 响应式断点

| 断点 | 用途 |
|------|------|
| `≤ 1200px` | 大屏适配：缩小间距、隐藏次要元素 |
| `≤ 900px` | 平板适配：网格列数减少 |
| `≤ 768px` | 移动端：导航折叠为汉堡菜单，表格转卡片 |
| `≤ 480px` | 小屏手机：进一步缩小字体和间距 |

## 3. 目录结构

```
OracleShellInstall/
├── index.html                  # 首页 — 产品展示、功能介绍、快速开始
├── generator.html              # 命令生成器 — 可视化参数配置
├── docs.html                   # 使用文档 — 完整参数说明与安装指南
├── compat.html                 # 兼容矩阵 — OS×Oracle 支持表 + 182 篇教程入口
├── pricing.html                # 订阅定价 — 开源版 vs 付费版对比
├── download.html               # 下载中心 — 脚本下载、更新日志、FAQ
├── 404.html                    # 404 错误页
│
├── css/
│   └── style.css               # 全站主样式表 (521 行, CSS 变量 + 组件 + 响应式)
│
├── js/
│   ├── shared.js               # 核心共享模块 (758 行, i18n/导航/主题/代码块/滚动)
│   └── search.js               # 全站搜索模块 (183 行, 懒加载/评分/键盘导航)
│
├── sw.js                       # Service Worker (70 行, Cache-First/Network-First/LRU)
├── manifest.json               # PWA 清单 (应用名/图标/主题色)
│
├── guides/                     # 182 篇安装实战教程
│   ├── guide.css               # 教程页专用样式
│   ├── *.html                  # 教程 HTML (Twitter 风格 ID 命名)
│   └── img/                    # 教程截图 (40+ PNG/JPG/WEBP)
│
├── img/
│   ├── og-cover.jpg            # Open Graph 社交分享封面
│   └── wechat-qr.webp          # 微信二维码
│
├── favicon.svg                 # 矢量 Favicon
├── favicon-32x32.png           # 32px Favicon
├── apple-touch-icon.png        # iOS 桌面图标
├── icon-192x192.png            # PWA 图标 192px
├── icon-512x512.png            # PWA 图标 512px
│
├── search-index.json           # 全站搜索索引 (188 条目, 112KB)
├── sitemap.xml                 # 站点地图 (188 个 URL)
├── robots.txt                  # 爬虫规则 (允许 AI 爬虫)
├── CNAME                       # GitHub Pages 自定义域名
│
├── llms.txt                    # AI/LLM 索引摘要
├── llms-full.txt               # AI/LLM 详细技术文档
├── ai-prompts.txt              # AI 推广提示词
│
├── README.md                   # 项目说明 (中文)
├── README_EN.md                # 项目说明 (英文)
├── CONTRIBUTING.md             # 贡献指南
├── article.md                  # 推广文章素材
│
├── googlebfd3aa6e9c975889.html # Google Search Console 验证
└── b873527e8685653a23ed88324ba56f4d.txt  # 百度统计验证
```

### 3.1 文件统计

| 类型 | 数量 | 说明 |
|------|------|------|
| 主页面 HTML | 8 | 首页/文档/生成器/兼容/定价/下载/404/验证 |
| 教程 HTML | 182 | guides/ 目录下的安装实战 |
| CSS 文件 | 2 | 主样式 + 教程样式 |
| JS 文件 | 2 | 共享模块 + 搜索模块 |
| 图片资源 | 47+ | 封面/二维码/Favicon/教程截图 |
| 配置文件 | 4 | manifest/sitemap/robots/CNAME |
| AI 索引 | 3 | llms.txt/llms-full.txt/ai-prompts.txt |
| 文档 | 4 | README×2/CONTRIBUTING/article |

## 4. 开发历程

网站从零搭建到完整上线的全过程，按时间线记录每个阶段的工作内容。

### 4.1 第一阶段：基础搭建 (2026-03-17)

**初始提交 `7fc661d`**: 创建网站骨架
- 设计暗色主题 + Oracle 红 (#C74634) 品牌色方案
- 实现首页 (index.html) 基本布局：Hero 区域、功能介绍、部署模式
- 实现命令生成器 (generator.html)：三种模式切换、参数表单、命令预览
- 创建使用文档 (docs.html)：侧边栏导航 + 参数说明
- 编写 CSS 设计系统：CSS 变量、组件样式、响应式布局

**README 与多语言 `2c38ec8`**:
- 添加 README.md 项目说明
- 实现中英文双语切换 (i18n) 系统

**i18n 修复 `21d71ab` ~ `75ea55a`**:
- 修复页面跳转时语言重置为中文的 Bug
- 统一 macOS 风格终端标题栏样式
- 实现语言偏好在 localStorage 中持久化

**首次代码审查 `11698fc`**:
- 全面安全审查：修复 XSS 风险、输入验证
- SEO 优化：添加 meta 标签、Open Graph 社交分享
- 可访问性：语义化 HTML、aria 属性
- 性能：减少 DOM 操作、优化事件监听

**文档增强 `3ae12c0`**:
- 大幅扩展 docs.html 内容：环境准备、安装步骤、参数详解
- 添加提示框样式 (note/tip/warn/info)

**视觉优化 `1bb5171`**:
- 添加噪点纹理背景、渐变文字效果
- 发光效果、分隔线装饰
- 灵感来源: OpenClaw 设计风格

**第二轮审查 `64a3677`**:
- 可访问性、表单验证、SEO 健壮性进一步加固

### 4.2 第二阶段：功能扩展 (2026-03-18 上午)

**定价页面 `b0b7d5f` ~ `93469d0`**:
- 创建 pricing.html: 开源版 vs 付费版 (¥99) 对比
- 功能矩阵表格、FAQ 手风琴
- 添加微信二维码到 CTA 区域

**下载中心 `574d55a` ~ `194ed3a`**:
- 创建 download.html: 下载入口、使用须知、FAQ
- 4 步权限获取指南
- 更新日志时间线

**教程体系 `a9fb0ad` ~ `5eac4f7`**:
- 导入 182 篇安装实战教程 (来源: modb.pro)
- 下载所有文章图片到本地 (离线访问)
- 创建兼容矩阵页 (compat.html): OS × Oracle 版本支持表
- 教程分组筛选、搜索功能

**浮动咨询组件 `8f6ecaf`**:
- 全站添加微信悬浮咨询按钮

### 4.3 第三阶段：SEO 与分析 (2026-03-18 下午)

**搜索引擎验证**:
- `8a199ce` Google Search Console HTML 文件验证
- `9d4c432` Google Search Console meta 标签验证
- `b1ca71f` 百度站长工具 meta 标签验证
- `113ecf4` Bing Webmaster Tools 验证

**流量分析**:
- `f97cddf` 百度统计: 全站 189 个页面添加 hm.js 追踪代码
- `c7a0713` Google Analytics 4: 添加 gtag.js

**功能增强 `c7a0713`**:
- 全站搜索: search-index.json 索引 + Ctrl+K 快捷键
- PWA 支持: Service Worker + manifest.json
- Gitee Star 徽章: API 获取 + 计数展示

**全面优化 `9eb3d52`**:
- Favicon 体系: SVG + PNG + apple-touch-icon
- SEO: sitemap.xml (188 URL) + robots.txt
- 语言自动检测: 根据浏览器语言偏好设置

### 4.4 第四阶段：视觉与体验 (2026-03-18 晚)

**视觉增强 `d6ac0a0`**:
- SVG 内联图标替换外部图标
- Hero 区域光球动画 (hero-orb)
- 卡片渐变边框 + 悬停效果
- 按钮水波纹 (ripple) 动画
- 数字滚动计数器动画
- 代码块行号显示

**移动端优化 `c8ec468` ~ `31022bd`**:
- 移动端兼容表从横向滚动改为卡片布局
- Hero 区域文字居中
- 各页面手机端适配调优

**社区链接**:
- `99dd09d` Telegram 联系方式
- `d0bebc8` Discord 社区链接
- `60b8836` WhatsApp 联系方式

**Gitee API 迁移 `8def8cd` ~ `f4409b3`**:
- Star 徽章从 GitHub API 切换到 Gitee API
- 图片转 WebP 格式 + 懒加载
- 打印样式优化

### 4.5 第五阶段：AI 索引与 SEO 深度优化 (2026-03-19 上午)

**审查修复轮次 `98cbb92`**:
- CSS 变量清理
- PWA 图标补全
- i18n 同步校正

**AI/LLM 索引 `72e20de` ~ `7df9c61`**:
- 创建 llms.txt: AI 爬虫用的项目摘要
- 创建 llms-full.txt: 完整技术参考文档
- robots.txt 显式允许 GPTBot, ClaudeBot, PerplexityBot 等 AI 爬虫
- 添加 IndexNow 推送密钥

**README 重构 `fdcb5ef` ~ `9903bf1`**:
- 拆分中英文 README
- 添加功能/版本/系统徽章
- 针对 AI 索引优化结构化内容

**全站 i18n/SEO/UX 优化 `4e4f7a6`**:
- 社交证明区块 (用户评价、统计数字)
- hreflang 国际化标签
- Schema.org 结构化数据增强

### 4.6 第六阶段：代码审计与下载页重设计 (2026-03-19 下午)

**全面代码审计 `a96086b`** (28 项修复):

**安全修复**:
- XSS 漏洞: 代码块渲染从 innerHTML 改为 DOM API (textContent)
- 剪贴板 API: 添加 execCommand 回退方案

**性能优化**:
- Service Worker 重写: LRU 缓存淘汰 + 离线 HTML 回退页面
- 搜索索引加载: busy-wait 轮询改为 Promise 链式调用
- Hero 光球: `will-change: transform` 优化 GPU 合成

**可访问性**:
- 装饰性 SVG 添加 `aria-hidden="true"`
- 社交链接添加 `aria-label`
- 键盘导航 `:focus-visible` 样式

**CSS 清理**:
- 补全缺失的 `@keyframes fadeOut` (视图过渡动画依赖)
- 移除无用变量: `--bg4`, `--card-hover`, `--purple`, `--r-xl`, `--glow-md`
- 移除死代码: `@keyframes shimmer`

**下载页视觉重设计**:
- 更新日志: 从扁平时间线改为卡片式设计，渐变连接线，圆形节点
- 系统要求: 添加 emoji 图标卡片，悬停渐变色条

## 5. 页面详解

### 5.1 首页 (index.html)

**功能**: 产品着陆页，展示脚本核心卖点，引导用户使用。

**区块结构**:
1. **Hero 区域**: 标题 + 副标题 + 终端动画 (真实脚本输出，模拟 19c 单机 + 优化模式)
2. **信任栏**: 统计数字 (Stars/教程数/发行版数/Oracle 版本数)
3. **快速开始**: 3 步引导 (上传脚本 → 配置参数 → 执行命令)
4. **核心功能**: 8 宫格功能展示 (自动化安装/多版本/多系统/RAC/ASM/补丁/校验/日志)
5. **部署模式**: 3 张卡片 (单机/ASM/RAC) 对比
6. **兼容矩阵**: Oracle 版本 × Linux 发行版速览表
7. **社交证明**: 用户评价 + Gitee Stars 实时计数
8. **CTA**: 行动召唤按钮 → 命令生成器

**特殊实现**:
- Gitee API 星标获取: AbortController 5 秒超时 + sessionStorage 缓存
- 终端动画: 使用 `execute_and_log` 格式逐行显示真实脚本输出 (系统检测→内核参数→用户创建→软件安装→建库→优化)
- IntersectionObserver 触发数字滚动动画

### 5.2 命令生成器 (generator.html)

**功能**: 核心工具页，用户通过可视化表单配置参数，实时生成安装命令。

**区块结构**:
1. **模式选择**: 3 张卡片切换 (单机/ASM/RAC)
2. **动态表单**: 根据模式显示/隐藏参数组
   - 通用参数 (网卡/主机名/密码/字符集等)
   - 模式专属参数 (ASM 磁盘/RAC 集群配置)
3. **命令预览**: 终端风格代码块，实时拼接命令
4. **操作按钮**: 复制到剪贴板 + 重置

**参数联动逻辑**:
- 切换模式时自动显示/隐藏对应表单组
- 只输出与默认值不同的参数
- 必填项验证 + 红色错误提示
- 命令格式: `sh OracleShellInstall.sh -install_mode [single|standalone|rac] [参数...]`

### 5.3 使用文档 (docs.html)

**功能**: 完整的脚本使用文档，含参数详解和安装流程。

**区块结构**:
1. **侧边栏**: 固定目录导航 (滚动高亮当前章节)
2. **正文区域**:
   - 快速开始指南
   - 环境准备清单
   - 三种模式安装步骤
   - 完整参数列表 (表格)
   - 常见问题解答

**特殊实现**:
- 中英文双内容区 (`.doc-zh` / `.doc-en`，语言切换时 display toggle)
- 滚动侧边栏高亮: IntersectionObserver 监听各 section
- 彩色提示框: note (红) / tip (绿) / warn (橙) / info (蓝)
- 代码块自动添加终端 UI + 复制按钮

### 5.4 兼容矩阵 (compat.html)

**功能**: 操作系统与 Oracle 版本的兼容性查询，链接到实战教程。

**区块结构**:
1. **统计栏**: 支持的 OS 数、Oracle 版本数、教程数
2. **兼容表格**: OS × Oracle 版本矩阵 (勾/叉标记)
3. **教程列表**: 按 OS 分组折叠，可搜索筛选
4. **标签系统**: RAC/ASM/单机 标签区分教程类型

**特殊实现**:
- 移动端表格自动转为卡片式布局
- 搜索输入框实时过滤教程
- 折叠组带计数显示

### 5.5 订阅定价 (pricing.html)

**功能**: 开源版与付费版功能对比，引导订阅。

**区块结构**:
1. **定价卡片**: 开源版 (免费) vs 专业版 (¥99)
2. **功能对比表**: 逐项勾叉对比
3. **FAQ**: 手风琴展开
4. **CTA**: 联系方式 (微信/Telegram/Discord/WhatsApp)

### 5.6 下载中心 (download.html)

**功能**: 付费用户下载脚本，查看更新日志与系统要求。

**区块结构**:
1. **访问权限**: 4 步获取下载权限
2. **下载按钮**: GitHub/Gitee 双链接
3. **系统要求**: 6 卡片 (OS/内存/磁盘/权限/用户/网络)，emoji 图标
4. **使用须知**: 注意事项卡片
5. **更新日志**: 卡片式时间线 (渐变连接线 + 版本节点)
6. **FAQ**: 手风琴

### 5.7 教程页 (guides/*.html)

**功能**: 182 篇 Oracle 安装实战教程，每篇一个 HTML 文件。

**结构**:
- 导航栏 + 返回链接
- CTA 订阅推广条
- Markdown 正文 (代码块/截图/表格)
- 共享页脚

**特殊实现**:
- 相对路径引用资源 (`../css/style.css`)
- Schema.org TechArticle 结构化数据
- 长代码块折叠 (超过 15 行时)
- 图片带圆角边框

### 5.8 404 错误页 (404.html)

**功能**: 自定义 404 页面。

- 大号 "404" 浮动动画
- 中英文错误提示
- 返回首页按钮
- `<meta name="robots" content="noindex">` 防止被索引

## 6. 核心模块技术细节

### 6.1 国际化系统 (i18n)

**原理**: 所有需要翻译的 HTML 元素标注 `data-i18n` 属性，JS 运行时根据当前语言替换内容。

**翻译字典结构** (shared.js):
```javascript
const i18n = {
  zh: {
    navHome: '首页',
    navDoc: '文档',
    navGen: '生成器',
    // ... 376+ 个翻译键
  },
  en: {
    navHome: 'Home',
    navDoc: 'Docs',
    navGen: 'Generator',
    // ...
  }
};
```

**页面专属翻译** (各页面内联):
```javascript
const pageI18n = {
  zh: { heroTitle: 'Oracle 数据库一键安装', ... },
  en: { heroTitle: 'One-Click Oracle Installation', ... }
};
Object.keys(pageI18n).forEach(lang => {
  Object.assign(i18n[lang], pageI18n[lang]);
});
```

**语言切换流程**:
1. 用户点击语言按钮 → `setLang('en'|'zh')`
2. 遍历所有 `[data-i18n]` 元素
3. 首次遇到时，将原始中文 HTML 保存到 `data-i18n-zh` 属性 (仅一次)
4. 查找对应翻译: 优先用 `i18n[lang][key]`，若不存在则回退 `data-i18n-zh` (即 HTML 默认中文)
5. 保存到 `localStorage.setItem('lang', lang)`
6. 派发 `CustomEvent('langchange')` 通知搜索等模块更新

**重要**: HTML 默认内容即为中文翻译源。`pageI18n.zh` 中的值必须与 HTML 默认 innerHTML 完全一致 (包括空格/换行)，否则 EN→ZH 往返切换时会出现文本差异。

**语言检测优先级**:
1. localStorage 存储的用户选择
2. 浏览器 `navigator.language`
3. 默认: `zh`

### 6.2 全站搜索模块 (search.js)

**索引文件** (search-index.json):
```json
[
  {
    "url": "index.html",
    "title": "OracleShellInstall - 首页",
    "desc": "Oracle 数据库一键自动化安装脚本...",
    "text": "完整页面文本内容..."
  },
  // ... 188 条目
]
```

**搜索评分算法**:
```
标题匹配: +10 分/词
描述匹配: +5 分/词
正文匹配: +1 分/词
```

**关键设计**:
- 懒加载: 首次打开搜索框才 fetch 索引
- 竞态保护: `indexPromise` 变量防止重复请求
- 防抖: 200ms debounce 减少搜索频率
- 键盘导航: ↑↓ 选择结果, Enter 打开, Escape 关闭
- XSS 防护: 所有输出经过 HTML 实体转义
- 路径适配: 主页面与 guides/ 子目录自动处理相对路径

### 6.3 Service Worker 缓存策略 (sw.js)

**缓存版本**: `os-v9` — 每次大版本更新递增版本号

**策略分类**:

```
GET 请求
├── 静态资源 (.css .js .json .woff2 .png .jpg .svg .ico 等)
│   └── Cache-First: 缓存有则用缓存，无则网络获取并存入缓存
├── HTML 页面 (Accept: text/html)
│   └── Network-First: 优先网络，失败则回退缓存，都无则离线页
└── 其他请求
    └── 不处理 (浏览器默认行为)
```

**LRU 淘汰**:
```javascript
async function trimCache(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > max) {
    // 删除最早的条目 (keys 按插入顺序排列)
    await Promise.all(keys.slice(0, keys.length - max).map(k => cache.delete(k)));
  }
}
```

**离线回退页**: 内联 HTML，中英双语提示 "当前离线 / Offline"，带重新加载按钮。

### 6.4 代码块增强 (shared.js)

**自动处理所有 `<pre><code>` 元素**:

1. **终端 UI**: 添加 macOS 风格标题栏 (三色圆点 + 文件名)
2. **复制按钮**: 点击复制内容到剪贴板，带成功反馈动画
3. **行号**: 长代码块自动添加行号
4. **折叠**: 超过 15 行的代码块默认折叠，点击展开
5. **安全渲染**: 使用 `textContent` + DOM API 替代 `innerHTML`

**剪贴板兼容性**:
```javascript
navigator.clipboard.writeText(text)
  .then(() => { /* 成功提示 */ })
  .catch(() => {
    // 回退方案: 创建临时 textarea
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  });
```

### 6.5 导航与页脚生成 (shared.js)

**动态生成**: 导航栏和页脚在 DOMContentLoaded 时由 JS 注入 HTML。

**导航功能**:
- 固定顶部 + 毛玻璃效果 (`backdrop-filter: blur(12px)`)
- 滚动超过阈值添加阴影
- 语言切换按钮 + 主题切换按钮 + 搜索按钮
- 移动端汉堡菜单
- 当前页面高亮

**页脚内容**:
- 4 列网格: 产品/资源/社区/联系
- 社交图标: GitHub, Gitee, Telegram, Discord, WhatsApp
- 版权信息

### 6.6 滚动效果与动画

**进入动画**: `IntersectionObserver` 监听 `.reveal` 元素，进入视口时添加 `.visible` 触发 CSS 过渡。

**数字计数器**: 统计数字从 0 滚动到目标值:
```javascript
function animateCounter(el, target) {
  const duration = 1500;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * progress);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
```

**进度条**: 页面顶部滚动进度条，`requestAnimationFrame` 节流。

**回到顶部**: 带进度环的浮动按钮，显示当前滚动百分比。

### 6.7 响应式表格 (shared.js)

移动端 (≤768px) 自动将表格转为卡片布局:
```javascript
// 为每个 td 添加 data-label 属性 (取自对应 th)
table.querySelectorAll('tr').forEach(tr => {
  tr.querySelectorAll('td').forEach((td, i) => {
    td.setAttribute('data-label', headers[i]);
  });
});
```

CSS 利用 `data-label` 在移动端以伪元素显示列标题。

## 7. 搭建部署指南

本节指导如何从零搭建该网站，或在本地开发预览。

### 7.1 前置条件

| 工具 | 用途 | 安装 |
|------|------|------|
| Git | 版本控制 | https://git-scm.com |
| GitHub 账号 | 代码托管 + Pages 部署 | https://github.com |
| 文本编辑器 | 编辑代码 (推荐 VS Code) | https://code.visualstudio.com |
| 浏览器 | 本地预览 (推荐 Chrome) | — |
| Python 3 (可选) | 本地 HTTP 服务器 | 系统自带或安装 |

### 7.2 克隆仓库

```bash
git clone https://github.com/pc-study/OracleShellInstall.git
cd OracleShellInstall
```

### 7.3 本地预览

由于网站使用了 fetch API 加载搜索索引和 Service Worker，不能直接用浏览器打开 HTML 文件，需要启动本地 HTTP 服务器:

**方法一: Python**
```bash
# Python 3
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

**方法二: Node.js**
```bash
npx serve -p 8080
```

**方法三: VS Code**
安装 "Live Server" 扩展，右键 `index.html` → "Open with Live Server"

然后访问 `http://localhost:8080`

### 7.4 GitHub Pages 部署

**步骤 1: 创建 GitHub 仓库**
1. 在 GitHub 创建仓库 (如 `OracleShellInstall`)
2. 将代码推送到 `main` 分支

```bash
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

**步骤 2: 启用 GitHub Pages**
1. 进入仓库 → Settings → Pages
2. Source 选择: Deploy from a branch
3. Branch 选择: `main` / `/ (root)`
4. 保存

**步骤 3: 自定义域名 (可选)**
1. 在仓库根目录创建 `CNAME` 文件，内容为你的域名:
```
www.yourdomain.com
```
2. 在域名 DNS 提供商处添加记录:
   - 类型: `CNAME`
   - 主机: `www`
   - 值: `<你的用户名>.github.io`
3. 或使用 A 记录指向 GitHub Pages IP:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
4. 在 GitHub Pages 设置中勾选 "Enforce HTTPS"

**步骤 4: 验证部署**
推送后约 1-3 分钟，访问 `https://<用户名>.github.io/<仓库名>` 或自定义域名。

### 7.5 搜索引擎注册

**Google Search Console**:
1. 访问 https://search.google.com/search-console
2. 添加资源 → URL 前缀 → 输入网站地址
3. 验证方式: HTML 文件上传 (已包含 `googlebfd3aa6e9c975889.html`)
4. 提交 sitemap: `https://www.yourdomain.com/sitemap.xml`

**百度站长工具**:
1. 访问 https://ziyuan.baidu.com
2. 添加站点 → 验证 (HTML 标签方式，已在 index.html 中)
3. 提交 sitemap

**Bing Webmaster**:
1. 访问 https://www.bing.com/webmasters
2. 从 Google Search Console 导入，或手动添加
3. 验证 meta 标签 (已在 index.html 中)

### 7.6 流量分析配置

**百度统计**:
1. 注册 https://tongji.baidu.com
2. 获取统计代码 (hm.js ID)
3. 代码已嵌入所有页面的 `<body>` 底部

**Google Analytics 4**:
1. 注册 https://analytics.google.com
2. 创建 GA4 媒体资源，获取 Measurement ID (G-XXXXXXX)
3. 代码已嵌入所有页面的 `<head>` 区域

如需更换统计 ID，全局搜索替换即可:
```bash
# 替换百度统计 ID
grep -rl "hm.js?旧ID" . | xargs sed -i 's/旧ID/新ID/g'

# 替换 GA4 ID
grep -rl "G-旧ID" . | xargs sed -i 's/G-旧ID/G-新ID/g'
```

## 8. 日常维护指南

### 8.1 添加新教程

1. 在 `guides/` 目录创建新 HTML 文件 (建议用时间戳 ID 命名):
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>教程标题 - OracleShellInstall</title>
  <link rel="stylesheet" href="../css/style.css?v=20260320b">
  <link rel="stylesheet" href="guide.css?v=20260320b">
  <!-- 其他 meta 标签参考现有教程 -->
</head>
<body>
  <!-- 使用现有教程作为模板 -->
  <script src="../js/shared.js?v=20260320b"></script>
</body>
</html>
```

2. 将教程截图放入 `guides/img/` 目录

3. 更新搜索索引 — 在 `search-index.json` 中添加条目:
```json
{
  "url": "guides/新文件名.html",
  "title": "教程标题",
  "desc": "简短描述",
  "text": "完整文本内容用于搜索"
}
```

4. 更新站点地图 — 在 `sitemap.xml` 中添加:
```xml
<url>
  <loc>https://www.oracleshellinstall.com/guides/新文件名.html</loc>
  <lastmod>2026-03-19</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.5</priority>
</url>
```

5. 在 `compat.html` 兼容矩阵中添加教程链接

6. 提交推送:
```bash
git add guides/新文件名.html search-index.json sitemap.xml compat.html
git commit -m "feat: add guide - 教程标题"
git push origin main
```

### 8.2 更新脚本版本

当 OracleShellInstall 脚本发布新版本时:

1. **更新版本号**: 全局搜索 `v5.0.0` 并替换为新版本号
```bash
grep -rl "v5.0.0" --include="*.html" --include="*.md" --include="*.txt" . | head -20
```

2. **更新下载页更新日志**: 编辑 `download.html`，在更新日志区域顶部添加新版本条目:
```html
<div class="dl-cl-item">
  <div class="dl-cl-header">
    <span class="dl-cl-ver">v5.1.0</span>
    <span class="dl-cl-tag">Latest</span>
    <span class="dl-cl-date">2026-04-01</span>
  </div>
  <ul class="dl-cl-list">
    <li>新增 XX 功能</li>
    <li>修复 YY 问题</li>
  </ul>
</div>
```
注意: 将旧版本的 `<span class="dl-cl-tag">Latest</span>` 移除。

3. **更新 llms.txt 和 llms-full.txt**: 更新版本号和新功能描述

4. **更新 README.md**: 更新版本徽章和功能列表

### 8.3 缓存更新 (Cache Busting)

修改 CSS/JS 文件后，需要更新缓存标识让用户获取最新版本:

1. **更新查询参数**: 全局替换版本号
```bash
# 将 v=20260320b 替换为新版本号 v=20260321
grep -rl "v=20260320b" --include="*.html" . | xargs sed -i 's/v=20260320b/v=20260321/g'
```

2. **更新 Service Worker 缓存名**:
编辑 `sw.js` 第 1 行:
```javascript
const CACHE_NAME = 'os-v10';  // 递增版本号
```
用户下次访问时，新 SW 会激活并清理旧缓存。

### 8.4 添加/修改翻译

1. 编辑 `js/shared.js` 中的 `i18n` 对象，在 `zh` 和 `en` 中同时添加新键值:
```javascript
zh: {
  newKey: '中文翻译',
  // ...
},
en: {
  newKey: 'English translation',
  // ...
}
```

2. 在 HTML 中使用:
```html
<span data-i18n="newKey">中文翻译</span>
```

3. 如果是页面专属翻译，在该页面的内联 `<script>` 中定义 `pageI18n`。

### 8.5 修改主题/颜色

所有颜色定义在 `css/style.css` 的 `:root` 中:
- 修改品牌色: 改 `--red`, `--red-glow`, `--red-dark`
- 修改背景: 改 `--bg`, `--bg2`, `--bg3`, `--card`
- 修改文字: 改 `--text`, `--text-dim`, `--text-muted`

亮色主题在 `[data-theme="light"]` 选择器中单独定义。

### 8.6 SEO 维护

**sitemap.xml**: 每次添加/删除页面后更新，修改 `<lastmod>` 日期。

**robots.txt**: 默认配置已允许所有搜索引擎和 AI 爬虫。如需屏蔽:
```
User-agent: BadBot
Disallow: /
```

**结构化数据**: 教程页使用 Schema.org `TechArticle`，首页使用 `WebSite` + `SoftwareApplication`。如需验证:
- https://search.google.com/test/rich-results
- https://validator.schema.org

### 8.7 监控与排错

**GitHub Pages 部署状态**:
```bash
# 查看最近部署
gh api repos/pc-study/OracleShellInstall/pages/builds --jq '.[0]'
```

**Service Worker 调试**:
- Chrome DevTools → Application → Service Workers
- 查看缓存内容: Application → Cache Storage → os-v9
- 强制更新: 勾选 "Update on reload"

**搜索功能调试**:
- 浏览器控制台检查 `search-index.json` 是否加载成功
- 确认索引条目数: 在控制台执行 `fetch('search-index.json').then(r=>r.json()).then(d=>console.log(d.length))`

**i18n 问题排查**:
- 检查元素是否有 `data-i18n` 属性
- 检查对应键在 `i18n.zh` 和 `i18n.en` 中是否都存在
- 如果是 HTML 默认即中文的元素，确保 `pageI18n.zh` 中的值与 HTML innerHTML 完全一致
- 控制台执行 `localStorage.getItem('lang')` 查看当前语言
- 测试 EN→ZH 往返: 切换到英文再切回中文，确认内容恢复无差异

## 9. 常见问题

### Q: 修改代码后网站没有更新？

**A**: 可能是浏览器缓存或 Service Worker 缓存导致。解决方法:
1. 硬刷新: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)
2. 清除 Service Worker: DevTools → Application → Service Workers → Unregister
3. 更新缓存版本: 修改所有文件的 `?v=` 参数 + `sw.js` 中的 `CACHE_NAME`

### Q: GitHub Pages 部署失败？

**A**: 检查:
1. 仓库 Settings → Pages 是否已启用
2. 分支是否为 `main`，部署目录是否为 `/ (root)`
3. 查看 Actions 标签页的部署日志
4. CNAME 文件内容是否正确

### Q: 搜索功能无结果？

**A**: 确认:
1. `search-index.json` 文件存在且格式正确
2. 新页面的条目已添加到索引
3. 浏览器控制台无 fetch 错误

### Q: 教程图片加载失败？

**A**: 检查:
1. 图片文件是否在 `guides/img/` 目录中
2. HTML 中的图片路径是否正确 (相对路径)
3. 文件名大小写是否匹配 (GitHub Pages 区分大小写)

### Q: 如何批量修改所有页面？

**A**: 使用 `sed` 或编辑器的全局替换:
```bash
# 示例: 替换所有页面中的联系邮箱
grep -rl "旧邮箱" --include="*.html" . | xargs sed -i 's/旧邮箱/新邮箱/g'
```

### Q: 如何添加新的页面？

**A**:
1. 复制现有页面 (如 `pricing.html`) 作为模板
2. 修改 `<title>`、`<meta>` 标签、页面内容
3. 在 `js/shared.js` 的导航生成代码中添加菜单项
4. 添加对应的 i18n 翻译键
5. 更新 `sitemap.xml` 和 `search-index.json`
6. 更新缓存版本号

### Q: 如何迁移到其他托管平台？

**A**: 本网站是纯静态站点，可部署到任何支持静态文件的平台:
- **Vercel**: `vercel deploy`
- **Netlify**: 拖拽文件夹上传或 Git 集成
- **Cloudflare Pages**: Git 集成自动部署
- **自有服务器**: Nginx / Apache 配置指向目录即可

迁移时注意:
1. 更新 `CNAME` 文件或删除
2. 更新 DNS 解析指向新平台
3. 配置 HTTPS 证书
4. 配置自定义 404 页面路由

---

## 附录: Git 提交历史

| 提交 | 日期 | 说明 |
|------|------|------|
| `7fc661d` | 2026-03-17 | 初始提交: 网站骨架 (首页/文档/生成器) |
| `2c38ec8` | 2026-03-17 | 添加 README + 双语切换 |
| `21d71ab` ~ `75ea55a` | 2026-03-17 | i18n 修复、终端样式统一 |
| `11698fc` | 2026-03-17 | 首次代码审查: 安全/SEO/可访问性 |
| `3ae12c0` | 2026-03-17 | 文档页内容大幅扩展 |
| `1bb5171` | 2026-03-17 | 视觉优化: 噪点纹理、渐变效果 |
| `64a3677` | 2026-03-17 | 第二轮审查修复 |
| `b0b7d5f` | 2026-03-18 | 新增定价页 |
| `574d55a` | 2026-03-18 | 新增下载中心页 |
| `a9fb0ad` | 2026-03-18 | 导入 182 篇实战教程 |
| `5eac4f7` | 2026-03-18 | 新增兼容矩阵页 |
| `f97cddf` | 2026-03-18 | 全站百度统计 |
| `c7a0713` | 2026-03-18 | GA4 + 全站搜索 + PWA |
| `9eb3d52` | 2026-03-18 | Favicon + SEO + sitemap |
| `d6ac0a0` | 2026-03-18 | 视觉大升级: SVG/动画/计数器 |
| `99dd09d` ~ `60b8836` | 2026-03-18 | 社区联系方式 (TG/DC/WA) |
| `72e20de` | 2026-03-19 | AI/LLM 索引文件 |
| `4e4f7a6` | 2026-03-19 | 全站 i18n/SEO/UX 优化 |
| `a96086b` | 2026-03-19 | 代码审计 (28 项) + 下载页重设计 |
| `18282f6` ~ `40dcb07` | 2026-03-20 | 首页重设计: 终端动画、布局简化 |
| `a05784c` | 2026-03-20 | 终端动画修正为真实脚本输出 |
| `57e2f99` | 2026-03-20 | 全面代码审计修复 (P0/P1/P2, 12 项) |
| `af767f1` | 2026-03-20 | i18n 语言切换往返修复 |

### 4.7 第七阶段：首页重设计与终端动画 (2026-03-20 上午)

**首页重设计 `18282f6` ~ `40dcb07`**:
- 重新设计首页布局: 移除旧的功能区块，简化为更聚焦的结构
- 添加真实终端动画: 模拟 OracleShellInstall 脚本实际执行输出
- 新增命令预览区块 (后移除以精简页面)

**终端动画修正 `a05784c`**:
- 将终端动画内容更新为脚本真实输出 (单机 19c + `-opd Y` 优化模式)
- 使用 `execute_and_log` 函数调用格式，匹配实际脚本执行流程
- 动画包含: 系统检测 → 内核参数 → 用户创建 → 软件安装 → 建库 → 优化

**全面代码审计 `57e2f99`** (12 项 P0/P1/P2 修复):

**P0 安全与功能**:
- 移除 36 个废弃 i18n 键 (首页重设计后遗留的死翻译)
- 教程页内联样式提取到 `guide.css` (CTA 组件)

**P1 性能与可访问性**:
- 28 张大 PNG 教程截图转换为 WebP 格式
- 添加跳过导航链接 (skip-nav) 便于屏幕阅读器用户
- 导航按钮添加 aria-label (返回顶部/联系咨询/关闭/切换主题/切换语言/搜索)
- 生成器页面 73 行内联样式迁移到 `style.css`

**P2 体验增强**:
- 搜索结果添加数量指示器 ("显示 X 条结果" / "显示前 20 条，共 X 条")
- 联系按钮 CSS 类名重构: 统一为 `.social-contact-btn` + `.tg/.dc/.wa` 修饰符

### 4.8 第八阶段：i18n 语言切换修复 (2026-03-20 下午)

**i18n 往返切换修复 `af767f1`**:

修复中英文切换后，部分元素无法正确恢复中文的 Bug。

**问题根因**: 204 个翻译键仅存在于 `i18n.en` 中，中文依赖 HTML 默认内容。切换到英文后，原始中文 HTML 被覆盖，再切回中文时因 `i18n.zh[key]` 不存在导致无法恢复。

**核心修复** (`js/shared.js` — `setLang` 函数):
```javascript
document.querySelectorAll('[data-i18n]').forEach(el => {
  if (!el.dataset.i18nZh) el.dataset.i18nZh = el.innerHTML;  // 首次保存原始中文
  const val = (i18n[lang] || i18n.zh)[el.dataset.i18n];
  el.innerHTML = val || el.dataset.i18nZh;  // 无翻译时回退原始中文
});
```

**配套修复**:
- `pricing.html`: `fa2` HTML 默认内容与 `pageI18n.zh` 对齐 (补充 TG/Discord/WhatsApp 联系方式)
- `compat.html`: `mxNote` Unicode 字符修正 (`&#9432;` → `&#8505;`, `&#10005;` → `&#10007;`)
- `download.html`: 6 个 FAQ HTML 默认内容从多行格式改为单行，与 `pageI18n.zh` 完全一致
- 全站 190 个 HTML 文件缓存版本号统一升级到 `v=20260320b`

**验证方法**: Playwright 自动化测试，对 6 个主页面执行 EN→ZH 往返切换，比较所有 `[data-i18n]` 元素的 innerHTML，确认零差异。

---

*文档版本: 2026-03-20 | 维护者: Lucifer (pc1107750981@163.com)*
