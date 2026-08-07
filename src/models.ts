/**
 * AIGC 模型库数据（版本 + 家族两级结构）
 * - ModelVersion：单个模型版本（列表页以单一版本为卡片）
 * - ModelFamily：模型家族（详情页展示完整时间线、API 价格等）
 * 信息基于公开资料检索整理（截至 2026-08），可按需增删修改。
 * platforms 引用 src/tools.ts 中的工具 id，用于与工具导航互链。
 */

export interface ModelVersion {
  id: string;
  /** 展示名（如 "FLUX 3"） */
  name: string;
  /** 发布时间 */
  releaseDate: string;
  /** 中文简介 */
  description: string;
  /** 英文简介 */
  descriptionEn: string;
  /** 是否当前活跃（列表页展示，旧版本仍可并存使用） */
  active: boolean;
  /** API 价格参考（中文，无公开定价可省略） */
  apiPricing?: string;
  /** API 价格参考（英文） */
  apiPricingEn?: string;
  /** 场景标签 */
  scenes: string[];
}

export interface ModelFamily {
  id: string;
  /** 家族名称 */
  name: string;
  /** 开发者 / 公司 */
  developer: string;
  developerEn: string;
  /** 厂商官网域名（品牌 logo） */
  logoDomain: string;
  /** 家族介绍（中文） */
  intro: string;
  /** 家族介绍（英文） */
  introEn: string;
  /** API 文档链接 */
  apiDocs?: string;
  /** 可用平台（src/tools.ts 中的工具 id） */
  platforms: string[];
  /** 家族全部版本（时间线，旧 → 新） */
  versions: ModelVersion[];
}

