import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

export default function ParisSection() {
  return (
    <Section paddingY="large">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    
                <div>
                  <div className="inline-block px-4 py-2 rounded-full mb-4 explication-badge">
                    <span className="text-sm font-semibold">Fonctionnalité #1</span>
                  </div>
                  <h2 className="explication-title mb-6">
                    Pariez sur vos matchs préférés
                  </h2>
                  <p className="explication-description mb-6">
                    Accédez à une large sélection de matchs esport en cours et à venir. 
                    Notre plateforme vous permet de placer vos paris en quelques clics sur vos équipes favorites.
                  </p>
                  <ul className="explication-list">
                    <li className="explication-list-item">
                      <svg className="explication-list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Matchs en direct et à venir</span>
                    </li>
                    <li className="explication-list-item">
                      <svg className="explication-list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Cotes compétitives et mises à jour en temps réel</span>
                    </li>
                    <li className="explication-list-item">
                      <svg className="explication-list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Interface simple et intuitive</span>
                    </li>
                    <li className="explication-list-item">
                      <svg className="explication-list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Statistiques détaillées des équipes</span>
                    </li>
                  </ul>
                </div>
    
                {/* Illustration visuelle */}
                <div className="explication-visual">
                  <div className="explication-card">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold">Match en cours</h3>
                      <span className="live-badge">
                        <span className="live-indicator"></span>
                        LIVE
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="explication-match-card">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="explication-team-logo">KC</div>
                            <span className="font-semibold">Karmine Corp</span>
                          </div>
                          <span className="explication-odd">2.10</span>
                        </div>
                      </div>
                      <div className="text-center text-sm opacity-60">VS</div>
                      <div className="explication-match-card">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="explication-team-logo">G2</div>
                            <span className="font-semibold">G2 Esports</span>
                          </div>
                          <span className="explication-odd">1.85</span>
                        </div>
                      </div>
                    </div>
                    <button className="meru-btn-primary w-full mt-6">
                      Placer un pari
                    </button>
                  </div>
                </div>
              </div>
            </Container>
          </Section>
     )
}