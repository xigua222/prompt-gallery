import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import https from 'https';

const ISSUE_NUMBER = process.env.ISSUE_NUMBER;
const ISSUE_TITLE = process.env.ISSUE_TITLE || '';
const ISSUE_BODY = process.env.ISSUE_BODY || '';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'github-actions'
      }
    };
    https.get(url, options, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        https.get(response.headers.location, options, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }
    }).on('error', reject);
  });
}

function parseIssue(body) {
  const result = {
    title: '',
    titleEn: '',
    prompt: '',
    category: '人像写真',
    author: '豆包 / 即梦',
    tags: [],
    summary: '',
    imageUrl: ''
  };

  const titleMatch = body.match(/### 标题\s*\n+([^\n#]+)/);
  if (titleMatch) result.title = titleMatch[1].trim();

  const titleEnMatch = body.match(/### 英文标题\s*\n+([^\n#]+)/);
  if (titleEnMatch) result.titleEn = titleEnMatch[1].trim();

  const promptMatch = body.match(/### 提示词\s*\n+```text\s*\n([\s\S]*?)```/);
  if (promptMatch) {
    result.prompt = promptMatch[1].trim();
  }

  const categoryMatch = body.match(/### 分类\s*\n+([^\n#]+)/);
  if (categoryMatch) result.category = categoryMatch[1].trim();

  const modelMatch = body.match(/### 生成模型\s*\n+([^\n#]+)/);
  if (modelMatch) result.author = modelMatch[1].trim();

  const tagsMatch = body.match(/### 标签\s*\n+([^\n#]+)/);
  if (tagsMatch) {
    result.tags = tagsMatch[1].split(',').map(t => t.trim()).filter(Boolean);
  }

  const summaryMatch = body.match(/### 简介\s*\n+([^\n#]+)/);
  if (summaryMatch) result.summary = summaryMatch[1].trim();

  const imageMatch = body.match(/### 图片\s*\n+([^\n#]+)/);
  if (imageMatch && imageMatch[1].includes('http')) {
    result.imageUrl = imageMatch[1].trim();
  }

  const imageRegex = /!\[.*?\]\((https?:\/\/[^\s)]+)\)/g;
  const imageMatches = [...body.matchAll(imageRegex)];
  if (imageMatches.length > 0 && !result.imageUrl) {
    result.imageUrl = imageMatches[0][1];
  }

  return result;
}

function compressImage(inputPath, outputPath) {
  execSync(`ffmpeg -y -hide_banner -i "${inputPath}" -vf "scale='min(1200,iw)':-1" -q:v 75 "${outputPath}"`, { stdio: 'ignore' });
}

function generateId() {
  const existing = fs.readdirSync('public/assets')
    .filter(f => /^\d+\.webp$/.test(f))
    .map(f => parseInt(f.replace('.webp', '')));
  const max = existing.length > 0 ? Math.max(...existing) : 0;
  return String(max + 1).padStart(5, '0');
}

function updatePromptsJson(entry) {
  const promptsPath = 'projectnext/prompts.json';
  const data = JSON.parse(fs.readFileSync(promptsPath, 'utf-8'));
  
  if (!data.entries) data.entries = [];
  data.entries.push(entry);
  
  fs.writeFileSync(promptsPath, JSON.stringify(data, null, 2), 'utf-8');
}

async function main() {
  console.log('Processing submission from issue #' + ISSUE_NUMBER);
  
  const parsed = parseIssue(ISSUE_BODY);
  console.log('Parsed data:', JSON.stringify(parsed, null, 2));
  
  if (!parsed.title || !parsed.prompt) {
    console.error('Missing required fields: title or prompt');
    process.exit(1);
  }
  
  if (!parsed.imageUrl) {
    console.error('No image found in issue');
    process.exit(1);
  }
  
  const id = generateId();
  console.log('Generated ID:', id);
  
  const tempImage = `/tmp/${id}_temp`;
  const finalImage = `public/assets/${id}.webp`;
  
  console.log('Downloading image from:', parsed.imageUrl);
  await downloadFile(parsed.imageUrl, tempImage);
  
  console.log('Compressing image...');
  compressImage(tempImage, finalImage);
  
  const stats = fs.statSync(finalImage);
  console.log(`Compressed image size: ${(stats.size / 1024).toFixed(1)} KB`);
  
  const entry = {
    id: id,
    zh_title: parsed.title,
    en_title: parsed.titleEn || parsed.title,
    prompt: parsed.prompt,
    zh_summary: parsed.summary,
    en_summary: '',
    tags: parsed.tags,
    category_key: '',
    platform: parsed.author,
    image_key: id
  };
  
  console.log('Updating prompts.json...');
  updatePromptsJson(entry);
  
  console.log('Regenerating data.ts...');
  execSync('node scripts/generate-data.mjs', { stdio: 'inherit' });
  
  console.log('Done! Submission processed successfully.');
}

main().catch(console.error);
