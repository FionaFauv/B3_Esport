import React from 'react'
import { Navbar } from '@/components/ui/navbar'
import Footer from '@/components/home/Footer'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

/**
 * Page Politique de Confidentialité
 * Politique de confidentialité et protection des données personnelles
 */
export default function ConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <Section paddingY="large">
          <Container className="pt-12 text-center">
            <h1 className="meru-title-main">
              Politique de Confidentialité
            </h1>
            <p className="meru-subtitle">
              Comment nous collectons, utilisons et protégeons vos données personnelles
            </p>
          </Container>
        </Section>

        {/* Contenu */}
        <Section paddingY="large">
          <Container>
            <div className="max-w-4xl mx-auto">
              
              {/* Introduction */}
              <div className="meru-legal-section">
                <div className="meru-legal-highlight">
                  <p className="meru-legal-text">
                    Chez <strong>ESPORT ZONE</strong>, nous accordons une grande importance à la protection de vos données personnelles. 
                    Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons et protégeons vos données 
                    conformément au Règlement Général sur la Protection des Données (RGPD).
                  </p>
                </div>
                <p className="meru-legal-update">
                  <strong>Dernière mise à jour :</strong> 9 décembre 2025
                </p>
              </div>

              {/* Données collectées */}
              <div className="meru-legal-section">
                <h2 className="meru-legal-section-title">1. Données personnelles collectées</h2>
                <p className="meru-legal-text">
                  Nous collectons les données suivantes lorsque vous utilisez notre plateforme :
                </p>
                <ul className="meru-legal-list">
                  <li><strong>Données d&apos;identification :</strong> nom, prénom, pseudo, adresse email</li>
                  <li><strong>Données de connexion :</strong> adresse IP, cookies, logs de connexion</li>
                  <li><strong>Données de navigation :</strong> pages visitées, durée de visite, interactions</li>
                  <li><strong>Données de paiement :</strong> informations bancaires (cryptées et sécurisées)</li>
                  <li><strong>Données de paris :</strong> historique des paris, gains et pertes</li>
                </ul>
              </div>

              {/* Finalités */}
              <div className="meru-legal-section">
                <h2 className="meru-legal-section-title">2. Finalités du traitement</h2>
                <p className="meru-legal-text">
                  Vos données personnelles sont collectées et traitées pour les finalités suivantes :
                </p>
                <ul className="meru-legal-list">
                  <li>Création et gestion de votre compte utilisateur</li>
                  <li>Traitement de vos paris et transactions financières</li>
                  <li>Amélioration de nos services et de l&apos;expérience utilisateur</li>
                  <li>Communication d&apos;informations importantes (maintenance, nouveautés, promotions)</li>
                  <li>Respect de nos obligations légales et réglementaires</li>
                  <li>Prévention de la fraude et des activités illégales</li>
                  <li>Analyse statistique et amélioration de la plateforme</li>
                </ul>
              </div>

              {/* Base légale */}
              <div className="meru-legal-section">
                <h2 className="meru-legal-section-title">3. Base légale du traitement</h2>
                <p className="meru-legal-text">
                  Le traitement de vos données repose sur les bases légales suivantes :
                </p>
                <ul className="meru-legal-list">
                  <li><strong>Exécution du contrat :</strong> pour la gestion de votre compte et vos paris</li>
                  <li><strong>Consentement :</strong> pour l&apos;envoi de communications marketing</li>
                  <li><strong>Obligation légale :</strong> pour la conformité aux lois sur les jeux d&apos;argent</li>
                  <li><strong>Intérêt légitime :</strong> pour la prévention de la fraude et la sécurité</li>
                </ul>
              </div>

              {/* Durée de conservation */}
              <div className="meru-legal-section">
                <h2 className="meru-legal-section-title">4. Durée de conservation des données</h2>
                <p className="meru-legal-text">
                  Vos données personnelles sont conservées pendant les durées suivantes :
                </p>
                <ul className="meru-legal-list">
                  <li><strong>Données de compte actif :</strong> pendant toute la durée de votre utilisation du service</li>
                  <li><strong>Données de compte inactif :</strong> 3 ans après la dernière connexion</li>
                  <li><strong>Données financières :</strong> 5 ans conformément aux obligations légales</li>
                  <li><strong>Cookies :</strong> 13 mois maximum</li>
                </ul>
              </div>

              {/* Partage des données */}
              <div className="meru-legal-section">
                <h2 className="meru-legal-section-title">5. Partage des données</h2>
                <p className="meru-legal-text">
                  Vos données peuvent être partagées avec :
                </p>
                <ul className="meru-legal-list">
                  <li><strong>Prestataires de services :</strong> hébergement, paiement, support client</li>
                  <li><strong>Partenaires commerciaux :</strong> uniquement avec votre consentement explicite</li>
                  <li><strong>Autorités légales :</strong> sur demande légale ou judiciaire</li>
                </ul>
                <p className="meru-legal-text">
                  Nous ne vendons jamais vos données personnelles à des tiers.
                </p>
              </div>

              {/* Vos droits */}
              <div className="meru-legal-section">
                <h2 className="meru-legal-section-title">6. Vos droits</h2>
                <p className="meru-legal-text">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="meru-legal-list">
                  <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données personnelles</li>
                  <li><strong>Droit de rectification :</strong> corriger des données inexactes ou incomplètes</li>
                  <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
                  <li><strong>Droit à la limitation :</strong> restreindre le traitement de vos données</li>
                  <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
                  <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
                  <li><strong>Droit de retrait du consentement :</strong> à tout moment</li>
                </ul>
                <p className="meru-legal-text">
                  Pour exercer ces droits, contactez-nous à : <strong>dpo@esportzone.fr</strong>
                </p>
              </div>

              {/* Sécurité */}
              <div className="meru-legal-section">
                <h2 className="meru-legal-section-title">7. Sécurité des données</h2>
                <p className="meru-legal-text">
                  Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles :
                </p>
                <ul className="meru-legal-list">
                  <li>Chiffrement SSL/TLS pour toutes les communications</li>
                  <li>Chiffrement des données sensibles dans nos bases de données</li>
                  <li>Authentification à deux facteurs disponible</li>
                  <li>Contrôles d&apos;accès stricts aux données</li>
                  <li>Surveillance continue des activités suspectes</li>
                  <li>Sauvegardes régulières et plan de reprise d&apos;activité</li>
                </ul>
              </div>

              {/* Cookies */}
              <div className="meru-legal-section">
                <h2 className="meru-legal-section-title">8. Cookies et technologies similaires</h2>
                <p className="meru-legal-text">
                  Nous utilisons des cookies pour améliorer votre expérience :
                </p>
                <ul className="meru-legal-list">
                  <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site</li>
                  <li><strong>Cookies de performance :</strong> pour analyser l&apos;utilisation du site</li>
                  <li><strong>Cookies de fonctionnalité :</strong> pour mémoriser vos préférences</li>
                  <li><strong>Cookies publicitaires :</strong> pour personnaliser les publicités (avec votre consentement)</li>
                </ul>
                <p className="meru-legal-text">
                  Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
                </p>
              </div>

              {/* Transferts internationaux */}
              <div className="meru-legal-section">
                <h2 className="meru-legal-section-title">9. Transferts internationaux</h2>
                <p className="meru-legal-text">
                  Vos données peuvent être transférées et stockées en dehors de l&apos;Union Européenne. 
                  Dans ce cas, nous nous assurons que des garanties appropriées sont en place conformément au RGPD 
                  (clauses contractuelles types, Privacy Shield, etc.).
                </p>
              </div>

              {/* Mineurs */}
              <div className="meru-legal-section">
                <h2 className="meru-legal-section-title">10. Protection des mineurs</h2>
                <p className="meru-legal-text">
                  Notre plateforme est strictement réservée aux personnes majeures (18 ans et plus). 
                  Nous ne collectons pas sciemment de données personnelles auprès de mineurs. 
                  Si nous découvrons qu&apos;un mineur nous a fourni des données personnelles, nous les supprimerons immédiatement.
                </p>
              </div>

              {/* Contact */}
              <div className="meru-legal-section">
                <h2 className="meru-legal-section-title">11. Contact et réclamations</h2>
                <p className="meru-legal-text">
                  Pour toute question concernant cette politique de confidentialité ou l&apos;exercice de vos droits :
                </p>
                <ul className="meru-legal-list">
                  <li><strong>Email :</strong> dpo@esportzone.fr</li>
                  <li><strong>Courrier :</strong> ESPORT ZONE - DPO, 42 Avenue des Esports, 75001 Paris</li>
                </ul>
                <p className="meru-legal-text">
                  Vous avez également le droit de déposer une réclamation auprès de la CNIL 
                  (Commission Nationale de l&apos;Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="meru-legal-link">www.cnil.fr</a>
                </p>
              </div>

              {/* Modifications */}
              <div className="meru-legal-section">
                <h2 className="meru-legal-section-title">12. Modifications de la politique</h2>
                <p className="meru-legal-text">
                  Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                  Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour. 
                  Nous vous encourageons à consulter régulièrement cette page.
                </p>
              </div>

            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
