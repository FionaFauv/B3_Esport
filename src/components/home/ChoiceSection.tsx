'use client'

import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { SlideInFromBottom, StaggerContainer, StaggerItem } from '@/components/animations'

/**
 * Section Call-to-Action avec thème Meru
 * Incite l'utilisateur à s'inscrire ou découvrir les paris
 */
export default function ChoiceSection() {
  return (
    <Section paddingY="large">
      <Container className="text-center relative z-10">
        <SlideInFromBottom>
          {/* Badge */}
          <div className="mb-6">
            <span className="meru-badge">
              🎮 Rejoignez-nous
            </span>
          </div>

          {/* Titre principal */}
          <h2 className="meru-title-section">
            Prêt à rejoindre la communauté ?
          </h2>
          
          {/* Description */}
          <p className="meru-subtitle">
            Créez votre compte et accédez à toutes les fonctionnalités de la plateforme
          </p>
        </SlideInFromBottom>
        
        {/* Boutons d'action */}
        <StaggerContainer staggerDelay={0.15}>
          <div className="meru-cta-buttons">
            <StaggerItem>
              <Link 
                href={ROUTES.AUTH.SIGNUP}
                className="meru-btn meru-btn-primary"
              >
                Commencer maintenant →
              </Link>
            </StaggerItem>
            
            <StaggerItem>
              <Link 
                href={ROUTES.AUTH.LOGIN}
                className="meru-btn meru-btn-secondary"
              >
                Découvrir les paris
              </Link>
            </StaggerItem>
          </div>

          {/* Cards avec features */}
          <div className="meru-cta-features-grid">
            <StaggerItem>
              <div className="meru-card text-left">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="meru-title-component">Paris en direct</h3>
                <p className="meru-description">
                  Pariez sur vos matchs préférés en temps réel avec des cotes compétitives
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="meru-card text-left">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="meru-title-component">Statistiques détaillées</h3>
                <p className="meru-description">
                  Analysez les performances des équipes et joueurs avec nos données complètes
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="meru-card text-left">
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="meru-title-component">Bonus exclusifs</h3>
                <p className="meru-description">
                  Profitez de récompenses et bonus réservés aux membres de la communauté
                </p>
              </div>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </Container>
    </Section>
  )
}