/**
 * AIGC 工具导航站数据
 * 收录图像生成相关的工具/平台。基于公开信息整理，可按需增删修改。
 * 维护方式：直接编辑本文件即可，无需运行生成脚本。
 */

import {
  Atom,
  Laptop,
  Layers,
  Banana,
  Brush,
  CircleDashed,
  Cloud,
  Flame,
  Image as ImageIcon,
  LayoutTemplate,
  MessageCircle,
  Palette,
  ShoppingBag,
  Sparkles,
  Sprout,
  Type,
  User,
  Users,
  Wand2,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/** 场景 → 图标映射（lucide 图标，风格统一） */
export const sceneIcons: Record<string, LucideIcon> = {
  "文生图": ImageIcon,
  "图生图与编辑": Wand2,
  "人像写真": User,
  "插画创作": Palette,
  "海报与平面设计": LayoutTemplate,
  "电商与产品": ShoppingBag,
  "模型社区": Users,
  "聚合平台": Layers,
  "本地工具": Laptop,
};

/** 模型 → 图标映射（lucide 图标，风格统一） */
export const modelIcons: Record<string, LucideIcon> = {
  "Midjourney": Palette,
  "Stable Diffusion": Atom,
  "FLUX": Zap,
  "GPT-Image": MessageCircle,
  "Nano Banana": Banana,
  "Seedream": Sprout,
  "Qwen-Image": Cloud,
  "混元": CircleDashed,
  "Ideogram": Type,
  "Recraft": Brush,
  "Phoenix": Flame,
  "Firefly": Sparkles,
};

/** 从工具 URL 提取域名（去除 www. 前缀） */
export function getToolDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export interface AIGCTool {
  id: string;
  /** 工具/平台名称 */
  name: string;
  /** 官网地址 */
  url: string;
  /** 中文简介 */
  description: string;
  /** 英文简介 */
  descriptionEn: string;
  /** 场景标签：文生图 / 图生图与编辑 / 人像写真 / 插画创作 / 海报与平面设计 / 电商与产品 / 模型社区 */
  scenes: string[];
  /** 模型标签（模型家族名，用于筛选与主标签） */
  models: string[];
  /** 具体模型版本标签（细化颗粒度，如 ["FLUX.1", "FLUX.2"]） */
  modelVersions?: string[];
  /** 本地 logo 文件名（public/logos/，含扩展名），优先于远程 favicon */
  logoFile?: string;
}

/** 场景分类（双维度之一） */
export const toolScenes = [
  "文生图",
  "图生图与编辑",
  "人像写真",
  "插画创作",
  "海报与平面设计",
  "电商与产品",
  "模型社区",
  "聚合平台",
  "本地工具",
] as const;

/** 模型分类（双维度之一） */
export const toolModels = [
  "Midjourney",
  "Stable Diffusion",
  "FLUX",
  "GPT-Image",
  "Nano Banana",
  "Seedream",
  "Qwen-Image",
  "混元",
  "Ideogram",
  "Recraft",
  "Phoenix",
  "Firefly",
] as const;

export const tools: AIGCTool[] = [
  {
    id: "midjourney",
    name: "Midjourney",
    url: "https://www.midjourney.com",
    description: "顶级质感文生图平台，以艺术审美和细节表现著称，适合插画、概念设计与艺术创作。",
    descriptionEn: "Premium text-to-image platform known for artistic quality and detail, ideal for illustration and concept art.",
    scenes: ["聚合平台", "文生图", "插画创作"],
    models: ["Midjourney"],
    modelVersions: ["V8.2"],
    logoFile: "midjourney.svg",
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    url: "https://stability.ai",
    description: "开源图像生成模型生态，支持本地部署与精细控制（LoRA、ControlNet），社区资源极其丰富。",
    descriptionEn: "Open-source image generation ecosystem with local deployment, fine control (LoRA, ControlNet) and a huge community.",
    scenes: ["本地工具", "图生图与编辑"],
    models: ["Stable Diffusion"],
    modelVersions: ["1.5", "XL", "3.5"],
    logoFile: "stability.png",
  },
  {
    id: "flux",
    name: "FLUX",
    url: "https://blackforestlabs.ai",
    description: "Black Forest Labs 出品的高质量文生图模型，文字渲染与真实感表现优秀，开源可本地部署。",
    descriptionEn: "High-quality text-to-image models from Black Forest Labs with excellent typography and realism, open-weights for local use.",
    scenes: ["文生图", "图生图与编辑"],
    models: ["FLUX"],
    modelVersions: ["FLUX.1", "FLUX.2", "FLUX 3"],
    logoFile: "blackforestlabs.svg",
  },
  {
    id: "chatgpt-image",
    name: "ChatGPT 图像",
    url: "https://chatgpt.com",
    description: "GPT-Image 对话式生图，指令理解能力强，擅长精准改图与多轮编辑，自带免费额度。",
    descriptionEn: "Conversational GPT-Image generation with strong instruction following, precise editing and free tier access.",
    scenes: ["文生图", "图生图与编辑", "海报与平面设计"],
    models: ["GPT-Image"],
    modelVersions: ["GPT Image 2"],
    logoFile: "openai.svg",
  },
  {
    id: "gemini",
    name: "Gemini",
    url: "https://gemini.google.com",
    description: "Google 多模态助手，Nano Banana（2.5 Flash Image）生图模型擅长真实照片风格与多轮编辑。",
    descriptionEn: "Google multimodal assistant; the Nano Banana (2.5 Flash Image) model excels at photorealistic output and iterative editing.",
    scenes: ["文生图", "图生图与编辑", "人像写真"],
    models: ["Nano Banana"],
    modelVersions: ["Nano Banana 2", "Nano Banana Pro"],
    logoFile: "gemini.png",
  },
  {
    id: "jimeng",
    name: "豆包 / 即梦",
    url: "https://jimeng.jianying.com",
    description: "字节跳动图像与视频生成平台，Seedream 系列模型，人像写真与中文场景表现出色。",
    descriptionEn: "ByteDance image & video generation platform powered by Seedream, strong at portraits and Chinese-context scenes.",
    scenes: ["文生图", "人像写真", "插画创作"],
    models: ["Seedream"],
    modelVersions: ["Seedream 5.0"],
    logoFile: "jimeng.png",
  },
  {
    id: "tongyi-wanxiang",
    name: "通义万相",
    url: "https://tongyi.aliyun.com/wanxiang",
    description: "阿里云通义图像生成，万相 / Qwen-Image 模型，支持创意海报与电商素材生成。",
    descriptionEn: "Alibaba Tongyi image generation with Qwen-Image / Wanxiang models, good for posters and e-commerce assets.",
    scenes: ["文生图", "海报与平面设计", "电商与产品"],
    models: ["Qwen-Image"],
    modelVersions: ["Qwen-Image 3.0"],
    logoFile: "qwen.png",
  },
  {
    id: "hunyuan",
    name: "腾讯混元 / 元宝",
    url: "https://yuanbao.tencent.com",
    description: "腾讯混元图像生成，集成于元宝 App 与网页端，中文理解与生成稳定。",
    descriptionEn: "Tencent Hunyuan image generation, available in the Yuanbao app and web, reliable Chinese-language generation.",
    scenes: ["文生图", "人像写真"],
    models: ["混元"],
    modelVersions: ["HunyuanImage 3.0"],
    logoFile: "hunyuan.png",
  },
  {
    id: "ideogram",
    name: "Ideogram",
    url: "https://ideogram.ai",
    description: "文字排版能力领先的文生图平台，海报、Logo 与带字设计场景表现突出。",
    descriptionEn: "Text-to-image platform with industry-leading typography, great for posters, logos and text-heavy designs.",
    scenes: ["文生图", "海报与平面设计"],
    models: ["Ideogram"],
    modelVersions: ["4.0"],
    logoFile: "ideogram.png",
  },
  {
    id: "recraft",
    name: "Recraft",
    url: "https://www.recraft.ai",
    description: "面向设计师的生成工具，矢量插画与品牌视觉（Logo、图标）一键生成。",
    descriptionEn: "Designer-focused generation tool for vector illustrations and brand visuals (logos, icons) in one click.",
    scenes: ["插画创作", "海报与平面设计"],
    models: ["Recraft"],
    modelVersions: ["V4"],
    logoFile: "recraft.png",
  },
  {
    id: "leonardo",
    name: "Leonardo.Ai",
    url: "https://leonardo.ai",
    description: "游戏美术与概念设计平台，Phoenix 系列模型，素材与工作流工具丰富。",
    descriptionEn: "Game art and concept design platform with the Phoenix model family and rich asset/workflow tooling.",
    scenes: ["文生图", "插画创作", "图生图与编辑"],
    models: ["Phoenix", "FLUX", "Stable Diffusion"],
    modelVersions: ["Phoenix 1.0", "FLUX.1", "SDXL"],
    logoFile: "leonardo.png",
  },
  {
    id: "liblib",
    name: "LiblibAI 哩布哩布",
    url: "https://www.liblib.art",
    description: "国内最大的模型社区之一，在线运行 Stable Diffusion / FLUX 模型，海量 LoRA 与素材。",
    descriptionEn: "One of the largest Chinese model communities, running SD/FLUX online with massive LoRA and asset libraries.",
    scenes: ["模型社区", "文生图", "电商与产品"],
    models: ["Stable Diffusion", "FLUX"],
    modelVersions: ["SD 1.5", "SDXL", "FLUX.1"],
  },
  {
    id: "civitai",
    name: "Civitai",
    url: "https://civitai.com",
    description: "全球最大的开源模型分享社区，SD/FLUX 模型、LoRA 与工作流一站式获取。",
    descriptionEn: "The world's largest open-model sharing community for SD/FLUX checkpoints, LoRAs and workflows.",
    scenes: ["模型社区"],
    models: ["Stable Diffusion", "FLUX"],
    modelVersions: ["SD 1.5", "SDXL", "FLUX.1"],
  },
  {
    id: "krea",
    name: "Krea",
    url: "https://www.krea.ai",
    description: "实时生成与增强平台，图生图、局部重绘与视频增强，FLUX 在线可用。",
    descriptionEn: "Real-time generation and enhancement platform with image-to-image, inpainting and video upscaling on FLUX.",
    scenes: ["图生图与编辑", "文生图"],
    models: ["FLUX"],
    modelVersions: ["FLUX.1", "FLUX.2"],
  },
  {
    id: "canva",
    name: "Canva",
    url: "https://www.canva.com",
    description: "大众化设计平台，Magic Media 内置 AI 生图，海报与社媒素材模板化产出。",
    descriptionEn: "Mainstream design platform with Magic Media AI generation, templated posters and social assets.",
    scenes: ["聚合平台", "海报与平面设计", "电商与产品"],
    models: [],
  },
  {
    id: "adobe-firefly",
    name: "Adobe Firefly",
    url: "https://firefly.adobe.com",
    description: "Adobe 官方生成式 AI，商用授权友好，与 Photoshop / Illustrator 生态深度集成。",
    descriptionEn: "Adobe's generative AI with commercial-friendly licensing, deeply integrated into Photoshop & Illustrator.",
    scenes: ["图生图与编辑", "海报与平面设计"],
    models: ["Firefly", "Nano Banana"],
    modelVersions: ["Image 5", "Nano Banana"],
    logoFile: "firefly.png",
  },
  {
    id: "whee",
    name: "WHEE（美图）",
    url: "https://www.whee.com",
    description: "美图旗下 AI 图像创作平台，文生图与电商商品图生成，适合国内场景。",
    descriptionEn: "Meitu's AI image creation platform for text-to-image and e-commerce product shots in Chinese scenarios.",
    scenes: ["文生图", "电商与产品", "人像写真"],
    models: [],
  },
  {
    id: "kimi-image",
    name: "Kimi 图像",
    url: "https://kimi.moonshot.cn",
    description: "月之暗面 Kimi 内置图像生成，中文理解与排版自然，支持对话式改图。",
    descriptionEn: "Moonshot Kimi's built-in image generation with natural Chinese understanding and conversational editing.",
    scenes: ["文生图", "海报与平面设计"],
    models: [],
  },
  {
    id: "copilot",
    name: "Microsoft Copilot / Bing",
    url: "https://www.bing.com/create",
    description: "微软 AI 图像生成，2025 年起转向自研 MAI-Image 系列（MAI-Image-2.5 为当前主力）。",
    descriptionEn: "Microsoft AI image generation, now powered by the in-house MAI-Image series (MAI-Image-2.5 current).",
    scenes: ["文生图", "海报与平面设计"],
    models: ["MAI-Image"],
    modelVersions: ["MAI-Image-2.5"],
  },
  {
    id: "grok",
    name: "Grok",
    url: "https://grok.com",
    description: "xAI 对话助手的图像生成，自研 Grok Imagine 系列。",
    descriptionEn: "xAI assistant's image generation, powered by the in-house Grok Imagine series.",
    scenes: ["文生图", "图生图与编辑"],
    models: ["Grok Imagine"],
    modelVersions: ["Imagine 1.0"],
  },
  {
    id: "google-flow",
    name: "Google Flow",
    url: "https://flow.google.com",
    description: "Google 统一创作平台（整合 Whisk/ImageFX），图像侧为 Imagen 4 与 Nano Banana。",
    descriptionEn: "Google's unified creation platform (absorbing Whisk/ImageFX); image side runs Imagen 4 and Nano Banana.",
    scenes: ["文生图", "图生图与编辑"],
    models: ["Nano Banana", "Imagen"],
    modelVersions: ["Imagen 4", "Nano Banana 2"],
  },
  {
    id: "comfyui",
    name: "ComfyUI",
    url: "https://github.com/comfyanonymous/ComfyUI",
    description: "本地节点式图像工作流引擎，模型无关，原生支持 SD/FLUX/Qwen/Hunyuan/Ideogram 4 等大量模型。",
    descriptionEn: "Local node-based image workflow engine; model-agnostic, natively supports SD/FLUX/Qwen/Hunyuan/Ideogram 4 and many more.",
    scenes: ["文生图", "图生图与编辑", "模型社区"],
    models: ["Stable Diffusion", "FLUX", "混元", "Qwen-Image", "Ideogram"],
    modelVersions: ["SD 1.5", "SDXL", "SD 3.5", "FLUX.1", "FLUX.2", "Qwen-Image", "HunyuanImage 3.0", "Ideogram 4.0"],
  },
  {
    id: "fooocus",
    name: "Fooocus",
    url: "https://github.com/lllyasviel/Fooocus",
    description: "本地一键式简易文生图工具（仿 Midjourney 体验），基于 SDXL 架构。",
    descriptionEn: "Local one-click text-to-image tool (Midjourney-like UX), built on the SDXL architecture.",
    scenes: ["本地工具", "文生图"],
    models: ["Stable Diffusion"],
    modelVersions: ["SDXL"],
  },
  {
    id: "tensor-art",
    name: "Tensor.Art",
    url: "https://tensor.art",
    description: "在线社区模型生成平台，支持 SD 1.5/SDXL/FLUX/SD 3.5 及海量社区微调与 LoRA。",
    descriptionEn: "Online community-model generation platform: SD 1.5/SDXL/FLUX/SD 3.5 plus countless community finetunes and LoRAs.",
    scenes: ["模型社区", "文生图"],
    models: ["Stable Diffusion", "FLUX"],
    modelVersions: ["SD 1.5", "SDXL", "SD 3.5", "FLUX.1"],
  },
  {
    id: "seaart",
    name: "SeaArt 海艺",
    url: "https://www.seaart.ai",
    description: "一站式 AI 图像/视频创作平台，聚合 GPT Image 2、Seedream 5.0 Pro、Nano Banana、FLUX、Qwen-Image。",
    descriptionEn: "All-in-one AI image/video platform aggregating GPT Image 2, Seedream 5.0 Pro, Nano Banana, FLUX and Qwen-Image.",
    scenes: ["聚合平台", "文生图", "人像写真", "电商与产品"],
    models: ["GPT-Image", "Seedream", "Nano Banana", "FLUX", "Qwen-Image"],
    modelVersions: ["GPT Image 2", "Seedream 5.0 Pro", "Nano Banana 2", "FLUX", "Qwen-Image 3.0"],
  },
  {
    id: "pixai",
    name: "PixAI",
    url: "https://pixai.art",
    description: "二次元动漫绘图社区（1500 万+ 用户），自有 Mio / Tsubaki 系列模型与社区 SD 系 LoRA。",
    descriptionEn: "Anime illustration community (15M+ users) with in-house Mio/Tsubaki models and community SD LoRAs.",
    scenes: ["插画创作", "模型社区"],
    models: ["PixAI 自研"],
    modelVersions: ["Mio.2", "Tsubaki.2"],
  },
  {
    id: "nightcafe",
    name: "NightCafe",
    url: "https://nightcafe.studio",
    description: "多模型聚合艺术平台：SD 1.5/SDXL/DALL-E 3/FLUX/Ideogram 等，每日免费积分。",
    descriptionEn: "Multi-model art platform: SD 1.5/SDXL/DALL-E 3/FLUX/Ideogram and more, with daily free credits.",
    scenes: ["文生图", "插画创作"],
    models: ["Stable Diffusion", "FLUX", "Ideogram"],
    modelVersions: ["SD 1.5", "SDXL", "FLUX.1", "Ideogram 3.0"],
  },
  {
    id: "getimg",
    name: "Getimg.ai",
    url: "https://getimg.ai",
    description: "在线图像生成/编辑工具包，支持 FLUX 3、Seedream 5.0 Pro、Qwen-Image、Nano Banana 2，API 友好。",
    descriptionEn: "Online image generation/editing toolkit with FLUX 3, Seedream 5.0 Pro, Qwen-Image and Nano Banana 2; API-friendly.",
    scenes: ["聚合平台", "文生图", "图生图与编辑", "电商与产品"],
    models: ["FLUX", "Seedream", "Qwen-Image", "Nano Banana"],
    modelVersions: ["FLUX 3", "FLUX.2", "Seedream 5.0 Pro", "Qwen-Image", "Nano Banana 2"],
  },
  {
    id: "picsart",
    name: "Picsart",
    url: "https://picsart.com",
    description: "设计编辑器内一站式 AI 图像生成，可选 59 个模型（FLUX.2 Pro、Ideogram、Recraft V4、Seedream、Imagen 4、GPT Image 等）。",
    descriptionEn: "One-stop AI image generation inside a design editor, with 59 models (FLUX.2 Pro, Ideogram, Recraft V4, Seedream, Imagen 4, GPT Image...).",
    scenes: ["海报与平面设计", "电商与产品"],
    models: ["FLUX", "Ideogram", "Recraft", "Seedream", "GPT-Image", "Nano Banana"],
    modelVersions: ["FLUX.2 Pro", "Ideogram 3.0", "Recraft V4", "Seedream 5.0", "Imagen 4", "GPT Image"],
  },
  {
    id: "magnific",
    name: "Freepik / Magnific",
    url: "https://www.freepik.com",
    description: "素材平台内置 AI 图像生成（2026 年品牌更名 Magnific），自研 Mystic / F Lite 与官方 FLUX.1 合作。",
    descriptionEn: "Stock platform with built-in AI generation (rebranded Magnific in 2026): in-house Mystic/F Lite plus official FLUX.1.",
    scenes: ["海报与平面设计", "电商与产品"],
    models: ["FLUX", "Magnific 自研"],
    modelVersions: ["Mystic", "F Lite", "FLUX.1"],
  },
  {
    id: "perplexity",
    name: "Perplexity",
    url: "https://www.perplexity.ai",
    description: "AI 搜索内的图像生成，2025 年起由 OpenAI GPT Image 驱动。",
    descriptionEn: "Image generation inside AI search, powered by OpenAI GPT Image since 2025.",
    scenes: ["文生图"],
    models: ["GPT-Image"],
    modelVersions: ["GPT Image"],
  },
  {
    id: "dreamina",
    name: "Dreamina",
    url: "https://dreamina.capcut.com",
    description: "字节国际版 AI 创作（与国内即梦同源），图像侧为 Seedream 5.0 系列。",
    descriptionEn: "ByteDance's international AI creation app (sibling of Jimeng); image side runs Seedream 5.0 series.",
    scenes: ["文生图", "人像写真"],
    models: ["Seedream"],
    modelVersions: ["Seedream 5.0"],
  },

];
