'use client'

import Image from 'next/image'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg border-b shadow-sm" style={{ 
        backgroundColor: 'var(--background)', 
        opacity: 0.9,
        borderColor: 'rgba(128, 128, 128, 0.2)'
      }}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>ESPORT ZONE</div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/contact" className="nav-link font-medium" style={{ color: 'var(--foreground)' }}>
                Contact
              </Link>
            <ThemeToggle /> 
              {/* Bouton Se Connecter */}
              <Link 
                href="/auth/login" 
                className="nav-button px-5 py-2 rounded-lg border"
                style={{ color: 'var(--foreground)', borderColor: 'rgba(128, 128, 128, 0.3)' }}
              >
                Se Connecter
              </Link>
              
              {/* Bouton S'inscrire - Orange cuivré */}
              <Link 
                href="/auth/signup" 
                className="nav-button bg-[#d87943] hover:bg-[#c66835] text-white px-6 py-2 rounded-lg font-medium shadow-lg shadow-[#d87943]/30"
              >
                S&apos;inscrire
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32" style={{ background: 'var(--background)' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-text" style={{ color: 'var(--foreground)' }}>
              Vivez l&apos;expérience <br />
              <span className="neon-text-strong">Esport Français</span>
            </h1>
            <p className="text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
              Découvrez l&apos;excellence de l&apos;esport français avec Karmine Corp et Team Vitality.
              Suivez les meilleurs joueurs de la scène française et européenne sur League of Legends.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="#tournaments"
                className="bg-[#d87943] hover:bg-[#c66835] text-white px-8 py-4 rounded-lg font-medium shadow-lg shadow-[#d87943]/30 transition-all duration-200"
              >
                Voir les tournois
              </Link>
              <Link 
                href="#teams"
                className="border-2 border-[#d87943] text-[#d87943] px-8 py-4 rounded-lg font-medium hover:bg-[#d87943] hover:text-white transition-all duration-200"
                style={{ backgroundColor: 'var(--background)' }}
              >
                Découvrir les équipes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/lec-arena.jpeg"
              alt="LEC Arena"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <p className="text-white text-2xl font-bold">LEC Arena - Paris</p>
              <p className="text-gray-200">L&apos;excellence de l&apos;esport européen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section id="teams" className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: 'var(--foreground)' }}>Équipes Phares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* KC Card */}
            <div className="rounded-2xl overflow-hidden shadow-xl border hover:shadow-2xl hover:border-[#d87943] transition-all duration-300" style={{ backgroundColor: 'var(--background)', borderColor: 'rgba(128, 128, 128, 0.2)' }}>
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="text-4xl font-bold text-white">KC</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--foreground)' }}>Karmine Corp</h3>
                <p className="mb-4 text-center" style={{ color: 'var(--foreground)', opacity: 0.7 }}>Les Blues, la nouvelle force de la LEC</p>
                <div className="text-[#d87943] text-center font-semibold">Champions de France</div>
              </div>
            </div>

            {/* Vitality Card */}
            <div className="rounded-2xl overflow-hidden shadow-xl border hover:shadow-2xl hover:border-[#d87943] transition-all duration-300" style={{ backgroundColor: 'var(--background)', borderColor: 'rgba(128, 128, 128, 0.2)' }}>
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center">
                    <div className="text-4xl font-bold text-white">VIT</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--foreground)' }}>Team Vitality</h3>
                <p className="mb-4 text-center" style={{ color: 'var(--foreground)', opacity: 0.7 }}>Les abeilles de la LEC</p>
                <div className="text-[#d87943] text-center font-semibold">L&apos;excellence française</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="tournaments" className="py-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
            Prêt à rejoindre l&apos;aventure ?
          </h2>
          <p className="text-xl mb-8" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
            Inscrivez-vous maintenant et commencez votre parcours dans l&apos;esport
          </p>
          <Link 
            href="/auth/signup"
            className="inline-block bg-[#d87943] hover:bg-[#c66835] text-white px-10 py-4 rounded-lg font-medium shadow-lg shadow-[#d87943]/30 transition-all duration-200"
          >
            Commencer maintenant
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t" style={{ backgroundColor: 'var(--background)', borderColor: 'rgba(128, 128, 128, 0.2)' }}>
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo et Description */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 neon-text-strong">ESPORT ZONE</h3>
              <p className="mb-4" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Votre plateforme de paris esportifs spécialisée dans League of Legends. 
                Suivez les équipes françaises Karmine Corp et Team Vitality.
              </p>
              <div className="flex space-x-4">
                {/* Réseaux sociaux */}
                <a href="#" className="social-icon" style={{ color: 'var(--foreground)' }} aria-label="Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="social-icon" style={{ color: 'var(--foreground)' }} aria-label="Discord">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
                <a href="#" className="social-icon" style={{ color: 'var(--foreground)' }} aria-label="YouTube">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a href="#" className="social-icon" style={{ color: 'var(--foreground)' }} aria-label="Twitch">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="footer-link" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/visiteur" className="footer-link" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Paris
                  </Link>
                </li>
                <li>
                  <Link href="/admin/equipes" className="footer-link" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Équipes
                  </Link>
                </li>
                <li>
                  <Link href="/admin/matchs" className="footer-link" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Matchs
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="footer-link" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Légal */}
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Légal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/mentions-legales" className="footer-link" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link href="/confidentialite" className="footer-link" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/cgv" className="footer-link" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    CGV
                  </Link>
                </li>
                <li>
                  <Link href="/cgu" className="footer-link" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    CGU
                  </Link>
                </li>
                <li>
                  <Link href="/jeu-responsable" className="footer-link" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Jeu responsable
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Séparateur */}
          <div className="border-t mt-8 pt-8" style={{ borderColor: 'rgba(128, 128, 128, 0.2)' }}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm mb-4 md:mb-0" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                © 2025 Esport Zone. Tous droits réservés.
              </p>
              <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                ⚠️ Jouer comporte des risques : endettement, isolement, dépendance. Pour être aidé, appelez le 09-74-75-13-13 (appel non surtaxé).
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}