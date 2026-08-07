import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CalendarDays, ChevronRight, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { Header } from './Header';
import { SubmitModal } from './SubmitModal';
import { Favicon } from './Favicon';
import { activeVersions } from '../models';
import { tools, sceneIcons } from '../tools';
import { t } from '../locales';

const LANG_KEY = 'photoo_gallery_lang';

function loadLang(): Language {
  try {
    return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'zh';
  } catch {
    return 'zh';
  }
}

export default function ModelsPage() {
  const [lang, setLang] = useState<Language>(loadLang);
  const [showSubmit, setShowSubmit] = useState(false);
  const [searchParams] = useSearchParams();
  const labels = t[lang];

  const toolById = new Map(tools.map(t => [t.id, t]));
  const highlightId = searchParams.get('model');

  useEffect(() => {
    document.title = lang === 'zh'
      ? 'AIGC 模型库 - Photoo Prompt Gallery'
      : 'AI Model Library - Photoo Prompt Gallery';
  }, [lang]);

  useEffect(() => {
    if (!highlightId) return;
    const timer = setTimeout(() => {
      document.getElementById(`model-${highlightId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
    return () => clearTimeout(timer);
  }, [highlightId]);

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'en' ? 'zh' : 'en';
      localStorage.setItem(LANG_KEY, next);
      return next;
    });
  };

  return (
    <div className="min-h-screen selection:bg-stone-200">
      <Header
        lang={lang}
        labels={labels}
        onToggleLang={toggleLang}
        onOpenSubmit={() => setShowSubmit(true)}
      />

      <main className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 tracking-tight">
            {labels.modelsTitle}
          </h1>
          <p className="mt-2 text-sm font-sans text-stone-500">
            {labels.modelsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeVersions.map(({ family, version }) => {
            const highlighted = family.id === highlightId;
            return (
              <Link
                key={version.id}
                id={`model-${family.id}`}
                to={`/models/${family.id}`}
                className={`group bg-white border rounded-lg p-6 flex flex-col gap-3 transition-shadow duration-300 hover:shadow-lg ${
                  highlighted ? "border-stone-900 ring-2 ring-stone-900" : "border-stone-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Favicon domain={family.logoDomain} logoFile={family.logoFile} fallbackText={family.name} size={44} />
                  <div className="min-w-0">
                    <h3 className="text-xl font-serif font-medium text-stone-900 leading-tight truncate">
                      {version.name}
                    </h3>
                    <p className="text-xs text-stone-500 flex items-center gap-1">
                      <CalendarDays size={11} className="text-stone-400" />
                      {version.releaseDate}
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="ml-auto text-stone-300 group-hover:text-stone-900 transition-colors flex-shrink-0"
                  />
                </div>

                <p className="text-sm font-sans text-stone-500 leading-relaxed">
                  {lang === 'en' ? version.descriptionEn : version.description}
                </p>

                {version.apiPrices && version.apiPrices.length > 0 && (
                  <p className="text-xs font-sans text-stone-400">
                    <span className="text-stone-500">
                      {lang === 'en' && version.apiPrices[0].labelEn ? version.apiPrices[0].labelEn : version.apiPrices[0].label}
                    </span>
                    {' · '}
                    <span className="font-medium text-stone-600">{version.apiPrices[0].price}</span>
                    {version.apiPrices.length > 1 && ` · +${version.apiPrices.length - 1} ${labels.modelsMoreTiers}`}
                  </p>
                )}

                <div className="mt-auto flex flex-col gap-2 pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {version.scenes.map((scene) => {
                      const SceneIcon = sceneIcons[scene] ?? Sparkles;
                      return (
                        <span key={scene} className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-stone-600 bg-stone-100 rounded-full">
                          <SceneIcon size={10} />
                          {labels.sceneMap[scene] || scene}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-stone-400">
                    {family.name} · {toolById.get(family.platforms[0])?.name ?? family.developer}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <SubmitModal
        isOpen={showSubmit}
        onClose={() => setShowSubmit(false)}
        lang={lang}
      />
    </div>
  );
}
