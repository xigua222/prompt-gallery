/**
 * AIGC 模型库数据
 * 收录图像生成模型档案（开发者 / 发布时间 / 最新版本 / 模型家族 / 可用平台）。
 * 信息基于公开资料检索整理（截至 2026-08），可按需增删修改。
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
  /** 最新版本发布时间（未确认可省略） */
  versionDate?: string;
  /** 中文简介 */
  description: string;
  /** 英文简介 */
  descriptionEn: string;
  /** 场景标签（与工具导航场景一致） */
  scenes: string[];
  /** 可用平台（src/tools.ts 中的工具 id） */
  platforms: string[];
  /** 模型家族：历代版本列表 */
  family: string[];
}

export const models: ModelProfile[] = [
  {
    id: "midjourney",
    name: "Midjourney",
    developer: "Midjourney Inc",
    developerEn: "Midjourney Inc",
    releaseDate: "2022-02",
    version: "V8.2",
    versionDate: "2026-07",
    description: "以艺术审美和细节表现著称的文生图模型，需通过 Discord 或官网使用，订阅制，V8 系列持续迭代。",
    descriptionEn: "Text-to-image model renowned for artistic quality and detail, available via Discord or web, subscription-based; V8 series keeps iterating.",
    scenes: ["文生图", "插画创作"],
    platforms: ["midjourney"],
    family: ["V1 (2022-02)", "V2 (2022-04)", "V3 (2022-07)", "V4 (2022-11)", "V5 (2023-03)", "V5.2 (2023-06)", "V6 (2023-12)", "V6.1 (2024-07)", "V7 (2025-04)", "V8 (2026-03)", "V8.1 (2026-04)", "V8.2 (2026-07)"],
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    developer: "Stability AI",
    developerEn: "Stability AI",
    releaseDate: "2022-08",
    version: "SD 3.5",
    versionDate: "2024-10",
    description: "开源文生图模型生态，支持本地部署与 LoRA、ControlNet 等精细控制，社区模型海量。",
    descriptionEn: "Open-source text-to-image ecosystem with local deployment, LoRA/ControlNet control and a massive community library.",
    scenes: ["文生图", "图生图与编辑", "模型社区"],
    platforms: ["stable-diffusion", "liblib", "civitai"],
    family: ["SD 1.5 (2022-10)", "SD 2.1 (2022-12)", "SDXL (2023-07)", "SDXL Turbo (2023-11)", "SD 3.0 (2024-02)", "SD 3.5 (2024-10)"],
  },
  {
    id: "flux",
    name: "FLUX",
    developer: "Black Forest Labs",
    developerEn: "Black Forest Labs",
    releaseDate: "2024-08",
    version: "FLUX 3",
    versionDate: "2026-07",
    description: "高真实感与文字渲染能力的文生图模型，FLUX 3 升级为统一多模态（图像+视频），开源权重可本地部署。",
    descriptionEn: "High-realism text-to-image model with excellent typography; FLUX 3 unifies image+video multimodal generation, with open weights for local use.",
    scenes: ["文生图", "图生图与编辑"],
    platforms: ["flux", "leonardo", "liblib", "civitai", "krea"],
    family: ["FLUX.1 (2024-08)", "FLUX.1.1 Pro (2024-10)", "FLUX.1 Kontext (2025-05)", "FLUX.2 (2025-11)", "FLUX.2 Max (2025-12)", "FLUX.2 Klein (2026-01)", "FLUX 3 (2026-07)"],
  },
  {
    id: "gpt-image",
    name: "GPT-Image",
    developer: "OpenAI",
    developerEn: "OpenAI",
    releaseDate: "2025-03",
    version: "GPT Image 2",
    versionDate: "2026-04",
    description: "对话式图像生成模型，指令理解强，擅长精准改图与多轮编辑，GPT Image 2 已全面集成于 ChatGPT 与 API。",
    descriptionEn: "Conversational image model with strong instruction following and iterative editing; GPT Image 2 is fully integrated into ChatGPT and the API.",
    scenes: ["文生图", "图生图与编辑", "海报与平面设计"],
    platforms: ["chatgpt-image"],
    family: ["DALL-E 2 (2022-04)", "DALL-E 3 (2023-08)", "GPT Image (2025-03)", "GPT Image 2 (2026-04)"],
  },
  {
    id: "nano-banana",
    name: "Nano Banana",
    developer: "Google",
    developerEn: "Google",
    releaseDate: "2025-08",
    version: "Nano Banana 2 Lite",
    versionDate: "2026-06",
    description: "Gemini 图像模型系列代号，真实照片风格出色、多轮编辑能力强，2 系列覆盖 Flash 到 Lite 全档位。",
    descriptionEn: "Codename for Gemini image models; outstanding photorealism and iterative editing, with the 2 series spanning Flash to Lite tiers.",
    scenes: ["文生图", "图生图与编辑", "人像写真"],
    platforms: ["gemini"],
    family: ["Nano Banana (2025-08)", "Nano Banana Pro (2025-11)", "Nano Banana 2 (2026-02)", "Nano Banana 2 Lite (2026-06)"],
  },
  {
    id: "seedream",
    name: "Seedream",
    developer: "字节跳动",
    developerEn: "ByteDance",
    releaseDate: "2024-09",
    version: "Seedream 5.0 Pro",
    versionDate: "2026-07",
    description: "字节跳动自研图像模型，中文场景理解与人像写真表现出色，5.0 系列新增 Lite 档位，服务豆包与即梦。",
    descriptionEn: "ByteDance's in-house image model, strong Chinese-context understanding and portraits; the 5.0 series adds a Lite tier, powering Doubao & Jimeng.",
    scenes: ["文生图", "人像写真", "插画创作"],
    platforms: ["jimeng"],
    family: ["Seedream 4.0 (2025-09)", "Seedream 5.0 Lite (2026)", "Seedream 5.0 (2026)", "Seedream 5.0 Pro (2026)"],
  },
  {
    id: "qwen-image",
    name: "Qwen-Image",
    developer: "阿里巴巴",
    developerEn: "Alibaba",
    releaseDate: "2025-08",
    version: "Qwen-Image 3.0 Pro",
    versionDate: "2026-07",
    description: "通义系列图像模型，中文排版与电商设计场景出色，3.0 开源并上线千问平台，服务通义万相。",
    descriptionEn: "Tongyi image model family with strong Chinese typography and e-commerce design; 3.0 is open-source and live on Qwen, serving Wanxiang.",
    scenes: ["文生图", "海报与平面设计", "电商与产品"],
    platforms: ["tongyi-wanxiang"],
    family: ["Qwen-Image (2025-08)", "Qwen-Image-Edit (2025-08)", "Qwen-Image-Layered (2025-12)", "Qwen-Image 3.0 (2026-07)"],
  },
  {
    id: "hunyuan",
    name: "混元",
    developer: "腾讯",
    developerEn: "Tencent",
    releaseDate: "2025-09",
    version: "HunyuanImage 3.0",
    versionDate: "2026-01",
    description: "腾讯自研图像模型，80B 参数 MoE 架构，统一自回归生成，开源权重，集成于元宝与微信生态。",
    descriptionEn: "Tencent's in-house image model with an 80B MoE architecture and unified autoregressive generation; open weights, integrated into Yuanbao & WeChat.",
    scenes: ["文生图", "人像写真"],
    platforms: ["hunyuan"],
    family: ["HunyuanImage 3.0 (2025-09)", "3.0 Instruct (2026-01)"],
  },
  {
    id: "ideogram",
    name: "Ideogram",
    developer: "Ideogram AI",
    developerEn: "Ideogram AI",
    releaseDate: "2023-08",
    version: "Ideogram 4.0",
    versionDate: "2026-06",
    description: "文字排版能力领先的图像模型，4.0 为首个开源权重版本（9.3B 参数、原生 2K），Logo 与海报场景突出。",
    descriptionEn: "Image model with industry-leading typography; 4.0 is the first open-weights release (9.3B params, native 2K), great for logos and posters.",
    scenes: ["文生图", "海报与平面设计"],
    platforms: ["ideogram"],
    family: ["1.0 (2023-08)", "2.0 (2024-08)", "2a (2025-02)", "3.0 (2025-03)", "4.0 (2026-06)"],
  },
  {
    id: "recraft",
    name: "Recraft",
    developer: "Recraft AI",
    developerEn: "Recraft AI",
    releaseDate: "2023-06",
    version: "Recraft V4",
    versionDate: "2026",
    description: "面向设计师的图像模型，矢量插画与品牌视觉（Logo、图标）生成能力强，V4 主打生产级设计资产。",
    descriptionEn: "Designer-focused image model strong at vector illustrations and brand visuals (logos, icons); V4 targets production-ready design assets.",
    scenes: ["插画创作", "海报与平面设计"],
    platforms: ["recraft"],
    family: ["Recraft V3", "Recraft V4 (2026)"],
  },
  {
    id: "phoenix",
    name: "Phoenix",
    developer: "Leonardo.Ai",
    developerEn: "Leonardo.Ai",
    releaseDate: "2025-03",
    version: "Phoenix",
    description: "Leonardo.Ai 的旗舰模型，游戏美术与概念设计方向，风格统一性好，配合 Flow State 工作流使用。",
    descriptionEn: "Leonardo.Ai's flagship model for game art and concept design with strong style consistency, paired with Flow State workflows.",
    scenes: ["文生图", "插画创作", "图生图与编辑"],
    platforms: ["leonardo"],
    family: ["Phoenix"],
  },
  {
    id: "firefly",
    name: "Firefly",
    developer: "Adobe",
    developerEn: "Adobe",
    releaseDate: "2023-03",
    version: "Firefly Image 5",
    versionDate: "2025-10",
    description: "Adobe 官方生成式 AI，商用授权友好，Image 5 在 MAX 大会发布，深度集成 Photoshop 与 Illustrator 工作流。",
    descriptionEn: "Adobe's generative AI with commercial-friendly licensing; Image 5 launched at MAX, deeply integrated into Photoshop & Illustrator workflows.",
    scenes: ["图生图与编辑", "海报与平面设计"],
    platforms: ["adobe-firefly"],
    family: ["Image 1 (2023)", "Image 2 (2023)", "Image 3 (2024)", "Image 4 (2025-04)", "Image 5 (2025-10)"],
  },
];
