import { Home, LayoutGrid, Plus, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import type { TabType } from '@/types';

export function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = useAppStore((s) => s.activeTab);
  const setActiveTab = useAppStore((s) => s.setActiveTab);

  const getCurrentTab = (): TabType => {
    if (location.pathname === '/home' || location.pathname === '/') return 'home';
    if (location.pathname.startsWith('/templates')) return 'templates';
    if (location.pathname.startsWith('/profile')) return 'profile';
    return activeTab;
  };

  const currentTab = getCurrentTab();

  const handleTabClick = (tab: TabType, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  const handleCreate = () => {
    setActiveTab('create');
    navigate('/templates');
  };

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-50"
      style={{
        maxWidth: 375,
        background: 'rgba(255, 250, 245, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--color-border-light)',
      }}
    >
      <div className="flex items-center justify-around py-1.5 pb-6">
        <button
          onClick={() => handleTabClick('home', '/home')}
          className="flex flex-col items-center gap-0.5 py-1 px-3 transition-colors"
          style={{ color: currentTab === 'home' ? 'var(--color-primary)' : 'var(--color-text-tertiary)' }}
        >
          <Home size={22} strokeWidth={2} />
          <span className="text-xs font-medium">首页</span>
        </button>

        <button
          onClick={() => handleTabClick('templates', '/templates')}
          className="flex flex-col items-center gap-0.5 py-1 px-3 transition-colors"
          style={{ color: currentTab === 'templates' ? 'var(--color-primary)' : 'var(--color-text-tertiary)' }}
        >
          <LayoutGrid size={22} strokeWidth={2} />
          <span className="text-xs font-medium">模板</span>
        </button>

        <button
          onClick={handleCreate}
          className="flex flex-col items-center gap-0.5 py-1 px-3 -mt-5"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center transition-transform active:scale-90"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
              boxShadow: '0 4px 16px rgba(212, 132, 90, 0.35)',
            }}
          >
            <Plus size={24} strokeWidth={2.5} color="white" />
          </div>
          <span className="text-xs font-medium mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
            创作
          </span>
        </button>

        <button
          onClick={() => handleTabClick('profile', '/profile')}
          className="flex flex-col items-center gap-0.5 py-1 px-3 transition-colors"
          style={{ color: currentTab === 'profile' ? 'var(--color-primary)' : 'var(--color-text-tertiary)' }}
        >
          <User size={22} strokeWidth={2} />
          <span className="text-xs font-medium">我的</span>
        </button>
      </div>
    </nav>
  );
}
