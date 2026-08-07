/**
 * 画廊数据（art.author）→ 模型库家族（modelFamilies.id）映射
 * 用于画廊模型筛选与模型库、工具导航打通
 */
export const AUTHOR_TO_MODEL: Record<string, string> = {
  "豆包 / 即梦": "seedream",
  "GPT-Image": "gpt-image",
  "Nano Banana 2": "nano-banana",
  "千问": "qwen-image",
  "元宝": "hunyuan",
};

/** 无对应模型的作者（通用分类），保留独立筛选项 */
export const GENERAL_AUTHOR = "General";
