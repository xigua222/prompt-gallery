import { categories } from '../data';
import { Labels } from '../locales';
import { modelFamilies } from '../models';
import { AUTHOR_TO_MODEL, GENERAL_AUTHOR } from '../modelMapping';
import { Favicon } from './Favicon';

const NAV_CATEGORIES = ["All", ...categories, "Favorites"];

/** 画廊在用的模型家族（去重，顺序稳定） */
const galleryModels = [...new Set(Object.values(AUTHOR_TO_MODEL))]
  .map(id => modelFamilies.find(f => f.id === id))
  .filter((f): f is NonNullable<typeof f> => Boolean(f));

interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeModel: string;
  onModelChange: (model: string) => void;
  labels: Labels;
}

export function FilterBar({ activeCategory, onCategoryChange, activeModel, onModelChange, labels }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
        {NAV_CATEGORIES.map((catKey) => (
          <button
            key={catKey}
            onClick={() => onCategoryChange(catKey)}
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
          onClick={() => onModelChange("All")}
          className={`px-3 py-1.5 text-xs font-medium transition-all duration-300 rounded-full border ${
            activeModel === "All"
              ? "border-stone-400 bg-stone-100 text-stone-900"
              : "border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-100"
          }`}
        >
          {labels.allModels}
        </button>
        {galleryModels.map((family) => (
          <button
            key={family.id}
            onClick={() => onModelChange(family.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all duration-300 rounded-full border ${
              activeModel === family.id
                ? "border-stone-400 bg-stone-100 text-stone-900"
                : "border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-100"
            }`}
          >
            <Favicon domain={family.logoDomain} logoFile={family.logoFile} fallbackText={family.name} size={18} />
            {family.name}
          </button>
        ))}
        <button
          onClick={() => onModelChange(GENERAL_AUTHOR)}
          className={`px-3 py-1.5 text-xs font-medium transition-all duration-300 rounded-full border ${
            activeModel === GENERAL_AUTHOR
              ? "border-stone-400 bg-stone-100 text-stone-900"
              : "border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-100"
          }`}
        >
          {labels.generalModel}
        </button>
      </nav>
    </div>
  );
}
