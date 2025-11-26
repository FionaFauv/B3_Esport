'use client';

import { pb } from '@/lib/pocketbase';
import { useState, useEffect } from 'react';
import CreateMatchModal from '@/components/CreateMatchModal';
import EditMatchModal from '@/components/EditMatchModal';
import NavbarAdmin from '@/components/NavbarAdmin';
import Image from 'next/image';

interface Team {
  id: string;
  name: string;
  tag: string;
  logo_url: string;
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

export default function MatchsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [tournaments, setTournaments] = useState<Tournaments[]>([]);
  const [loading, setLoading] = useState(true);
  const [tournamentsLoading, setTournamentsLoading] = useState(true);

  const currentYear = new Date().getFullYear();

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
    } finally {
      setLoading(false);
    }
  };

  const fetchTournaments = async () => {
    try {
      setTournamentsLoading(true);
      const startOfYear = `${currentYear}-01-01`;
      const endOfYear = `${currentYear}-12-31`;
      
      const records = await pb.collection('Tournaments').getFullList<Tournaments>({
        sort: '-start_date',
        filter: `start_date >= "${startOfYear}" && start_date <= "${endOfYear}"`,
      });
      
      setTournaments(records);
    } catch (error) {
      console.error('Erreur lors du chargement des tournois:', error);
    } finally {
      setTournamentsLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
    fetchTournaments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMatchCreated = () => {
    fetchMatches();
  };

  const handleMatchUpdated = () => {
    fetchMatches();
    setIsEditModalOpen(false);
    setSelectedMatch(null);
  };

  const handleEditClick = (match: Match) => {
    setSelectedMatch(match);
    setIsEditModalOpen(true);
  };

  const handleTournamentDelete = async (tournamentId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce tournoi ?')) {
      try {
        await pb.collection('Tournaments').delete(tournamentId);
        fetchTournaments();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression du tournoi');
      }
    }
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
          <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(216, 121, 67, 0.2)', color: '#d87943', border: '1px solid rgba(216, 121, 67, 0.3)' }}>
            À venir
          </span>
        );
      case 'ongoing':
        return (
          <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
            En cours
          </span>
        );
      case 'finished':
        return (
          <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(128, 128, 128, 0.2)', color: 'var(--foreground)', border: '1px solid var(--border)', opacity: 0.6 }}>
            Terminé
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <NavbarAdmin />

      {/* Contenu principal avec layout 2 colonnes */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Colonne principale - Matchs */}
          <div className="flex-1">
            {/* En-tête de section */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Gestion des Matchs</h2>
                  <p style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                    {loading ? 'Chargement...' : `${matches.length} match${matches.length > 1 ? 's' : ''} programmé${matches.length > 1 ? 's' : ''}`}
                  </p>
                </div>
                
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 flex items-center gap-2 group"
                  style={{ background: '#d87943', color: '#ffffff', boxShadow: '0 10px 25px rgba(216, 121, 67, 0.3)' }}
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#d87943' }}></div>
              </div>
            ) : matches.length === 0 ? (
              <div className="card-hover backdrop-blur-sm rounded-2xl p-12 text-center" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(216, 121, 67, 0.1)' }}>
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Aucun match</h3>
                <p className="mb-6" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                  Commencez par créer votre premier match pour organiser votre compétition esport.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 rounded-lg font-medium transition inline-flex items-center gap-2"
                  style={{ background: '#d87943', color: '#ffffff' }}
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
                    className="card-hover group backdrop-blur-sm rounded-2xl p-6 transition-all duration-300"
                    style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusBadge(match.status)}
                        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(match.match_date)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(match)}
                          className="p-2 rounded-lg transition-all duration-200"
                          style={{ background: 'rgba(216, 121, 67, 0.2)', color: '#d87943', border: '1px solid rgba(216, 121, 67, 0.3)' }}
                          title="Modifier le match"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(match)}
                          className="p-2 rounded-lg transition-all duration-200"
                          style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                          title="Supprimer le match"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Équipes */}
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          {/* Logo Team 1 */}
                          {match.expand?.team1_id && getLogoUrl(match.expand.team1_id) ? (
                            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg" style={{ border: '2px solid #d87943', boxShadow: '0 4px 12px rgba(216, 121, 67, 0.2)' }}>
                              <Image
                                src={getLogoUrl(match.expand.team1_id)!}
                                alt={`Logo ${match.expand.team1_id.name}`}
                                width={64}
                                height={64}
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg" style={{ background: '#d87943', border: '2px solid #d87943', boxShadow: '0 4px 12px rgba(216, 121, 67, 0.2)' }}>
                              <span className="font-bold text-xl" style={{ color: '#ffffff' }}>
                                {match.expand?.team1_id?.tag || 'T1'}
                              </span>
                            </div>
                          )}
                          
                          {/* Infos Team 1 */}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                                {match.expand?.team1_id?.name || `Équipe ${match.team1_id.substring(0, 8)}`}
                              </h3>
                              <span className="text-xs px-2 py-1 rounded-md font-medium" style={{ background: 'rgba(216, 121, 67, 0.2)', color: '#d87943', border: '1px solid rgba(216, 121, 67, 0.3)' }}>
                                {match.expand?.team1_id?.tag || 'T1'}
                              </span>
                            </div>
                            {match.status === 'finished' && match.team1_score !== undefined && (
                              <p className="text-3xl font-bold" style={{ color: '#d87943' }}>{match.team1_score}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="px-8">
                        <div className="text-4xl font-bold" style={{ color: 'var(--foreground)', opacity: 0.3 }}>VS</div>
                      </div>

                      <div className="flex-1 flex justify-end">
                        <div className="flex items-center gap-4">
                          {/* Infos Team 2 */}
                          <div className="text-right">
                            <div className="flex items-center justify-end gap-2 mb-1">
                              <span className="text-xs px-2 py-1 rounded-md font-medium" style={{ background: 'rgba(216, 121, 67, 0.2)', color: '#d87943', border: '1px solid rgba(216, 121, 67, 0.3)' }}>
                                {match.expand?.team2_id?.tag || 'T2'}
                              </span>
                              <h3 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                                {match.expand?.team2_id?.name || `Équipe ${match.team2_id.substring(0, 8)}`}
                              </h3>
                            </div>
                            {match.status === 'finished' && match.team2_score !== undefined && (
                              <p className="text-3xl font-bold" style={{ color: '#d87943' }}>{match.team2_score}</p>
                            )}
                          </div>
                          
                          {/* Logo Team 2 */}
                          {match.expand?.team2_id && getLogoUrl(match.expand.team2_id) ? (
                            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg" style={{ border: '2px solid #d87943', boxShadow: '0 4px 12px rgba(216, 121, 67, 0.2)' }}>
                              <Image
                                src={getLogoUrl(match.expand.team2_id)!}
                                alt={`Logo ${match.expand.team2_id.name}`}
                                width={64}
                                height={64}
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg" style={{ background: '#d87943', border: '2px solid #d87943', boxShadow: '0 4px 12px rgba(216, 121, 67, 0.2)' }}>
                              <span className="font-bold text-xl" style={{ color: '#ffffff' }}>
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
          </div>

          {/* Colonne latérale - Tournois de l'année */}
          <div className="w-80">
            <div className="sticky top-20">
              {/* Card englobante */}
              <div className="backdrop-blur-sm rounded-xl p-6" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>Tournois {currentYear}</h3>
                  <button
                    className="p-2 rounded-lg transition"
                    style={{ background: 'rgba(216, 121, 67, 0.2)', color: '#d87943' }}
                    title="Ajouter un tournoi"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                {tournamentsLoading ? (
                  <div className="flex items-center justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#d87943' }}></div>
                  </div>
                ) : tournaments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                      Aucun tournoi pour {currentYear}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tournaments.map((tournament) => (
                      <div
                        key={tournament.id}
                        className="p-4 rounded-lg transition-all duration-200 hover:bg-opacity-50"
                        style={{ background: 'rgba(216, 121, 67, 0.05)' }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-sm flex-1" style={{ color: 'var(--foreground)' }}>
                            {tournament.name}
                          </h4>
                          <div className="flex items-center gap-1">
                            <button
                              className="p-1.5 rounded-lg transition"
                              style={{ background: 'rgba(216, 121, 67, 0.2)', color: '#d87943' }}
                              title="Modifier"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleTournamentDelete(tournament.id)}
                              className="p-1.5 rounded-lg transition"
                              style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
                              title="Supprimer"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <p className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                          {new Date(tournament.start_date).toLocaleDateString('fr-FR')} - {new Date(tournament.end_date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreateMatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleMatchCreated}
      />

      {selectedMatch && (
        <EditMatchModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedMatch(null);
          }}
          onSuccess={handleMatchUpdated}
          match={selectedMatch}
        />
      )}
    </div>
  );
}
