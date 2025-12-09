/**
 * Application routes configuration
 * Centralise toutes les routes de l'application pour éviter les "magic strings (pour la navigation)",
 * idée trouver sur le net + ça m'a l'air pratique
 */

export const ROUTES = {
  HOME: '/',
  PARIS: '/visiteur/paris',
  MATCHS: '/visiteur/matchs',
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
    MENTIONS: '/mentions-legales',
    PRIVACY: '/confidentialite',
    RESPONSIBLE_GAMING: '/jeu-responsable',
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
  { href: ROUTES.PARIS, label: 'Paris' },
  { href: ROUTES.MATCHS, label: 'Matchs' },
  { href: ROUTES.CONTACT, label: 'Contact' },
] as const
