import { categories, models } from '../data';
import { Labels } from '../locales';

const NAV_CATEGORIES = ["All", ...categories, "Favorites"];

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
        {models.map((model) => (
          <button
            key={model}
            onClick={() => onModelChange(model)}
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
  );
}
