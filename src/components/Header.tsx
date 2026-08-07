import { Link, NavLink } from 'react-router-dom';
import { Language } from '../types';
import { Github, Plus } from 'lucide-react';
import { Labels } from '../locales';

const GITHUB_REPO = 'xigua222/prompt-gallery';

interface HeaderProps {
  lang: Language;
  labels: Labels;
  onToggleLang: () => void;
  onOpenSubmit: () => void;
}

export function Header({ lang, labels, onToggleLang, onOpenSubmit }: HeaderProps) {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `px-3.5 py-1.5 text-sm font-medium transition-all duration-300 rounded-full ${
      isActive
        ? "bg-stone-900 text-white"
        : "text-stone-500 hover:text-stone-900 hover:bg-stone-200/50"
    }`;

  return (
    <header className="pt-5 pb-4 px-6 border-b border-stone-200/50 bg-[#FAFAFA]/80 backdrop-blur-lg sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="block flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-serif font-medium text-stone-900 tracking-tight">
              Photoo <span className="font-sans font-light text-stone-400 text-lg md:text-xl">Prompt Gallery</span>
            </h1>
            <p className="mt-1 text-[11px] font-sans tracking-wide text-stone-500 uppercase">
              {labels.subtitle}
            </p>
          </Link>

          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main navigation">
            <NavLink to="/" end className={navClass}>
              {labels.galleryNav}
            </NavLink>
            <NavLink to="/tools" className={navClass}>
              {labels.toolsNav}
            </NavLink>
            <NavLink to="/models" className={navClass}>
              {labels.modelsNav}
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSubmit}
            className="hidden sm:flex px-4 h-9 items-center justify-center gap-2 rounded-full border border-stone-200 bg-white/50 text-stone-500 hover:text-stone-900 hover:border-stone-400 transition-all flex-shrink-0 text-sm font-medium"
          >
            <Plus size={15} />
            {labels.submit}
          </button>
          <a
            href={`https://github.com/${GITHUB_REPO}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-stone-200 bg-white/50 text-stone-500 hover:text-stone-900 hover:border-stone-400 transition-all flex-shrink-0"
            title={labels.github}
          >
            <Github size={17} />
          </a>
          <button
            onClick={onToggleLang}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-stone-200 bg-white/50 text-stone-500 hover:text-stone-900 hover:border-stone-400 transition-all flex-shrink-0"
            title={labels.toggleLanguage}
          >
            <span className="text-xs font-semibold font-sans">{lang === 'en' ? '中' : 'EN'}</span>
          </button>
        </div>
      </div>

      <nav className="md:hidden max-w-7xl mx-auto flex items-center gap-1.5 mt-3" aria-label="Main navigation">
        <NavLink to="/" end className={navClass}>
          {labels.galleryNav}
        </NavLink>
        <NavLink to="/tools" className={navClass}>
          {labels.toolsNav}
        </NavLink>
        <NavLink to="/models" className={navClass}>
          {labels.modelsNav}
        </NavLink>
      </nav>
    </header>
  );
}
