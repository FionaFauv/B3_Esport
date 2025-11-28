'use client';

import { pb } from '@/lib/pocketbase';
import { useState, useEffect } from 'react';
import CreateTeamModal from '@/components/CreateTeamModal';
import EditTeamModal from '@/components/EditTeamModal';
import Image from 'next/image';

interface Team {
  id: string;
  name: string;
  tag: string;
  country: string;
  founded_year: number;
  logo_url: string;
  created: string;
}

interface Game {
  id: string;
  name: string;
  category: string;
  created: string;
}

// Page pour la visualisation et gestion des équipes, création, modification, suppression :3
export default function Example() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);

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

  useEffect(() => {
    fetchTeams();
    fetchGames();
  }, []);

  const handleTeamCreated = () => {
    fetchTeams(); 
  };

  const handleTeamUpdated = () => {
    fetchTeams(); 
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
        await pb.collection('Teams').delete(team.id);
        fetchTeams();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de l\'équipe');
      }
    }
  };

  const handleGameDelete = async (gameId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce jeu ?')) {
      try {
        await pb.collection('Games').delete(gameId);
        fetchGames();
      } catch (error) {
        console.error('Erreur lors de la suppression du jeu:', error);
        alert('Erreur lors de la suppression du jeu');
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
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Layout 2 colonnes */}
        <div className="flex gap-8">
          {/* Colonne principale - Équipes */}
          <div className="flex-1">
            {/* En-tête de section */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Gestion des Équipes</h2>
                  <p style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                    {loading ? 'Chargement...' : `${teams.length} équipe${teams.length > 1 ? 's' : ''} enregistrée${teams.length > 1 ? 's' : ''}`}
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
                  Créer une équipe
                </button>
              </div>
            </div>

            {/* Grille des équipes */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#d87943' }}></div>
              </div>
            ) : teams.length === 0 ? (
              <div className="backdrop-blur-sm rounded-2xl p-12 text-center" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(216, 121, 67, 0.1)' }}>
                  <svg className="w-10 h-10" style={{ color: '#d87943' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Aucune équipe</h3>
                <p className="mb-6" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                  Commencez par créer votre première équipe pour gérer votre compétition esport.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 rounded-lg font-medium transition inline-flex items-center gap-2"
                  style={{ background: '#d87943', color: 'white' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Créer ma première équipe
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className="card-hover group backdrop-blur-sm rounded-2xl p-6 transition-all duration-300"
                    style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      {/* Logo */}
                      <div className="shrink-0">
                        {getLogoUrl(team) ? (
                          <div className="w-16 h-16 rounded-xl overflow-hidden transition-all" style={{ border: '2px solid var(--border)' }}>
                            <Image
                              src={getLogoUrl(team)!}
                              alt={`Logo ${team.name}`}
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-xl flex items-center justify-center transition-all" style={{ background: 'rgba(216, 121, 67, 0.1)', border: '2px solid rgba(216, 121, 67, 0.3)' }}>
                            <span className="text-2xl font-bold" style={{ color: '#d87943' }}>
                              {team.tag}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Infos */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold mb-1 truncate transition" style={{ color: 'var(--foreground)' }}>
                          {team.name}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs px-2 py-1 rounded-md font-medium" style={{ background: 'rgba(216, 121, 67, 0.2)', color: '#d87943', border: '1px solid rgba(216, 121, 67, 0.3)' }}>
                            {team.tag}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-md" style={{ background: 'rgba(216, 121, 67, 0.05)', color: 'var(--foreground)', opacity: 0.8 }}>
                            {team.country}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Détails */}
                    <div className="space-y-2 mb-4 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4" style={{ color: 'var(--foreground)', opacity: 0.5 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span style={{ color: 'var(--foreground)', opacity: 0.6 }}>Fondée en {team.founded_year}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(team)}
                        className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
                        style={{ background: 'rgba(216, 121, 67, 0.2)', color: '#d87943', border: '1px solid rgba(216, 121, 67, 0.3)' }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteClick(team)}
                        className="p-2.5 rounded-lg transition-all duration-200"
                        style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Colonne latérale - Jeux */}
          <div className="w-80">
            <div className="sticky top-20">
              {/* Card englobante */}
              <div className="backdrop-blur-sm rounded-xl p-6" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>Jeux</h3>
                  <button
                    className="p-2 rounded-lg transition"
                    style={{ background: 'rgba(216, 121, 67, 0.2)', color: '#d87943' }}
                    title="Ajouter un jeu"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                {gamesLoading ? (
                  <div className="flex items-center justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#d87943' }}></div>
                  </div>
                ) : games.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                      Aucun jeu enregistré
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {games.map((game) => (
                      <div
                        key={game.id}
                        className="p-4 rounded-lg transition-all duration-200 hover:bg-opacity-50"
                        style={{ background: 'rgba(216, 121, 67, 0.05)' }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-sm flex-1" style={{ color: 'var(--foreground)' }}>
                            {game.name}
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
                              onClick={() => handleGameDelete(game.id)}
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
                        <div className="space-y-1">
                          <p className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                            Genre: {game.category}
                          </p>
                        </div>
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
