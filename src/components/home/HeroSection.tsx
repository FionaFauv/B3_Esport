'use client'

import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'


export default function HeroSection() {
    return (
      <Section>
        <Container>
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
        </Container>
      </Section>
    )
}


