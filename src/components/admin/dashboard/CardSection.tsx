'use client';

import { pb } from '@/lib/pocketbase';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { Users, Trophy, Gamepad2, Calendar, ChevronRight } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  abbreviation: string;
  region: string;
  yearFounded: number;
  logo: string;
  created: string;
}

interface Tournaments {
  id: string;
  name: string;
  game_id: string;
  prize_pool: number;
  start_date: string;
  end_date: string;
  location: string;
  created: string;
}

interface Match {
  id: string;
  tournament_id: string;
  team1_id: string;
  team2_id: string;
  game_id: string;
  match_date: string;
  status: 'upcoming' | 'ongoing' | 'finished';
  team1_score: number;
  team2_score: number;
  winner_id: string;
  created_at: string;
  updated: string;
  expand?: {
    team1_id?: Team;
    team2_id?: Team;
  };
}

interface Game {
  id: string;
  name: string;
  category: string;
  created: string;
}

// Fonction pour le tableau de bord (falcutatif à revoir si j'ai le temps.)
export default function CardSection() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [tournaments, setTournaments] = useState<Tournaments[]>([]);
  const [tournamentsLoading, setTournamentsLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchesLoading, setMatchesLoading] = useState(true);



  const fetchTeams = async () => {
    try {
      setLoading(true);
      const records = await pb.collection('Teams').getFullList<Team>({
        sort: '-created',
      });
      setTeams(records);
    } catch (error) {
      console.error('Erreur lors du chargement des équipes:', error);
    } finally {
      setLoading(false);
    }
  };

    const fetchGames = async () => {
      try {
        setGamesLoading(true);
        const records = await pb.collection('Games').getFullList<Game>({
          sort: 'name',
        });
        setGames(records);
      } catch (error) {
        console.error('Erreur lors du chargement des jeux:', error);
      } finally {
        setGamesLoading(false);
      }
    };

      const fetchTournaments = async () => {
        try {
          setTournamentsLoading(true);
          const records = await pb.collection('Tournaments').getFullList<Tournaments>({
          });
          
          setTournaments(records);
        } catch (error) {
          console.error('Erreur lors du chargement des tournois:', error);
        } finally {
          setTournamentsLoading(false);
        }
      };

        const fetchMatches = async () => {
          try {
            setMatchesLoading(true);
            console.log('Chargement des matchs...');
            
            const records = await pb.collection('Matches').getFullList<Match>({
            sort: '-match_date',
            expand: 'team1_id,team2_id',
            });
            
            console.log('Matchs chargés:', records);
            setMatches(records);
          } catch (error) {
            console.error('Erreur lors du chargement des matchs:', error);
          } finally {
            setMatchesLoading(false);
          }
        };

  useEffect(() => {
    fetchTeams();
    fetchGames();
    fetchTournaments();
    fetchMatches();
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
                <Users className="meru-icon" />
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
                <Trophy className="meru-icon" />
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
                <Gamepad2 className="meru-icon" />
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
                <Calendar className="meru-icon" />
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
                  <Users className="meru-icon" />
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
                  <Trophy className="meru-icon" />
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