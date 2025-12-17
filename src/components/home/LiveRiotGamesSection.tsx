'use client'

import React, { useState } from 'react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { StaggerContainer, SlideInFromBottom } from '@/components/animations'
import { motion, AnimatePresence } from 'framer-motion'
import ResourcesSidebar from '../Twitch/ResourcesSidebar'
/**
 * Section Jeux Esport avec Onglets
 * Affiche des informations sur les jeux et une rediffusion Twitch
 */

type Game = {
  id: string
  name: string
  icon: string
  description: string
  details: {
    genre: string
    developer: string
    releaseYear: number
    players: string
  }
  summary: string
  twitchVideo: string
}

const GAMES: Game[] = [
  {
    id: 'lol',
    name: 'League of Legends',
    icon: '⚔️',
    description: 'MOBA stratégique et compétitif de Riot Games',
    details: {
      genre: 'MOBA (Multiplayer Online Battle Arena)',
      developer: 'Riot Games',
      releaseYear: 2009,
      players: '5v5'
    },
    summary: 'League of Legends est un jeu multijoueur en ligne de type MOBA où deux équipes de cinq champions s\'affrontent pour détruire le Nexus adverse. Avec plus de 160 champions uniques, des stratégies infinies et une scène esport mondiale, LoL est l\'un des jeux les plus populaires au monde.',
    twitchVideo: '2613641505'
  },
  {
    id: 'valorant',
    name: 'Valorant',
    icon: '🎯',
    description: 'FPS tactique 5v5 avec des agents aux capacités uniques',
    details: {
      genre: 'FPS Tactique',
      developer: 'Riot Games',
      releaseYear: 2020,
      players: '5v5'
    },
    summary: 'Valorant est un jeu de tir tactique à la première personne développé par Riot Games. Chaque match oppose deux équipes de cinq joueurs, où chacun incarne un agent doté de capacités spéciales. Le jeu combine précision du tir, stratégie d\'équipe et utilisation intelligente des capacités pour remporter la victoire.',
    twitchVideo: '2613641505'
  },
  {
    id: 'csgo',
    name: 'Counter-Strike 2',
    icon: '🔫',
    description: 'Le FPS compétitif légendaire de Valve',
    details: {
      genre: 'FPS Tactique',
      developer: 'Valve Corporation',
      releaseYear: 2023,
      players: '5v5'
    },
    summary: 'Counter-Strike 2 est la dernière évolution de la franchise CS:GO. Ce FPS tactique met en scène des affrontements entre terroristes et anti-terroristes dans des parties stratégiques où chaque round compte. Avec son économie de jeu unique et son skill ceiling élevé, CS2 reste une référence de l\'esport.',
    twitchVideo: '2613641505'
  },
  {
    id: 'overwatch',
    name: 'Overwatch 2',
    icon: '🦸',
    description: 'FPS par équipes avec des héros aux capacités uniques',
    details: {
      genre: 'FPS Hero Shooter',
      developer: 'Blizzard Entertainment',
      releaseYear: 2022,
      players: '5v5'
    },
    summary: 'Overwatch 2 est un jeu de tir à la première personne free-to-play où deux équipes de cinq héros s\'affrontent dans des modes objectifs variés. Chaque héros possède des capacités uniques et appartient à un rôle spécifique (Tank, Damage, Support). Le jeu mise sur le travail d\'équipe et la synergie entre les héros pour remporter la victoire.',
    twitchVideo: '2613641505'
  },
  {
    id: 'rocketleague',
    name: 'Rocket League',
    icon: '🚗',
    description: 'Football avec des voitures acrobatiques',
    details: {
      genre: 'Sport Véhiculaire',
      developer: 'Psyonix',
      releaseYear: 2015,
      players: '3v3'
    },
    summary: 'Rocket League est un jeu de sport compétitif unique qui mélange football et courses de voitures. Les joueurs contrôlent des véhicules équipés de propulseurs pour marquer des buts avec un ballon géant. Avec sa physique accessible mais difficile à maîtriser, Rocket League offre un gameplay spectaculaire et une scène esport dynamique.',
    twitchVideo: '2613641505'
  },
  {
    id: 'apex',
    name: 'Apex Legends',
    icon: '🎖️',
    description: 'Battle Royale avec des légendes aux capacités tactiques',
    details: {
      genre: 'Battle Royale FPS',
      developer: 'Respawn Entertainment',
      releaseYear: 2019,
      players: '3v3 (Squads)'
    },
    summary: 'Apex Legends est un battle royale free-to-play se déroulant dans l\'univers de Titanfall. Les joueurs choisissent parmi diverses légendes, chacune possédant des capacités uniques, et s\'affrontent en équipes de trois pour être la dernière squad debout. Le jeu se distingue par son système de ping innovant, son gameplay fluide et ses mécaniques de mouvement avancées.',
    twitchVideo: '2613641505'
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    icon: '🏗️',
    description: 'Battle Royale avec construction et événements épiques',
    details: {
      genre: 'Battle Royale',
      developer: 'Epic Games',
      releaseYear: 2017,
      players: '100 (Solo/Duo/Squad)'
    },
    summary: 'Fortnite est le battle royale le plus populaire au monde, combinant combat, construction et exploration. Les joueurs s\'affrontent sur une île massive où la zone de jeu se rétrécit progressivement. La mécanique de construction unique permet de créer des structures défensives ou offensives en temps réel, ajoutant une dimension stratégique supplémentaire aux combats.',
    twitchVideo: '2613641505'
  }
]

// Variants d'animation pour le contenu
const contentVariants = {
  initial: { 
    opacity: 0, 
    x: -20,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4
    }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    scale: 0.95,
    transition: {
      duration: 0.3
    }
  }
}

// Variants pour les détails en grille (stagger)
const gridVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const gridItemVariants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4
    }
  }
}

export default function LiveRiotGamesSection() {
  const [activeTab, setActiveTab] = useState<string>('lol')
  const activeGame = GAMES.find(game => game.id === activeTab) || GAMES[0]

  return (
    <SlideInFromBottom>
    <Section paddingY='large'>
      <Container>
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
      </SlideInFromBottom>
  )
}