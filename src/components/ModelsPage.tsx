import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, Layers, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { Header } from './Header';
import { SubmitModal } from './SubmitModal';
import { models } from '../models';
import { tools, modelIcons, sceneIcons } from '../tools';
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

  const toolById = useMemo(() => new Map(tools.map(t => [t.id, t])), []);
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
          {models.map((model) => {
            const ModelIcon = modelIcons[model.name] ?? Sparkles;
            const highlighted = model.id === highlightId;
            return (
              <div
                key={model.id}
                id={`model-${model.id}`}
                className={`bg-white border rounded-lg p-6 flex flex-col gap-3 transition-shadow duration-300 hover:shadow-lg ${
                  highlighted ? "border-stone-900 ring-2 ring-stone-900" : "border-stone-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-stone-900 text-white flex items-center justify-center flex-shrink-0">
                    <ModelIcon size={20} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-serif font-medium text-stone-900 leading-tight">
                      {model.name}
                    </h3>
                    <p className="text-xs text-stone-500">{model.version}</p>
                  </div>
                </div>

                <p className="text-sm font-sans text-stone-500 leading-relaxed">
                  {lang === 'en' ? model.descriptionEn : model.description}
                </p>

                <div className="mt-auto flex flex-col gap-3 pt-3">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    <span className="text-stone-400">{labels.modelsDeveloper}</span>
                    <span className="text-stone-700 text-right truncate">{lang === 'en' ? model.developerEn : model.developer}</span>
                    <span className="text-stone-400">{labels.modelsRelease}</span>
                    <span className="text-stone-700 text-right flex items-center justify-end gap-1">
                      <CalendarDays size={11} className="text-stone-400" />
                      {model.releaseDate}
                    </span>
                    <span className="text-stone-400">{labels.modelsVersion}</span>
                    <span className="text-stone-700 text-right flex items-center justify-end gap-1 truncate">
                      <Layers size={11} className="text-stone-400 flex-shrink-0" />
                      {model.version}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {model.scenes.map((scene) => {
                      const SceneIcon = sceneIcons[scene] ?? Sparkles;
                      return (
                        <span key={scene} className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-stone-600 bg-stone-100 rounded-full">
                          <SceneIcon size={10} />
                          {labels.sceneMap[scene] || scene}
                        </span>
                      );
                    })}
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold tracking-widest text-stone-400 uppercase mb-1.5">
                      {labels.modelsPlatforms}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {model.platforms.map((pid) => {
                        const tool = toolById.get(pid);
                        return (
                          <Link
                            key={pid}
                            to={`/tools?tool=${pid}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-50 border border-stone-200 rounded-full hover:border-stone-900 hover:text-stone-900 transition-colors"
                          >
                            {tool?.name ?? pid}
                            <ArrowUpRight size={10} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
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
