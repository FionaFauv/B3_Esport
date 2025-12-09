import React from 'react'
import Menu from '@/components/home/Menu'
import Footer from '@/components/home/Footer'
import { Section } from '@/components/ui/section'

/**
 * Page Mentions Légales
 * Informations légales sur l'entreprise Esportsaises
 */
export default function MentionsLegalesPage() {
  return (
    <>
      <Menu />
      <main>
        {/* Hero Section */}
        <Section paddingY="large" className="contact-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="contact-hero-title">
              Mentions Légales
            </h1>
            <p className="contact-hero-description">
              Informations légales concernant ESPORT ZONE
            </p>
          </div>
        </Section>

        {/* Contenu */}
        <Section paddingY="large">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="legal-content">
              
              {/* Éditeur du site */}
              <div className="legal-section">
                <h2 className="legal-section-title">1. Éditeur du site</h2>
                <p className="legal-text">
                  Le site <strong>ESPORT ZONE</strong> est édité par la société ESPORT ZONE SAS, société par actions simplifiée au capital de 100 000 euros.
                </p>
                <ul className="legal-list">
                  <li><strong>Siège social :</strong> 42 Avenue des Esports, 75001 Paris, France</li>
                  <li><strong>RCS :</strong> Paris B 123 456 789</li>
                  <li><strong>SIRET :</strong> 123 456 789 00012</li>
                  <li><strong>TVA intracommunautaire :</strong> FR 12 123456789</li>
                  <li><strong>Email :</strong> contact@esportzone.fr</li>
                  <li><strong>Téléphone :</strong> +33 1 23 45 67 89</li>
                </ul>
              </div>

              {/* Directeur de publication */}
              <div className="legal-section">
                <h2 className="legal-section-title">2. Directeur de la publication</h2>
                <p className="legal-text">
                  Le directeur de la publication du site est <strong>Jean Dupont</strong>, Président de la société ESPORT ZONE SAS.
                </p>
              </div>

              {/* Hébergement */}
              <div className="legal-section">
                <h2 className="legal-section-title">3. Hébergement</h2>
                <p className="legal-text">
                  Le site est hébergé par :
                </p>
                <ul className="legal-list">
                  <li><strong>Nom :</strong> Vercel Inc.</li>
                  <li><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
                  <li><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="legal-link">vercel.com</a></li>
                </ul>
              </div>

              {/* Propriété intellectuelle */}
              <div className="legal-section">
                <h2 className="legal-section-title">4. Propriété intellectuelle</h2>
                <p className="legal-text">
                  L&apos;ensemble du contenu du site ESPORT ZONE (textes, images, vidéos, logos, graphismes, etc.) est la propriété exclusive de ESPORT ZONE SAS, sauf mention contraire.
                </p>
                <p className="legal-text">
                  Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces différents éléments est strictement interdite sans l&apos;accord exprès par écrit de ESPORT ZONE SAS.
                </p>
                <p className="legal-text">
                  Les marques et logos présents sur le site sont des marques déposées. Toute reproduction totale ou partielle de ces marques sans autorisation préalable et écrite de ESPORT ZONE SAS est interdite.
                </p>
              </div>

              {/* Protection des données */}
              <div className="legal-section">
                <h2 className="legal-section-title">5. Protection des données personnelles</h2>
                <p className="legal-text">
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition aux données personnelles vous concernant.
                </p>
                <p className="legal-text">
                  Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse : <strong>dpo@esportzone.fr</strong>
                </p>
                <p className="legal-text">
                  Pour plus d&apos;informations, consultez notre <a href="/front-site/extra/confidentialite" className="legal-link">Politique de Confidentialité</a>.
                </p>
              </div>

              {/* Cookies */}
              <div className="legal-section">
                <h2 className="legal-section-title">6. Cookies</h2>
                <p className="legal-text">
                  Le site utilise des cookies pour améliorer l&apos;expérience utilisateur et analyser le trafic. En poursuivant votre navigation sur ce site, vous acceptez l&apos;utilisation de cookies.
                </p>
                <p className="legal-text">
                  Vous pouvez paramétrer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités du site.
                </p>
              </div>

              {/* Responsabilité */}
              <div className="legal-section">
                <h2 className="legal-section-title">7. Limitation de responsabilité</h2>
                <p className="legal-text">
                  ESPORT ZONE s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, ESPORT ZONE ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition sur ce site.
                </p>
                <p className="legal-text">
                  ESPORT ZONE ne pourra être tenue responsable des dommages directs ou indirects résultant de l&apos;accès au site ou de l&apos;utilisation de celui-ci.
                </p>
              </div>

              {/* Droit applicable */}
              <div className="legal-section">
                <h2 className="legal-section-title">8. Droit applicable et juridiction</h2>
                <p className="legal-text">
                  Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
                </p>
              </div>

              {/* Mise à jour */}
              <div className="legal-section">
                <p className="legal-update">
                  <strong>Dernière mise à jour :</strong> 9 décembre 2025
                </p>
              </div>

            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
