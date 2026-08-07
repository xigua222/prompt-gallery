import React, { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Artwork, Language } from './types';
import { artworks as originalArtworks } from './data';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { ArtworkGrid } from './components/ArtworkGrid';
import { ArtModal } from './components/ArtModal';
import { SubmitModal } from './components/SubmitModal';
import { AUTHOR_TO_MODEL, GENERAL_AUTHOR } from './modelMapping';
import { t } from './locales';

const LIKES_KEY = 'photoo_gallery_liked';
const LEGACY_LIKES_KEY = 'aura_liked_artworks';
const LANG_KEY = 'photoo_gallery_lang';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 每次加载时随机展示顺序（模块级，避免组件内状态误用）
const artworks = shuffleArray(originalArtworks);

function loadLikedIds(): Set<string> {
  try {
    // 从旧 key 迁移到新 key
    const legacy = localStorage.getItem(LEGACY_LIKES_KEY);
    if (legacy) {
      const parsed = new Set<string>(JSON.parse(legacy));
      localStorage.setItem(LIKES_KEY, legacy);
      localStorage.removeItem(LEGACY_LIKES_KEY);
      return parsed;
    }
    const saved = localStorage.getItem(LIKES_KEY);
    return saved ? new Set<string>(JSON.parse(saved)) : new Set();
  } catch {
    return new Set();
  }
}

function loadLang(): Language {
  try {
    return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'zh';
  } catch {
    return 'zh';
  }
}

export default function App() {
  const [lang, setLang] = useState<Language>(loadLang);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeModel, setActiveModel] = useState("All");
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(loadLikedIds);

  const labels = t[lang];
  const deferredQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    document.title = lang === 'zh'
      ? 'Photoo Prompt Gallery - AI 生成提示词画廊'
      : 'Photoo Prompt Gallery - AI Prompt Gallery';
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'en' ? 'zh' : 'en';
      localStorage.setItem(LANG_KEY, next);
      return next;
    });
  };

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedIds((prev) => {
      const newLikes = new Set(prev);
      if (newLikes.has(id)) {
        newLikes.delete(id);
      } else {
        newLikes.add(id);
      }
      localStorage.setItem(LIKES_KEY, JSON.stringify(Array.from(newLikes)));
      return newLikes;
    });
  };

  const filteredArtworks = useMemo(() => {
    const query = deferredQuery.toLowerCase();
    return artworks.filter((art) => {
      const matchesCategory =
        activeCategory === "All" ||
        (activeCategory === "Favorites" ? likedIds.has(art.id) : art.category === activeCategory);

      const matchesModel =
        activeModel === "All" ||
        (activeModel === GENERAL_AUTHOR
          ? art.author === GENERAL_AUTHOR
          : AUTHOR_TO_MODEL[art.author] === activeModel);

      const matchesSearch =
        query === "" ||
        art.title.toLowerCase().includes(query) ||
        (art.titleEn && art.titleEn.toLowerCase().includes(query)) ||
        art.prompt.toLowerCase().includes(query) ||
        art.author.toLowerCase().includes(query) ||
        art.tags.some(tag => tag.toLowerCase().includes(query));

      return matchesCategory && matchesModel && matchesSearch;
    });
  }, [activeCategory, activeModel, deferredQuery, likedIds]);

  const hasActiveFilters =
    searchQuery !== "" || activeCategory !== "All" || activeModel !== "All";

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setActiveModel("All");
  };

  return (
    <div className="min-h-screen selection:bg-stone-200">
      <Header
        lang={lang}
        labels={labels}
        onToggleLang={toggleLang}
        onOpenSubmit={() => setShowSubmit(true)}
      />

      <main className="max-w-7xl mx-auto px-6 py-8 lg:py-10">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 tracking-tight">
            Photoo <span className="font-sans font-light text-stone-400 text-2xl md:text-3xl">Prompt Gallery</span>
          </h2>
          <p className="mt-2 text-sm font-sans text-stone-500">
            {labels.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-5 mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={labels.searchPlaceholder}
          />

          <FilterBar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            activeModel={activeModel}
            onModelChange={setActiveModel}
            labels={labels}
          />
        </div>

        <ArtworkGrid
          artworks={filteredArtworks}
          lang={lang}
          likedIds={likedIds}
          onSelect={setSelectedArt}
          onToggleLike={toggleLike}
          labels={labels}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      </main>

      {/* AnimatePresence 置于条件渲染外层，保证关闭动画生效 */}
      <AnimatePresence>
        {selectedArt && (
          <ArtModal
            art={selectedArt}
            lang={lang}
            onClose={() => setSelectedArt(null)}
            isLiked={likedIds.has(selectedArt.id)}
            onToggleLike={() => toggleLike(selectedArt.id)}
          />
        )}
      </AnimatePresence>

      <SubmitModal
        isOpen={showSubmit}
        onClose={() => setShowSubmit(false)}
        lang={lang}
      />
    </div>
  );
}
