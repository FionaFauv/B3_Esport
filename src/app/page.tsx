'use client'

import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import TwitchLiveStreams from '@/components/TwitchLiveStreams'
import ResourcesSidebar from '@/components/ResourcesSidebar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ 
        backgroundColor: 'rgba(var(--background-rgb), 0.8)', 
        borderColor: 'rgba(216, 121, 67, 0.2)',
      }}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#d87943] to-[#ff6b35] shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <h1 className="text-xl font-bold neon-text-strong">ESPORT ZONE</h1>
                <p className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                  Le monde de l&apos;Esport
                </p>
              </div>
            </Link>

            {/* Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="nav-link font-medium" style={{ color: '#d87943' }}>
                Accueil
              </Link>
              <Link href="/visiteur" className="nav-link font-medium" style={{ color: 'var(--foreground)' }}>
                Paris
              </Link>
              <Link href="/admin/matchs" className="nav-link font-medium" style={{ color: 'var(--foreground)' }}>
                Matchs
              </Link>
              <Link href="/contact" className="nav-link font-medium" style={{ color: 'var(--foreground)' }}>
                Contact
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link 
                href="/auth/login"
                className="hidden md:inline-block px-4 py-2 rounded-lg font-medium border-2 transition-all duration-200 hover:scale-105"
                style={{ borderColor: '#d87943', color: '#d87943' }}
              >
                Connexion
              </Link>
              <Link 
                href="/auth/signup"
                className="hidden md:inline-block px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, #d87943 0%, #ff6b35 100%)',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(216, 121, 67, 0.4)',
                }}
              >
                S&apos;inscrire
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Title - Le monde de l'Esport */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ 
              background: 'linear-gradient(135deg, #d87943 0%, #ff6b35 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Le monde de l&apos;Esport
            </h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
              Suivez les compétitions en direct, découvrez les meilleurs joueurs et améliorez votre gameplay
            </p>
          </div>
        </div>
      </section>

      {/* Section Live Riot Games - Pleine largeur */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="rounded-xl overflow-hidden border" style={{ 
            backgroundColor: '#18181b',
            borderColor: 'rgba(216, 121, 67, 0.3)',
          }}>
            {/* Header du live */}
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{ 
              borderColor: 'rgba(128, 128, 128, 0.2)',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ 
                  backgroundColor: 'rgba(145, 70, 255, 0.1)',
                  border: '1px solid rgba(145, 70, 255, 0.3)',
                }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#9146FF' }}>
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span className="text-sm font-medium" style={{ color: '#9146FF' }}>REDIFFUSION</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Riot Games Official</h2>
              </div>
              <a 
                href="https://www.twitch.tv/videos/2613641505"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                style={{ 
                  backgroundColor: '#9146FF',
                  color: 'white',
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                </svg>
                Ouvrir sur Twitch
              </a>
            </div>

            {/* Iframe Twitch */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src="https://player.twitch.tv/?video=2613641505&parent=localhost&parent=esport-paris.fr&autoplay=true&muted=false"
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Streams LoL + Sidebar Guides */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Container avec fond gris foncé */}
          <div className="rounded-xl p-8" style={{ 
            backgroundColor: '#27272a',
            border: '1px solid rgba(128, 128, 128, 0.2)',
          }}>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Section principale - Streams League of Legends */}
              <div className="flex-1">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ 
                      backgroundColor: 'rgba(216, 121, 67, 0.1)',
                      border: '1px solid rgba(216, 121, 67, 0.3)',
                    }}>
                      <span className="w-2 h-2 bg-[#d87943] rounded-full animate-pulse"></span>
                      <span className="text-sm font-medium" style={{ color: '#d87943' }}>
                        Live
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">
                      League of Legends
                    </h2>
                  </div>
                  <p className="text-white opacity-70">
                    Les meilleurs streamers français en direct
                  </p>
                </div>

                {/* Grid des streams */}
                <TwitchLiveStreams />
              </div>

              {/* Sidebar droite - Guides */}
              <div className="lg:w-80">
                <ResourcesSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
            Prêt à rejoindre la communauté ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
            Créez votre compte et accédez à toutes les fonctionnalités de la plateforme
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup"
              className="inline-block px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, #d87943 0%, #ff6b35 100%)',
                color: 'white',
                boxShadow: '0 8px 25px rgba(216, 121, 67, 0.4)',
              }}
            >
              Commencer maintenant →
            </Link>
            <Link 
              href="/visiteur"
              className="inline-block px-8 py-4 rounded-lg font-bold text-lg border-2 transition-all duration-200 hover:scale-105"
              style={{ 
                borderColor: '#d87943', 
                color: '#d87943',
              }}
            >
              Découvrir les paris
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}