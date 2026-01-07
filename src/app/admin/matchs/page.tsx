'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { fetchMatches } from '@/app/api/pocketbase/matches/view-match';
import { DeleteMatch } from '@/app/api/pocketbase/matches/delete-match';
import CreateMatchModal from '@/components/CreateMatchModal';
import EditMatchModal from '@/components/EditMatchModal';
import type { Match } from '@/app/api/types';
import { DateTime } from 'luxon';

export default function MatchsPage() {
  // États pour les matchs
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'finished'>('all');
  const perPage = 10;

  // États pour les modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // Chargement des matchs
  const loadMatches = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const result = await fetchMatches(page, perPage);
      
      // Filtrer par statut si nécessaire
      let filteredItems = result.items;
      if (statusFilter !== 'all') {
        filteredItems = result.items.filter(match => match.status === statusFilter);
      }
      
      setMatches(filteredItems);
      setTotalPages(result.totalPages);
      setTotalItems(result.totalItems);
      setCurrentPage(result.page);
    } catch (error) {
      console.error('Erreur lors du chargement des matchs:', error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadMatches(1);
  }, [loadMatches]);

  // Gestion de la pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      loadMatches(newPage);
    }
  };

  // Gestion des matchs
  const handleMatchCreated = () => {
    setIsCreateModalOpen(false);
    loadMatches(currentPage);
  };

  const handleMatchUpdated = () => {
    setIsEditModalOpen(false);
    setSelectedMatch(null);
    loadMatches(currentPage);
  };

  const handleEditClick = (match: Match) => {
    setSelectedMatch(match);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (match: Match) => {
    const team1Name = match.expand?.team1_id?.name || 'Équipe 1';
    const team2Name = match.expand?.team2_id?.name || 'Équipe 2';
    
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le match "${team1Name} vs ${team2Name}" ?`)) {
      try {
        await DeleteMatch.delete(match.id);
        loadMatches(currentPage);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression du match');
      }
    }
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    return DateTime.fromISO(dateString).setLocale('fr').toFormat('dd MMM yyyy • HH:mm');
  };

  // Obtenir le badge de statut
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: { label: 'À venir', color: 'bg-blue-500/10 text-blue-500 border-blue-500/30' },
      ongoing: { label: 'En cours', color: 'bg-green-500/10 text-green-500 border-green-500/30' },
      finished: { label: 'Terminé', color: 'bg-gray-500/10 text-gray-500 border-gray-500/30' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.upcoming;
    
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Obtenir l'URL du logo d'une équipe
  const getTeamLogoUrl = (teamId: string, logoUrl: string) => {
    if (logoUrl) {
      return `${process.env.NEXT_PUBLIC_PB_URL}api/files/Teams/${teamId}/${logoUrl}`;
    }
    return null;
  };

  return (
    <div className="meru-page-background min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div>
          {/* En-tête */}
          <div className="mb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 mb-2.5">
              <div>
                <h2 className="meru-title-section">Gestion des Matchs</h2>
                <p className="meru-description">
                  {loading ? 'Chargement...' : `${totalItems} match${totalItems > 1 ? 's' : ''} enregistré${totalItems > 1 ? 's' : ''}`}
                </p>
              </div>
              
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="meru-btn meru-btn-primary inline-flex items-center gap-2 group"
              >
                <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Créer un match
              </button>
            </div>

            {/* Filtres de statut */}
            <div className="flex gap-2 mb-2.5">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  statusFilter === 'all'
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--primary)]'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setStatusFilter('upcoming')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  statusFilter === 'upcoming'
                    ? 'bg-blue-500 text-white'
                    : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-blue-500'
                }`}
              >
                À venir
              </button>
              <button
                onClick={() => setStatusFilter('ongoing')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  statusFilter === 'ongoing'
                    ? 'bg-green-500 text-white'
                    : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-green-500'
                }`}
              >
                En cours
              </button>
              <button
                onClick={() => setStatusFilter('finished')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  statusFilter === 'finished'
                    ? 'bg-gray-500 text-white'
                    : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-gray-500'
                }`}
              >
                Terminés
              </button>
            </div>
          </div>

          {/* Liste des matchs */}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : matches.length === 0 ? (
            <div className="meru-card text-center p-6">
              <div className="meru-icon-wrapper mx-auto mb-3">
                <svg className="meru-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="meru-title-small mb-2">Aucun match</h3>
              <p className="meru-description mb-4">
                {statusFilter === 'all' 
                  ? 'Commencez par créer votre premier match pour organiser votre compétition esport.'
                  : `Aucun match ${statusFilter === 'upcoming' ? 'à venir' : statusFilter === 'ongoing' ? 'en cours' : 'terminé'}.`
                }
              </p>
              {statusFilter === 'all' && (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="meru-btn meru-btn-primary inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Créer mon premier match
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {matches.map((match) => (
                  <div key={match.id} className="meru-card group p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Informations du match */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusBadge(match.status)}
                          <span className="text-sm text-[var(--text-muted)]">
                            {formatDate(match.match_date)}
                          </span>
                        </div>
                        
                        {/* Affichage des équipes */}
                        <div className="flex items-center gap-4">
                          {/* Équipe 1 */}
                          <div className="flex items-center gap-2 flex-1">
                            {match.expand?.team1_id?.logo_url && (
                              <Image
                                src={getTeamLogoUrl(match.expand.team1_id.id, match.expand.team1_id.logo_url) || ''}
                                alt={match.expand?.team1_id?.name || 'Équipe 1'}
                                width={32}
                                height={32}
                                className="rounded-lg object-cover border border-[var(--border)]"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-semibold text-[var(--text-primary)]">
                                {match.expand?.team1_id?.name || 'Équipe 1'}
                              </p>
                              <p className="text-xs text-[var(--text-muted)]">
                                {match.expand?.team1_id?.tag || ''}
                              </p>
                            </div>
                            {match.status === 'finished' && (
                              <span className={`text-lg font-bold ${match.winner_id === match.team1_id ? 'text-green-500' : 'text-[var(--text-muted)]'}`}>
                                {match.team1_score || 0}
                              </span>
                            )}
                          </div>

                          {/* VS */}
                          <div className="px-3 py-1 bg-[var(--primary)]/10 rounded-lg">
                            <span className="text-sm font-bold text-[var(--primary)]">VS</span>
                          </div>

                          {/* Équipe 2 */}
                          <div className="flex items-center gap-2 flex-1">
                            {match.status === 'finished' && (
                              <span className={`text-lg font-bold ${match.winner_id === match.team2_id ? 'text-green-500' : 'text-[var(--text-muted)]'}`}>
                                {match.team2_score || 0}
                              </span>
                            )}
                            <div className="flex-1 text-right">
                              <p className="font-semibold text-[var(--text-primary)]">
                                {match.expand?.team2_id?.name || 'Équipe 2'}
                              </p>
                              <p className="text-xs text-[var(--text-muted)]">
                                {match.expand?.team2_id?.tag || ''}
                              </p>
                            </div>
                            {match.expand?.team2_id?.logo_url && (
                              <Image
                                src={getTeamLogoUrl(match.expand.team2_id.id, match.expand.team2_id.logo_url) || ''}
                                alt={match.expand?.team2_id?.name || 'Équipe 2'}
                                width={32}
                                height={32}
                                className="rounded-lg object-cover border border-[var(--border)]"
                              />
                            )}
                          </div>
                        </div>

                        {/* Informations supplémentaires */}
                        <div className="flex items-center gap-4 mt-3 text-sm text-[var(--text-muted)]">
                          {match.expand?.tournament_id && (
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                              </svg>
                              <span>{match.expand.tournament_id.name}</span>
                            </div>
                          )}
                          {match.expand?.game_id && (
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                              </svg>
                              <span>{match.expand.game_id.name}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditClick(match)}
                          className="meru-btn meru-btn-secondary p-2"
                          title="Modifier"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(match)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                          title="Supprimer"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="meru-btn meru-btn-secondary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                          currentPage === page
                            ? 'bg-[var(--primary)] text-white'
                            : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-[var(--primary)]/10'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="meru-btn meru-btn-secondary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Modals */}
      <CreateMatchModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
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
