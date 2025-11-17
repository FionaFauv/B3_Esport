'use client';

import { pb } from '@/lib/pocketbase';
import { useState, useEffect } from 'react';
import CreateTeamModal from '@/components/CreateTeamModal';
import EditTeamModal from '@/components/EditTeamModal';
import Image from 'next/image';
import Link from 'next/link';

interface Team {
  id: string;
  name: string;
  tag: string;
  country: string;
  founded_year: number;
  logo_url: string;
  created: string;
}
// Page pour la visualisation et gestion des équipes, création, modification, suppression :3
export default function Example() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchTeams();
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

  const getLogoUrl = (team: Team) => {
    if (team.logo_url) {
      return `${process.env.NEXT_PUBLIC_PB_URL}api/files/Teams/${team.id}/${team.logo_url}`;
    }
    return null;
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Esport Manager</h1>
                  <p className="text-xs text-gray-400">Dashboard Admin</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/admin" className="text-gray-300 hover:text-white transition text-sm">
                Accueil
              </Link>
              <Link href="/matchs" className="text-gray-300 hover:text-white transition text-sm">
                Matchs
              </Link>
              <Link href="/equipes" className="text-blue-400 font-medium text-sm">
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
        {/* En-tête de section avec stats */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Gestion des Équipes</h2>
              <p className="text-gray-400">
                {loading ? 'Chargement...' : `${teams.length} équipe${teams.length > 1 ? 's' : ''} enregistrée${teams.length > 1 ? 's' : ''}`}
              </p>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium shadow-lg shadow-blue-500/30 transition-all duration-200 flex items-center gap-2 group"
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : teams.length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Aucune équipe</h3>
            <p className="text-gray-400 mb-6">
              Commencez par créer votre première équipe pour gérer votre compétition esport.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Créer ma première équipe
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div
                key={team.id}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  {/* Logo */}
                  <div className="shrink-0">
                    {getLogoUrl(team) ? (
                      <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-gray-700 group-hover:ring-blue-500 transition-all">
                        <Image
                          src={getLogoUrl(team)!}
                          alt={`Logo ${team.name}`}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center ring-2 ring-gray-700 group-hover:ring-blue-500 transition-all">
                        <span className="text-2xl font-bold text-gray-400">
                          {team.tag}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-blue-400 transition">
                      {team.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md font-medium border border-blue-500/30">
                        {team.tag}
                      </span>
                      <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md">
                        {team.country}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Détails */}
                <div className="space-y-2 mb-4 pb-4 border-b border-gray-700/50">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-400">Fondée en {team.founded_year}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(team)}
                    className="flex-1 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 border border-blue-500/30 hover:border-blue-500"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteClick(team)}
                    className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white p-2.5 rounded-lg transition-all duration-200 border border-red-500/30 hover:border-red-500"
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
