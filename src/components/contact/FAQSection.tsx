import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

/**
 * Section FAQ de la page Contact
 * Affiche une liste de questions fréquentes avec le style Meru
 */
export default function FAQSection() {
  const faqs = [
    {
      question: 'Comment créer un compte ?',
      answer: 'Cliquez sur le bouton "Inscription" en haut à droite, remplissez le formulaire et validez votre email.',
    },
    {
      question: 'Comment rejoindre un tournoi ?',
      answer: 'Consultez la liste des tournois disponibles et cliquez sur "S\'inscrire" sur celui de votre choix.',
    },
    {
      question: 'Les tournois sont-ils gratuits ?',
      answer: 'Certains tournois sont gratuits, d\'autres peuvent nécessiter des frais d\'inscription. Vérifiez les détails.',
    },
    {
      question: 'Comment devenir partenaire ?',
      answer: 'Contactez-nous via le formulaire en sélectionnant "Partenariat" comme sujet de votre message.',
    },
  ]

  return (
    <Section paddingY="large">
      <Container>
        <h2 className="meru-title-section mb-12">
          Questions fréquentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="meru-card">
              <h3 className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: 'var(--primary)' }}>
                  ?
                </span>
                <span className="meru-title-small" style={{ marginBottom: 0 }}>
                  {faq.question}
                </span>
              </h3>
              <p className="meru-description ml-11">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}