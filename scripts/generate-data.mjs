import fs from 'fs';
import path from 'path';

const promptsPath = 'projectnext/prompts.json';
const assetDir = 'public/assets';
const dataPath = 'src/data.ts';

const raw = fs.readFileSync(promptsPath, 'utf-8');
const data = JSON.parse(raw);

const existingAssets = fs.readdirSync(assetDir).filter(f => /\.webp$/i.test(f));

function findAssetFile(imageKey) {
  if (!imageKey) return null;
  const found = existingAssets.find(f => f.startsWith(imageKey + '.'));
  return found ? `./assets/${found}` : null;
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

function getImageDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer[12] === 0x56 && buffer[13] === 0x50 && buffer[14] === 0x38) {
    const width = buffer.readUInt16LE(26);
    const height = buffer.readUInt16LE(28);
    return { width, height };
  }
  return null;
}

const allEntries = [];
if (data.entries && Array.isArray(data.entries)) allEntries.push(...data.entries);
if (data.draft_entries && Array.isArray(data.draft_entries)) allEntries.push(...data.draft_entries);

const artworks = [];
const usedIds = new Set();

for (const entry of allEntries) {
  if (!entry || !entry.id) continue;
  if (usedIds.has(entry.id)) continue;
  if (!entry.prompt || entry.prompt.trim() === '') continue;

  const imageUrl = findAssetFile(entry.image_key || entry.id);
  if (!imageUrl) continue;

  usedIds.add(entry.id);

  const assetFile = existingAssets.find(f => f.startsWith((entry.image_key || entry.id) + '.'));
  let dimensions = null;
  if (assetFile) {
    const dims = getImageDimensions(path.join(assetDir, assetFile));
    if (dims) dimensions = dims;
  }

  artworks.push({
    id: entry.id,
    title: entry.zh_title || entry.en_title || entry.id,
    titleEn: entry.en_title || entry.zh_title || entry.id,
    category: mapCategory(entry.category_key),
    categoryKey: entry.category_key || '',
    aspectRatio: 'portrait',
    author: mapPlatform(entry.platform),
    imageUrl: imageUrl,
    prompt: entry.prompt,
    summary: entry.zh_summary || '',
    summaryEn: entry.en_summary || '',
    tags: (entry.tags || []).filter(t => t && t.trim() !== ''),
    width: dimensions ? dimensions.width : 1200,
    height: dimensions ? dimensions.height : 1600
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
