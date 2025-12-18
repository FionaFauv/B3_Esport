'use client'

import React, { useEffect, useState } from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { StaggerContainer, SlideInFromBottom } from '@/components/animations'
import { motion, AnimatePresence } from 'framer-motion'
import ResourcesSidebar from '../Twitch/ResourcesSidebar'
import { GAMES, contentVariants, gridVariants, gridItemVariants } from '@/lib/constants/game'
import { Particles } from '../ui/particles'
import { useTheme } from 'next-themes'

export default function LiveRiotGamesSection() {
  const [activeTab, setActiveTab] = useState<string>('lol')
  const activeGame = GAMES.find(game => game.id === activeTab) || GAMES[0]

  const { theme } = useTheme()
  const [color, setColor] = useState("#401717ff")

  useEffect(() => {
    setColor(theme === "dark" ? "#e8c6c6ff" : "#531c1cff")
  }, [theme])

  return (
    <SlideInFromBottom>
    <Section paddingY='large'>
      <Container className='z-50'>
        <StaggerContainer>
          {/* Titre de la section */}
          <div className="text-center mb-8">
            <h2 className="meru-title-section">
              Découvrez les Jeux Esport
            </h2>
            <p className="meru-subtitle">
              Explorez l&apos;univers des jeux compétitifs et ses astuces !
            </p>
          </div>
        
          {/* Onglets */}
          <Container>
          <Container className="mb-8">
            <div className="meru-games-tabs-container">
              {GAMES.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setActiveTab(game.id)}
                  className={`meru-games-tab ${activeTab === game.id ? 'meru-games-tab-active' : ''}`}
                >
                  <span className="meru-games-tab-icon">{game.icon}</span>
                  <span className="meru-games-tab-text">{game.name}</span>
                </button>
              ))}
            </div>

            {/* Layout flex: Container rouge gauche + Sidebar droite */}
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Gauche - Container rouge avec informations */}
              <div className="flex-1">
                <div className="meru-container-primary">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeGame.id}
                      variants={contentVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      {/* En-tête du jeu */}
                      <div className="mb-6">
                        <div className="flex items-center gap-4 mb-4">
                          <motion.span 
                            className="meru-games-info-icon"
                            initial={{ rotate: -180, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ 
                              type: "spring",
                              stiffness: 200,
                              damping: 15,
                              delay: 0.1
                            }}
                          >
                            {activeGame.icon}
                          </motion.span>
                          <div>
                            <h3 className="meru-title-component">{activeGame.name}</h3>
                            <p className="meru-description">{activeGame.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Détails du jeu en grille avec animation stagger */}
                      <motion.div 
                        className="grid grid-cols-2 gap-4 mb-6"
                        variants={gridVariants}
                        initial="initial"
                        animate="animate"
                      >
                        <motion.div className="meru-games-detail-card" variants={gridItemVariants}>
                          <span className="meru-label block mb-2">Genre</span>
                          <span className="meru-description">{activeGame.details.genre}</span>
                        </motion.div>
                        <motion.div className="meru-games-detail-card" variants={gridItemVariants}>
                          <span className="meru-label block mb-2">Développeur</span>
                          <span className="meru-description">{activeGame.details.developer}</span>
                        </motion.div>
                        <motion.div className="meru-games-detail-card" variants={gridItemVariants}>
                          <span className="meru-label block mb-2">Année de sortie</span>
                          <span className="meru-description">{activeGame.details.releaseYear}</span>
                        </motion.div>
                        <motion.div className="meru-games-detail-card" variants={gridItemVariants}>
                          <span className="meru-label block mb-2">Joueurs</span>
                          <span className="meru-description">{activeGame.details.players}</span>
                        </motion.div>
                      </motion.div>
                
                      {/* Résumé / Description */}
                      <motion.div 
                        className="meru-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                      >
                        <h4 className="meru-title-small">À propos</h4>
                        <p className="meru-description">{activeGame.summary}</p>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
                
              {/* Droite - Sidebar sans container */}
              <div className="lg:w-80">
                <ResourcesSidebar />
              </div>
            </div>
            </Container>
          </Container>
        </StaggerContainer>
      </Container>
    </Section>
       <Particles
              className="absolute inset-0"
                quantity={100}
                ease={80}
                color={color}
                refresh
              />
      </SlideInFromBottom>

  )
}