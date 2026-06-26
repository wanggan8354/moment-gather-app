import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Play, ChevronRight, Film } from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { useAppStore } from '@/store/useAppStore';

export default function Home() {
  const navigate = useNavigate();
  const { user, works, templates } = useAppStore();

  const recommendedTemplates = templates.slice(0, 4);

  const handleWorkClick = (workId: string) => {
    navigate(`/preview/${workId}`);
  };

  const handleTemplateClick = () => {
    navigate('/templates');
  };

  return (
    <MobileShell>
      <main className="pb-4">
        <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ background: 'var(--color-bg)' }}>
          <div className="flex items-center gap-3">
            <div
              className="rounded-full overflow-hidden flex items-center justify-center text-white font-semibold text-sm"
              style={{
                width: 42,
                height: 42,
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                boxShadow: '0 0 0 3px var(--color-primary-bg), 0 0 0 5px var(--color-primary-light)',
              }}
            >
              {user.initial}
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>
                下午好
              </p>
              <p className="text-base font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                {user.name}
              </p>
            </div>
          </div>
          <button className="relative p-2 rounded-full transition-colors active:bg-[var(--color-bg-secondary)]" style={{ color: 'var(--color-text-secondary)' }}>
            <Bell size={22} />
            <span
              className="absolute"
              style={{
                width: 8,
                height: 8,
                background: 'var(--color-film-rose)',
                borderRadius: '50%',
                border: '2px solid var(--color-bg)',
                top: 4,
                right: 4,
              }}
            />
          </button>
        </div>

        <div className="px-5 pt-2 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #D4845A 0%, #E8A87C 40%, #C9A96E 100%)',
              boxShadow: '0 8px 32px rgba(212, 132, 90, 0.25)',
            }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-3 opacity-20">
              <div
                className="w-full h-full"
                style={{
                  background: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 8px, transparent 8px, transparent 16px)',
                }}
              />
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-3 opacity-20">
              <div
                className="w-full h-full"
                style={{
                  background: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 8px, transparent 8px, transparent 16px)',
                }}
              />
            </div>
            <div className="relative z-10 pl-2">
              <p
                className="text-xs font-medium tracking-wider uppercase mb-2"
                style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)' }}
              >
                AI 发现
              </p>
              <h2
                className="text-xl font-bold leading-snug mb-1"
                style={{ fontFamily: 'var(--font-body)', color: '#FFFFFF' }}
              >
                AI 为你发现了一段美好回忆
              </h2>
              <p
                className="text-sm mb-4"
                style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)' }}
              >
                基于你的照片和视频，自动生成专属电影
              </p>
              <button
                onClick={handleTemplateClick}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  color: 'var(--color-primary-dark)',
                  fontFamily: 'var(--font-body)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                查看
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="absolute right-4 top-3 opacity-10">
              <Film size={64} color="white" />
            </div>
          </motion.div>
        </div>

        <div className="mb-5">
          <div className="flex items-center justify-between px-5 mb-3">
            <h3
              className="text-base font-bold"
              style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', letterSpacing: '-0.01em' }}
            >
              最近作品
            </h3>
            <button
              className="flex items-center gap-0.5 text-xs font-medium"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
            >
              查看全部
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="relative">
            <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar" style={{ scrollSnapType: 'x mandatory' }}>
              {works.map((work, index) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => handleWorkClick(work.id)}
                  className="flex-shrink-0 rounded-2xl overflow-hidden active:scale-[0.97] transition-transform cursor-pointer"
                  style={{
                    width: 200,
                    scrollSnapAlign: 'start',
                    boxShadow: 'var(--shadow-md)',
                    background: 'var(--color-surface)',
                  }}
                >
                  <div className="relative" style={{ height: 140 }}>
                    <img src={work.coverImage} alt={work.title} className="w-full h-full object-cover" loading="lazy" />
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-colors"
                      style={{ background: 'rgba(45, 31, 20, 0.35)', backdropFilter: 'blur(2px)' }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)' }}>
                        <Play size={18} style={{ color: 'var(--color-primary)', marginLeft: 2 }} fill="var(--color-primary)" />
                      </div>
                    </div>
                    <div
                      className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-xs font-medium text-white"
                      style={{ background: 'rgba(45, 31, 20, 0.7)', backdropFilter: 'blur(4px)', fontFamily: 'var(--font-body)' }}
                    >
                      {work.duration}
                    </div>
                    <div
                      className="absolute top-0 left-0 right-0 h-1.5"
                      style={{
                        background: 'repeating-linear-gradient(90deg, var(--color-film-gold) 0px, var(--color-film-gold) 8px, transparent 8px, transparent 12px, var(--color-film-gold) 12px, var(--color-film-gold) 20px, transparent 20px, transparent 24px)',
                        opacity: 0.7,
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}
                    >
                      {work.title}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}
                    >
                      {work.createdAt}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div className="flex-shrink-0" style={{ width: 20 }} />
            </div>
            <div
              className="absolute top-0 right-0 bottom-0 pointer-events-none"
              style={{ width: 40, background: 'linear-gradient(90deg, transparent 0%, var(--color-bg) 100%)' }}
            />
          </div>
        </div>

        <div className="px-5 mb-6">
          <div className="flex items-end justify-between mb-3">
            <div>
              <h3
                className="text-base font-bold"
                style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', letterSpacing: '-0.01em' }}
              >
                推荐模板
              </h3>
              <p
                className="text-xs mt-0.5"
                style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}
              >
                看看这些
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {recommendedTemplates.map((template, index) => (
              <motion.button
                key={template.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                onClick={handleTemplateClick}
                className="rounded-xl overflow-hidden text-left active:scale-[0.96] transition-transform"
                style={{ boxShadow: 'var(--shadow-sm)', background: 'var(--color-surface)' }}
              >
                <div className="relative" style={{ height: 100 }}>
                  <img src={template.coverImage} alt={template.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(45,31,20,0.5) 100%)' }} />
                  <div className="absolute bottom-2 left-2.5 right-2.5">
                    <p
                      className="text-xs font-semibold text-white"
                      style={{ fontFamily: 'var(--font-body)', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
                    >
                      {template.name}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </main>
    </MobileShell>
  );
}
