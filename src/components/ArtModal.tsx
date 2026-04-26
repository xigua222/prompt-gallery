import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Artwork, Language } from '../types';
import { Copy, Check, X, Heart, Tag } from 'lucide-react';
import { t } from '../locales';
import { getImageUrl } from '../utils';

interface ArtModalProps {
  art: Artwork;
  lang: Language;
  onClose: () => void;
  isLiked?: boolean;
  onToggleLike?: () => void;
}

export function ArtModal({ art, lang, onClose, isLiked, onToggleLike }: ArtModalProps) {
  const [copied, setCopied] = useState(false);
  const labels = t[lang];
  const displayTitle = lang === 'en' && art.titleEn ? art.titleEn : art.title;
  const displaySummary = lang === 'en' && art.summaryEn ? art.summaryEn : art.summary;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(art.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 bg-stone-100/90 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden border border-stone-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/50 backdrop-blur-md rounded-full transition-colors md:hidden"
          >
            <X size={20} />
          </button>

          <div className="w-full md:w-3/5 lg:w-2/3 bg-stone-100 flex items-center justify-center overflow-hidden">
            <img
              src={getImageUrl(art.imageUrl)}
              alt={displayTitle}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          <div className="w-full md:w-2/5 lg:w-1/3 flex flex-col h-full max-h-[50vh] md:max-h-[90vh] overflow-y-auto">
            <div className="hidden md:flex justify-end p-6 pb-0">
              <button
                onClick={onClose}
                className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
                title="Close"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 p-6 md:p-10 flex flex-col">
              <span className="text-xs font-semibold tracking-[0.2em] text-stone-400 uppercase mb-3">
                {labels.categoryMap[art.category] || art.category}
              </span>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 leading-tight">
                  {displayTitle}
                </h2>
                {onToggleLike && (
                  <button
                    onClick={onToggleLike}
                    className={`p-2.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                      isLiked
                        ? "text-red-500 bg-red-50 hover:bg-red-100"
                        : "text-stone-400 hover:text-stone-900 hover:bg-stone-100"
                    }`}
                    aria-label={isLiked ? labels.unlike : labels.like}
                  >
                    <Heart size={22} className={`transition-all duration-300 ${isLiked ? 'fill-current scale-110' : 'scale-100'}`} />
                  </button>
                )}
              </div>

              {displaySummary && (
                <p className="text-sm font-sans text-stone-500 mb-2 italic">
                  {displaySummary}
                </p>
              )}

              <p className="text-sm font-sans text-stone-500 mb-6">
                {labels.generatedBy} {art.author}
              </p>

              {art.tags && art.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {art.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-stone-500 bg-stone-100 rounded-full">
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-semibold tracking-widest text-stone-900 uppercase">
                    {labels.promptTitle}
                  </h3>
                </div>

                <div className="relative group">
                  <p className="text-stone-700 leading-relaxed font-sans text-sm p-5 bg-stone-50 border border-stone-200 rounded-sm max-h-64 overflow-y-auto">
                    {art.prompt}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-100">
                <button
                  onClick={handleCopy}
                  className={`w-full flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium tracking-wide transition-all duration-300 ${
                    copied
                      ? "bg-green-800 text-white"
                      : "bg-stone-900 text-stone-50 hover:bg-stone-800 hover:text-white"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={18} />
                      {labels.copied}
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      {labels.copyPrompt}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
