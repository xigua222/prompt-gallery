import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Upload, CheckCircle } from 'lucide-react';
import { categories, models } from '../data';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubmitModal({ isOpen, onClose }: SubmitModalProps) {
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
              <h2 className="text-2xl font-serif font-medium text-stone-900">投稿新提示词</h2>
              <button
                onClick={onClose}
                className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
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
                  点击下方按钮前往 GitHub 提交你的作品
                </p>
              </div>

              <div className="bg-stone-50 rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-stone-900">投稿流程</h3>
                <ol className="space-y-2 text-sm text-stone-600">
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-stone-200 text-stone-600 text-xs flex items-center justify-center">1</span>
                    <span>在 GitHub Issue 页面填写投稿信息</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-stone-200 text-stone-600 text-xs flex items-center justify-center">2</span>
                    <span>上传生成的图片（支持拖拽）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-stone-200 text-stone-600 text-xs flex items-center justify-center">3</span>
                    <span>提交 Issue 等待审核</span>
                  </li>
                </ol>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-700">
                    <p className="font-medium">审核通过后自动处理</p>
                    <p className="text-green-600 mt-1">图片自动压缩、数据自动更新、网站自动部署</p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-stone-500 space-y-1">
                <p><strong>可选分类：</strong>{categories.join('、')}</p>
                <p><strong>支持模型：</strong>{models.join('、')}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-stone-200 bg-stone-50">
              <button
                onClick={onClose}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors"
              >
                取消
              </button>
              <a
                href={issueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
              >
                <ExternalLink size={16} />
                前往 GitHub 投稿
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
