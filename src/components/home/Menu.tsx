'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/ThemeToggle'
import { ROUTES, NAV_MENU_ITEMS } from '@/lib/constants/routes'
import { Container } from '@/components/ui/container'

export default function Menu() {
  const pathname = usePathname()

  return (
      <nav className="sticky top-0 z-50 nav-backdrop">
        <Container paddingY='small'>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={ROUTES.HOME} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center nav-logo">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <h1 className="text-xl font-bold neon-text-strong">ESPORT ZONE</h1>
                <p className="text-xs nav-logo-subtitle">
                  Le monde de l&apos;Esport
                </p>
              </div>
            </Link>

            {/* Menu */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_MENU_ITEMS.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link font-medium ${
                      isActive ? 'nav-link-active' : 'text-[var(--foreground)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link 
                href={ROUTES.AUTH.LOGIN}
                className="hidden md:inline-block px-4 py-2 rounded-lg font-medium nav-btn-outline"
              >
                Connexion
              </Link>
              <Link 
                href={ROUTES.AUTH.SIGNUP}
                className="hidden md:inline-block px-4 py-2 rounded-lg font-medium nav-btn-solid"
              >
                S&apos;inscrire
              </Link>
            </div>
          </div>
        </Container>
      </nav>
  )
}
