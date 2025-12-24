'use client'

import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { SlideInFromBottom, StaggerContainer, StaggerItem } from '@/components/animations'

export default function HeroSection() {

    return (
      <SlideInFromBottom> 
              <Section paddingY="large">
                <StaggerContainer>
                <Container className="pt-12 text-center">
                  <StaggerItem>
                  <h1 className="meru-title-main">
                    Comment fonctionne notre plateforme ?
                  </h1>
                  </StaggerItem>
                  <StaggerItem>
                  <p className="meru-subtitle">
                    Découvrez toutes les fonctionnalités qui font de notre plateforme l&apos;endroit idéal pour suivre et parier sur vos matchs esport préférés.
                  </p>
                  </StaggerItem>
                </Container>
                </StaggerContainer>
              </Section>
      </SlideInFromBottom>
    )
}