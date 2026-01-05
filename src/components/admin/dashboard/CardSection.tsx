'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { Users, Trophy, Gamepad2, Calendar, ChevronRight } from 'lucide-react';
import { fetchAllTeams } from '@/app/api/pocketbase/team/view-team';
import { fetchAllGames } from '@/app/api/pocketbase/games/view-game';
import { fetchAllTournaments } from '@/app/api/pocketbase/tournaments/view-tournament';
import { fetchAllMatches } from '@/app/api/pocketbase/matches/view-match';
import type { Team, Game, Tournament, Match } from '@/app/api/types';

// Fonction pour le tableau de bord (facultatif à revoir si j'ai le temps.)
export default function CardSection() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [tournamentsLoading, setTournamentsLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchesLoading, setMatchesLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadAllData = async () => {
      try {
        const [teamsData, gamesData, tournamentsData, matchesData] = await Promise.all([
          fetchAllTeams().catch(err => {
            console.error('Erreur lors du chargement des équipes:', err);
            return [];
          }),
          fetchAllGames().catch(err => {
            console.error('Erreur lors du chargement des jeux:', err);
            return [];
          }),
          fetchAllTournaments().catch(err => {
            console.error('Erreur lors du chargement des tournois:', err);
            return [];
          }),
          fetchAllMatches().catch(err => {
            console.error('Erreur lors du chargement des matchs:', err);
            return [];
          }),
        ]);

        if (isMounted) {
          setTeams(teamsData);
          setGames(gamesData);
          setTournaments(tournamentsData);
          setMatches(matchesData);
          setLoading(false);
          setGamesLoading(false);
          setTournamentsLoading(false);
          setMatchesLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Erreur lors du chargement des données:', error);
          setLoading(false);
          setGamesLoading(false);
          setTournamentsLoading(false);
          setMatchesLoading(false);
        }
      }
    };

    loadAllData();

    return () => {
      isMounted = false;
    };
  }, []);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête du dashboard */}
        <div className="mb-8">
          <h2 className="meru-title-section">Tableau de bord</h2>
          <p className="meru-subtitle">Vue d&apos;ensemble de votre plateforme esport</p>
        </div>

        {/* Statistiques principales - Grid horizontal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card Équipes */}
          <div className="meru-card">
            <div className="flex items-center justify-between mb-4">
              <div className="meru-icon-wrapper">
                <Users className="meru-icon"/>
              </div>
            </div>
            <div className="space-y-1">
              <p className="meru-label">Équipes inscrites</p>
              <p className="meru-stat-number">
                {loading ? '...' : teams.length}
              </p>
            </div>
          </div>

          {/* Card Matchs */}
          <div className="meru-card">
            <div className="flex items-center justify-between mb-4">
              <div className="meru-icon-wrapper">
                <Trophy/>
              </div>
            </div>
            <div className="space-y-1">
              <p className="meru-label">Matchs totaux</p>
              <p className="meru-stat-number">
                {matchesLoading ? '...' : matches.length}
              </p>
            </div>
          </div>

          {/* Card jeux vidéos totaux */}
          <div className="meru-card">
            <div className="flex items-center justify-between mb-4">
              <div className="meru-icon-wrapper">
                <Gamepad2/>
              </div>
            </div>
            <div className="space-y-1">
              <p className="meru-label">Jeux totaux</p>
              <p className="meru-stat-number">
                {gamesLoading ? '...' : games.length}
              </p>
            </div>
          </div>

          {/* Card Tournois */}
          <div className="meru-card">
            <div className="flex items-center justify-between mb-4">
              <div className="meru-icon-wrapper">
                <Calendar/>
              </div>
            </div>
            <div className="space-y-1">
              <p className="meru-label">Tournois totaux</p>
              <p className="meru-stat-number">
                {tournamentsLoading ? '...' : tournaments.length}
              </p>
            </div>
          </div>
        </div>

        {/* Section Accès rapides */}
        <div className="mb-6">
          <h3 className="meru-title-section text-2xl">Accès rapides</h3>
          <p className="meru-subtitle">Gérez votre plateforme esport</p>
        </div>

        {/* Accès rapides - Grid 2 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            href={ROUTES.ADMIN.EQUIPES} 
            className="meru-card group block"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="meru-icon-wrapper flex-shrink-0">
                  <Users/>
                </div>
                <div className="flex-1">
                  <h3 className="ml-2 meru-title-component mb-2">
                    Gestion des équipes
                  </h3>
                  <p className="meru-description">
                    Créez, modifiez et gérez les équipes inscrites sur votre plateforme. 
                    Consultez leurs statistiques et leurs performances.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-2 ml-4 text-[var(--primary)]" />
            </div>
          </Link>

          <Link 
            href={ROUTES.ADMIN.MATCHS} 
            className="meru-card group block"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="meru-icon-wrapper flex-shrink-0">
                  <Trophy/>
                </div>
                <div className="flex-1">
                  <h3 className="ml-2 meru-title-component mb-2">
                    Gestion des matchs
                  </h3>
                  <p className="meru-description">
                    Organisez les matchs, définissez les calendriers et suivez les résultats. 
                    Gérez tous les aspects de vos compétitions esport.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-2 ml-4 text-[var(--primary)]" />
            </div>
          </Link>
        </div>
      </div>
    )
}