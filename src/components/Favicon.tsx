import { useState } from 'react';

interface FaviconProps {
  /** 网站域名（不含协议，回退源用） */
  domain: string;
  /** 加载失败时的首字母占位 */
  fallbackText: string;
  /** 本地 logo 文件名（public/logos/，无扩展名）；不传则直接走远程源 */
  logoFile?: string;
  /** 尺寸（px，正方形） */
  size?: number;
  /** 额外样式 */
  className?: string;
}

type SourceStage = 'local' | 'horse' | 'google' | 'fallback';

/**
 * 品牌图标：优先加载本地自托管 logo（高清、确定正确），
 * 依次回退到 icon.horse 高清源、Google favicon、首字母占位。
 */
export function Favicon({ domain, fallbackText, logoFile, size = 36, className = "" }: FaviconProps) {
  const [stage, setStage] = useState<SourceStage>(logoFile ? 'local' : 'horse');

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

  const src = stage === 'local'
    ? `/logos/${logoFile}.png`
    : stage === 'horse'
      ? `https://icon.horse/icon/${domain}`
      : `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  const nextStage: Record<SourceStage, SourceStage> = {
    local: 'horse',
    horse: 'google',
    google: 'fallback',
    fallback: 'fallback',
  };

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      onError={() => setStage(nextStage[stage])}
      className={`rounded-lg bg-white border border-stone-200 flex-shrink-0 object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
