'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuthStore } from '@/stores/AuthStore';
import { ROUTES } from '@/lib/constants/routes';

export default function NavbarAdmin() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const isActive = (path: string) => pathname === path;

  const adminNavItems = [
  { href: ROUTES.ADMIN.DASHBOARD, label: 'Tableau de bord' },
  { href: ROUTES.ADMIN.MATCHS, label: 'Matchs' },
  { href: ROUTES.ADMIN.EQUIPES, label: 'Équipes' },
  ...(user?.SuperAdmin ? [{ href: ROUTES.ADMIN.GESTION, label: 'Gestion' }] : []),
];

  return (
    <header className="meru-nav-backdrop sticky top-0 z-50" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et titre */}
          <Link href={ROUTES.ADMIN.DASHBOARD} className="meru-nav-logo flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center" 
              style={{ background: 'var(--primary)' }}
            >
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
            </div>
            <div>
              <h1 className="meru-nav-title text-lg">Esport Manager</h1>
              <p className="meru-nav-subtitle">{user?.name}</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            
            {adminNavItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`meru-nav-link ${isActive(item.href) ? 'meru-nav-link-active' : ''}`}
              >
                {item.label}
              </Link>
            ))}

            {/* Séparateur */}
            <div className="h-6 w-px" style={{ background: 'var(--border)' }}></div>
            
            {/* Bouton Déconnexion */}
            <button 
              onClick={logout}
              className="meru-nav-link flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              Déconnexion
            </button>
          </nav>

          {/* Menu mobile */}
          <button className="md:hidden p-2 rounded-lg transition-colors hover:bg-opacity-10" style={{ color: 'var(--text-primary)' }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
