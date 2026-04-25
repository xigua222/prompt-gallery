import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Image as ImageIcon, Check, ExternalLink, Loader2 } from 'lucide-react';
import { categories, models } from '../data';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubmitModal({ isOpen, onClose }: SubmitModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    prompt: '',
    category: categories[0],
    author: models[0],
    tags: '',
    summary: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);

    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const maxWidth = 1200;
      const maxHeight = 1600;
      
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), {
            type: 'image/webp',
          });
          setImageFile(compressedFile);
          setImagePreview(URL.createObjectURL(blob));
          setCompressedSize(blob.size);
          setIsCompressing(false);
        }
      }, 'image/webp', 0.8);
    };
    
    img.src = URL.createObjectURL(file);
  };

  const generateIssueUrl = () => {
    const baseUrl = 'https://github.com/xigua222/prompt-gallery/issues/new';
    
    const title = encodeURIComponent(`[投稿] ${formData.title}`);
    
    const body = encodeURIComponent(`### 标题
${formData.title}

### 英文标题
${formData.titleEn || '(未填写)'}

### 提示词
\`\`\`
${formData.prompt}
\`\`\`

### 分类
${formData.category}

### 生成模型
${formData.author}

### 标签
${formData.tags || '(未填写)'}

### 简介
${formData.summary || '(未填写)'}

### 图片
${imageFile ? '👇 请在下方拖拽上传压缩后的图片' : '(请上传图片)'}

---
*投稿时间: ${new Date().toLocaleString('zh-CN')}*`);

    return `${baseUrl}?title=${title}&body=${body}`;
  };

  const handleSubmit = () => {
    const url = generateIssueUrl();
    window.open(url, '_blank');
  };

  const handleClose = () => {
    setFormData({
      title: '',
      titleEn: '',
      prompt: '',
      category: categories[0],
      author: models[0],
      tags: '',
      summary: '',
    });
    setImageFile(null);
    setImagePreview('');
    setCompressedSize(0);
    onClose();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  const isValid = formData.title.trim() && formData.prompt.trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-stone-100/90 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="relative w-full max-w-2xl max-h-[90vh] bg-white shadow-2xl overflow-hidden border border-stone-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-stone-200">
              <h2 className="text-2xl font-serif font-medium text-stone-900">投稿新提示词</h2>
              <button
                onClick={handleClose}
                className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[calc(90vh-180px)] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  图片上传
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center cursor-pointer hover:border-stone-400 transition-colors"
                >
                  {imagePreview ? (
                    <div className="space-y-3">
                      <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded" />
                      <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                        <Check size={16} />
                        已压缩: {formatSize(compressedSize)}
                      </div>
                      <p className="text-xs text-stone-500">点击更换图片</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {isCompressing ? (
                        <div className="flex items-center justify-center gap-2 text-stone-500">
                          <Loader2 size={24} className="animate-spin" />
                          压缩中...
                        </div>
                      ) : (
                        <>
                          <Upload size={32} className="mx-auto text-stone-400" />
                          <p className="text-stone-500">点击上传图片</p>
                          <p className="text-xs text-stone-400">支持 JPG、PNG，自动压缩为 WebP</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  标题 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                  placeholder="输入中文标题"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">英文标题</label>
                <input
                  type="text"
                  value={formData.titleEn}
                  onChange={e => setFormData({ ...formData, titleEn: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                  placeholder="English Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  提示词 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.prompt}
                  onChange={e => setFormData({ ...formData, prompt: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 min-h-[120px]"
                  placeholder="输入完整的 AI 生成提示词..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">分类</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">生成模型</label>
                  <select
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                  >
                    {models.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">标签</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={e => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                  placeholder="用逗号分隔，如：写真, 闪光灯, 韩系"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">简介</label>
                <textarea
                  value={formData.summary}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                  placeholder="简短描述这个提示词的特点..."
                  rows={2}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-stone-200 bg-stone-50">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className="flex items-center gap-2 px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ExternalLink size={16} />
                前往 GitHub 提交
              </button>
            </div>

            {imageFile && (
              <div className="px-6 pb-4 text-xs text-stone-500 text-center">
                提示：在 GitHub Issue 页面，将压缩后的图片拖拽到编辑框中即可上传
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
