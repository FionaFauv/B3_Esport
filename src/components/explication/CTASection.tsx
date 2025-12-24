'use client'

import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { SlideInFromBottom, StaggerContainer } from '@/components/animations'


export default function CTASection() {

    return (
      <SlideInFromBottom>
      <Section paddingY="large">
        <StaggerContainer>
        <Container className="text-center">
          <h2 className="meru-title-section">
            Prêt à commencer ?
          </h2>
          <p className="meru-subtitle">
            Rejoignez notre communauté de passionnés d&apos;esport et commencez à parier dès maintenant.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href={ROUTES.AUTH.SIGNUP} className="meru-btn meru-btn-primary">
              Créer un compte
            </Link>
            <Link href={ROUTES.AUTH.LOGIN} className="meru-btn meru-btn-secondary">
              Se connecter
            </Link>
          </div>
        </Container>
        </StaggerContainer>
      </Section>
      </SlideInFromBottom>
    )
}