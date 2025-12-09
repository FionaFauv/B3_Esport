import React from 'react'
import Menu from '@/components/home/Menu'
import Footer from '@/components/home/Footer'
import { Section } from '@/components/ui/section'

/**
 * Page Jeu Responsable
 * Informations sur le jeu responsable et la prévention de l'addiction
 */
export default function JeuResponsablePage() {
  return (
    <>
      <Menu />
      <main>
        {/* Hero Section */}
        <Section paddingY="large" className="contact-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="contact-hero-title">
              Jeu Responsable
            </h1>
            <p className="contact-hero-description">
              Parier sur l&apos;esport doit rester un plaisir. Jouez de manière responsable.
            </p>
          </div>
        </Section>

        {/* Contenu */}
        <Section paddingY="large">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="legal-content">
              
              {/* Introduction */}
              <div className="legal-section">
                <p className="legal-text legal-highlight">
                  Chez <strong>ESPORT ZONE</strong>, nous croyons que les paris sportifs doivent rester un divertissement. 
                  Nous nous engageons à promouvoir un environnement de jeu sûr et responsable pour tous nos utilisateurs.
                </p>
              </div>

              {/* Principes */}
              <div className="legal-section">
                <h2 className="legal-section-title">1. Les principes du jeu responsable</h2>
                <ul className="legal-list">
                  <li>Le jeu doit rester un divertissement, jamais une source de revenus</li>
                  <li>Ne pariez que l&apos;argent que vous pouvez vous permettre de perdre</li>
                  <li>Fixez-vous des limites de temps et d&apos;argent avant de commencer</li>
                  <li>Ne jouez jamais pour récupérer vos pertes</li>
                  <li>Ne jouez pas sous l&apos;influence de l&apos;alcool ou de substances</li>
                  <li>Faites des pauses régulières</li>
                  <li>Ne considérez jamais le jeu comme un moyen de résoudre des problèmes financiers</li>
                </ul>
              </div>

              {/* Signes d'addiction */}
              <div className="legal-section">
                <h2 className="legal-section-title">2. Reconnaître les signes d&apos;addiction</h2>
                <p className="legal-text">
                  Soyez attentif aux signes suivants qui peuvent indiquer un problème de jeu :
                </p>
                <ul className="legal-list">
                  <li>Vous pensez constamment au jeu et planifiez vos prochains paris</li>
                  <li>Vous avez besoin de parier des montants de plus en plus élevés</li>
                  <li>Vous vous sentez agité ou irritable lorsque vous essayez d&apos;arrêter</li>
                  <li>Vous jouez pour échapper à des problèmes ou à des émotions négatives</li>
                  <li>Vous mentez à vos proches sur vos activités de jeu</li>
                  <li>Vous empruntez de l&apos;argent ou vendez des biens pour jouer</li>
                  <li>Vos relations, votre travail ou vos études sont affectés par le jeu</li>
                  <li>Vous tentez sans succès de contrôler, réduire ou arrêter le jeu</li>
                </ul>
                <div className="legal-warning">
                  <p className="legal-text">
                    <strong>⚠️ Important :</strong> Si vous reconnaissez plusieurs de ces signes, 
                    il est important de demander de l&apos;aide immédiatement.
                  </p>
                </div>
              </div>

              {/* Outils de contrôle */}
              <div className="legal-section">
                <h2 className="legal-section-title">3. Nos outils de contrôle</h2>
                <p className="legal-text">
                  ESPORT ZONE met à votre disposition plusieurs outils pour vous aider à garder le contrôle :
                </p>
                
                <div className="legal-tool">
                  <h3 className="legal-tool-title">💰 Limites de dépôt</h3>
                  <p className="legal-text">
                    Définissez des limites quotidiennes, hebdomadaires ou mensuelles sur vos dépôts. 
                    Ces limites ne peuvent être augmentées qu&apos;après un délai de réflexion de 72 heures.
                  </p>
                </div>

                <div className="legal-tool">
                  <h3 className="legal-tool-title">⏰ Limites de temps</h3>
                  <p className="legal-text">
                    Fixez une durée maximale de jeu par session. Vous recevrez une alerte lorsque cette limite sera atteinte.
                  </p>
                </div>

                <div className="legal-tool">
                  <h3 className="legal-tool-title">🔔 Rappels de temps</h3>
                  <p className="legal-text">
                    Activez des rappels réguliers pour vous informer du temps passé sur la plateforme.
                  </p>
                </div>

                <div className="legal-tool">
                  <h3 className="legal-tool-title">⏸️ Auto-exclusion temporaire</h3>
                  <p className="legal-text">
                    Suspendez temporairement votre compte pour 24h, 7 jours, 30 jours ou plus. 
                    Pendant cette période, vous ne pourrez pas accéder à votre compte.
                  </p>
                </div>

                <div className="legal-tool">
                  <h3 className="legal-tool-title">🚫 Auto-exclusion permanente</h3>
                  <p className="legal-text">
                    Fermez définitivement votre compte. Cette décision est irrévocable et votre compte 
                    ne pourra pas être réouvert.
                  </p>
                </div>

                <div className="legal-tool">
                  <h3 className="legal-tool-title">📊 Historique de jeu</h3>
                  <p className="legal-text">
                    Consultez à tout moment l&apos;historique détaillé de vos paris, gains et pertes.
                  </p>
                </div>
              </div>

              {/* Protection des mineurs */}
              <div className="legal-section">
                <h2 className="legal-section-title">4. Protection des mineurs</h2>
                <p className="legal-text">
                  Les paris en ligne sont strictement interdits aux personnes de moins de 18 ans.
                </p>
                <ul className="legal-list">
                  <li>Nous vérifions l&apos;âge de tous nos utilisateurs lors de l&apos;inscription</li>
                  <li>L&apos;accès au site est bloqué pour les mineurs identifiés</li>
                  <li>Nous recommandons l&apos;installation de logiciels de contrôle parental</li>
                  <li>Ne partagez jamais vos identifiants de connexion</li>
                  <li>Surveillez l&apos;utilisation d&apos;Internet par vos enfants</li>
                </ul>
              </div>

              {/* Obtenir de l'aide */}
              <div className="legal-section">
                <h2 className="legal-section-title">5. Obtenir de l&apos;aide</h2>
                <p className="legal-text">
                  Si vous ou un proche êtes confronté à un problème de jeu, de l&apos;aide est disponible :
                </p>

                <div className="legal-help-card">
                  <h3 className="legal-help-title">🇫🇷 Joueurs Info Service</h3>
                  <p className="legal-text">Service d&apos;aide aux joueurs problématiques</p>
                  <ul className="legal-list">
                    <li><strong>Téléphone :</strong> 09 74 75 13 13 (appel non surtaxé)</li>
                    <li><strong>Chat :</strong> <a href="https://www.joueurs-info-service.fr" target="_blank" rel="noopener noreferrer" className="legal-link">www.joueurs-info-service.fr</a></li>
                    <li><strong>Disponibilité :</strong> 7j/7, de 8h à 2h du matin</li>
                  </ul>
                </div>

                <div className="legal-help-card">
                  <h3 className="legal-help-title">🌍 Gamblers Anonymous</h3>
                  <p className="legal-text">Groupes de soutien internationaux pour joueurs compulsifs</p>
                  <ul className="legal-list">
                    <li><strong>Site web :</strong> <a href="https://www.gamblersanonymous.org" target="_blank" rel="noopener noreferrer" className="legal-link">www.gamblersanonymous.org</a></li>
                    <li><strong>Réunions :</strong> Trouvez un groupe près de chez vous</li>
                  </ul>
                </div>

                <div className="legal-help-card">
                  <h3 className="legal-help-title">🏥 Centres spécialisés</h3>
                  <p className="legal-text">Consultation avec des professionnels de santé</p>
                  <ul className="legal-list">
                    <li>Centres de soins, d&apos;accompagnement et de prévention en addictologie (CSAPA)</li>
                    <li>Consultations jeunes consommateurs (CJC)</li>
                    <li>Votre médecin traitant peut vous orienter</li>
                  </ul>
                </div>

                <div className="legal-help-card">
                  <h3 className="legal-help-title">📞 Notre équipe</h3>
                  <p className="legal-text">Contactez notre service client dédié</p>
                  <ul className="legal-list">
                    <li><strong>Email :</strong> support@esportzone.fr</li>
                    <li><strong>Téléphone :</strong> +33 1 23 45 67 89</li>
                    <li>Nous pouvons vous aider à configurer les outils de contrôle</li>
                  </ul>
                </div>
              </div>

              {/* Logiciels de blocage */}
              <div className="legal-section">
                <h2 className="legal-section-title">6. Logiciels de blocage</h2>
                <p className="legal-text">
                  Vous pouvez installer des logiciels qui bloquent l&apos;accès aux sites de jeux :
                </p>
                <ul className="legal-list">
                  <li><strong>GamBlock :</strong> <a href="https://www.gamblock.com" target="_blank" rel="noopener noreferrer" className="legal-link">www.gamblock.com</a></li>
                  <li><strong>BetFilter :</strong> <a href="https://www.betfilter.com" target="_blank" rel="noopener noreferrer" className="legal-link">www.betfilter.com</a></li>
                  <li><strong>Net Nanny :</strong> Pour le contrôle parental</li>
                </ul>
              </div>

              {/* Engagement */}
              <div className="legal-section">
                <h2 className="legal-section-title">7. Notre engagement</h2>
                <p className="legal-text">
                  ESPORT ZONE s&apos;engage à :
                </p>
                <ul className="legal-list">
                  <li>Former notre personnel à la détection des comportements à risque</li>
                  <li>Ne jamais envoyer de publicités aux personnes auto-exclues</li>
                  <li>Promouvoir activement le jeu responsable dans nos communications</li>
                  <li>Coopérer avec les organisations de lutte contre l&apos;addiction au jeu</li>
                  <li>Améliorer continuellement nos outils de protection des joueurs</li>
                  <li>Respecter strictement la réglementation en vigueur</li>
                </ul>
              </div>

              {/* Message final */}
              <div className="legal-section">
                <div className="legal-final-message">
                  <h3 className="legal-final-title">💚 Votre bien-être est notre priorité</h3>
                  <p className="legal-text">
                    N&apos;hésitez jamais à demander de l&apos;aide. Il n&apos;y a aucune honte à reconnaître 
                    un problème et à chercher du soutien. Plus tôt vous agirez, plus il sera facile de retrouver 
                    le contrôle. Notre équipe est là pour vous accompagner dans cette démarche.
                  </p>
                  <p className="legal-text">
                    <strong>Rappelez-vous : Le jeu doit rester un plaisir, pas une contrainte.</strong>
                  </p>
                </div>
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
