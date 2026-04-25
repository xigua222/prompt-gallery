import React, { useState, useMemo } from 'react';
import { Artwork, Language } from './types';
import { artworks as originalArtworks, categories, models } from './data';
import { ArtCard } from './components/ArtCard';
import { ArtModal } from './components/ArtModal';
import { Search, X, Github, ExternalLink } from 'lucide-react';
import { t } from './locales';

const NAV_CATEGORIES = ["All", ...categories, "Favorites"];
const GITHUB_REPO = 'xi-lab/aura-gallery';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeModel, setActiveModel] = useState("All");
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [artworks] = useState<Artwork[]>(() => shuffleArray(originalArtworks));

  const labels = t[lang];

  const [likedIds, setLikedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('aura_liked_artworks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedIds((prev) => {
      const newLikes = new Set(prev);
      if (newLikes.has(id)) {
        newLikes.delete(id);
      } else {
        newLikes.add(id);
      }
      localStorage.setItem('aura_liked_artworks', JSON.stringify(Array.from(newLikes)));
      return newLikes;
    });
  };

  const filteredArtworks = useMemo(() => {
    return artworks.filter((art) => {
      const matchesCategory =
        activeCategory === "All" ||
        (activeCategory === "Favorites" ? likedIds.has(art.id) : art.category === activeCategory);

      const matchesModel =
        activeModel === "All" || art.author === activeModel;

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        query === "" ||
        art.title.toLowerCase().includes(query) ||
        (art.titleEn && art.titleEn.toLowerCase().includes(query)) ||
        art.prompt.toLowerCase().includes(query) ||
        art.author.toLowerCase().includes(query) ||
        art.tags.some(tag => tag.toLowerCase().includes(query));

      return matchesCategory && matchesModel && matchesSearch;
    });
  }, [activeCategory, activeModel, searchQuery, likedIds]);

  const submitUrl = `https://github.com/${GITHUB_REPO}/issues/new?labels=submission,pending&template=submit.md&title=[投稿]+`;

  return (
    <div className="min-h-screen selection:bg-stone-200">
      <header className="pt-12 pb-6 px-6 border-b border-stone-200/50 bg-[#FAFAFA]/80 backdrop-blur-lg sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 tracking-tight">
              Photoo <span className="font-sans font-light text-stone-400 text-2xl md:text-3xl">Prompt Gallery</span>
            </h1>
            <p className="mt-2 text-xs font-sans tracking-wide text-stone-500 uppercase">
              {labels.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={submitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex px-4 h-10 items-center justify-center gap-2 rounded-full border border-stone-200 bg-white/50 text-stone-500 hover:text-stone-900 hover:border-stone-400 transition-all flex-shrink-0 text-sm font-medium"
            >
              <ExternalLink size={16} />
              {labels.submit}
            </a>
            <a
              href={`https://github.com/${GITHUB_REPO}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-200 bg-white/50 text-stone-500 hover:text-stone-900 hover:border-stone-400 transition-all flex-shrink-0"
              title={labels.github}
            >
              <Github size={18} />
            </a>
            <button
              onClick={() => setLang(l => l === 'en' ? 'zh' : 'en')}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-200 bg-white/50 text-stone-500 hover:text-stone-900 hover:border-stone-400 transition-all flex-shrink-0"
              title="Toggle Language"
            >
              <span className="text-xs font-semibold font-sans">{lang === 'en' ? '中' : 'EN'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="flex flex-col gap-6 mb-12">
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder={labels.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-200 rounded-full py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all placeholder:text-stone-400/70 block"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4 w-full">
            <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
              {NAV_CATEGORIES.map((catKey) => (
                <button
                  key={catKey}
                  onClick={() => setActiveCategory(catKey)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    activeCategory === catKey
                      ? "bg-stone-900 text-white"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-200/50"
                  }`}
                >
                  {labels.categoryMap[catKey] || catKey}
                </button>
              ))}
            </nav>

            <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[11px] font-semibold tracking-widest text-stone-400 uppercase mr-1 hidden md:inline-block">
                {labels.modelFilter}
              </span>
              <button
                onClick={() => setActiveModel("All")}
                className={`px-3 py-1.5 text-xs font-medium transition-all duration-300 rounded-full border ${
                  activeModel === "All"
                    ? "border-stone-400 bg-stone-100 text-stone-900"
                    : "border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                {labels.allModels}
              </button>
              {models.map((model) => (
                <button
                  key={model}
                  onClick={() => setActiveModel(model)}
                  className={`px-3 py-1.5 text-xs font-medium transition-all duration-300 rounded-full border ${
                    activeModel === model
                      ? "border-stone-400 bg-stone-100 text-stone-900"
                      : "border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                >
                  {model}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
          {filteredArtworks.map((art) => (
            <div key={art.id} className="break-inside-avoid">
              <ArtCard
                art={art}
                lang={lang}
                onClick={setSelectedArt}
                isLiked={likedIds.has(art.id)}
                onToggleLike={(e) => toggleLike(art.id, e)}
              />
            </div>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-32 text-stone-400 font-serif text-xl italic flex flex-col items-center gap-4">
            <span className="text-3xl text-stone-300">~</span>
            <p>{labels.noArtworks}</p>
            {(searchQuery || activeCategory !== "All" || activeModel !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                  setActiveModel("All");
                }}
                className="text-sm font-sans tracking-wider uppercase underline underline-offset-4 hover:text-stone-900 transition-colors mt-2"
              >
                {labels.clearFilters}
              </button>
            )}
          </div>
        )}
      </main>

      {selectedArt && (
        <ArtModal
          art={selectedArt}
          lang={lang}
          onClose={() => setSelectedArt(null)}
          isLiked={likedIds.has(selectedArt.id)}
          onToggleLike={() => toggleLike(selectedArt.id)}
        />
      )}
    </div>
  );
}
