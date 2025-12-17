import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

export default function TempsReelSection() {
    return (
        <Section paddingY="large" className="bg-transparent">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Illustration visuelle */}
                    <div className="order-2 lg:order-1 explication-visual">
                      <div className="explication-card">
                        <h3 className="text-xl font-bold mb-6">Mes paris en cours</h3>
                        <div className="space-y-4">
                          <div className="explication-bet-card">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold">KC vs G2</span>
                              <span className="explication-status-live">En cours</span>
                            </div>
                            <div className="flex items-center justify-between text-sm opacity-80">
                              <span>Pari: Karmine Corp</span>
                              <span className="font-bold text-lg">50€</span>
                            </div>
                            <div className="explication-progress">
                              <div className="explication-progress-bar" style={{ width: '65%' }}></div>
                            </div>
                            <div className="text-xs opacity-60 mt-2">Gain potentiel: 105€</div>
                          </div>
        
                          <div className="explication-bet-card">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold">FNC vs MAD</span>
                              <span className="explication-status-pending">À venir</span>
                            </div>
                            <div className="flex items-center justify-between text-sm opacity-80">
                              <span>Pari: Fnatic</span>
                              <span className="font-bold text-lg">30€</span>
                            </div>
                            <div className="text-xs opacity-60 mt-2">Début dans 2h30</div>
                          </div>
        
                          <div className="explication-bet-card explication-bet-won">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold">T1 vs DRX</span>
                              <span className="explication-status-won">Gagné</span>
                            </div>
                            <div className="flex items-center justify-between text-sm opacity-80">
                              <span>Pari: T1</span>
                              <span className="font-bold text-lg text-green-500">+75€</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
        
                    {/* Texte */}
                    <div className="order-1 lg:order-2">
                      <div className="inline-block px-4 py-2 rounded-full mb-4 explication-badge">
                        <span className="text-sm font-semibold">Fonctionnalité #2</span>
                      </div>
                      <h2 className="explication-title mb-6">
                        Suivez vos paris en temps réel
                      </h2>
                      <p className="explication-description mb-6">
                        Ne manquez jamais un moment important ! Notre tableau de bord vous permet de suivre 
                        l&apos;évolution de tous vos paris en direct avec des mises à jour instantanées.
                      </p>
                      <ul className="explication-list">
                        <li className="explication-list-item">
                          <svg className="explication-list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Tableau de bord personnalisé</span>
                        </li>
                        <li className="explication-list-item">
                          <svg className="explication-list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Notifications instantanées des résultats</span>
                        </li>
                        <li className="explication-list-item">
                          <svg className="explication-list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Historique complet de vos paris</span>
                        </li>
                        <li className="explication-list-item">
                          <svg className="explication-list-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Statistiques et graphiques de performance</span>
                        </li>
                      </ul>
                    </div>
                  </div>
            
                </Container>
              </Section>
    )
}