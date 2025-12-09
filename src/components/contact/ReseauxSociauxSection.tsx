import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
  
/** 
 * Section Réseaux Sociaux de la page Contact
 * Affiche les cartes de contact (Email, Discord, Twitter)
 */
export default function ReseauxSociauxSection() {
  return (
    <Section>
        <Container className="flex flex-wrap justify-center items-center gap-6">
      {/* Email Card */}
      <div className="card-hover rounded-2xl p-6 contact-card">
        <div className="contact-card-icon contact-card-icon-email">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="contact-card-title">Email</h3>
        <p className="contact-card-description">
          Envoyez-nous un email
        </p>
        <a
          href="mailto:contact@esportapp.fr"
          className="contact-card-link contact-card-link-email"
        >
          contact@esportapp.fr
        </a>
      </div>

      {/* Discord Card */}
      <div className="card-hover rounded-2xl p-6 contact-card">
        <div className="contact-card-icon contact-card-icon-discord">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
          </svg>
        </div>
        <h3 className="contact-card-title">Discord</h3>
        <p className="contact-card-description">
          Rejoignez notre serveur
        </p>
        <a 
          href="https://discord.gg/esportapp" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="contact-card-link contact-card-link-discord"
        >
          discord.gg/esportapp
        </a>
      </div>

      {/* Twitter Card */}
      <div className="card-hover rounded-2xl p-6 contact-card">
        <div className="contact-card-icon contact-card-icon-twitter">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </div>
        <h3 className="contact-card-title">Twitter</h3>
        <p className="contact-card-description">
          Suivez-nous sur Twitter
        </p>
        <a 
          href="https://twitter.com/esportapp" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="contact-card-link contact-card-link-twitter"
        >
          @esportapp
        </a>
      </div>
    </Container>
    </Section>
  )
}
