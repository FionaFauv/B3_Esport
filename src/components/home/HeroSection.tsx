'use client'

import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { SlideInFromBottom } from '@/components/animations'


export default function HeroSection() {
    return (
      <Section paddingY='extra-large' className="contact-hero">
        <Container>
          <div className="text-center mb-8">
            <SlideInFromBottom>
              <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{
                background: 'linear-gradient(135deg, #d87943 0%, #ff6b35 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
              Le monde de l&apos;Esport
            </h1>
            </SlideInFromBottom>
              <h2 className="text-2xl md:text-3xl font-medium mb-6" style={{ color: 'var(--foreground)', opacity: 0.9 }}>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
              Suivez les compétitions en direct, découvrez les meilleurs joueurs et améliorez votre gameplay
            </p>
            </h2>
          </div>
        </Container>
      </Section>
    )
}


