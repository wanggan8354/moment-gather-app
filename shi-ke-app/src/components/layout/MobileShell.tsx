import type { ReactNode } from 'react';
import { FilmGrain } from './FilmGrain';
import { TabBar } from './TabBar';
import { useLocation } from 'react-router-dom';

interface MobileShellProps {
  children: ReactNode;
  showTabBar?: boolean;
  dark?: boolean;
}

export function MobileShell({ children, showTabBar = true, dark = false }: MobileShellProps) {
  const location = useLocation();
  const isWelcome = location.pathname === '/welcome' || location.pathname === '/';
  const isGenerating = location.pathname === '/generating';
  const shouldShowTabBar = showTabBar && !isWelcome && !isGenerating;

  return (
    <div
      className="mobile-shell film-grain"
      style={{
        background: dark || isGenerating ? '#2D1F14' : 'var(--color-bg)',
        paddingBottom: shouldShowTabBar ? '80px' : 0,
      }}
    >
      <FilmGrain opacity={isGenerating ? 0.04 : 0.03} />
      {children}
      {shouldShowTabBar && <TabBar />}
    </div>
  );
}
