import fs from 'fs';
import path from 'path';

const promptsPath = 'projectnext/prompts.json';
const assetDir = 'public/images';
const dataPath = 'src/data.ts';

const raw = fs.readFileSync(promptsPath, 'utf-8');
const data = JSON.parse(raw);

const existingAssets = fs.readdirSync(assetDir).filter(f => /\.webp$/i.test(f));

/**
 * 查找与 imageKey 关联的图片文件。
 * 规则：匹配 `<key>.webp` 或 `<key>.<N>.webp`（N 为数字版本号），
 * 取版本号最大的文件。避免前缀匹配误命中旧版本文件（如 00008.webp 与 00008.2.webp）。
 */
function findAssetFile(imageKey) {
  if (!imageKey) return null;
  const candidates = existingAssets
    .filter(f => {
      if (f === `${imageKey}.webp`) return true;
      const suffix = f.slice(imageKey.length + 1);
      return f.startsWith(`${imageKey}.`) && /^\d+\.webp$/.test(suffix);
    })
    .sort((a, b) => {
      const va = a === `${imageKey}.webp` ? 0 : parseInt(a.split('.')[1], 10);
      const vb = b === `${imageKey}.webp` ? 0 : parseInt(b.split('.')[1], 10);
      return vb - va;
    });
  return candidates[0] || null;
}

function mapPlatform(platform) {
  const p = (platform || '').trim();
  if (p === 'Seed') return '豆包 / 即梦';
  if (p === 'GPT-Image' || p === 'GPT-Image2') return 'GPT-Image';
  if (p === 'Qwen-Image') return '千问';
  if (p === 'YB') return '元宝';
  if (p === 'Nano Banana 2') return 'Nano Banana 2';
  return p || '通用';
}

function mapCategory(catKey) {
  const map = {
    'light_portrait': '人像写真',
    'social_portrait': '人像写真',
    'mood_portrait': '人像写真',
    'practical_remix': '人像写真',
    'creative_remix': '人像写真',
    'avatar_redraw': '头像插画',
    'flash_film_portrait': '人像写真',
    'sweet_character_portrait': '人像写真',
    'narrative_scene': '场景插画',
    'cinematic_narrative': '场景插画',
    'storybook_scene': '场景插画',
    'handmade_texture': '手绘质感',
    'playful_character': '童趣角色',
    'graphic_layout': '平面设计',
    'graphic_poster': '平面设计',
    'editorial_panel': '出版漫画',
    'oriental_aesthetics': '东方美学',
    'style_experiment': '风格实验',
    'style_experiment_illustration': '风格实验',
    'object_display': '产品陈列',
    'spatial_build': '空间建筑'
  };
  return map[catKey] || '其他';
}

/**
 * 解析 WebP 尺寸，支持 VP8X（扩展）、VP8L（无损）、VP8（有损）三种格式。
 */
function getImageDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.length < 30) return null;
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') return null;

  const fourCC = buffer.toString('ascii', 12, 16);

  if (fourCC === 'VP8X') {
    // Canvas Width/Height Minus One：24 位小端，位于 offset 24 / 27
    const width = buffer.readUIntLE(24, 3) + 1;
    const height = buffer.readUIntLE(27, 3) + 1;
    return { width, height };
  }

  if (fourCC === 'VP8L') {
    // 无损：宽高打包在 offset 21-24（各 14 bit，-1 编码）
    const b0 = buffer[21], b1 = buffer[22], b2 = buffer[23], b3 = buffer[24];
    const width = 1 + (((b1 & 0x3F) << 8) | b0);
    const height = 1 + (((b3 & 0x0F) << 10) | (b2 << 2) | ((b1 & 0xC0) >> 6));
    return { width, height };
  }

  if (fourCC === 'VP8 ') {
    // 有损：帧头 start code 后 3 字节，宽高各 14 bit
    const b0 = buffer[26], b1 = buffer[27], b2 = buffer[28], b3 = buffer[29];
    const width = ((b1 & 0x3F) << 8) | b0;
    const height = ((b3 & 0x3F) << 8) | b2;
    return { width, height };
  }

  return null;
}

function deriveAspectRatio(width, height) {
  if (width > height) return 'landscape';
  if (width === height) return 'square';
  return 'portrait';
}

const allEntries = [];
if (data.entries && Array.isArray(data.entries)) allEntries.push(...data.entries);
if (data.draft_entries && Array.isArray(data.draft_entries)) allEntries.push(...data.draft_entries);

const artworks = [];
const usedIds = new Set();
const skipped = [];

for (const entry of allEntries) {
  if (!entry || !entry.id) continue;
  if (usedIds.has(entry.id)) continue;
  if (!entry.prompt || entry.prompt.trim() === '') {
    skipped.push(`${entry.id}: 无 prompt`);
    continue;
  }

  const imageKey = entry.image_key || entry.id;
  const assetFile = findAssetFile(imageKey);
  if (!assetFile) {
    skipped.push(`${entry.id}: 无对应图片（${imageKey}）`);
    continue;
  }

  usedIds.add(entry.id);

  const dimensions = getImageDimensions(path.join(assetDir, assetFile));
  const width = dimensions ? dimensions.width : 1200;
  const height = dimensions ? dimensions.height : 1600;

  artworks.push({
    id: entry.id,
    title: entry.zh_title || entry.en_title || entry.id,
    titleEn: entry.en_title || entry.zh_title || entry.id,
    category: mapCategory(entry.category_key),
    categoryKey: entry.category_key || '',
    aspectRatio: deriveAspectRatio(width, height),
    author: mapPlatform(entry.platform),
    imageUrl: `/images/${assetFile}`,
    prompt: entry.prompt,
    summary: entry.zh_summary || '',
    summaryEn: entry.en_summary || '',
    tags: (entry.tags || []).filter(t => t && t.trim() !== ''),
    width,
    height
  });
}

artworks.sort((a, b) => a.id.localeCompare(b.id));

const categories = [...new Set(artworks.map(a => a.category))];
const models = [...new Set(artworks.map(a => a.author))];

const output = `import { Artwork } from './types';

export const categories = ${JSON.stringify(categories)};

export const artworks: Artwork[] = ${JSON.stringify(artworks, null, 2)};

export const models = ${JSON.stringify(models)};
`;

fs.writeFileSync(dataPath, output, 'utf-8');
console.log(`Generated data.ts with ${artworks.length} artworks`);
if (skipped.length > 0) {
  console.log(`Skipped ${skipped.length} entries:`);
  skipped.forEach(s => console.log(`  - ${s}`));
}
