'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import { useAuthStore } from '@/stores/AuthStore'

export default function NavbarVisiteur() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="backdrop-blur-lg sticky top-0 z-50" style={{ background: 'var(--background)', borderBottom: '1px solid var(--border)' }} suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/visiteur" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#d87943' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#ffffff' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>Esport Zone</h1>
              <p className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.6 }}>{user?.name || 'Visiteur'}</p>
            </div>
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <Link 
              href="/visiteur" 
              className={`text-sm nav-link ${isActive('/visiteur') ? 'font-medium' : ''}`}
              style={{ color: isActive('/visiteur') ? '#d87943' : 'var(--foreground)' }}
            >
              Tableau de bord
            </Link>
            <Link 
              href="/visiteur/matchs" 
              className={`text-sm nav-link ${isActive('/visiteur/matchs') ? 'font-medium' : ''}`}
              style={{ color: isActive('/visiteur/matchs') ? '#d87943' : 'var(--foreground)' }}
            >
              Matchs
            </Link>
            <Link 
              href="/visiteur/paris" 
              className={`text-sm nav-link ${isActive('/visiteur/paris') ? 'font-medium' : ''}`}
              style={{ color: isActive('/visiteur/paris') ? '#d87943' : 'var(--foreground)' }}
            >
              Mes Paris
            </Link>

            <div className="h-6 w-px" style={{ background: 'var(--border)' }}></div>
            <Link 
              href="/" 
              className="text-sm nav-link flex items-center gap-2"
              style={{ color: 'var(--foreground)' }}
              onClick={logout}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Déconnexion
            </Link>
          </nav>

          {/* Menu Mobile (Hamburger) */}
          <button 
            className="md:hidden p-2 rounded-lg" 
            style={{ color: 'var(--foreground)' }}
            onClick={() => {
              const menu = document.getElementById('mobile-menu')
              menu?.classList.toggle('hidden')
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          </div>
        </div>
    </header>
  )
}
