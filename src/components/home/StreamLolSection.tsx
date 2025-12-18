'use client'

import React, { useEffect, useState } from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import TwitchLiveStreams from '@/components/Twitch/TwitchLiveStreams'
import { Particles } from '../ui/particles'
import { useTheme } from 'next-themes'

/**
 * Section League of Legends Streams
 * Affiche les streams live français et une sidebar de ressources
 */
export default function StreamLolSection() {

  const { theme } = useTheme()
  const [color, setColor] = useState("#401717ff")

  useEffect(() => {
    setColor(theme === "dark" ? "#e8c6c6ff" : "#531c1cff")
  }, [theme])
  
  return (
    <Section paddingY='large' className='relative overflow-hidden'>
        <Particles
        className="absolute inset-0 z-50"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
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

        <div className="meru-card meru-stream-container">
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