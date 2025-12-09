'use client'

import React from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import TwitchLiveStreams from '@/components/Twitch/TwitchLiveStreams'
import ResourcesSidebar from '@/components/Twitch/ResourcesSidebar'

/**
 * Section League of Legends Streams
 * Affiche les streams live français et une sidebar de ressources
 */
export default function StreamLolSection() {
  return (
    <Section>
      <Container>
        {/* Container avec fond gris foncé */}
        <div className="rounded-xl p-8 streams-container">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Section principale - Streams League of Legends */}
            <div className="flex-1">
              <div className="mb-6">
                {/* En-tête avec badge Live */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full live-badge">
                    <span className="live-pulse-dot"></span>
                    <span className="text-sm font-medium live-badge-text">
                      Live
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    League of Legends
                  </h2>
                </div>
                
                {/* Description */}
                <p className="text-white opacity-70">
                  Les meilleurs streamers français en direct
                </p>
              </div>

              {/* Grid des streams */}
              <TwitchLiveStreams />
            </div>

            {/* Sidebar droite - Guides et ressources */}
            <div className="lg:w-80">
              <ResourcesSidebar />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}