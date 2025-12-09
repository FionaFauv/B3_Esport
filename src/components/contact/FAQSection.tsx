import React from 'react'
import { SpanIcon } from '../ui/span-icon'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

/**
 * Section FAQ de la page Contact
 * Affiche une liste de questions fréquentes
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
    <Section>
        <Container>
    <div className="mt-16">
      <h2 className="faq-title">
        Questions fréquentes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <div key={index} className="card-hover rounded-xl p-6 faq-card">
            <h3 className="faq-question">
              <SpanIcon>
                ?
              </SpanIcon>
              {faq.question}
            </h3>
            <p className="faq-answer">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
    </Container>
    </Section>
  )
}