'use client';

import { pb } from '@/lib/pocketbase';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'next/navigation';
import CreateBetModal from '@/components/CreateBetModal';

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
  status: 'Prévu' | 'Annulé' | 'Terminé' | 'Reporté';
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
  const [finishedMatches, setFinishedMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBetModal, setShowBetModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const fetchMatches = async () => {
    try {
      setLoading(true);
      // Récupérer les matchs à venir
      const upcomingRecords = await pb.collection('Matches').getFullList<Match>({
        sort: '-match_date',
        expand: 'team1_id,team2_id',
        filter: 'status != "Terminé"',
      });
      setMatches(upcomingRecords);

      // Récupérer les matchs terminés
      const finishedRecords = await pb.collection('Matches').getFullList<Match>({
        sort: '-match_date',
        expand: 'team1_id,team2_id',
        filter: 'status = "Terminé"',
        perPage: 10, // Limiter à 10 matchs terminés
      });
      setFinishedMatches(finishedRecords);
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
      case 'Prévu':
        return (
          <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-medium border border-blue-500/30">
            À venir
          </span>
        );
      default:
        return null;
    }
  };

  const handleBetClick = (match: Match) => {
    setSelectedMatch(match);
    setShowBetModal(true);
  };

  const handleBetSuccess = () => {
    fetchMatches();
  };

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Contenu principal */}
      <main className="container mx-auto px-6 py-8">
        {/* En-tête de section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#d87943' }}>
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
                Matchs disponibles
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                {loading ? 'Chargement...' : `${matches.length} match${matches.length > 1 ? 's' : ''} disponible${matches.length > 1 ? 's' : ''} pour parier`}
              </p>
            </div>
          </div>
        </div>

        {/* Layout avec sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">{loading ? (
          <div className="lg:col-span-2 flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <svg className="animate-spin h-12 w-12" fill="none" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p style={{ color: 'var(--foreground)', opacity: 0.7 }}>Chargement des matchs...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Section principale - Matchs à venir */}
            <div className="lg:col-span-2">
              {matches.length === 0 ? (
                <div className="rounded-2xl p-12 text-center border" style={{ 
                  backgroundColor: 'var(--background)',
                  borderColor: 'rgba(128, 128, 128, 0.2)',
                }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ 
                    backgroundColor: 'rgba(216, 121, 67, 0.1)',
                  }}>
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                    Aucun match disponible
                  </h3>
                  <p style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                    Il n&apos;y a pas de matchs à venir pour le moment. Revenez plus tard !
                  </p>
                </div>
              ) : (
                <div className="grid gap-6">{matches.map((match) => (
              <div
                key={match.id}
                className="rounded-2xl p-6 border transition-all duration-300 hover:shadow-2xl group"
                style={{ 
                  backgroundColor: 'var(--background)',
                  borderColor: 'rgba(216, 121, 67, 0.2)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Header avec statut et date */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: 'rgba(128, 128, 128, 0.1)' }}>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(match.status)}
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(match.match_date)}
                  </div>
                </div>

                {/* Équipes */}
                <div className="flex items-center justify-between mb-6">
                  {/* Team 1 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      {match.expand?.team1_id && getLogoUrl(match.expand.team1_id) ? (
                        <div className="w-20 h-20 rounded-xl overflow-hidden border-2 transition-transform group-hover:scale-110" style={{ 
                          borderColor: '#d87943',
                          boxShadow: '0 0 0 4px var(--background)',
                        }}>
                          <Image
                            src={getLogoUrl(match.expand.team1_id)!}
                            alt={`Logo ${match.expand.team1_id.name}`}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ 
                          background: 'linear-gradient(135deg, #d87943 0%, #ff6b35 100%)',
                        }}>
                          <span className="text-white font-bold text-2xl">
                            {match.expand?.team1_id?.tag || 'T1'}
                          </span>
                        </div>
                      )}
                      
                      <div>
                        <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                          {match.expand?.team1_id?.name || `Équipe ${match.team1_id.substring(0, 8)}`}
                        </h3>
                        <span className="text-sm px-3 py-1 rounded-md font-medium" style={{ 
                          backgroundColor: 'rgba(216, 121, 67, 0.1)',
                          color: '#d87943',
                          border: '1px solid rgba(216, 121, 67, 0.3)',
                        }}>
                          {match.expand?.team1_id?.tag || 'T1'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* VS */}
                  <div className="px-8">
                    <div className="text-4xl md:text-5xl font-bold" style={{ 
                      background: 'linear-gradient(135deg, #d87943 0%, #ff6b35 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      VS
                    </div>
                  </div>

                  {/* Team 2 */}
                  <div className="flex-1 flex justify-end">
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                          {match.expand?.team2_id?.name || `Équipe ${match.team2_id.substring(0, 8)}`}
                        </h3>
                        <span className="text-sm px-3 py-1 rounded-md font-medium" style={{ 
                          backgroundColor: 'rgba(255, 107, 53, 0.1)',
                          color: '#ff6b35',
                          border: '1px solid rgba(255, 107, 53, 0.3)',
                        }}>
                          {match.expand?.team2_id?.tag || 'T2'}
                        </span>
                      </div>
                      
                      {match.expand?.team2_id && getLogoUrl(match.expand.team2_id) ? (
                        <div className="w-20 h-20 rounded-xl overflow-hidden border-2 transition-transform group-hover:scale-110" style={{ 
                          borderColor: '#ff6b35',
                          boxShadow: '0 0 0 4px var(--background)',
                        }}>
                          <Image
                            src={getLogoUrl(match.expand.team2_id)!}
                            alt={`Logo ${match.expand.team2_id.name}`}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ 
                          background: 'linear-gradient(135deg, #ff6b35 0%, #d87943 100%)',
                        }}>
                          <span className="text-white font-bold text-2xl">
                            {match.expand?.team2_id?.tag || 'T2'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bouton Parier */}
                <div className="flex justify-center pt-4 border-t" style={{ borderColor: 'rgba(128, 128, 128, 0.1)' }}>
                  <button
                    onClick={() => handleBetClick(match)}
                    className="px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-3 text-white"
                    style={{ 
                      background: 'linear-gradient(135deg, #d87943 0%, #ff6b35 100%)',
                      boxShadow: '0 8px 25px rgba(216, 121, 67, 0.4)',
                    }}
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
            </div>

            {/* Sidebar - Matchs terminés */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl p-6 border sticky top-24" style={{ 
                backgroundColor: 'var(--background)',
                borderColor: 'rgba(128, 128, 128, 0.2)',
              }}>
                <div className="flex items-center gap-2 mb-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#22c55e' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                    Résultats récents
                  </h3>
                </div>

                {finishedMatches.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ 
                      backgroundColor: 'rgba(128, 128, 128, 0.1)',
                    }}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--foreground)', opacity: 0.5 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                      Aucun résultat disponible
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {finishedMatches.map((match) => (
                      <div
                        key={match.id}
                        className="rounded-xl p-4 border transition-all hover:scale-[1.02]"
                        style={{ 
                          borderColor: 'rgba(128, 128, 128, 0.1)',
                          backgroundColor: 'rgba(128, 128, 128, 0.05)'
                        }}
                      >
                        {/* Badge Terminé */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b" style={{ borderColor: 'rgba(128, 128, 128, 0.1)' }}>
                          <span className="text-xs px-3.5 py-1 rounded-full font-medium" style={{
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            color: '#22c55e',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                          }}>
                            Terminé
                          </span>
                          <p className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.5 }}>
                            {new Date(match.match_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>

                        {/* Team 1 */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ 
                              background: match.winner_id === match.team1_id ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'rgba(128, 128, 128, 0.2)',
                            }}>
                              <span className="text-white font-bold text-xs">
                                {match.expand?.team1_id?.tag || 'T1'}
                              </span>
                            </div>
                            <span className={`text-sm font-medium truncate ${match.winner_id === match.team1_id ? 'font-bold' : ''}`} style={{ color: 'var(--foreground)' }}>
                              {match.expand?.team1_id?.name || 'Équipe 1'}
                            </span>
                          </div>
                          <span className={`text-lg font-bold ml-3 ${match.winner_id === match.team1_id ? '' : 'opacity-50'}`} style={{ color: 'var(--foreground)' }}>
                            {match.team1_score || 0}
                          </span>
                        </div>

                        {/* Team 2 */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ 
                              background: match.winner_id === match.team2_id ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'rgba(128, 128, 128, 0.2)',
                            }}>
                              <span className="text-white font-bold text-xs">
                                {match.expand?.team2_id?.tag || 'T2'}
                              </span>
                            </div>
                            <span className={`text-sm font-medium truncate ${match.winner_id === match.team2_id ? 'font-bold' : ''}`} style={{ color: 'var(--foreground)' }}>
                              {match.expand?.team2_id?.name || 'Équipe 2'}
                            </span>
                          </div>
                          <span className={`text-lg font-bold ml-3 ${match.winner_id === match.team2_id ? '' : 'opacity-50'}`} style={{ color: 'var(--foreground)' }}>
                            {match.team2_score || 0}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        </div>
      </main>

      {/* Modal de pari */}
      <CreateBetModal 
        match={selectedMatch}
        isOpen={showBetModal}
        onClose={() => setShowBetModal(false)}
        onSuccess={handleBetSuccess}
      />
    </div>
  );
}
