'use client'

import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

/**
 * Hero Section de la page Contact
 * Affiche le titre et la description de la page
 */
export default function HeroSection() {
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
    </Section>
  )
}