import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export default function CTASection() {
    return (
      <Section paddingY="large">
        <Container className="text-center">
          <h2 className="meru-cta-title">
            Prêt à commencer ?
          </h2>
          <p className="meru-cta-description">
            Rejoignez notre communauté de passionnés d&apos;esport et commencez à parier dès maintenant.
          </p>
          <div className="meru-cta-buttons">
            <Link href={ROUTES.AUTH.SIGNUP} className="meru-btn-primary">
              Créer un compte
            </Link>
            <Link href={ROUTES.AUTH.LOGIN} className="meru-btn-secondary">
              Se connecter
            </Link>
          </div>
        </Container>
      </Section>
    )
}