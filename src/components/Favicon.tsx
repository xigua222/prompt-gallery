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

/** 品牌图标：优先加载网站 favicon，失败时回退到首字母占位 */
export function Favicon({ domain, fallbackText, size = 36, className = "" }: FaviconProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 font-serif font-medium flex-shrink-0 ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.5 }}
      >
        {fallbackText.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=${size * 2}`}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className={`rounded-lg bg-white border border-stone-200 flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
