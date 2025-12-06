# 🛠️ Stack Technique - Esport App

## 📦 Framework & Core

| Technologie | Version | Description |
|------------|---------|-------------|
| **Next.js** | 15.5.4 | Framework React avec SSR, App Router et Turbopack pour le développement |
| **React** | 19.1.0 | Bibliothèque JavaScript pour construire des interfaces utilisateur |
| **TypeScript** | ^5 | Superset de JavaScript avec typage statique |

---

## 🎨 UI & Styling

| Technologie | Version | Description |
|------------|---------|-------------|
| **Tailwind CSS** | ^4 | Framework CSS utility-first pour un design moderne et réactif |
| **Next Themes** | ^0.4.6 | Gestion du thème clair/sombre avec transitions fluides |
| **@headlessui/react** | ^2.2.9 | Composants UI accessibles et non stylés (modals, menus, transitions) |
| **@heroicons/react** | ^2.2.0 | Bibliothèque d'icônes SVG pour React |

---

## 🗄️ Backend & Base de Données

| Technologie | Version | Description |
|------------|---------|-------------|
| **PocketBase** | ^0.26.2 | Backend BaaS (Backend-as-a-Service) avec auth, base de données et API temps réel |
| **MariaDB** | ^3.4.5 | Connecteur pour base de données MariaDB (si utilisé avec PocketBase) |
| **MySQL** | ^2.18.1 | Connecteur pour base de données MySQL (si utilisé avec PocketBase) |

---

## 📊 Gestion d'État & Data

| Technologie | Version | Description |
|------------|---------|-------------|
| **Zustand** | ^5.0.8 | Gestion d'état minimaliste et performante pour React (alternative à Redux) |
| **TanStack Table** | ^8.21.3 | Bibliothèque headless pour créer des tableaux interactifs avec tri, filtres et pagination |

---

## 🕒 Utilitaires

| Technologie | Version | Description |
|------------|---------|-------------|
| **Luxon** | ^3.7.2 | Bibliothèque de manipulation de dates/heures avec gestion des fuseaux horaires |

---

## 🔧 Développement & Outils

| Technologie | Version | Description |
|------------|---------|-------------|
| **ESLint** | ^9 | Linter pour JavaScript/TypeScript avec règles Next.js |
| **PostCSS** | ^4 | Outil pour transformer CSS avec plugins (utilisé par Tailwind) |

---

## 🎯 Fonctionnalités Clés Implémentées

### 🔐 Authentification
- **PocketBase Auth** : Login/signup avec stockage sécurisé des tokens
- **Protected Routes** : Middleware pour sécuriser les pages `/admin/*`

### 📱 Pages Publiques
- `/` : Page d'accueil
- `/matchs` : Liste publique des matchs
- `/equipes` : Liste publique des équipes
- `/contact` : Formulaire de contact

### 🔒 Espace Admin (Protégé)
- `/admin` : Dashboard avec statistiques
- `/admin/matchs` : Gestion CRUD des matchs avec sidebar tournois
- `/admin/equipes` : Gestion CRUD des équipes avec sidebar jeux

### 🎨 Design System
- **Couleur primaire** : Orange `#d87943`
- **Thème** : Dark/Light mode avec variables CSS
- **Animations** : Hover effects avec `.card-hover` et transitions fluides
- **Layout** : 2 colonnes (contenu principal + sidebar) sur les pages admin

### 📊 Collections PocketBase
- **Teams** : Équipes esport (nom, tag, pays, année, logo)
- **Tournaments** : Tournois (nom, prize pool, dates, lieu)
- **Matches** : Matchs (équipes, date, statut, scores, gagnant)
- **Games** : Jeux vidéo (nom, catégorie)
- **Users** : Utilisateurs avec authentification

---

## 📁 Structure du Projet

```
esport_app/
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   │   ├── admin/              # Pages admin protégées
│   │   ├── auth/               # Login/Signup
│   │   ├── matchs/             # Page publique matchs
│   │   ├── equipes/            # Page publique équipes
│   │   └── globals.css         # Styles globaux
│   ├── components/             # Composants React réutilisables
│   │   ├── Navbar*.tsx         # Navigation
│   │   ├── Create*Modal.tsx    # Modals de création
│   │   └── Edit*Modal.tsx      # Modals d'édition
│   ├── lib/                    # Utilitaires
│   │   └── pocketbase.ts       # Instance PocketBase configurée
│   └── stores/                 # Stores Zustand
│       └── AuthStore.tsx       # Store d'authentification
├── public/                     # Assets statiques
├── .env                        # Variables d'environnement
└── package.json                # Dépendances
```

---

## 🚀 Commandes

```bash
# Développement
npm run dev              # Lance le serveur de dev avec Turbopack

# Production
npm run build            # Build l'application
npm run start            # Lance en production

# Qualité de code
npm run lint             # Vérifie le code avec ESLint
```

---

## 🌐 Variables d'Environnement

```env
NEXT_PUBLIC_PB_URL=https://fiona.pb.andy-cinquin.fr/
NEXT_PUBLIC_SITE_URL=https://esport-paris.fr
PB_USER=fiona.fauv@gmail.com
PB_PASSWORD=********
```

---

## 📝 Notes Techniques

- **Turbopack** : Utilisé pour un bundling ultra-rapide en développement
- **App Router** : Architecture Next.js 13+ avec Server/Client Components
- **CSS Variables** : `--background`, `--foreground`, `--border`, `--primary`
- **Responsive** : Mobile-first avec breakpoints Tailwind (sm, md, lg, xl)
- **Performance** : Optimisations d'images avec `next/image`

---

**Version** : 0.1.0  
**Dernière mise à jour** : Novembre 2025
