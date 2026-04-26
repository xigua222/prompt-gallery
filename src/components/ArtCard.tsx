import React from 'react';
import { Artwork, Language } from '../types';
import { Heart } from 'lucide-react';
import { t } from '../locales';
import { getImageUrl } from '../utils';

interface ArtCardProps {
  art: Artwork;
  lang: Language;
  isLiked?: boolean;
  onToggleLike?: (e: React.MouseEvent) => void;
  onClick: (art: Artwork) => void;
}

export function ArtCard({ art, lang, isLiked, onToggleLike, onClick }: ArtCardProps) {
  const labels = t[lang];
  const displayTitle = lang === 'en' && art.titleEn ? art.titleEn : art.title;
  const aspectRatio = art.width && art.height ? art.width / art.height : 0.75;

  return (
    <div
      className="group relative cursor-pointer break-inside-avoid mb-8 overflow-hidden bg-stone-100 transition-shadow duration-300 hover:shadow-lg"
      onClick={() => onClick(art)}
      style={{ aspectRatio: aspectRatio }}
    >
      <img
        src={getImageUrl(art.imageUrl)}
        alt={displayTitle}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {(isLiked || onToggleLike) && (
        <button
          onClick={onToggleLike}
          className={`absolute top-4 right-4 z-10 p-2.5 rounded-full transition-all duration-200 md:opacity-0 group-hover:opacity-100
            ${isLiked ? 'opacity-100 text-red-500 bg-white/90 shadow-sm' : 'text-white hover:bg-white/20 bg-stone-900/20 backdrop-blur-sm'}
          `}
          aria-label={isLiked ? labels.unlike : labels.like}
        >
          <Heart size={18} className={`transition-transform duration-200 ${isLiked ? 'fill-current scale-110' : 'scale-100'}`} />
        </button>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-[10px] font-semibold tracking-widest text-white/80 uppercase mb-2 block drop-shadow-sm">
          {labels.categoryMap[art.category] || art.category}
        </span>
        <h3 className="text-xl font-serif text-white font-medium drop-shadow-md">
          {displayTitle}
        </h3>
      </div>
    </div>
  );
}
