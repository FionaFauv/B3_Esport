'use client'

import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { SlideInFromBottom, StaggerContainer } from '@/components/animations'

/**
 * Section Live Riot Games
 * Affiche un player Twitch en rediffusion (ou live)
 */
export default function LiveRiotGamesSection() {
  return (
    <Section paddingY='small'>
      <Container>
        <StaggerContainer>
        <div className="rounded-xl overflow-hidden border twitch-player-container">
          {/* Header du live */}
          <div className="px-6 py-4 border-b flex items-center justify-between twitch-player-header">
            <div className="flex items-center gap-3">
              {/* Badge Rediffusion/Live */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full twitch-status-badge">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span className="text-sm font-medium">REDIFFUSION</span>
              </div>
              <SlideInFromBottom>
                <h2 className="text-2xl font-bold text-white">Riot Games Official</h2>
              </SlideInFromBottom>
            </div>
            
            {/* Bouton Ouvrir sur Twitch */}
            <a 
              href="https://www.twitch.tv/videos/2613641505"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium twitch-open-button"
              aria-label="Ouvrir la vidéo sur Twitch"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
              </svg>
              Ouvrir sur Twitch
            </a>
          </div>

          {/* Iframe Twitch responsive 16:9 */}
          <div className="twitch-iframe-wrapper">
            <iframe
              src="https://player.twitch.tv/?video=2613641505&parent=localhost&parent=esport-paris.fr&autoplay=true&muted=false"
              allowFullScreen
              title="Twitch player - Riot Games Official"
            />
          </div>
        </div>
        </StaggerContainer>
      </Container>
    </Section>
  )
}
