import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Settings,
  Heart,
  Share2,
  HelpCircle,
  ChevronRight,
  Check,
  Play,
  Package,
} from 'lucide-react';
import { MobileShell } from '@/components/layout/MobileShell';
import { useAppStore } from '@/store/useAppStore';

export default function Profile() {
  const navigate = useNavigate();
  const { user, works } = useAppStore();

  const menuItems = [
    {
      icon: Package,
      label: '存储管理',
      subLabel: '免费无限存储',
      iconColor: 'var(--color-primary)',
      iconBg: 'rgba(212,132,90,0.1)',
      showCheck: true,
      trailing: null,
    },
    {
      icon: Heart,
      label: '模板收藏',
      subLabel: null,
      iconColor: '#D4847A',
      iconBg: 'rgba(212,132,122,0.1)',
      showCheck: false,
      trailing: <span className="text-xs font-medium" style={{ color: 'var(--color-text-tertiary)' }}>6 个模板</span>,
    },
    {
      icon: Share2,
      label: '分享记录',
      subLabel: null,
      iconColor: '#8BA888',
      iconBg: 'rgba(139,168,136,0.1)',
      showCheck: false,
      trailing: null,
    },
    {
      icon: Settings,
      label: '设置',
      subLabel: null,
      iconColor: '#6B8FC9',
      iconBg: 'rgba(107,131,201,0.1)',
      showCheck: false,
      trailing: null,
    },
    {
      icon: HelpCircle,
      label: '帮助与反馈',
      subLabel: null,
      iconColor: '#9C8577',
      iconBg: 'rgba(156,133,119,0.1)',
      showCheck: false,
      trailing: null,
    },
  ];

  return (
    <MobileShell>
      <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
        <div className="relative pt-12 pb-6 px-5 overflow-hidden">
          <div
            className="absolute pointer-events-none"
            style={{
              top: -60,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 300,
              height: 200,
              background: 'radial-gradient(ellipse, rgba(212, 132, 90, 0.12) 0%, transparent 70%)',
            }}
          />

          <div className="flex items-center justify-between mb-8 relative z-10">
            <h1
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              个人中心
            </h1>
            <button
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center active:scale-95 transition-transform"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <Settings size={18} style={{ color: 'var(--color-text-secondary)' }} strokeWidth={2} />
            </button>
          </div>

          <div className="flex flex-col items-center relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
              style={{
                background: 'linear-gradient(135deg, #C9A96E, #D4845A, #D4847A, #C9A96E)',
                padding: 3,
                borderRadius: '9999px',
                display: 'inline-flex',
              }}
            >
              <div
                className="flex items-center justify-center text-white font-bold"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-film-rose))',
                  fontSize: '2rem',
                  fontFamily: 'var(--font-display)',
                  border: '3px solid var(--color-bg)',
                }}
              >
                {user.initial}
              </div>
            </motion.div>

            <div className="flex items-center gap-2 mb-1.5">
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              >
                {user.name}
              </h2>
            </div>

            <p
              className="mb-6 italic"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: 'var(--color-text-tertiary)',
                fontSize: 12,
              }}
            >
              已制作 {user.worksCount} 部人生电影
            </p>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex w-full rounded-2xl py-4 px-2"
              style={{ background: 'white', boxShadow: 'var(--shadow-sm)' }}
            >
              {[
                { value: user.worksCount, label: '部作品' },
                { value: `${user.totalMinutes}`, label: '分钟' },
                { value: '免费', label: '畅用', highlight: true },
              ].map((stat, idx) => (
                <div
                  key={stat.label}
                  className="text-center flex-1 relative"
                >
                  <div
                    className="text-xl font-bold"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: stat.highlight ? 'var(--color-state-success)' : 'var(--color-text-primary)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                    {stat.label}
                  </div>
                  {idx < 2 && (
                    <div
                      className="absolute right-0 top-1/2 -translate-y-1/2"
                      style={{
                        width: 1,
                        height: 32,
                        background: 'linear-gradient(to bottom, transparent, #E8DDD2, transparent)',
                      }}
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mt-2 mb-4">
          <div className="flex items-center justify-between px-5 mb-3">
            <h3
              className="text-base font-bold"
              style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
            >
              我的作品
            </h3>
            <button className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
              查看全部
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2" style={{ scrollSnapType: 'x mandatory' }}>
            {works.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                onClick={() => navigate(`/preview/${work.id}`)}
                className="shrink-0 rounded-xl overflow-hidden active:scale-[0.97] transition-transform cursor-pointer"
                style={{
                  width: 140,
                  background: 'white',
                  boxShadow: '0 2px 8px rgba(45, 31, 20, 0.06)',
                  scrollSnapAlign: 'start',
                }}
              >
                <div className="relative" style={{ height: 100 }}>
                  <img src={work.coverImage} alt={work.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity" style={{ background: 'rgba(45,31,20,0.3)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)' }}>
                      <Play size={14} style={{ color: 'var(--color-primary)', marginLeft: 1 }} fill="var(--color-primary)" />
                    </div>
                  </div>
                  <span
                    className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-xs font-semibold text-white"
                    style={{ background: 'rgba(45,31,20,0.7)', backdropFilter: 'blur(4px)', fontSize: 10, letterSpacing: '0.02em' }}
                  >
                    {work.duration}
                  </span>
                </div>
                <div className="p-2.5">
                  <h4 className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>
                    {work.title}
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                    {work.createdAt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="px-5 pb-8">
          <div className="rounded-2xl overflow-hidden" style={{ background: 'white', boxShadow: '0 2px 8px rgba(45, 31, 20, 0.04)' }}>
            {menuItems.map((item, idx) => (
              <button
                key={item.label}
                className="w-full flex items-center py-3.5 px-4 active:bg-[var(--color-bg-secondary)] transition-colors"
                style={{
                  borderBottom: idx < menuItems.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 shrink-0"
                  style={{ background: item.iconBg }}
                >
                  <item.icon size={18} style={{ color: item.iconColor }} strokeWidth={2} />
                </div>
                <div className="flex-1 text-left">
                  <span className="text-sm font-semibold block" style={{ color: 'var(--color-text-primary)' }}>
                    {item.label}
                  </span>
                  {item.subLabel && (
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                        {item.subLabel}
                      </span>
                      {item.showCheck && <Check size={12} style={{ color: 'var(--color-state-success)' }} strokeWidth={2.5} />}
                    </div>
                  )}
                </div>
                {item.trailing}
                <ChevronRight size={16} style={{ color: 'var(--color-text-tertiary)' }} className="ml-2 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
