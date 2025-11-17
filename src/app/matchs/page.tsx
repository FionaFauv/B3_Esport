'use client';

import { pb } from '@/lib/pocketbase';
import { useState, useEffect } from 'react';
import CreateMatchModal from '@/components/CreateMatchModal';
import Link from 'next/link';
import Image from 'next/image';

interface Team {
  id: string;
  name: string;
  tag: string;
  logo_url: string;
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

export default function MatchsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      console.log('Chargement des matchs...');
      
      const records = await pb.collection('Matches').getFullList<Match>({
        sort: '-match_date',
        expand: 'team1_id,team2_id',
      });
      
      console.log('Matchs chargés:', records);
      setMatches(records);
    } catch (error) {
      console.error('Erreur lors du chargement des matchs:', error);
      
      // Afficher l'erreur détaillée pour debugging
      if (error && typeof error === 'object' && 'response' in error) {
        const pbError = error as { response?: { data?: unknown } };
        console.error('Détails erreur PocketBase:', pbError.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleMatchCreated = () => {
    fetchMatches();
  };

  const handleDeleteClick = async (match: Match) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ce match ?`)) {
      try {
        await pb.collection('Matches').delete(match.id);
        fetchMatches();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression du match');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getLogoUrl = (team: Team) => {
    if (team.logo_url) {
      return `${process.env.NEXT_PUBLIC_PB_URL}api/files/Teams/${team.id}/${team.logo_url}`;
    }
    return null;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return (
          <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-medium border border-blue-500/30">
            À venir
          </span>
        );
      case 'ongoing':
        return (
          <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-medium border border-green-500/30">
            En cours
          </span>
        );
      case 'finished':
        return (
          <span className="text-xs bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full font-medium border border-gray-500/30">
            Terminé
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header moderne */}
      <header className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo et titre */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Esport Manager</h1>
                  <p className="text-xs text-gray-400">Gestion des Matchs</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/admin" className="text-gray-300 hover:text-white transition text-sm">
                Accueil
              </Link>
              <Link href="/matchs" className="text-purple-400 font-medium text-sm">
                Matchs
              </Link>
              <Link href="/equipes" className="text-gray-300 hover:text-white transition text-sm">
                Équipes
              </Link>
              <Link href="/login" className="text-gray-300 hover:text-white transition text-sm">
                Déconnexion
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête de section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Gestion des Matchs</h2>
              <p className="text-gray-400">
                {loading ? 'Chargement...' : `${matches.length} match${matches.length > 1 ? 's' : ''} programmé${matches.length > 1 ? 's' : ''}`}
              </p>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-medium shadow-lg shadow-purple-500/30 transition-all duration-200 flex items-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Créer un match
            </button>
          </div>
        </div>

        {/* Liste des matchs */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : matches.length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Aucun match</h3>
            <p className="text-gray-400 mb-6">
              Commencez par créer votre premier match pour organiser votre compétition esport.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Créer mon premier match
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => (
              <div
                key={match.id}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(match.status)}
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(match.match_date)}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteClick(match)}
                    className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white p-2 rounded-lg transition-all duration-200 border border-red-500/30 hover:border-red-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Équipes */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      {/* Logo Team 1 */}
                      {match.expand?.team1_id && getLogoUrl(match.expand.team1_id) ? (
                        <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/20">
                          <Image
                            src={getLogoUrl(match.expand.team1_id)!}
                            alt={`Logo ${match.expand.team1_id.name}`}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/20">
                          <span className="text-white font-bold text-xl">
                            {match.expand?.team1_id?.tag || 'T1'}
                          </span>
                        </div>
                      )}
                      
                      {/* Infos Team 1 */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-white">
                            {match.expand?.team1_id?.name || `Équipe ${match.team1_id.substring(0, 8)}`}
                          </h3>
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md font-medium border border-blue-500/30">
                            {match.expand?.team1_id?.tag || 'T1'}
                          </span>
                        </div>
                        {match.status === 'finished' && match.team1_score !== undefined && (
                          <p className="text-3xl font-bold text-blue-400">{match.team1_score}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-8">
                    <div className="text-4xl font-bold text-gray-500">VS</div>
                  </div>

                  <div className="flex-1 flex justify-end">
                    <div className="flex items-center gap-4">
                      {/* Infos Team 2 */}
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-2 mb-1">
                          <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-md font-medium border border-purple-500/30">
                            {match.expand?.team2_id?.tag || 'T2'}
                          </span>
                          <h3 className="text-xl font-bold text-white">
                            {match.expand?.team2_id?.name || `Équipe ${match.team2_id.substring(0, 8)}`}
                          </h3>
                        </div>
                        {match.status === 'finished' && match.team2_score !== undefined && (
                          <p className="text-3xl font-bold text-purple-400">{match.team2_score}</p>
                        )}
                      </div>
                      
                      {/* Logo Team 2 */}
                      {match.expand?.team2_id && getLogoUrl(match.expand.team2_id) ? (
                        <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-purple-500/50 shadow-lg shadow-purple-500/20">
                          <Image
                            src={getLogoUrl(match.expand.team2_id)!}
                            alt={`Logo ${match.expand.team2_id.name}`}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center ring-2 ring-purple-500/50 shadow-lg shadow-purple-500/20">
                          <span className="text-white font-bold text-xl">
                            {match.expand?.team2_id?.tag || 'T2'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      <CreateMatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleMatchCreated}
      />
    </div>
  );
}
