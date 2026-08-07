import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, ShieldAlert, X } from 'lucide-react';
import { Language } from '../types';
import { AIGCTool, getToolDomain } from '../tools';
import { t } from '../locales';

export const DISCLAIMER_KEY = 'photoo_gallery_disclaimer';

/** 确认跳转后的倒计时秒数 */
const COUNTDOWN_SECONDS = 3;

interface DisclaimerModalProps {
  /** 待跳转的工具，null 时关闭 */
  tool: AIGCTool | null;
  lang: Language;
  onClose: () => void;
}

export function DisclaimerModal({ tool, lang, onClose }: DisclaimerModalProps) {
  const [dontAsk, setDontAsk] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const labels = t[lang];

  /** 用户手势内跳转（按钮点击）→ 新标签打开，弹窗拦截器不会阻止 */
  const jumpNow = () => {
    if (!tool) return;
    window.open(tool.url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  /** 倒计时结束自动跳转（非用户手势）→ 当前标签页跳转，避免被弹窗拦截器阻止 */
  const autoJump = () => {
    if (!tool) return;
    window.location.href = tool.url;
    onClose();
  };

  const handleConfirm = () => {
    if (!tool) return;
    if (dontAsk) {
      try {
        localStorage.setItem(DISCLAIMER_KEY, '1');
      } catch {
        /* ignore */
      }
    }
    setCountdown(COUNTDOWN_SECONDS);
  };

  // 倒计时归零后自动跳转
  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) {
      autoJump();
      return;
    }
    const timer = setTimeout(() => setCountdown(c => (c === null ? null : c - 1)), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  // 弹窗关闭或切换目标时重置倒计时，避免残留计时器继续触发跳转
  useEffect(() => {
    setCountdown(null);
  }, [tool]);

  return (
    <AnimatePresence>
      {tool && (
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
            className="relative w-full max-w-md bg-white shadow-2xl overflow-hidden border border-stone-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-stone-200">
              <h2 className="text-xl font-serif font-medium text-stone-900 flex items-center gap-2">
                <ShieldAlert size={20} className="text-amber-600" />
                {labels.disclaimerTitle}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
                aria-label={labels.close}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-stone-100">
                <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 font-serif text-lg font-medium flex-shrink-0">
                  {tool.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-stone-900 truncate">{tool.name}</p>
                  <p className="text-xs text-stone-500 truncate">{getToolDomain(tool.url)}</p>
                </div>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed">
                {labels.disclaimerDesc1} <span className="font-medium text-stone-900">{getToolDomain(tool.url)}</span>。
                <br />
                {labels.disclaimerDesc2}
              </p>

              <label className="flex items-center gap-2 mt-5 text-sm text-stone-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={dontAsk}
                  disabled={countdown !== null}
                  onChange={(e) => setDontAsk(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-400"
                />
                {labels.disclaimerDontAsk}
              </label>
            </div>

            <div className="flex justify-end items-center gap-3 p-6 pt-0">
              {countdown !== null && countdown > 0 && (
                <p className="text-xs text-stone-500 mr-auto">
                  {labels.disclaimerCountdown(getToolDomain(tool.url), countdown)}
                </p>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors"
              >
                {labels.disclaimerCancel}
              </button>
              {countdown === null ? (
                <button
                  onClick={handleConfirm}
                  className="flex items-center gap-2 px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <ExternalLink size={15} />
                  {labels.disclaimerContinue}
                </button>
              ) : (
                <button
                  onClick={jumpNow}
                  className="flex items-center gap-2 px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <ExternalLink size={15} />
                  {labels.disclaimerVisitNow(countdown)}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
