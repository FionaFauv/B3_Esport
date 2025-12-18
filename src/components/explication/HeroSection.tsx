'use client'

import React, { useEffect, useState } from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { SlideInFromBottom, StaggerContainer, StaggerItem } from '@/components/animations'
import { Particles } from '../ui/particles'
import { useTheme } from 'next-themes'

export default function HeroSection() {

  const { theme } = useTheme()
  const [color, setColor] = useState("#401717ff")

  useEffect(() => {
    setColor(theme === "dark" ? "#e8c6c6ff" : "#531c1cff")
  }, [theme])
  
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
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
      </SlideInFromBottom>
    )
}