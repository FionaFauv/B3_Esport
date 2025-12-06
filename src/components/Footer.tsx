import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t" style={{ backgroundColor: 'var(--background)', borderColor: 'rgba(128, 128, 128, 0.2)' }}>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et Description */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 neon-text-strong">ESPORT ZONE</h3>
            <p className="mb-4" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
              Votre plateforme esport centrée sur League of Legends et VALORANT. 
              Suivez les streams, les équipes et restez connecté à la scène compétitive.
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
                <Link href="/" className="footer-link" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                  Paris
                </Link>
              </li>
              <li>
                <Link href="/" className="footer-link" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                  Équipes
                </Link>
              </li>
              <li>
                <Link href="/" className="footer-link" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
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
                  Confidentialité
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
            <p className="text-sm text-center md:text-right" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
              ⚠️ Jouer comporte des risques : endettement, isolement, dépendance.<br className="md:hidden" /> Pour être aidé, appelez le 09-74-75-13-13 (appel non surtaxé).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
