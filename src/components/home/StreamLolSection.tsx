'use client'

import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import TwitchLiveStreams from '@/components/Twitch/TwitchLiveStreams'

/**
 * Section League of Legends Streams
 * Affiche les streams live français et une sidebar de ressources
 */
export default function StreamLolSection() {
  return (
    <Section paddingY='large'>
      <Container>
        {/* Titre de la section */}
        <div className="text-center mb-8">
          <h2 className="meru-title-section">
            Streams en Direct
          </h2>
          <p className="meru-subtitle">
            Regardez les meilleurs streamers français de League of Legends
          </p>
        </div>

        <div className="meru-stream-container">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Section principale - Streams League of Legends */}
            <div className="flex-1">
              <div className="meru-stream-header">
                {/* En-tête avec badge Live et titre */}
                <div className="meru-stream-title-wrapper">
                  <div className="meru-stream-live-badge">
                    <span className="meru-stream-live-dot"></span>
                    <span className="meru-stream-live-text">
                      Live
                    </span>
                  </div>
                  <h2 className="meru-title-component">
                    League of Legends
                  </h2>
                </div>
                
                {/* Description */}
                <p className="meru-description">
                  Les meilleurs streamers français en direct
                </p>
              </div>

              {/* Grid des streams */}
              <TwitchLiveStreams />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}