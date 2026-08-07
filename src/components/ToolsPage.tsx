import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { Header } from './Header';
import { SubmitModal } from './SubmitModal';
import { DisclaimerModal, DISCLAIMER_KEY } from './DisclaimerModal';
import { tools, toolScenes, toolModels, modelIcons, sceneIcons, getToolDomain, AIGCTool } from '../tools';
import { t } from '../locales';

const LANG_KEY = 'photoo_gallery_lang';

function loadLang(): Language {
  try {
    return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'zh';
  } catch {
    return 'zh';
  }
}

/** 工具网站图标：优先加载真实 favicon，失败时回退到首字母占位 */
function ToolFavicon({ tool }: { tool: AIGCTool }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="w-9 h-9 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 font-serif text-lg font-medium flex-shrink-0">
        {tool.name.charAt(0)}
      </div>
    );
  }
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${getToolDomain(tool.url)}&sz=64`}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex-shrink-0"
    />
  );
}

export default function ToolsPage() {
  const [lang, setLang] = useState<Language>(loadLang);
  const [activeScene, setActiveScene] = useState("All");
  const [activeModel, setActiveModel] = useState("All");
  const [showSubmit, setShowSubmit] = useState(false);
  const [pendingTool, setPendingTool] = useState<AIGCTool | null>(null);

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

  /** 外链跳转：已勾选「不再提示」则直接打开，否则弹出免责确认 */
  const handleOpenTool = (tool: AIGCTool) => {
    try {
      if (localStorage.getItem(DISCLAIMER_KEY) === '1') {
        window.open(tool.url, '_blank', 'noopener,noreferrer');
        return;
      }
    } catch {
      /* ignore */
    }
    setPendingTool(tool);
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
          <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto whitespace-nowrap scrollbar-none" aria-label={labels.toolsSearchScene}>
            <span className="text-[11px] font-semibold tracking-widest text-stone-400 uppercase mr-1 hidden md:inline-block flex-shrink-0">
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
            {toolScenes.map((scene) => {
              const SceneIcon = sceneIcons[scene] ?? Sparkles;
              return (
                <button
                  key={scene}
                  onClick={() => setActiveScene(scene)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all duration-300 rounded-full border flex-shrink-0 ${
                    activeScene === scene
                      ? "border-stone-400 bg-stone-100 text-stone-900"
                      : "border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                >
                  <SceneIcon size={12} />
                  {labels.sceneMap[scene] || scene}
                </button>
              );
            })}
          </nav>

          <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto whitespace-nowrap scrollbar-none" aria-label={labels.toolsSearchModel}>
            <span className="text-[11px] font-semibold tracking-widest text-stone-400 uppercase mr-1 hidden md:inline-block flex-shrink-0">
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
            {toolModels.map((model) => {
              const ModelIcon = modelIcons[model] ?? Sparkles;
              return (
                <button
                  key={model}
                  onClick={() => setActiveModel(model)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all duration-300 rounded-full border flex-shrink-0 ${
                    activeModel === model
                      ? "border-stone-400 bg-stone-100 text-stone-900"
                      : "border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                >
                  <ModelIcon size={12} />
                  {model}
                </button>
              );
            })}
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
              <button
                key={tool.id}
                onClick={() => handleOpenTool(tool)}
                className="group bg-white border border-stone-200 rounded-lg p-6 flex flex-col gap-3 transition-shadow duration-300 hover:shadow-lg text-left cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <ToolFavicon tool={tool} />
                    <h3 className="text-xl font-serif font-medium text-stone-900 leading-tight truncate">
                      {tool.name}
                    </h3>
                  </div>
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
                    {tool.models.map((model) => {
                      const Icon = modelIcons[model] ?? Sparkles;
                      return (
                        <span key={model} className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-50 border border-stone-200 rounded-full">
                          <Icon size={10} />
                          {model}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      <SubmitModal
        isOpen={showSubmit}
        onClose={() => setShowSubmit(false)}
        lang={lang}
      />

      <DisclaimerModal
        tool={pendingTool}
        lang={lang}
        onClose={() => setPendingTool(null)}
      />
    </div>
  );
}
