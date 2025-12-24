'use client'

import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { SlideInFromBottom, StaggerContainer } from '@/components/animations'

export default function TempsReelSection() {

    return (
      <SlideInFromBottom>
        <Section paddingY="large">
          <StaggerContainer>
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Illustration visuelle */}
                    <div className="order-2 lg:order-1">
                      <div className="meru-card">
                        <h3 className="meru-title-component mb-6">Mes paris en cours</h3>
                        <div className="space-y-4">
                          <div className="meru-card">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>KC vs G2</span>
                              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: 'var(--primary)' }}>En cours</span>
                            </div>
                            <div className="flex items-center justify-between text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                              <span>Pari: Karmine Corp</span>
                              <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>50€</span>
                            </div>
                            <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--foreground)' }}>
                              <div className="h-full rounded-full transition-all duration-300" style={{ width: '65%', backgroundColor: 'var(--primary)' }}></div>
                            </div>
                            <div className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Gain potentiel: 105€</div>
                          </div>
        
                          <div className="meru-card">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>FNC vs MAD</span>
                              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'var(--foreground-secondary)', color: 'var(--text-primary)' }}>À venir</span>
                            </div>
                            <div className="flex items-center justify-between text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                              <span>Pari: Fnatic</span>
                              <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>30€</span>
                            </div>
                            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Début dans 2h30</div>
                          </div>
        
                          <div className="meru-card" style={{ borderColor: 'var(--accent)' }}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>T1 vs DRX</span>
                              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: 'var(--accent)' }}>Gagné</span>
                            </div>
                            <div className="flex items-center justify-between text-sm" style={{ color: 'var(--text-secondary)' }}>
                              <span>Pari: T1</span>
                              <span className="font-bold text-lg" style={{ color: 'var(--accent)' }}>+75€</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Texte */}
                    <div className="order-1 lg:order-2">
                      <div className="meru-badge mb-4">
                        <span>Fonctionnalité #2</span>
                      </div>
                      <h2 className="meru-title-section text-left mb-6">
                        Suivez vos paris en temps réel
                      </h2>
                      <p className="meru-description mb-6">
                        Ne manquez jamais un moment important ! Notre tableau de bord vous permet de suivre 
                        l&apos;évolution de tous vos paris en direct avec des mises à jour instantanées.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="meru-description">Tableau de bord personnalisé</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="meru-description">Notifications instantanées des résultats</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="meru-description">Historique complet de vos paris</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="meru-description">Statistiques et graphiques de performance</span>
                        </li>
                      </ul>
                    </div>
                  </div>
            
                </Container>
                </StaggerContainer>
              </Section>
              </SlideInFromBottom>
    )
}