export interface Artwork {
  id: string;
  title: string;
  titleEn: string;
  prompt: string;
  imageUrl: string;
  category: string;
  categoryKey: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  author: string;
  summary: string;
  summaryEn: string;
  tags: string[];
  width: number;
  height: number;
}

export type Language = 'en' | 'zh';
