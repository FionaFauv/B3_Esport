'use client'

import React, { useEffect, useState } from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { useTheme } from 'next-themes'
import { Particles } from '../ui/particles'

/**
 * Hero Section de la page Contact
 * Affiche le titre et la description de la page
 */
export default function HeroSection() {

  const { theme } = useTheme()
  const [color, setColor] = useState("#401717ff")

  useEffect(() => {
    setColor(theme === "dark" ? "#e8c6c6ff" : "#531c1cff")
  }, [theme])

  return (
    <Section paddingY="large">
      <Container className="pt-12 text-center">
        <h1 className="meru-title-main">
          Contactez-nous
        </h1>
        <p className="meru-subtitle">
          Une question, une suggestion ou besoin d&apos;aide ? Notre équipe est là pour vous répondre.
        </p>
      </Container>
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </Section>
  )
}