# OracleShellInstall 网站 — 本地开发指南

快速搭建本地开发环境，预览和修改 OracleShellInstall 官方网站。

## 前置条件

| 工具 | 用途 | 必需 |
|------|------|------|
| Git | 版本控制 | 是 |
| Python 3 或 Node.js | 本地 HTTP 服务器 | 二选一 |
| 现代浏览器 | 预览（推荐 Chrome） | 是 |

## 克隆与启动

```bash
git clone https://github.com/pc-study/OracleShellInstall.git
cd OracleShellInstall

# 方法一：Python
python3 -m http.server 8080

# 方法二：Node.js
npx serve -p 8080
```

访问 `http://localhost:8080` 即可预览。

> 不能直接用浏览器打开 HTML 文件 — 搜索索引和 Service Worker 依赖 HTTP 协议。

## 项目结构概览

```
OracleShellInstall/
├── index.html              # 首页
├── generator.html          # 命令生成器
├── docs.html               # 使用文档
├── compat.html             # 安装合集（兼容矩阵 + 教程索引）
├── pricing.html            # 脚本订阅
├── download.html           # 下载中心
├── 404.html                # 404 错误页
├── css/style.css           # 全站样式（CSS 变量 + 组件 + 响应式）
├── js/shared.js            # 核心共享模块（导航/页脚/i18n/主题/滚动）
├── js/search.js            # 全站搜索（懒加载索引 + 键盘导航）
├── sw.js                   # Service Worker（缓存策略）
├── guides/                 # 182 篇安装实战教程
│   ├── guide.css           # 教程页专用样式
│   └── *.html              # 独立教程页
├── search-index.json       # 搜索索引（188 条目）
├── sitemap.xml             # 站点地图
└── manifest.json           # PWA 清单
```

## 开发约定

### 缓存版本管理

修改 CSS/JS 后必须同步更新缓存标识：

1. **HTML 文件的查询参数** — 全局替换 `?v=` 后的版本号：
   ```bash
   grep -rl "v=20260321l" --include="*.html" . | xargs sed -i 's/v=20260321l/v=新版本号/g'
   ```

2. **Service Worker 缓存名** — 编辑 `sw.js` 第 1 行：
   ```javascript
   const CACHE_NAME = 'os-v34';  // 递增版本号
   ```

### 国际化 (i18n)

- 所有可翻译元素标注 `data-i18n="keyName"` 属性
- 共享翻译在 `js/shared.js` 的 `i18n` 对象中
- 页面专属翻译在各页面内联 `<script>` 的 `pageI18n` 中
- HTML 默认内容即中文源，`pageI18n.zh` 的值必须与 HTML 默认 innerHTML **完全一致**

### 主题系统

- 暗色（默认）：CSS 变量定义在 `:root`
- 亮色：覆盖定义在 `[data-theme="light"]`
- 主题在 `<head>` 内联脚本中即时初始化，避免闪烁

### Git 提交规范

| 前缀 | 用途 |
|------|------|
| `feat:` | 新页面、新功能 |
| `enhance:` | 现有功能优化、视觉调整 |
| `fix:` | Bug 修复 |
| `cleanup:` | 代码清理、缓存版本更新 |
| `docs:` | 文档更新 |

## 常用维护操作

### 添加新教程

1. 复制现有 `guides/*.html` 作为模板
2. 修改标题、meta、正文内容
3. 截图放入 `guides/img/`
4. 更新 `compat.html` 教程列表、`search-index.json`、`sitemap.xml`

### 添加新页面

1. 复制现有页面作为模板
2. 在 `js/shared.js` 导航生成代码中添加菜单项
3. 添加 i18n 翻译键
4. 更新 `sitemap.xml` 和 `search-index.json`
5. 更新缓存版本号

### 调试 Service Worker

Chrome DevTools → Application → Service Workers：
- 勾选 "Update on reload" 可在每次刷新时更新 SW
- Cache Storage → 查看/清除缓存内容
- 强制清除：Unregister SW → 硬刷新 (Ctrl+Shift+R)

## 部署

推送到 `main` 分支即自动部署到 GitHub Pages：

```bash
git push origin main
```

约 1-3 分钟后生效。如需自定义域名，编辑根目录 `CNAME` 文件并配置 DNS。

详细部署与搜索引擎配置请参阅 [DEVELOPMENT.md](../DEVELOPMENT.md) 第 7 节。