export const modelFamilies: ModelFamily[] = [
  {
    id: "midjourney",
    name: "Midjourney",
    developer: "Midjourney Inc",
    developerEn: "Midjourney Inc",
    logoDomain: "midjourney.com",
    intro: "以艺术审美和细节表现著称的文生图模型，通过 Discord 或官网订阅使用，无公开 API，订阅制（Base 约 $10/月起）。",
    introEn: "Text-to-image model renowned for artistic quality and detail, available via Discord or web subscription; no public API (Base plan from ~$10/mo).",
    platforms: ["midjourney"],
    versions: [
      { id: "v1", name: "V1", releaseDate: "2022-02", description: "初版发布，奠定艺术化文生图方向。", descriptionEn: "Initial release establishing the artistic text-to-image direction.", active: false, scenes: ["文生图"] },
      { id: "v2", name: "V2", releaseDate: "2022-04", description: "图像质量与细节提升。", descriptionEn: "Improved image quality and detail.", active: false, scenes: ["文生图"] },
      { id: "v3", name: "V3", releaseDate: "2022-07", description: "风格化表现显著增强。", descriptionEn: "Significantly stronger stylization.", active: false, scenes: ["文生图"] },
      { id: "v4", name: "V4", releaseDate: "2022-11", description: "真实感与构图大幅升级。", descriptionEn: "Major upgrade in realism and composition.", active: false, scenes: ["文生图"] },
      { id: "v5", name: "V5", releaseDate: "2023-03", description: "照片级真实感，社区爆火。", descriptionEn: "Photorealistic output that went viral in the community.", active: false, scenes: ["文生图"] },
      { id: "v5-2", name: "V5.2", releaseDate: "2023-06", description: "新增 Zoom Out 与风格参考。", descriptionEn: "Added Zoom Out and style reference.", active: false, scenes: ["文生图", "图生图与编辑"] },
      { id: "v6", name: "V6", releaseDate: "2023-12", description: "文本渲染能力首次登场。", descriptionEn: "First introduction of text rendering.", active: false, scenes: ["文生图", "海报与平面设计"] },
      { id: "v6-1", name: "V6.1", releaseDate: "2024-07", description: "细节、色彩与文字渲染优化。", descriptionEn: "Refined detail, color and typography.", active: false, scenes: ["文生图"] },
      { id: "v7", name: "V7", releaseDate: "2025-04", description: "全新架构，理解力与一致性大幅提升。", descriptionEn: "New architecture with much better instruction following and consistency.", active: false, scenes: ["文生图", "图生图与编辑"] },
      { id: "v8", name: "V8", releaseDate: "2026-03", description: "生成速度与质量双升，全面取代 V7。", descriptionEn: "Faster and higher quality, fully replacing V7.", active: false, scenes: ["文生图"] },
      { id: "v8-1", name: "V8.1", releaseDate: "2026-04", description: "小幅迭代，稳定性增强。", descriptionEn: "Minor iteration with improved stability.", active: false, scenes: ["文生图"] },
      { id: "v8-2", name: "V8.2", releaseDate: "2026-07", description: "当前最新版本，色彩与光影进一步优化。", descriptionEn: "Latest version with refined color and lighting.", active: true, scenes: ["文生图", "插画创作"], apiPricing: "订阅制：Base 约 $10/月（约 200 张图/月），无单张 API 定价", apiPricingEn: "Subscription: Base from ~$10/mo (~200 images/mo); no per-image API pricing" },
    ],
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    developer: "Stability AI",
    developerEn: "Stability AI",
    logoDomain: "stability.ai",
    intro: "开源文生图模型生态，支持本地部署与 LoRA、ControlNet 等精细控制，社区模型海量，多个版本长期并存使用。",
    introEn: "Open-source text-to-image ecosystem with local deployment, LoRA/ControlNet control and a massive community library; multiple versions coexist.",
    apiDocs: "https://platform.stability.ai",
    platforms: ["stable-diffusion", "liblib", "civitai"],
    versions: [
      { id: "sd-1-5", name: "SD 1.5", releaseDate: "2022-10", description: "社区最经典的基座模型，至今仍被广泛使用。", descriptionEn: "The classic community base model, still widely used.", active: true, scenes: ["文生图", "模型社区"] },
      { id: "sd-2-1", name: "SD 2.1", releaseDate: "2022-12", description: "二代架构，支持更广的生成范围。", descriptionEn: "Second-gen architecture with broader generation scope.", active: false, scenes: ["文生图"] },
      { id: "sdxl", name: "SDXL", releaseDate: "2023-07", description: "高分辨率（1024px）基座，生态最丰富的版本之一。", descriptionEn: "1024px high-resolution base, one of the richest ecosystems.", active: true, scenes: ["文生图", "图生图与编辑"] },
      { id: "sdxl-turbo", name: "SDXL Turbo", releaseDate: "2023-11", description: "单步实时生成，速度极快。", descriptionEn: "Single-step real-time generation.", active: false, scenes: ["文生图"] },
      { id: "sd-3-0", name: "SD 3.0", releaseDate: "2024-02", description: "早期预览，混合架构。", descriptionEn: "Early preview with hybrid architecture.", active: false, scenes: ["文生图"] },
      { id: "sd-3-5", name: "SD 3.5", releaseDate: "2024-10", description: "当前最新开源版本（Large/Large Turbo/Medium），文字渲染大幅提升。", descriptionEn: "Latest open release (Large/Large Turbo/Medium) with major typography improvements.", active: true, scenes: ["文生图", "图生图与编辑"], apiPricing: "官方 API：Large $0.065/张、Large Turbo $0.04/张、Medium $0.035/张（1 credit=$0.01）；开源权重免费本地部署", apiPricingEn: "Official API: Large $0.065, Large Turbo $0.04, Medium $0.035 per image (1 credit=$0.01); open weights free for local use" },
    ],
  },
  {
    id: "flux",
    name: "FLUX",
    developer: "Black Forest Labs",
    developerEn: "Black Forest Labs",
    logoDomain: "blackforestlabs.ai",
    intro: "高真实感与文字渲染能力的文生图模型，开源权重可本地部署，FLUX 3 起统一图像+视频多模态。",
    introEn: "High-realism text-to-image model with excellent typography; open weights for local use, unified image+video multimodal since FLUX 3.",
    apiDocs: "https://docs.bfl.ai",
    platforms: ["flux", "leonardo", "liblib", "civitai", "krea"],
    versions: [
      { id: "flux-1", name: "FLUX.1", releaseDate: "2024-08", description: "开源基座（dev/schnell），社区生态爆发。", descriptionEn: "Open base models (dev/schnell) that ignited the community.", active: true, scenes: ["文生图", "图生图与编辑"], apiPricing: "官方 API：pro $0.05/MP、dev $0.025/MP（1MP≈1024²）；开源权重免费本地部署", apiPricingEn: "Official API: pro $0.05/MP, dev $0.025/MP (1MP≈1024²); open weights free for local use" },
      { id: "flux-1-1", name: "FLUX.1.1 Pro", releaseDate: "2024-10", description: "Pro 档速度与质量优化。", descriptionEn: "Pro tier with speed and quality optimizations.", active: false, scenes: ["文生图"] },
      { id: "flux-1-kontext", name: "FLUX.1 Kontext", releaseDate: "2025-05", description: "引入上下文/多图理解能力。", descriptionEn: "Introduced context/multi-image understanding.", active: false, scenes: ["图生图与编辑"] },
      { id: "flux-2", name: "FLUX.2", releaseDate: "2025-11", description: "新一代架构，排版与真实感再升级。", descriptionEn: "Next-gen architecture with better typography and realism.", active: true, scenes: ["文生图", "海报与平面设计"], apiPricing: "官方 API：pro $0.03/MP、flex $0.05/MP（1MP≈1024²）", apiPricingEn: "Official API: pro $0.03/MP, flex $0.05/MP (1MP≈1024²)" },
      { id: "flux-2-max", name: "FLUX.2 Max", releaseDate: "2025-12", description: "旗舰档位，最高质量输出。", descriptionEn: "Flagship tier with the highest quality output.", active: false, scenes: ["文生图"], apiPricing: "官方 API：首 MP $0.07，之后 $0.03/MP", apiPricingEn: "Official API: $0.07 first MP, then $0.03/MP" },
      { id: "flux-2-klein", name: "FLUX.2 Klein", releaseDate: "2026-01", description: "轻量 4B/9B 模型，本地运行友好。", descriptionEn: "Lightweight 4B/9B models, local-friendly.", active: true, scenes: ["文生图"], apiPricing: "官方 API：9B $0.015+$0.002/MP、4B $0.014+$0.001/MP", apiPricingEn: "Official API: 9B $0.015+$0.002/MP, 4B $0.014+$0.001/MP" },
      { id: "flux-3", name: "FLUX 3", releaseDate: "2026-07", description: "当前最新，统一多模态（图像+视频）。", descriptionEn: "Latest release, unified multimodal (image+video).", active: true, scenes: ["文生图", "图生图与编辑"], apiPricing: "图像档位官方定价未公布（视频档已公布），详见 BFL 定价页", apiPricingEn: "Official image pricing not yet published (video tiers available); see bfl.ai/pricing" },
    ],
  },
  {
    id: "gpt-image",
    name: "GPT-Image",
    developer: "OpenAI",
    developerEn: "OpenAI",
    logoDomain: "openai.com",
    intro: "对话式图像生成模型，指令理解强，擅长精准改图与多轮编辑，集成于 ChatGPT 与 OpenAI API。",
    introEn: "Conversational image model with strong instruction following and iterative editing, in ChatGPT and the OpenAI API.",
    apiDocs: "https://platform.openai.com/docs/models/gpt-image-2",
    platforms: ["chatgpt-image"],
    versions: [
      { id: "dalle-2", name: "DALL-E 2", releaseDate: "2022-04", description: "初代开放 API 图像模型。", descriptionEn: "First publicly available image API model.", active: false, scenes: ["文生图"] },
      { id: "dalle-3", name: "DALL-E 3", releaseDate: "2023-08", description: "自然语言理解大幅增强。", descriptionEn: "Much better natural language understanding.", active: false, scenes: ["文生图"] },
      { id: "gpt-image-1", name: "GPT Image", releaseDate: "2025-03", description: "对话式生成，取代 DALL-E 3。", descriptionEn: "Conversational generation, replacing DALL-E 3.", active: false, scenes: ["文生图", "图生图与编辑"] },
      { id: "gpt-image-2", name: "GPT Image 2", releaseDate: "2026-04", description: "当前最新版本，速度与细节全面提升，集成于 ChatGPT 与 API。", descriptionEn: "Latest version with faster, more detailed generation, in ChatGPT and the API.", active: true, scenes: ["文生图", "图生图与编辑", "海报与平面设计"], apiPricing: "API 按 token 计费（输出 $30/1M），1024² 约：低质 $0.006 / 中质 $0.053 / 高质 $0.211 每张", apiPricingEn: "API billed per token ($30/1M output); 1024² approx: low $0.006 / medium $0.053 / high $0.211 per image" },
    ],
  },
  {
    id: "nano-banana",
    name: "Nano Banana",
    developer: "Google",
    developerEn: "Google",
    logoDomain: "gemini.google.com",
    intro: "Gemini 图像模型系列代号，真实照片风格出色、多轮编辑能力强，通过 Gemini 订阅与 Google AI API 提供。",
    introEn: "Codename for Gemini image models; outstanding photorealism and iterative editing, via Gemini subscriptions and Google AI API.",
    apiDocs: "https://ai.google.dev/gemini-api/docs/image-generation",
    platforms: ["gemini"],
    versions: [
      { id: "nb-1", name: "Nano Banana", releaseDate: "2025-08", description: "Gemini 2.5 Flash Image，初代发布。", descriptionEn: "Gemini 2.5 Flash Image, initial release.", active: false, scenes: ["文生图", "人像写真"] },
      { id: "nb-pro", name: "Nano Banana Pro", releaseDate: "2025-11", description: "Gemini 3 Pro Image，旗舰档位。", descriptionEn: "Gemini 3 Pro Image, flagship tier.", active: false, scenes: ["文生图", "图生图与编辑"], apiPricing: "Gemini API：标准档约 $0.134/张（1K/2K）～$0.24/张（4K）", apiPricingEn: "Gemini API: ~$0.134 (1K/2K) to $0.24 (4K) per image at standard tier" },
      { id: "nb-2", name: "Nano Banana 2", releaseDate: "2026-02", description: "Gemini 3.1 Flash Image，主流档位。", descriptionEn: "Gemini 3.1 Flash Image, mainstream tier.", active: true, scenes: ["文生图", "图生图与编辑", "人像写真"], apiPricing: "Gemini API：标准档约 $0.067/张（1K）、$0.101（2K）、$0.151（4K）", apiPricingEn: "Gemini API: ~$0.067 (1K), $0.101 (2K), $0.151 (4K) per image at standard tier" },
      { id: "nb-2-lite", name: "Nano Banana 2 Lite", releaseDate: "2026-06", description: "轻量档位，速度优先，成本更低。", descriptionEn: "Lite tier, speed-first and lower cost.", active: true, scenes: ["文生图"], apiPricing: "Gemini API：轻量档，价格低于标准档（具体见官方定价页）", apiPricingEn: "Gemini API: Lite tier, cheaper than standard (see official pricing)" },
    ],
  },
  {
    id: "seedream",
    name: "Seedream",
    developer: "字节跳动",
    developerEn: "ByteDance",
    logoDomain: "jimeng.jianying.com",
    intro: "字节跳动自研图像模型，中文场景理解与人像写真表现出色，通过即梦与火山引擎提供服务。",
    introEn: "ByteDance's in-house image model, strong Chinese-context understanding and portraits, via Jimeng and Volcano Engine.",
    apiDocs: "https://www.volcengine.com/docs/82379",
    platforms: ["jimeng"],
    versions: [
      { id: "seedream-4", name: "Seedream 4.0", releaseDate: "2025-09", description: "中文文字渲染与风格表现标杆。", descriptionEn: "Benchmark for Chinese typography and style.", active: false, scenes: ["文生图", "人像写真"] },
      { id: "seedream-5-lite", name: "Seedream 5.0 Lite", releaseDate: "2026", description: "轻量档位，速度与成本优化。", descriptionEn: "Lite tier with speed and cost optimizations.", active: true, scenes: ["文生图"], apiPricing: "火山引擎 API 参考：约 ¥0.22/张（第三方报道，以控制台账单为准）", apiPricingEn: "Volcano Engine API (3rd-party ref): ~¥0.22/image; verify in console" },
      { id: "seedream-5", name: "Seedream 5.0", releaseDate: "2026", description: "主流档位，整体质量提升。", descriptionEn: "Mainstream tier with overall quality gains.", active: true, scenes: ["文生图", "人像写真"] },
      { id: "seedream-5-pro", name: "Seedream 5.0 Pro", releaseDate: "2026-07", description: "旗舰档位，细节与真实感最佳。", descriptionEn: "Flagship tier with the best detail and realism.", active: true, scenes: ["文生图", "人像写真", "插画创作"], apiPricing: "火山引擎 API 参考：1K 约 ¥0.3/张、2K 约 ¥0.6/张（第三方报道，以控制台账单为准）", apiPricingEn: "Volcano Engine API (3rd-party ref): ~¥0.3 (1K) / ¥0.6 (2K) per image; verify in console" },
    ],
  },
  {
    id: "qwen-image",
    name: "Qwen-Image",
    developer: "阿里巴巴",
    developerEn: "Alibaba",
    logoDomain: "qwen.ai",
    intro: "通义系列图像模型，中文排版与电商设计场景出色，开源权重并上线千问与百炼平台。",
    introEn: "Tongyi image model family with strong Chinese typography and e-commerce design; open weights, live on Qwen and Bailian.",
    apiDocs: "https://help.aliyun.com/zh/model-studio/qwen-image",
    platforms: ["tongyi-wanxiang"],
    versions: [
      { id: "qwen-image-1", name: "Qwen-Image", releaseDate: "2025-08", description: "开源 20B MMDiT 基座。", descriptionEn: "Open 20B MMDiT base model.", active: false, scenes: ["文生图"] },
      { id: "qwen-image-edit", name: "Qwen-Image-Edit", releaseDate: "2025-08", description: "图像编辑专用版本。", descriptionEn: "Dedicated image editing variant.", active: false, scenes: ["图生图与编辑"] },
      { id: "qwen-image-layered", name: "Qwen-Image-Layered", releaseDate: "2025-12", description: "分层生成与图层控制。", descriptionEn: "Layered generation and composition control.", active: false, scenes: ["图生图与编辑"] },
      { id: "qwen-image-3", name: "Qwen-Image 3.0", releaseDate: "2026-07", description: "当前最新，3.0/3.0-Pro 上线千问与百炼 API。", descriptionEn: "Latest release; 3.0/3.0-Pro live on Qwen and Bailian API.", active: true, scenes: ["文生图", "海报与平面设计", "电商与产品"], apiPricing: "百炼 API：qwen-image 系列 ¥0.25/张（3.0-Pro 静态价未公开，见控制台）", apiPricingEn: "Bailian API: qwen-image ¥0.25/image (3.0-Pro pricing in console)" },
    ],
  },
  {
    id: "hunyuan",
    name: "混元",
    developer: "腾讯",
    developerEn: "Tencent",
    logoDomain: "hunyuan.tencent.com",
    intro: "腾讯自研图像模型，80B 参数 MoE 架构，统一自回归生成，开源权重并通过腾讯云 API 提供。",
    introEn: "Tencent's in-house image model with an 80B MoE architecture and unified autoregressive generation; open weights plus Tencent Cloud API.",
    apiDocs: "https://cloud.tencent.com/document/product/1729",
    platforms: ["hunyuan"],
    versions: [
      { id: "hunyuan-3", name: "HunyuanImage 3.0", releaseDate: "2025-09", description: "80B MoE，最大开源图像 MoE 模型。", descriptionEn: "80B MoE, the largest open-source image MoE model.", active: true, scenes: ["文生图", "人像写真"], apiPricing: "腾讯云 API：混元生图 ¥0.5/张；文生图轻量版 ¥0.099/张起（月用量阶梯价）", apiPricingEn: "Tencent Cloud API: HunyuanImage ¥0.5/image; lite tier from ¥0.099/image (volume tiers)" },
      { id: "hunyuan-3-instruct", name: "3.0 Instruct", releaseDate: "2026-01", description: "指令对齐变体，控制更精准。", descriptionEn: "Instruction-tuned variant with better control.", active: false, scenes: ["文生图"] },
    ],
  },
  {
    id: "ideogram",
    name: "Ideogram",
    developer: "Ideogram AI",
    developerEn: "Ideogram AI",
    logoDomain: "ideogram.ai",
    intro: "文字排版能力领先的图像模型，Logo、海报与带字设计场景突出，4.0 起开放权重。",
    introEn: "Image model with industry-leading typography, great for logos and posters; open weights since 4.0.",
    apiDocs: "https://docs.ideogram.ai",
    platforms: ["ideogram"],
    versions: [
      { id: "ideogram-1", name: "1.0", releaseDate: "2023-08", description: "文字渲染惊艳亮相。", descriptionEn: "Impressive debut in typography.", active: false, scenes: ["文生图", "海报与平面设计"] },
      { id: "ideogram-2", name: "2.0", releaseDate: "2024-08", description: "速度与画质提升。", descriptionEn: "Speed and quality improvements.", active: false, scenes: ["文生图"] },
      { id: "ideogram-2a", name: "2a", releaseDate: "2025-02", description: "中档迭代版本。", descriptionEn: "Mid-tier iteration.", active: false, scenes: ["文生图"] },
      { id: "ideogram-3", name: "3.0", releaseDate: "2025-03", description: "真实感与排版再升级。", descriptionEn: "Further realism and typography gains.", active: false, scenes: ["文生图"] },
      { id: "ideogram-4", name: "4.0", releaseDate: "2026-06", description: "首个开源权重版本（9.3B、原生 2K），支持 JSON Prompts。", descriptionEn: "First open-weights release (9.3B, native 2K) with JSON Prompts.", active: true, scenes: ["文生图", "海报与平面设计"], apiPricing: "官方 API：Turbo $0.03 / Default $0.06 / Quality $0.10 每张", apiPricingEn: "Official API: Turbo $0.03 / Default $0.06 / Quality $0.10 per image" },
    ],
  },
  {
    id: "recraft",
    name: "Recraft",
    developer: "Recraft AI",
    developerEn: "Recraft AI",
    logoDomain: "recraft.ai",
    intro: "面向设计师的图像模型，矢量插画与品牌视觉（Logo、图标）生成能力强，V4 主打生产级设计资产。",
    introEn: "Designer-focused image model strong at vector illustrations and brand visuals; V4 targets production-ready design assets.",
    apiDocs: "https://www.recraft.ai/docs",
    platforms: ["recraft"],
    versions: [
      { id: "recraft-v3", name: "Recraft V3", releaseDate: "2024-09", description: "矢量与品牌设计能力奠定口碑。", descriptionEn: "Established the brand for vectors and brand design.", active: false, scenes: ["插画创作", "海报与平面设计"] },
      { id: "recraft-v4", name: "Recraft V4", releaseDate: "2026", description: "当前最新，生产级图像、矢量与设计资产。", descriptionEn: "Latest release; production-ready images, vectors and design assets.", active: true, scenes: ["插画创作", "海报与平面设计"], apiPricing: "官方 API：V4 $0.04/张、V4 Pro $0.25/张（单元包 $1=1000 units）", apiPricingEn: "Official API: V4 $0.04, V4 Pro $0.25 per image (pack: $1=1000 units)" },
    ],
  },
  {
    id: "phoenix",
    name: "Phoenix",
    developer: "Leonardo.Ai",
    developerEn: "Leonardo.Ai",
    logoDomain: "leonardo.ai",
    intro: "Leonardo.Ai 的旗舰模型，游戏美术与概念设计方向，风格统一性好，配合 Flow State 工作流使用。",
    introEn: "Leonardo.Ai's flagship model for game art and concept design with strong style consistency, paired with Flow State workflows.",
    apiDocs: "https://docs.leonardo.ai",
    platforms: ["leonardo"],
    versions: [
      { id: "phoenix-1", name: "Phoenix", releaseDate: "2025-03", description: "旗舰模型，游戏美术与概念设计专用。", descriptionEn: "Flagship model for game art and concept design.", active: true, scenes: ["文生图", "插画创作", "图生图与编辑"], apiPricing: "Leonardo API 按 PAYG 动态计费（官方价格计算器，无静态价目）", apiPricingEn: "Leonardo API is PAYG with a pricing calculator; no static rates published" },
    ],
  },
  {
    id: "firefly",
    name: "Firefly",
    developer: "Adobe",
    developerEn: "Adobe",
    logoDomain: "firefly.adobe.com",
    intro: "Adobe 官方生成式 AI，商用授权友好，深度集成 Photoshop 与 Illustrator 工作流。",
    introEn: "Adobe's generative AI with commercial-friendly licensing, deeply integrated into Photoshop & Illustrator workflows.",
    apiDocs: "https://developer.adobe.com/firefly-services/docs/",
    platforms: ["adobe-firefly"],
    versions: [
      { id: "firefly-1", name: "Image 1", releaseDate: "2023-03", description: "初代 Firefly 图像模型。", descriptionEn: "First Firefly image model.", active: false, scenes: ["文生图"] },
      { id: "firefly-2", name: "Image 2", releaseDate: "2023-10", description: "画质与提示理解提升。", descriptionEn: "Improved quality and prompt understanding.", active: false, scenes: ["文生图"] },
      { id: "firefly-3", name: "Image 3", releaseDate: "2024-04", description: "排版与风格控制增强。", descriptionEn: "Better typography and style control.", active: false, scenes: ["文生图", "海报与平面设计"] },
      { id: "firefly-4", name: "Image 4", releaseDate: "2025-04", description: "真实感大幅提升。", descriptionEn: "Major realism gains.", active: false, scenes: ["文生图"] },
      { id: "firefly-5", name: "Image 5", releaseDate: "2025-10", description: "当前最新，MAX 大会发布，细节与一致性最佳。", descriptionEn: "Latest release from MAX; best detail and consistency.", active: true, scenes: ["图生图与编辑", "海报与平面设计"] },
    ],
  },
];

/** 列表页展示的活跃版本（单一模型卡片） */
export const activeVersions = modelFamilies.flatMap(family =>
  family.versions
    .filter(v => v.active)
    .map(v => ({ family, version: v })),
);
