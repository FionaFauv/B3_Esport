'use client';

import { pb } from '@/lib/pocketbase';
import { useState, useEffect } from 'react';
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
  status: 'Prévu' | 'Annulé' | 'Terminé' | 'Reporté';
  team1_score: number;
  team2_score: number;
  winner_id: string;
  expand?: {
    team1_id?: Team;
    team2_id?: Team;
  };
}

interface Bet {
  id: string;
  IDUser: string;
  IDMatches: string;
  IDTeams: string;
  amount: number;
  status: 'En attente' | 'Gagné' | 'Perdu';
  created: string;
  expand?: {
    IDMatches?: Match;
    IDTeams?: Team;
  };
}

export default function ParisPage() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'En attente' | 'Gagné' | 'Perdu'>('all');
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const fetchBets = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const records = await pb.collection('Bets').getFullList<Bet>({
        sort: '-created',
        expand: 'match_id,match_id.team1_id,match_id.team2_id,team_id',
        filter: `user_id = "${user.id}"`,
      });
      setBets(records);
    } catch (error) {
      console.error('Erreur lors du chargement des paris:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchBets();
    }
  });

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
      case 'En attente':
        return (
          <span className="text-xs px-3 py-1 rounded-full font-medium" style={{
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            color: '#3b82f6',
            border: '1px solid rgba(59, 130, 246, 0.3)',
          }}>
            En attente
          </span>
        );
      case 'Gagné':
        return (
          <span className="text-xs px-3 py-1 rounded-full font-medium" style={{
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            color: '#22c55e',
            border: '1px solid rgba(34, 197, 94, 0.3)',
          }}>
            Gagné ✓
          </span>
        );
      case 'Perdu':
        return (
          <span className="text-xs px-3 py-1 rounded-full font-medium" style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}>
            Perdu ✗
          </span>
        );
      default:
        return null;
    }
  };

  const filteredBets = filter === 'all' 
    ? bets 
    : bets.filter(bet => bet.status === filter);

  const stats = {
    total: bets.length,
    enAttente: bets.filter(b => b.status === 'En attente').length,
    gagnes: bets.filter(b => b.status === 'Gagné').length,
    perdus: bets.filter(b => b.status === 'Perdu').length,
    montantTotal: bets.reduce((sum, b) => sum + b.amount, 0),
    montantGagne: bets.filter(b => b.status === 'Gagné').reduce((sum, b) => sum + b.amount * 2, 0), // Exemple: gain = mise x2
    montantPerdu: bets.filter(b => b.status === 'Perdu').reduce((sum, b) => sum + b.amount, 0),
  };

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Contenu principal */}
      <main className="container mx-auto px-6 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#d87943' }}>
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
                Mes paris
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Suivez l&apos;évolution de tous vos paris
              </p>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total des paris */}
          <div className="rounded-xl p-5 border" style={{ 
            backgroundColor: 'rgba(128, 128, 128, 0.05)',
            borderColor: 'rgba(128, 128, 128, 0.2)',
          }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Total des paris
              </span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(216, 121, 67, 0.1)' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
              {stats.total}
            </p>
          </div>

          {/* En attente */}
          <div className="rounded-xl p-5 border" style={{ 
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            borderColor: 'rgba(59, 130, 246, 0.2)',
          }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                En attente
              </span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#3b82f6' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: '#3b82f6' }}>
              {stats.enAttente}
            </p>
          </div>

          {/* Gagnés */}
          <div className="rounded-xl p-5 border" style={{ 
            backgroundColor: 'rgba(34, 197, 94, 0.05)',
            borderColor: 'rgba(34, 197, 94, 0.2)',
          }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Gagnés
              </span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#22c55e' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: '#22c55e' }}>
              {stats.gagnes}
            </p>
          </div>

          {/* Perdus */}
          <div className="rounded-xl p-5 border" style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            borderColor: 'rgba(239, 68, 68, 0.2)',
          }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Perdus
              </span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#ef4444' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: '#ef4444' }}>
              {stats.perdus}
            </p>
          </div>
        </div>

        {/* Filtres */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
            style={{
              backgroundColor: filter === 'all' ? '#d87943' : 'rgba(128, 128, 128, 0.1)',
              color: filter === 'all' ? 'white' : 'var(--foreground)',
            }}
          >
            Tous ({stats.total})
          </button>
          <button
            onClick={() => setFilter('En attente')}
            className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
            style={{
              backgroundColor: filter === 'En attente' ? '#3b82f6' : 'rgba(128, 128, 128, 0.1)',
              color: filter === 'En attente' ? 'white' : 'var(--foreground)',
            }}
          >
            En attente ({stats.enAttente})
          </button>
          <button
            onClick={() => setFilter('Gagné')}
            className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
            style={{
              backgroundColor: filter === 'Gagné' ? '#22c55e' : 'rgba(128, 128, 128, 0.1)',
              color: filter === 'Gagné' ? 'white' : 'var(--foreground)',
            }}
          >
            Gagnés ({stats.gagnes})
          </button>
          <button
            onClick={() => setFilter('Perdu')}
            className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
            style={{
              backgroundColor: filter === 'Perdu' ? '#ef4444' : 'rgba(128, 128, 128, 0.1)',
              color: filter === 'Perdu' ? 'white' : 'var(--foreground)',
            }}
          >
            Perdus ({stats.perdus})
          </button>
        </div>

        {/* Liste des paris */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <svg className="animate-spin h-12 w-12" fill="none" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p style={{ color: 'var(--foreground)', opacity: 0.7 }}>Chargement de vos paris...</p>
            </div>
          </div>
        ) : filteredBets.length === 0 ? (
          <div className="rounded-2xl p-12 text-center border" style={{ 
            backgroundColor: 'var(--background)',
            borderColor: 'rgba(128, 128, 128, 0.2)',
          }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ 
              backgroundColor: 'rgba(216, 121, 67, 0.1)',
            }}>
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
              {filter === 'all' ? 'Aucun pari pour le moment' : `Aucun pari ${filter.toLowerCase()}`}
            </h3>
            <p className="mb-6" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
              {filter === 'all' 
                ? "Commencez par parier sur un match !" 
                : `Vous n'avez pas encore de paris ${filter.toLowerCase()}.`
              }
            </p>
            {filter === 'all' && (
              <button
                onClick={() => router.push('/visiteur/matchs')}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, #d87943 0%, #ff6b35 100%)',
                }}
              >
                Voir les matchs
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredBets.map((bet) => (
              <div
                key={bet.id}
                className="rounded-xl p-5 border transition-all hover:scale-[1.01]"
                style={{ 
                  backgroundColor: 'rgba(128, 128, 128, 0.05)',
                  borderColor: 'rgba(128, 128, 128, 0.2)',
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Informations du match */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {getStatusBadge(bet.status)}
                      <span className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.5 }}>
                        {new Date(bet.created).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    
                    {bet.expand?.IDMatches && (
                      <>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                            {bet.expand.IDMatches.expand?.team1_id?.name}
                          </span>
                          <span className="text-sm font-medium" style={{ 
                            background: 'linear-gradient(135deg, #d87943 0%, #ff6b35 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}>
                            VS
                          </span>
                          <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                            {bet.expand.IDMatches.expand?.team2_id?.name}
                          </span>
                        </div>
                        
                        <p className="text-sm mb-2" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                          Match prévu le {formatDate(bet.expand.IDMatches.match_date)}
                        </p>
                      </>
                    )}

                    {/* Votre choix */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-sm font-medium" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                        Votre choix :
                      </span>
                      {bet.expand?.IDTeams && (
                        <div className="flex items-center gap-2">
                          {getLogoUrl(bet.expand.IDTeams) ? (
                            <div className="w-6 h-6 rounded overflow-hidden">
                              <Image
                                src={getLogoUrl(bet.expand.IDTeams)!}
                                alt={bet.expand.IDTeams.name}
                                width={24}
                                height={24}
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white" style={{ 
                              background: 'linear-gradient(135deg, #d87943 0%, #ff6b35 100%)',
                            }}>
                              {bet.expand.IDTeams.tag}
                            </div>
                          )}
                          <span className="font-semibold" style={{ color: '#d87943' }}>
                            {bet.expand.IDTeams.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Montant */}
                  <div className="flex md:flex-col items-center md:items-end gap-2">
                    <div className="text-right">
                      <p className="text-sm mb-1" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                        Mise
                      </p>
                      <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                        {bet.amount}€
                      </p>
                    </div>
                    
                    {bet.status === 'Gagné' && (
                      <div className="text-right">
                        <p className="text-sm mb-1" style={{ color: '#22c55e', opacity: 0.8 }}>
                          Gain potentiel
                        </p>
                        <p className="text-xl font-bold" style={{ color: '#22c55e' }}>
                          +{bet.amount * 2}€
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
