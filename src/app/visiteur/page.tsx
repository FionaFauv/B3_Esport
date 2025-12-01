'use client';

import { pb } from '@/lib/pocketbase';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'next/navigation';

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

export default function VisiteurPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  
  const fetchMatches = async () => {
    try {
      setLoading(true);
      const records = await pb.collection('Matches').getFullList<Match>({
        sort: '-match_date',
        expand: 'team1_id,team2_id',
        filter: 'status != "finished"', // Afficher seulement les matchs à venir et en cours
      });
      setMatches(records);
    } catch (error) {
      console.error('Erreur lors du chargement des matchs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

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
          <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-medium border border-green-500/30 animate-pulse">
            🔴 En direct
          </span>
        );
      default:
        return null;
    }
  };

  const handleBetClick = (match: Match) => {
    // TODO: Ouvrir un modal de pari
    alert(`Fonction de pari pour le match ${match.expand?.team1_id?.name} vs ${match.expand?.team2_id?.name} - À implémenter`);
  };

    if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo et titre */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Esport Manager</h1>
                  <p className="text-xs text-gray-400">Paris Sportifs</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/visiteur" className="text-green-400 font-medium text-sm">
                Matchs
              </Link>
              <Link href="/visiteur/profil" className="text-gray-300 hover:text-white transition text-sm">
                Mon Profil
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
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Matchs disponibles</h2>
              <p className="text-gray-400">
                {loading ? 'Chargement...' : `${matches.length} match${matches.length > 1 ? 's' : ''} disponible${matches.length > 1 ? 's' : ''} pour parier`}
              </p>
            </div>
          </div>
        </div>

        {/* Liste des matchs */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : matches.length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Aucun match disponible</h3>
            <p className="text-gray-400">
              Il n&apos;y a pas de matchs à venir pour le moment. Revenez plus tard !
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => (
              <div
                key={match.id}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(match.status)}
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(match.match_date)}
                    </div>
                  </div>
                </div>

                {/* Équipes */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      {/* Logo Team 1 */}
                      {match.expand?.team1_id && getLogoUrl(match.expand.team1_id) ? (
                        <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-blue-500/50 shadow-lg">
                          <Image
                            src={getLogoUrl(match.expand.team1_id)!}
                            alt={`Logo ${match.expand.team1_id.name}`}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center ring-2 ring-blue-500/50">
                          <span className="text-white font-bold text-2xl">
                            {match.expand?.team1_id?.tag || 'T1'}
                          </span>
                        </div>
                      )}
                      
                      {/* Infos Team 1 */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-2xl font-bold text-white">
                            {match.expand?.team1_id?.name || `Équipe ${match.team1_id.substring(0, 8)}`}
                          </h3>
                          <span className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-md font-medium border border-blue-500/30">
                            {match.expand?.team1_id?.tag || 'T1'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-8">
                    <div className="text-5xl font-bold text-gray-500">VS</div>
                  </div>

                  <div className="flex-1 flex justify-end">
                    <div className="flex items-center gap-4">
                      {/* Infos Team 2 */}
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-2 mb-1">
                          <span className="text-sm bg-purple-500/20 text-purple-400 px-3 py-1 rounded-md font-medium border border-purple-500/30">
                            {match.expand?.team2_id?.tag || 'T2'}
                          </span>
                          <h3 className="text-2xl font-bold text-white">
                            {match.expand?.team2_id?.name || `Équipe ${match.team2_id.substring(0, 8)}`}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Logo Team 2 */}
                      {match.expand?.team2_id && getLogoUrl(match.expand.team2_id) ? (
                        <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-purple-500/50 shadow-lg">
                          <Image
                            src={getLogoUrl(match.expand.team2_id)!}
                            alt={`Logo ${match.expand.team2_id.name}`}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center ring-2 ring-purple-500/50">
                          <span className="text-white font-bold text-2xl">
                            {match.expand?.team2_id?.tag || 'T2'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bouton Parier */}
                <div className="flex justify-center">
                  <button
                    onClick={() => handleBetClick(match)}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 transition-all duration-200 flex items-center gap-3 group-hover:scale-105"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Parier sur ce match
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
