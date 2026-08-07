import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CalendarDays, ExternalLink, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { Header } from './Header';
import { SubmitModal } from './SubmitModal';
import { Favicon } from './Favicon';
import { modelFamilies } from '../models';
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

export default function ModelDetailPage() {
  const { familyId } = useParams<{ familyId: string }>();
  const [lang, setLang] = useState<Language>(loadLang);
  const [showSubmit, setShowSubmit] = useState(false);
  const labels = t[lang];

  const family = modelFamilies.find(f => f.id === familyId);
  const toolById = new Map(tools.map(t => [t.id, t]));

  useEffect(() => {
    document.title = family
      ? `${family.name} - AIGC 模型库 - Photoo Prompt Gallery`
      : 'AIGC 模型库 - Photoo Prompt Gallery';
  }, [lang, family]);

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'en' ? 'zh' : 'en';
      localStorage.setItem(LANG_KEY, next);
      return next;
    });
  };

  if (!family) {
    return (
      <div className="min-h-screen selection:bg-stone-200">
        <Header lang={lang} labels={labels} onToggleLang={toggleLang} onOpenSubmit={() => setShowSubmit(true)} />
        <main className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-stone-400 font-serif text-xl italic">{labels.modelsNoResult}</p>
          <Link to="/models" className="inline-flex items-center gap-1.5 mt-6 text-sm text-stone-600 hover:text-stone-900 underline underline-offset-4">
            <ArrowLeft size={14} />
            {labels.modelsBack}
          </Link>
        </main>
        <SubmitModal isOpen={showSubmit} onClose={() => setShowSubmit(false)} lang={lang} />
      </div>
    );
  }

  const activeCount = family.versions.filter(v => v.active).length;

  return (
    <div className="min-h-screen selection:bg-stone-200">
      <Header
        lang={lang}
        labels={labels}
        onToggleLang={toggleLang}
        onOpenSubmit={() => setShowSubmit(true)}
      />

      <main className="max-w-5xl mx-auto px-6 py-10 lg:py-12">
        <Link
          to="/models"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          {labels.modelsBack}
        </Link>

        <div className="bg-white border border-stone-200 rounded-lg p-6 md:p-8 mb-8">
          <div className="flex items-start gap-4">
            <Favicon domain={family.logoDomain} fallbackText={family.name} size={56} />
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 tracking-tight">
                {family.name}
              </h1>
              <p className="mt-1 text-sm text-stone-500">
                {labels.modelsDeveloper}：{lang === 'en' ? family.developerEn : family.developer}
              </p>
            </div>
            {family.apiDocs && (
              <a
                href={family.apiDocs}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-stone-200 rounded-full text-stone-600 hover:text-stone-900 hover:border-stone-400 transition-colors flex-shrink-0"
              >
                <ExternalLink size={14} />
                {labels.modelsApiDocs}
              </a>
            )}
          </div>

          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            {lang === 'en' ? family.introEn : family.intro}
          </p>

          {family.apiDocs && (
            <a
              href={family.apiDocs}
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden inline-flex items-center gap-1.5 mt-4 text-sm text-stone-600 hover:text-stone-900 underline underline-offset-4"
            >
              <ExternalLink size={14} />
              {labels.modelsApiDocs}
            </a>
          )}

          <div className="mt-6 pt-6 border-t border-stone-100">
            <p className="text-[11px] font-semibold tracking-widest text-stone-400 uppercase mb-2">
              {labels.modelsPlatforms}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {family.platforms.map((pid) => {
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

        <div className="mb-6 flex items-baseline gap-3">
          <h2 className="text-xl font-serif font-medium text-stone-900">
            {labels.modelsFamily}
          </h2>
          <span className="text-xs text-stone-400">
            {family.versions.length} {labels.modelsVersions} · {activeCount} {labels.modelsActive}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {[...family.versions].reverse().map((version) => (
            <div
              key={version.id}
              id={`version-${version.id}`}
              className={`bg-white border rounded-lg p-6 ${
                version.active ? "border-stone-900/60 ring-1 ring-stone-900/10" : "border-stone-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h3 className="text-lg font-serif font-medium text-stone-900">
                  {version.name}
                </h3>
                {version.active && (
                  <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-full">
                    {labels.modelsActive}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                  <CalendarDays size={12} className="text-stone-400" />
                  {version.releaseDate}
                </span>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed">
                {lang === 'en' ? version.descriptionEn : version.description}
              </p>

              {version.apiPricing && (
                <div className="mt-3 inline-flex items-start gap-2 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2">
                  <span className="text-[11px] font-semibold tracking-widest text-stone-400 uppercase pt-0.5">
                    {labels.modelsApiPricing}
                  </span>
                  <span className="text-xs text-stone-600">
                    {lang === 'en' ? version.apiPricingEn : version.apiPricing}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 mt-3">
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
            </div>
          ))}
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
