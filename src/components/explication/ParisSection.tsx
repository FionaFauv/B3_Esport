'use client' 

import React, { useEffect, useState } from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { SlideInFromBottom, StaggerContainer } from '@/components/animations'
import { Particles } from '../ui/particles'
import { useTheme } from 'next-themes'

export default function ParisSection() {

  const { theme } = useTheme()
  const [color, setColor] = useState("#401717ff")

  useEffect(() => {
    setColor(theme === "dark" ? "#e8c6c6ff" : "#531c1cff")
  }, [theme])
  
  return (
    <SlideInFromBottom>
    <Section paddingY="large">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    
                <div>
                  <div className="meru-badge mb-4">
                    <span>Fonctionnalité #1</span>
                  </div>
                  <h2 className="meru-title-section text-left mb-6">
                    Pariez sur vos matchs préférés
                  </h2>
                  <p className="meru-description mb-6">
                    Accédez à une large sélection de matchs esport en cours et à venir. 
                    Notre plateforme vous permet de placer vos paris en quelques clics sur vos équipes favorites.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="meru-description">Matchs en direct et à venir</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="meru-description">Cotes compétitives et mises à jour en temps réel</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="meru-description">Interface simple et intuitive</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="meru-description">Statistiques détaillées des équipes</span>
                    </li>
                  </ul>
                </div>
    
                {/* Illustration visuelle */}
               
                <div>
                   <StaggerContainer>
                  <div className="meru-card">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="meru-title-component">Match en cours</h3>
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold text-white" style={{ backgroundColor: 'var(--primary)' }}>
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        LIVE
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="meru-card">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white" style={{ backgroundColor: 'var(--primary)' }}>KC</div>
                            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Karmine Corp</span>
                          </div>
                          <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>2.10</span>
                        </div>
                      </div>
                      <div className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>VS</div>
                      <div className="meru-card">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white" style={{ backgroundColor: 'var(--primary)' }}>G2</div>
                            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>G2 Esports</span>
                          </div>
                          <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>1.85</span>
                        </div>
                      </div>
                    </div>
                    <button className="meru-btn meru-btn-primary w-full mt-6">
                      Placer un pari
                    </button>
                  </div>
                  </StaggerContainer>
                </div>
              </div>
            </Container>
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
          </Section>
          </SlideInFromBottom>
     )
}