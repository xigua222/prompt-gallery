import React from 'react';
import { Artwork, Language } from '../types';
import { ArtCard } from './ArtCard';
import { Labels } from '../locales';

interface ArtworkGridProps {
  artworks: Artwork[];
  lang: Language;
  likedIds: Set<string>;
  onSelect: (art: Artwork) => void;
  onToggleLike: (id: string, e?: React.MouseEvent) => void;
  labels: Labels;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function ArtworkGrid({ artworks, lang, likedIds, onSelect, onToggleLike, labels, hasActiveFilters, onClearFilters }: ArtworkGridProps) {
  if (artworks.length === 0) {
    return (
      <div className="text-center py-32 text-stone-400 font-serif text-xl italic flex flex-col items-center gap-4">
        <span className="text-3xl text-stone-300">~</span>
        <p>{labels.noArtworks}</p>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm font-sans tracking-wider uppercase underline underline-offset-4 hover:text-stone-900 transition-colors mt-2"
          >
            {labels.clearFilters}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-5">
      {artworks.map((art) => (
        <div key={art.id} className="break-inside-avoid">
          <ArtCard
            art={art}
            lang={lang}
            onClick={onSelect}
            isLiked={likedIds.has(art.id)}
            onToggleLike={(e) => onToggleLike(art.id, e)}
          />
        </div>
      ))}
    </div>
  );
}
