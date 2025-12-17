'use client'

import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { StaggerContainer, StaggerItem } from '@/components/animations'

export default function HeroSection() {
  return (
      <Section paddingY='extra-large'>
        <Container>
          <StaggerContainer className="text-center mb-8 relative z-10" staggerDelay={0.2}>
            <StaggerItem>
              <h1 className="meru-title-main">
              LE MONDE DE L&apos;ESPORT
            </h1>
          </StaggerItem>
   
          <StaggerItem>
            <h2 className="meru-subtitle">
              Plongez dans l&apos;univers compétitif
            </h2>
          </StaggerItem>
          
          <StaggerItem>
            <p className="meru-description max-w-3xl mx-auto">
              Suivez les compétitions en direct, découvrez les meilleurs joueurs et pariez sur vos équipes favorites !
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button className="meru-btn meru-btn-primary">
                Commencer maintenant
              </button>
              <button className="meru-btn meru-btn-secondary">
                En savoir plus
              </button>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </Container>
    </Section>
  )
}


