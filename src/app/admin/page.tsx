'use client';

import { pb } from '@/lib/pocketbase';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'next/navigation';


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
export default function Adminpage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [tournaments, setTournaments] = useState<Tournaments[]>([]);
  const [tournamentsLoading, setTournamentsLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchesLoading, setMatchesLoading] = useState(true);


  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  if (!isAuthenticated && !user?.admin) {
    router.push('/auth/login');
    return null;
  }

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
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête du dashboard */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Tableau de bord</h2>
          <p style={{ color: 'var(--foreground)', opacity: 0.6 }}>Vue d&apos;ensemble de votre plateforme esport</p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card Équipes */}
          <div className="card-hover backdrop-blur-sm rounded-2xl p-6 transition-all duration-300" 
               style={{ 
                 background: 'rgba(216, 121, 67, 0.05)',
                 border: '1px solid rgba(216, 121, 67, 0.2)'
               }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" 
                   style={{ background: 'rgba(216, 121, 67, 0.2)' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>Équipes inscrites</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                {loading ? '...' : teams.length}
              </p>
            </div>
          </div>

          {/* Card Matchs */}
          <div className="card-hover backdrop-blur-sm rounded-2xl p-6 transition-all duration-300" 
               style={{ 
                 background: 'rgba(216, 121, 67, 0.05)',
                 border: '1px solid rgba(216, 121, 67, 0.2)'
               }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" 
                   style={{ background: 'rgba(216, 121, 67, 0.2)' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>Matchs totaux</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                {matchesLoading ? '...' : matches.length}
              </p>
            </div>
          </div>

          {/* Card jeux vidéos totaux */}
          <div className="card-hover backdrop-blur-sm rounded-2xl p-6 transition-all duration-300" 
               style={{ 
                 background: 'rgba(216, 121, 67, 0.05)',
                 border: '1px solid rgba(216, 121, 67, 0.2)'
               }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" 
                   style={{ background: 'rgba(216, 121, 67, 0.2)' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>Jeux totaux</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                {gamesLoading ? '...' : games.length}
              </p>
            </div>
          </div>

          {/* Card Tournois */}
          <div className="card-hover backdrop-blur-sm rounded-2xl p-6 transition-all duration-300" 
               style={{ 
                 background: 'rgba(216, 121, 67, 0.05)',
                 border: '1px solid rgba(216, 121, 67, 0.2)'
               }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" 
                   style={{ background: 'rgba(216, 121, 67, 0.2)' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>Tournois totaux</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                {tournamentsLoading ? '...' : tournaments.length}
              </p>
            </div>
          </div>
        </div>

        {/* Accès rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section Équipes */}
          <Link href="/admin/equipes" className="card-hover group rounded-2xl p-8 transition-all duration-300" 
                style={{ 
                  background: 'var(--background)',
                  border: '1px solid var(--border)'
                }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-[#d87943] transition" style={{ color: 'var(--foreground)' }}>
                  Gérer les équipes
                </h3>
                <p style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                  Créer, modifier et supprimer des équipes
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition" 
                   style={{ background: 'rgba(216, 121, 67, 0.2)' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center font-medium group-hover:translate-x-2 transition-transform" style={{ color: '#d87943' }}>
              Accéder à la gestion
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Section Matchs */}
          <Link href="/admin/matchs" className="card-hover group rounded-2xl p-8 transition-all duration-300" 
                style={{ 
                  background: 'var(--background)',
                  border: '1px solid var(--border)'
                }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-[#d87943] transition" style={{ color: 'var(--foreground)' }}>
                  Gérer les matchs
                </h3>
                <p style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                  Planifier et organiser les matchs
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition" 
                   style={{ background: 'rgba(216, 121, 67, 0.2)' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center font-medium group-hover:translate-x-2 transition-transform" style={{ color: '#d87943' }}>
              Accéder à la gestion
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}