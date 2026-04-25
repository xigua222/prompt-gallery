<div align="center">

# Photoo Prompt Gallery

**探索精选 AI 生成提示词**

一个优雅的 AI 图像生成提示词画廊，展示高质量的提示词作品

[在线预览](https://xi-lab.github.io/aura-gallery/) | [投稿](https://github.com/xi-lab/aura-gallery/issues/new?labels=submission,pending&template=submit.md&title=[投稿]+)

</div>

---

## 功能特点

- **瀑布流布局** - 响应式设计，适配各种屏幕尺寸
- **分类筛选** - 按分类和生成模型筛选作品
- **搜索功能** - 按标题、提示词、作者或标签搜索
- **收藏功能** - 本地存储收藏的作品
- **中英文切换** - 支持中英文界面
- **投稿系统** - 通过 GitHub Issues 提交新作品

## 分类

| 中文 | English |
|------|---------|
| 人像写真 | Portrait |
| 场景插画 | Scene Illustration |
| 头像插画 | Avatar Illustration |
| 平面设计 | Graphic Design |
| 产品陈列 | Product Display |
| 童趣角色 | Playful Characters |
| 出版漫画 | Comics |
| 空间建筑 | Architecture |
| 风格实验 | Style Experiment |
| 东方美学 | Oriental Aesthetics |
| 手绘质感 | Handmade Texture |

## 本地运行

**前置条件：** Node.js 18+

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 投稿指南

1. 点击页面右上角的「投稿」按钮
2. 在 GitHub Issues 页面填写投稿表单
3. 等待审核通过后，作品将被添加到画廊

## 技术栈

- **框架：** React + Vite
- **样式：** Tailwind CSS
- **动画：** Framer Motion
- **图标：** Lucide Icons
- **部署：** GitHub Pages

## 项目结构

```
aura-gallery/
├── public/
│   └── assets/          # 图片资源
├── src/
│   ├── components/      # React 组件
│   ├── data.ts          # 作品数据
│   ├── types.ts         # TypeScript 类型定义
│   ├── locales.ts       # 国际化文本
│   └── App.tsx          # 主应用组件
├── projectnext/         # 原始数据源
└── .github/
    ├── workflows/       # GitHub Actions
    └── ISSUE_TEMPLATE/  # Issue 模板
```

## 许可证

本项目采用 MIT 许可证。作品图片和提示词版权归原作者所有。

---

<div align="center">

Made with ❤️ by [xi-lab](https://github.com/xi-lab)

</div>
