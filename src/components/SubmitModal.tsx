import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Upload, CheckCircle } from 'lucide-react';
import { categories, models } from '../data';
import { Language } from '../types';
import { t } from '../locales';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export function SubmitModal({ isOpen, onClose, lang }: SubmitModalProps) {
  const labels = t[lang];
  const issueUrl = 'https://github.com/xigua222/prompt-gallery/issues/new?template=submit.yml&labels=submission,pending';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-stone-100/90 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="relative w-full max-w-lg bg-white shadow-2xl overflow-hidden border border-stone-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-stone-200">
              <h2 className="text-2xl font-serif font-medium text-stone-900">{labels.submitTitle}</h2>
              <button
                onClick={onClose}
                className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
                aria-label={labels.close}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 flex items-center justify-center">
                  <Upload size={32} className="text-stone-400" />
                </div>
                <p className="text-stone-600">
                  {labels.submitDescription}
                </p>
              </div>

              <div className="bg-stone-50 rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-stone-900">{labels.submitStepsTitle}</h3>
                <ol className="space-y-2 text-sm text-stone-600">
                  {[labels.submitStep1, labels.submitStep2, labels.submitStep3].map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-stone-200 text-stone-600 text-xs flex items-center justify-center">{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-700">
                    <p className="font-medium">{labels.submitAutoTitle}</p>
                    <p className="text-green-600 mt-1">{labels.submitAutoDesc}</p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-stone-500 space-y-1">
                <p><strong>{labels.submitCategories}</strong>{categories.join('、')}</p>
                <p><strong>{labels.submitModels}</strong>{models.join('、')}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-stone-200 bg-stone-50">
              <button
                onClick={onClose}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors"
              >
                {labels.submitCancel}
              </button>
              <a
                href={issueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
              >
                <ExternalLink size={16} />
                {labels.submitGoGitHub}
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
