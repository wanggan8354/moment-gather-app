import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, ImagePlus } from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { useAppStore } from '@/store/useAppStore';
import { categories } from '@/utils/mockData';

export default function Templates() {
  const navigate = useNavigate();
  const { templates, selectTemplate, startGenerating } = useAppStore();
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredTemplates = activeCategory === '全部'
    ? templates
    : templates.filter((t) => t.category === activeCategory);

  const handleUseTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      selectTemplate(template);
      startGenerating();
      navigate('/generating');
    }
  };

  const handleSelectAlbum = () => {
    if (templates.length > 0) {
      selectTemplate(templates[0]);
      startGenerating();
      navigate('/generating');
    }
  };

  const formatUsageCount = (count: number): string => {
    if (count >= 10000) {
      return `${(count / 10000).toFixed(1)}万次使用`;
    }
    return `${count}次使用`;
  };

  return (
    <MobileShell>
      <main className="flex flex-col min-h-screen">
        <header
          className="flex items-center justify-between px-4 py-3 sticky top-0 z-30"
          style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border-light)' }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-9 h-9 rounded-full transition-colors active:bg-[var(--color-bg-secondary)]"
            style={{ background: 'var(--color-bg-secondary)' }}
          >
            <ArrowLeft size={20} style={{ color: 'var(--color-text-primary)' }} />
          </button>
          <h1 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
            选择模板
          </h1>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full transition-colors active:bg-[var(--color-bg-secondary)]"
            style={{ background: 'var(--color-bg-secondary)' }}
          >
            <Search size={20} style={{ color: 'var(--color-text-primary)' }} />
          </button>
        </header>

        <nav className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar" style={{ background: 'var(--color-surface)' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                background: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
                color: activeCategory === cat ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
                boxShadow: activeCategory === cat ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </nav>

        <section className="flex-1 px-4 pt-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="rounded-2xl overflow-hidden"
                style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-md)' }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={template.coverImage} alt={template.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(45,31,20,0.5) 0%, transparent 50%)' }} />
                  <div
                    className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-0.5"
                    style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--color-primary-dark)' }}
                  >
                    <span style={{ color: 'var(--color-film-gold)' }}>★</span> {template.rating}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                    {template.name}
                  </h3>
                  <p className="text-xs mb-2 leading-relaxed italic" style={{ color: 'var(--color-text-tertiary)' }}>
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                      {formatUsageCount(template.usageCount)}
                    </span>
                    <button
                      onClick={() => handleUseTemplate(template.id)}
                      className="px-3 py-1 rounded-full text-xs font-medium transition-colors active:bg-[var(--color-primary)] active:text-white"
                      style={{ background: 'var(--color-primary-bg)', color: 'var(--color-primary-dark)' }}
                    >
                      使用
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <footer
          className="px-4 pb-6 pt-2 sticky bottom-0"
          style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border-light)' }}
        >
          <button
            onClick={handleSelectAlbum}
            className="w-full py-3.5 rounded-2xl text-base font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{
              background: 'var(--color-primary)',
              color: 'var(--color-text-inverse)',
              boxShadow: '0 4px 16px rgba(212, 132, 90, 0.3)',
            }}
          >
            <ImagePlus size={20} />
            选择相册照片
          </button>
        </footer>
      </main>
    </MobileShell>
  );
}
