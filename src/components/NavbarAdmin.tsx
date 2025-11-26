'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function NavbarAdmin() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="backdrop-blur-lg sticky top-0 z-50" style={{ background: 'var(--background)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et titre */}
          <Link href="/admin" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#d87943' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#ffffff' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>Esport Manager</h1>
              <p className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.6 }}>Administration</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <Link 
              href="/admin" 
              className={`text-sm nav-link ${isActive('/admin') ? 'font-medium' : ''}`}
              style={{ color: isActive('/admin') ? '#d87943' : 'var(--foreground)' }}
            >
              Tableau de bord
            </Link>
            <Link 
              href="/admin/matchs" 
              className={`text-sm nav-link ${isActive('/admin/matchs') ? 'font-medium' : ''}`}
              style={{ color: isActive('/admin/matchs') ? '#d87943' : 'var(--foreground)' }}
            >
              Matchs
            </Link>
            <Link 
              href="/admin/equipes" 
              className={`text-sm nav-link ${isActive('/admin/equipes') ? 'font-medium' : ''}`}
              style={{ color: isActive('/admin/equipes') ? '#d87943' : 'var(--foreground)' }}
            >
              Équipes
            </Link>
            <div className="h-6 w-px" style={{ background: 'var(--border)' }}></div>
            <Link 
              href="/auth/login" 
              className="text-sm nav-link flex items-center gap-2"
              style={{ color: 'var(--foreground)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Déconnexion
            </Link>
          </nav>

          {/* Menu mobile */}
          <button className="md:hidden p-2 rounded-lg" style={{ color: 'var(--foreground)' }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
