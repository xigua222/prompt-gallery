/**
 * AIGC 工具导航站数据
 * 收录图像生成相关的工具/平台。基于公开信息整理，可按需增删修改。
 * 维护方式：直接编辑本文件即可，无需运行生成脚本。
 */

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
  /** 模型标签：Midjourney / Stable Diffusion / FLUX / GPT-Image / Nano Banana / Seedream / Qwen-Image / 混元 / Ideogram / Recraft / Firefly 等 */
  models: string[];
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
  "自研模型",
] as const;

export const tools: AIGCTool[] = [
  {
    id: "midjourney",
    name: "Midjourney",
    url: "https://www.midjourney.com",
    description: "顶级质感文生图平台，以艺术审美和细节表现著称，适合插画、概念设计与艺术创作。",
    descriptionEn: "Premium text-to-image platform known for artistic quality and detail, ideal for illustration and concept art.",
    scenes: ["文生图", "插画创作"],
    models: ["Midjourney"],
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    url: "https://stability.ai",
    description: "开源图像生成模型生态，支持本地部署与精细控制（LoRA、ControlNet），社区资源极其丰富。",
    descriptionEn: "Open-source image generation ecosystem with local deployment, fine control (LoRA, ControlNet) and a huge community.",
    scenes: ["文生图", "图生图与编辑", "模型社区"],
    models: ["Stable Diffusion"],
  },
  {
    id: "flux",
    name: "FLUX",
    url: "https://blackforestlabs.ai",
    description: "Black Forest Labs 出品的高质量文生图模型，文字渲染与真实感表现优秀，开源可本地部署。",
    descriptionEn: "High-quality text-to-image models from Black Forest Labs with excellent typography and realism, open-weights for local use.",
    scenes: ["文生图", "图生图与编辑"],
    models: ["FLUX"],
  },
  {
    id: "chatgpt-image",
    name: "ChatGPT 图像",
    url: "https://chatgpt.com",
    description: "GPT-Image 对话式生图，指令理解能力强，擅长精准改图与多轮编辑，自带免费额度。",
    descriptionEn: "Conversational GPT-Image generation with strong instruction following, precise editing and free tier access.",
    scenes: ["文生图", "图生图与编辑", "海报与平面设计"],
    models: ["GPT-Image"],
  },
  {
    id: "gemini",
    name: "Gemini",
    url: "https://gemini.google.com",
    description: "Google 多模态助手，Nano Banana（2.5 Flash Image）生图模型擅长真实照片风格与多轮编辑。",
    descriptionEn: "Google multimodal assistant; the Nano Banana (2.5 Flash Image) model excels at photorealistic output and iterative editing.",
    scenes: ["文生图", "图生图与编辑", "人像写真"],
    models: ["Nano Banana"],
  },
  {
    id: "jimeng",
    name: "豆包 / 即梦",
    url: "https://jimeng.jianying.com",
    description: "字节跳动图像与视频生成平台，Seedream 系列模型，人像写真与中文场景表现出色。",
    descriptionEn: "ByteDance image & video generation platform powered by Seedream, strong at portraits and Chinese-context scenes.",
    scenes: ["文生图", "人像写真", "插画创作"],
    models: ["Seedream"],
  },
  {
    id: "tongyi-wanxiang",
    name: "通义万相",
    url: "https://tongyi.aliyun.com/wanxiang",
    description: "阿里云通义图像生成，万相 / Qwen-Image 模型，支持创意海报与电商素材生成。",
    descriptionEn: "Alibaba Tongyi image generation with Qwen-Image / Wanxiang models, good for posters and e-commerce assets.",
    scenes: ["文生图", "海报与平面设计", "电商与产品"],
    models: ["Qwen-Image"],
  },
  {
    id: "hunyuan",
    name: "腾讯混元 / 元宝",
    url: "https://yuanbao.tencent.com",
    description: "腾讯混元图像生成，集成于元宝 App 与网页端，中文理解与生成稳定。",
    descriptionEn: "Tencent Hunyuan image generation, available in the Yuanbao app and web, reliable Chinese-language generation.",
    scenes: ["文生图", "人像写真"],
    models: ["混元"],
  },
  {
    id: "ideogram",
    name: "Ideogram",
    url: "https://ideogram.ai",
    description: "文字排版能力领先的文生图平台，海报、Logo 与带字设计场景表现突出。",
    descriptionEn: "Text-to-image platform with industry-leading typography, great for posters, logos and text-heavy designs.",
    scenes: ["文生图", "海报与平面设计"],
    models: ["Ideogram"],
  },
  {
    id: "recraft",
    name: "Recraft",
    url: "https://www.recraft.ai",
    description: "面向设计师的生成工具，矢量插画与品牌视觉（Logo、图标）一键生成。",
    descriptionEn: "Designer-focused generation tool for vector illustrations and brand visuals (logos, icons) in one click.",
    scenes: ["插画创作", "海报与平面设计"],
    models: ["Recraft"],
  },
  {
    id: "leonardo",
    name: "Leonardo.Ai",
    url: "https://leonardo.ai",
    description: "游戏美术与概念设计平台，Phoenix 系列模型，素材与工作流工具丰富。",
    descriptionEn: "Game art and concept design platform with the Phoenix model family and rich asset/workflow tooling.",
    scenes: ["文生图", "插画创作", "图生图与编辑"],
    models: ["Phoenix", "FLUX"],
  },
  {
    id: "liblib",
    name: "LiblibAI 哩布哩布",
    url: "https://www.liblib.art",
    description: "国内最大的模型社区之一，在线运行 Stable Diffusion / FLUX 模型，海量 LoRA 与素材。",
    descriptionEn: "One of the largest Chinese model communities, running SD/FLUX online with massive LoRA and asset libraries.",
    scenes: ["模型社区", "文生图", "电商与产品"],
    models: ["Stable Diffusion", "FLUX"],
  },
  {
    id: "civitai",
    name: "Civitai",
    url: "https://civitai.com",
    description: "全球最大的开源模型分享社区，SD/FLUX 模型、LoRA 与工作流一站式获取。",
    descriptionEn: "The world's largest open-model sharing community for SD/FLUX checkpoints, LoRAs and workflows.",
    scenes: ["模型社区"],
    models: ["Stable Diffusion", "FLUX"],
  },
  {
    id: "krea",
    name: "Krea",
    url: "https://www.krea.ai",
    description: "实时生成与增强平台，图生图、局部重绘与视频增强，FLUX 在线可用。",
    descriptionEn: "Real-time generation and enhancement platform with image-to-image, inpainting and video upscaling on FLUX.",
    scenes: ["图生图与编辑", "文生图"],
    models: ["FLUX"],
  },
  {
    id: "canva",
    name: "Canva",
    url: "https://www.canva.com",
    description: "大众化设计平台，Magic Media 内置 AI 生图，海报与社媒素材模板化产出。",
    descriptionEn: "Mainstream design platform with Magic Media AI generation, templated posters and social assets.",
    scenes: ["海报与平面设计", "电商与产品"],
    models: ["自研模型"],
  },
  {
    id: "adobe-firefly",
    name: "Adobe Firefly",
    url: "https://firefly.adobe.com",
    description: "Adobe 官方生成式 AI，商用授权友好，与 Photoshop / Illustrator 生态深度集成。",
    descriptionEn: "Adobe's generative AI with commercial-friendly licensing, deeply integrated into Photoshop & Illustrator.",
    scenes: ["图生图与编辑", "海报与平面设计"],
    models: ["Firefly"],
  },
  {
    id: "whee",
    name: "WHEE（美图）",
    url: "https://www.whee.com",
    description: "美图旗下 AI 图像创作平台，文生图与电商商品图生成，适合国内场景。",
    descriptionEn: "Meitu's AI image creation platform for text-to-image and e-commerce product shots in Chinese scenarios.",
    scenes: ["文生图", "电商与产品", "人像写真"],
    models: ["自研模型"],
  },
  {
    id: "kimi-image",
    name: "Kimi 图像",
    url: "https://kimi.moonshot.cn",
    description: "月之暗面 Kimi 内置图像生成，中文理解与排版自然，支持对话式改图。",
    descriptionEn: "Moonshot Kimi's built-in image generation with natural Chinese understanding and conversational editing.",
    scenes: ["文生图", "海报与平面设计"],
    models: ["自研模型"],
  },
];
