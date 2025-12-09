import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

export default function CTASection() {
    return (
              <Section paddingY="large" className="bg-muted/30">
                <Container>
                  <h2 className="text-3xl font-bold mb-4 text-center">
                    Prêt à commencer ?
                  </h2>
                  <p className="hero-description max-w-2xl mx-auto mb-8">
                    Rejoignez notre communauté de passionnés d&apos;esport et commencez à parier dès maintenant.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 center">
                    <a href="/auth/signup" className="cta-btn-primary">
                      Créer un compte
                    </a>
                  </div>
                </Container>
              </Section>
    )
}