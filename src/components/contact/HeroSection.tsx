'use client'

import React from 'react'
import { Section } from '@/components/ui/section'

/**
 * Hero Section de la page Contact
 * Affiche le titre et la description de la page
 */
export default function HeroSection() {
  return (
    <Section paddingY="large" className="contact-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="contact-hero-title">
          Contactez-nous
        </h1>
        <p className="contact-hero-description">
          Une question, une suggestion ou besoin d&apos;aide ? Notre équipe est là pour vous répondre.
        </p>
      </div>
    </Section>
  )
}