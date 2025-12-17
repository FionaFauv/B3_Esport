import React from 'react'
import { Section } from '@/components/ui/section'

export default function HeroSection() {
    return (
              <Section paddingY="large" className="meru-hero-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h1 className="meru-hero-title">
                    Comment fonctionne notre plateforme ?
                  </h1>
                  <p className="meru-hero-description">
                    Découvrez toutes les fonctionnalités qui font de notre plateforme l&apos;endroit idéal pour suivre et parier sur vos matchs esport préférés.
                  </p>
                </div>
              </Section>
    )
}