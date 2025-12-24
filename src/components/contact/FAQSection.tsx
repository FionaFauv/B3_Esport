'use client' 

import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { faqs } from '@/lib/constants/faqs'
/**
 * Section FAQ de la page Contact
 * Affiche une liste de questions fréquentes avec le style Meru
 */
export default function FAQSection() {

  return (
    <Section paddingY="large" className='relative overflow-hidden'>
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