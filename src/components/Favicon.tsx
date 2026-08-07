import { useState } from 'react';

interface FaviconProps {
  /** 网站域名（不含协议） */
  domain: string;
  /** 加载失败时的首字母占位 */
  fallbackText: string;
  /** 尺寸（px，正方形） */
  size?: number;
  /** 额外样式 */
  className?: string;
}

type SourceStage = 'horse' | 'google' | 'fallback';

/**
 * 品牌图标：优先加载高清图标（icon.horse，源自网站 apple-touch-icon 等高清资源），
 * 依次回退到 Google favicon 服务、首字母占位，保证任何情况都有清晰可用的图标。
 */
export function Favicon({ domain, fallbackText, size = 36, className = "" }: FaviconProps) {
  const [stage, setStage] = useState<SourceStage>('horse');

  if (stage === 'fallback') {
    return (
      <div
        className={`rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 font-serif font-medium flex-shrink-0 ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.5 }}
      >
        {fallbackText.charAt(0)}
      </div>
    );
  }

  const src = stage === 'horse'
    ? `https://icon.horse/icon/${domain}`
    : `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      onError={() => setStage(stage === 'horse' ? 'google' : 'fallback')}
      className={`rounded-lg bg-white border border-stone-200 flex-shrink-0 object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
