'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/ThemeToggle'
import { ROUTES, NAV_MENU_ITEMS } from '@/lib/constants/routes'
import { Container } from '@/components/ui/container'
import Image from 'next/image'

export default function Menu() {
  const pathname = usePathname()

  return (
    <nav className="meru-nav-backdrop">
      <Container paddingY='small'>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center meru-nav-logo">
              <Image 
                src="/images/MeruSleep.png" 
                alt="Logo Esport" 
                width={32}
                height={32}
                priority
              />
            </div>
            <div>
              <h1 className="text-xl meru-nav-title">ESPORT ZONE</h1>
              <p className="text-xs meru-nav-subtitle">
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
                  className={`meru-nav-link ${
                    isActive ? 'meru-nav-link-active' : ''
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
              className="hidden md:inline-block px-4 py-2 rounded-lg meru-nav-btn-outline"
            >
              Connexion
            </Link>
            <Link 
              href={ROUTES.AUTH.SIGNUP}
              className="hidden md:inline-block px-4 py-2 rounded-lg meru-nav-btn-solid"
            >
              S&apos;inscrire
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  )
}
