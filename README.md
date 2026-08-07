<div align="center">

# Photoo Prompt Gallery

**探索精选 AI 生成提示词**

一个优雅的 AI 图像生成提示词画廊，展示高质量的提示词作品

[在线预览](https://xigua222.github.io/prompt-gallery/)

</div>

---

## ✨ 功能特点

### 🎨 精美展示
- **瀑布流布局** - 响应式设计，桌面端五列、平板三列、手机单列
- **流畅动画** - 丝滑的过渡效果和交互体验
- **高清图片** - 每张作品都经过 WebP 优化，懒加载 + 失败兜底

### 🔍 强大搜索
- 按标题、提示词、作者、标签搜索
- 按分类筛选（人像写真、场景插画、平面设计等）
- 按生成模型筛选（豆包/即梦、GPT-Image、千问、元宝等）
- 搜索使用 React 19 `useDeferredValue`，输入即时响应

### 💡 提示词复制
- 一键复制完整提示词
- 查看标签、摘要和生成工具信息
- 支持中英文界面切换（含投稿弹窗）

### ❤️ 收藏功能
- 本地收藏喜欢的作品（localStorage）
- 快速访问收藏夹

### 🛠 投稿自动化
- GitHub Issue 投稿 → 自动压缩图片 → 自动创建 PR → 合并后自动部署
- 完整流水线见 `.github/workflows/`

### 🧭 AIGC 工具导航
- 独立页面（`/tools`），收录主流 AI 图像生成工具与模型
- 场景 × 模型双维度筛选，快速找到适合的工具
- 工具数据维护在 `src/tools.ts`，可直接增删修改

---

## 📂 作品分类

| 分类 | 说明 |
|------|------|
| 人像写真 | 光感写真、社交人像、情绪人像等 |
| 场景插画 | 叙事场景、影视叙事、绘本场景 |
| 头像插画 | 头像转绘、风格化头像 |
| 平面设计 | 图形版式、海报设计 |
| 产品陈列 | 产品展示、物件陈列 |
| 童趣角色 | 可爱角色、童趣风格 |
| 出版漫画 | 连环出版、漫画风格 |
| 空间建筑 | 空间构筑、建筑设计 |
| 风格实验 | 抽象实验、风格探索 |
| 东方美学 | 东方意象、国风风格 |
| 手绘质感 | 手作质感、艺术风格 |

---

## 🛠 支持的生成模型

- **豆包 / 即梦** - 字节跳动 AI 图像生成
- **GPT-Image** - OpenAI 图像生成
- **千问** - 阿里云通义千问
- **元宝** - 腾讯混元
- **Nano Banana 2** - 其他模型

---

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查 + ESLint
npm run lint

# 构建生产版本
npm run build
```

## 📊 数据管理

作品数据由 `projectnext/prompts.json` 统一管理，通过生成脚本输出为前端数据：

```bash
# 修改 prompts.json 后重新生成 src/data.ts
npm run generate:data
```

提交新的作品：在 GitHub 上通过 [Issue 投稿模板](https://github.com/xigua222/prompt-gallery/issues/new?template=submit.yml) 提交，或直接修改 `projectnext/prompts.json` 并放入图片后提交 PR。

---

## 📦 技术栈

- **React 19** - 前端框架
- **Vite 6** - 构建工具（按依赖分包，缓存友好）
- **Tailwind CSS 4** - 样式框架
- **Motion** - 动画库
- **Lucide Icons** - 图标库
- **TypeScript** - 严格模式类型检查
- **ESLint** - 代码规范
- **GitHub Pages** - 静态部署

---

## 📁 项目结构

```
├── .github/
│   ├── ISSUE_TEMPLATE/     # 投稿 Issue 模板
│   ├── scripts/            # 投稿处理脚本（图片压缩、数据更新）
│   └── workflows/          # CI/CD：投稿建 PR、自动部署
├── projectnext/
│   └── prompts.json        # 作品数据源（含草稿）
├── public/
│   └── images/             # WebP 图片资源
├── scripts/
│   └── generate-data.mjs   # 数据生成脚本（prompts.json → src/data.ts）
└── src/
    ├── components/         # Header / SearchBar / FilterBar / ArtworkGrid / ToolsPage / Modal
    ├── tools.ts            # AIGC 工具导航数据（可编辑增删）
    ├── data.ts             # 生成的作品数据
    ├── locales.ts          # 中英文文案
    └── utils.ts            # 图片路径工具
```

---

<div align="center">

Made with ❤️ by [超级西瓜](https://github.com/xigua222)

</div>
