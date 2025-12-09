/**
 * Application routes configuration
 * Centralise toutes les routes de l'application pour éviter les "magic strings (pour la navigation)",
 * idée trouver sur le net + ça m'a l'air pratique
 */

export const ROUTES = {
  HOME: '/',
  EXPLICATION: '/front-site/explication',
  CONTACT: '/front-site/contact',
  
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  
  ADMIN: {
    DASHBOARD: '/admin',
    EQUIPES: '/admin/equipes',
    MATCHS: '/admin/matchs',
    GESTION: '/admin/gestion',
  },
  
  VISITEUR: {
    HOME: '/visiteur',
    PARIS: '/visiteur/paris',
    MATCHS: '/visiteur/matchs',
  },
  
  LEGAL: {
    MENTIONS: '/front-site/extra/mentions-legales',
    PRIVACY: '/front-site/extra/confidentialite',
    RESPONSIBLE_GAMING: '/front-site/extra/jeu-responsable',
  },
  
  SOCIAL: {
    TWITTER: 'https://twitter.com/esportzone',
    DISCORD: 'https://discord.gg/esportzone',
    YOUTUBE: 'https://youtube.com/@esportzone',
    TWITCH: 'https://twitch.tv/esportzone',
  },
} as const

/**
 * Navigation
 */
export const NAV_MENU_ITEMS = [
  { href: ROUTES.HOME, label: 'Accueil' },
  { href: ROUTES.EXPLICATION, label: 'Comment ça marche ?' },
  { href: ROUTES.CONTACT, label: 'Contact' },
] as const
