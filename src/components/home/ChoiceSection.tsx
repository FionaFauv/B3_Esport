'use client'

import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

/**
 * Section Call-to-Action
 * Incite l'utilisateur à s'inscrire ou découvrir les paris
 */
export default function ChoiceSection() {
  return (
    <Section paddingY="large">
      <Container className="text-center">
        {/* Titre principal */}
        <h2 className="cta-title">
          Prêt à rejoindre la communauté ?
        </h2>
        
        {/* Description */}
        <p className="cta-description">
          Créez votre compte et accédez à toutes les fonctionnalités de la plateforme
        </p>
        
        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Bouton primaire - S'inscrire */}
          <Link 
            href={ROUTES.AUTH.SIGNUP}
            className="cta-btn-primary"
          >
            Commencer maintenant →
          </Link>
          
          {/* Bouton secondaire - Découvrir */}
          <Link 
            href={ROUTES.PARIS}
            className="cta-btn-secondary"
          >
            Découvrir les paris
          </Link>
        </div>
      </Container>
    </Section>
  )
}