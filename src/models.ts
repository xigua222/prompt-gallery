/**
 * AIGC 模型库数据
 * 收录图像生成模型档案（开发者 / 发布时间 / 版本 / 可用平台）。
 * 基于公开信息整理，时间与版本为初稿，可按需增删修改。
 * 平台字段引用 src/tools.ts 中的工具 id，用于与工具导航互链。
 */

export interface ModelProfile {
  id: string;
  /** 模型名称 */
  name: string;
  /** 开发者 / 公司 */
  developer: string;
  developerEn: string;
  /** 首次发布时间（初版） */
  releaseDate: string;
  /** 最新版本 */
  version: string;
  /** 中文简介 */
  description: string;
  /** 英文简介 */
  descriptionEn: string;
  /** 场景标签（与工具导航场景一致） */
  scenes: string[];
  /** 可用平台（src/tools.ts 中的工具 id） */
  platforms: string[];
}

export const models: ModelProfile[] = [
  {
    id: "midjourney",
    name: "Midjourney",
    developer: "Midjourney Inc",
    developerEn: "Midjourney Inc",
    releaseDate: "2022-07",
    version: "V7",
    description: "以艺术审美和细节表现著称的文生图模型，需通过 Discord 或官网使用，订阅制。",
    descriptionEn: "Text-to-image model renowned for artistic quality and detail, available via Discord or web, subscription-based.",
    scenes: ["文生图", "插画创作"],
    platforms: ["midjourney"],
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    developer: "Stability AI",
    developerEn: "Stability AI",
    releaseDate: "2022-08",
    version: "SD 3.5 / SDXL",
    description: "开源文生图模型生态，支持本地部署与 LoRA、ControlNet 等精细控制，社区模型海量。",
    descriptionEn: "Open-source text-to-image ecosystem with local deployment, LoRA/ControlNet control and a massive community library.",
    scenes: ["文生图", "图生图与编辑", "模型社区"],
    platforms: ["stable-diffusion", "liblib", "civitai"],
  },
  {
    id: "flux",
    name: "FLUX",
    developer: "Black Forest Labs",
    developerEn: "Black Forest Labs",
    releaseDate: "2024-08",
    version: "FLUX.2",
    description: "高真实感与文字渲染能力的文生图模型，开源权重可本地部署，广受社区欢迎。",
    descriptionEn: "High-realism text-to-image model with excellent typography, open weights for local use, hugely popular in the community.",
    scenes: ["文生图", "图生图与编辑"],
    platforms: ["flux", "leonardo", "liblib", "civitai", "krea"],
  },
  {
    id: "gpt-image",
    name: "GPT-Image",
    developer: "OpenAI",
    developerEn: "OpenAI",
    releaseDate: "2024-05",
    version: "GPT-Image-1",
    description: "对话式图像生成模型，指令理解强，擅长精准改图与多轮编辑，集成于 ChatGPT。",
    descriptionEn: "Conversational image model with strong instruction following and iterative editing, built into ChatGPT.",
    scenes: ["文生图", "图生图与编辑", "海报与平面设计"],
    platforms: ["chatgpt-image"],
  },
  {
    id: "nano-banana",
    name: "Nano Banana",
    developer: "Google",
    developerEn: "Google",
    releaseDate: "2025-08",
    version: "Nano Banana Pro",
    description: "Gemini 2.5 Flash Image 的代号，真实照片风格出色，多轮编辑能力强，Pro 版随 Gemini 订阅提供。",
    descriptionEn: "Codename for Gemini 2.5 Flash Image; excellent photorealistic output and editing, Pro tier via Gemini subscriptions.",
    scenes: ["文生图", "图生图与编辑", "人像写真"],
    platforms: ["gemini"],
  },
  {
    id: "seedream",
    name: "Seedream",
    developer: "字节跳动",
    developerEn: "ByteDance",
    releaseDate: "2024-09",
    version: "Seedream 4.0",
    description: "字节跳动自研图像模型，中文场景理解与人像写真表现出色，服务豆包与即梦。",
    descriptionEn: "ByteDance's in-house image model, strong Chinese-context understanding and portraits, powering Doubao & Jimeng.",
    scenes: ["文生图", "人像写真", "插画创作"],
    platforms: ["jimeng"],
  },
  {
    id: "qwen-image",
    name: "Qwen-Image",
    developer: "阿里巴巴",
    developerEn: "Alibaba",
    releaseDate: "2025-08",
    version: "Qwen-Image 3.0",
    description: "通义系列图像模型，中文排版与电商设计场景出色，服务通义万相与千问。",
    descriptionEn: "Tongyi image model family with strong Chinese typography and e-commerce design, serving Wanxiang & Qwen.",
    scenes: ["文生图", "海报与平面设计", "电商与产品"],
    platforms: ["tongyi-wanxiang"],
  },
  {
    id: "hunyuan",
    name: "混元",
    developer: "腾讯",
    developerEn: "Tencent",
    releaseDate: "2023-10",
    version: "混元 3.0",
    description: "腾讯自研多模态模型，图像生成集成于元宝与微信生态，中文生成稳定。",
    descriptionEn: "Tencent's multimodal model family; image generation integrated into Yuanbao and WeChat ecosystem.",
    scenes: ["文生图", "人像写真"],
    platforms: ["hunyuan"],
  },
  {
    id: "ideogram",
    name: "Ideogram",
    developer: "Ideogram AI",
    developerEn: "Ideogram AI",
    releaseDate: "2023-08",
    version: "Ideogram 3.0",
    description: "文字排版能力领先的图像模型，Logo、海报与带字设计场景表现突出。",
    descriptionEn: "Image model with industry-leading typography, excellent for logos, posters and text-heavy designs.",
    scenes: ["文生图", "海报与平面设计"],
    platforms: ["ideogram"],
  },
  {
    id: "recraft",
    name: "Recraft",
    developer: "Recraft AI",
    developerEn: "Recraft AI",
    releaseDate: "2023-06",
    version: "Recraft V3",
    description: "面向设计师的图像模型，矢量插画与品牌视觉（Logo、图标）生成能力强。",
    descriptionEn: "Designer-focused image model strong at vector illustrations and brand visuals (logos, icons).",
    scenes: ["插画创作", "海报与平面设计"],
    platforms: ["recraft"],
  },
  {
    id: "phoenix",
    name: "Phoenix",
    developer: "Leonardo.Ai",
    developerEn: "Leonardo.Ai",
    releaseDate: "2025-03",
    version: "Phoenix 1.0",
    description: "Leonardo.Ai 的旗舰模型，游戏美术与概念设计方向，风格统一性好。",
    descriptionEn: "Leonardo.Ai's flagship model for game art and concept design with strong style consistency.",
    scenes: ["文生图", "插画创作", "图生图与编辑"],
    platforms: ["leonardo"],
  },
  {
    id: "firefly",
    name: "Firefly",
    developer: "Adobe",
    developerEn: "Adobe",
    releaseDate: "2023-03",
    version: "Firefly Image 4",
    description: "Adobe 官方生成式 AI，商用授权友好，深度集成 Photoshop 与 Illustrator 工作流。",
    descriptionEn: "Adobe's generative AI with commercial-friendly licensing, deeply integrated into Photoshop & Illustrator workflows.",
    scenes: ["图生图与编辑", "海报与平面设计"],
    platforms: ["adobe-firefly"],
  },
  {
    id: "proprietary",
    name: "自研模型",
    developer: "各平台自研",
    developerEn: "Platform-specific",
    releaseDate: "2023-2025",
    version: "持续更新",
    description: "Canva（Magic Media）、美图 WHEE、Kimi 图像等平台自研的图像生成模型，各具场景侧重。",
    descriptionEn: "Platform-built models such as Canva Magic Media, Meitu WHEE and Kimi Image, each with its own focus.",
    scenes: ["文生图", "海报与平面设计", "电商与产品"],
    platforms: ["canva", "whee", "kimi-image"],
  },
];
