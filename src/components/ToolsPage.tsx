import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { Header } from './Header';
import { SubmitModal } from './SubmitModal';
import { tools, toolScenes, toolModels } from '../tools';
import { t } from '../locales';

const LANG_KEY = 'photoo_gallery_lang';

function loadLang(): Language {
  try {
    return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'zh';
  } catch {
    return 'zh';
  }
}

export default function ToolsPage() {
  const [lang, setLang] = useState<Language>(loadLang);
  const [activeScene, setActiveScene] = useState("All");
  const [activeModel, setActiveModel] = useState("All");
  const [showSubmit, setShowSubmit] = useState(false);

  const labels = t[lang];

  useEffect(() => {
    document.title = lang === 'zh'
      ? 'AIGC 工具导航 - Photoo Prompt Gallery'
      : 'AIGC Tool Directory - Photoo Prompt Gallery';
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'en' ? 'zh' : 'en';
      localStorage.setItem(LANG_KEY, next);
      return next;
    });
  };

  const filteredTools = useMemo(() => {
    return tools.filter(tool =>
      (activeScene === "All" || tool.scenes.includes(activeScene)) &&
      (activeModel === "All" || tool.models.includes(activeModel))
    );
  }, [activeScene, activeModel]);

  const hasFilters = activeScene !== "All" || activeModel !== "All";

  const clearFilters = () => {
    setActiveScene("All");
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

      <main className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 tracking-tight">
            {labels.toolsTitle}
          </h1>
          <p className="mt-2 text-sm font-sans text-stone-500">
            {labels.toolsSubtitle}
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-10">
          <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2" aria-label={labels.toolsSearchScene}>
            <span className="text-[11px] font-semibold tracking-widest text-stone-400 uppercase mr-1 hidden md:inline-block">
              {labels.toolsSearchScene}
            </span>
            <button
              onClick={() => setActiveScene("All")}
              className={`px-3 py-1.5 text-xs font-medium transition-all duration-300 rounded-full border ${
                activeScene === "All"
                  ? "border-stone-400 bg-stone-100 text-stone-900"
                  : "border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              {labels.toolsAll}
            </button>
            {toolScenes.map((scene) => (
              <button
                key={scene}
                onClick={() => setActiveScene(scene)}
                className={`px-3 py-1.5 text-xs font-medium transition-all duration-300 rounded-full border ${
                  activeScene === scene
                    ? "border-stone-400 bg-stone-100 text-stone-900"
                    : "border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                {labels.sceneMap[scene] || scene}
              </button>
            ))}
          </nav>

          <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2" aria-label={labels.toolsSearchModel}>
            <span className="text-[11px] font-semibold tracking-widest text-stone-400 uppercase mr-1 hidden md:inline-block">
              {labels.toolsSearchModel}
            </span>
            <button
              onClick={() => setActiveModel("All")}
              className={`px-3 py-1.5 text-xs font-medium transition-all duration-300 rounded-full border ${
                activeModel === "All"
                  ? "border-stone-400 bg-stone-100 text-stone-900"
                  : "border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              {labels.toolsAll}
            </button>
            {toolModels.map((model) => (
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

        {filteredTools.length === 0 ? (
          <div className="text-center py-24 text-stone-400 font-serif text-xl italic flex flex-col items-center gap-4">
            <span className="text-3xl text-stone-300">~</span>
            <p>{labels.toolsNoResult}</p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm font-sans tracking-wider uppercase underline underline-offset-4 hover:text-stone-900 transition-colors mt-2"
              >
                {labels.clearFilters}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-stone-200 rounded-lg p-6 flex flex-col gap-3 transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-serif font-medium text-stone-900 leading-tight">
                    {tool.name}
                  </h3>
                  <ExternalLink
                    size={16}
                    className="text-stone-400 group-hover:text-stone-900 transition-colors flex-shrink-0 mt-1"
                  />
                </div>

                <p className="text-sm font-sans text-stone-500 leading-relaxed">
                  {lang === 'en' ? tool.descriptionEn : tool.description}
                </p>

                <div className="mt-auto flex flex-col gap-2 pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {tool.scenes.map((scene) => (
                      <span key={scene} className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium text-stone-600 bg-stone-100 rounded-full">
                        {labels.sceneMap[scene] || scene}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tool.models.map((model) => (
                      <span key={model} className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-50 border border-stone-200 rounded-full">
                        <Sparkles size={10} />
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      <SubmitModal
        isOpen={showSubmit}
        onClose={() => setShowSubmit(false)}
        lang={lang}
      />
    </div>
  );
}
