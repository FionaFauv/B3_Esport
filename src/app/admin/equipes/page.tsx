'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchTeams, searchTeams } from '@/app/api/pocketbase/team/view-team';
import { DeleteTeam } from '@/app/api/pocketbase/team/delete-team';
import CreateTeamModal from '@/components/popup/CreateTeamModal';
import EditTeamModal from '@/components/EditTeamModal';
import type { Team } from '@/app/api/types';

export default function EquipesPage() {
  // États pour les équipes
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const perPage = 6;

  // États pour les modals équipes
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);


  // Chargement des équipes
  const loadTeams = async (page: number, query: string = '') => {
    try {
      setLoading(true);
      const result = query.trim() 
        ? await searchTeams(query, page, perPage)
        : await fetchTeams(page, perPage);
      
      setTeams(result.items);
      setTotalPages(result.totalPages);
      setTotalItems(result.totalItems);
      setCurrentPage(result.page);
    } catch (error) {
      console.error('Erreur lors du chargement des équipes:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadTeams(1);
  }, []);

  // Gestion de la recherche
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
    loadTeams(1, query);
  };

  // Gestion de la pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      loadTeams(newPage, searchQuery);
    }
  };

  // Gestion des équipes
  const handleTeamCreated = () => {
    loadTeams(currentPage, searchQuery);
  };

  const handleTeamUpdated = () => {
    loadTeams(currentPage, searchQuery);
    setIsEditModalOpen(false);
    setSelectedTeam(null);
  };

  const handleEditClick = (team: Team) => {
    setSelectedTeam(team);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (team: Team) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'équipe "${team.name}" ?`)) {
      try {
        await DeleteTeam.delete(team.id);
        loadTeams(currentPage, searchQuery);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de l\'équipe');
      }
    }
  };
  const getLogoUrl = (team: Team) => {
    if (team.logo_url) {
      return `${process.env.NEXT_PUBLIC_PB_URL}api/files/Teams/${team.id}/${team.logo_url}`;
    }
    return null;
  };

  return (
    <div className="meru-page-background min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {/* Colonne principale - Équipes */}
          <div className="flex-1">
            {/* En-tête */}
            <div className="mb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 mb-2.5">
                <div>
                  <h2 className="meru-title-section">Gestion des Équipes</h2>
                  <p className="meru-description">
                    {loading ? 'Chargement...' : `${totalItems} équipe${totalItems > 1 ? 's' : ''} enregistrée${totalItems > 1 ? 's' : ''}`}
                  </p>
                </div>
                
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="meru-btn meru-btn-primary inline-flex items-center gap-2 group"
                >
                  <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Créer une équipe
                </button>
              </div>

              {/* Barre de recherche */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Rechercher par nom, tag ou pays..."
                  className="w-full px-3 py-1.5 pl-10 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-primary)] transition-all duration-200 placeholder:text-[var(--text-muted)]"
                />
                <svg 
                  className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Grille des équipes */}
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : teams.length === 0 ? (
              <div className="meru-card text-center p-6">
                <div className="meru-icon-wrapper mx-auto mb-3">
                  <svg className="meru-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="meru-title-small mb-2">
                  {searchQuery ? 'Aucun résultat' : 'Aucune équipe'}
                </h3>
                <p className="meru-description mb-4">
                  {searchQuery 
                    ? 'Aucune équipe ne correspond à votre recherche.'
                    : 'Commencez par créer votre première équipe pour gérer votre compétition esport.'
                  }
                </p>
                {!searchQuery && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="meru-btn meru-btn-primary inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Créer ma première équipe
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                  {teams.map((team) => (
                    <div key={team.id} className="meru-card group p-3">
                      <div className="flex items-start gap-2.5 mb-2">
                        {/* Logo */}
                        <div className="shrink-0">
                          {getLogoUrl(team) ? (
                            <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-[var(--border)]">
                              <Image
                                src={getLogoUrl(team)!}
                                alt={`Logo ${team.name}`}
                                width={40}
                                height={40}
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[rgba(182,47,52,0.1)] border-2 border-[rgba(182,47,52,0.3)]">
                              <span className="text-base font-bold text-[var(--primary)]">
                                {team.tag}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Infos */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm mb-0.5 truncate text-[var(--text-primary)]">
                            {team.name}
                          </h3>
                          <div className="flex items-center gap-1 flex-wrap">
                            <span className="text-xs px-1.5 py-0.5 rounded font-medium bg-[rgba(182,47,52,0.2)] text-[var(--primary)] border border-[rgba(182,47,52,0.3)]">
                              {team.tag}
                            </span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-[rgba(182,47,52,0.05)] text-[var(--text-secondary)]">
                              {team.country}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Détails */}
                      <div className="mb-2 pb-2 border-b border-[var(--border)]">
                        <div className="flex items-center gap-1 text-xs">
                          <svg className="w-3.5 h-3.5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-[var(--text-secondary)]">Fondée en {team.founded_year}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleEditClick(team)}
                          className="flex-1 meru-btn meru-btn-secondary inline-flex items-center justify-center gap-1 text-xs"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDeleteClick(team)}
                          className="meru-btn inline-flex items-center justify-center hover:scale-110 bg-[rgba(239,68,68,0.15)] text-[#ef4444] border border-[rgba(239,68,68,0.3)] p-[0.375rem]"
                          title="Supprimer l'équipe"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="meru-card p-4 flex items-center justify-between">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="meru-btn meru-btn-secondary disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center hover:scale-105 px-3 py-2"
                      title="Page précédente"
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="text-sm">Précédent</span>
                    </button>
                    
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`min-w-[2.5rem] px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                            page === currentPage 
                              ? 'meru-btn meru-btn-primary shadow-md' 
                              : 'meru-btn meru-btn-secondary hover:scale-105'
                          }`}
                          title={`Aller à la page ${page}`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="meru-btn meru-btn-secondary disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center hover:scale-105 px-3 py-2"
                      title="Page suivante"
                    >
                      <span className="text-sm">Suivant</span>
                      <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleTeamCreated}
      />

      {selectedTeam && (
        <EditTeamModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedTeam(null);
          }}
          onSuccess={handleTeamUpdated}
          team={selectedTeam}
        />
      )}
    </div>
  );
}
