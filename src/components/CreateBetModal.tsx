'use client';

import { pb } from '@/lib/pocketbase';
import { useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/stores/AuthStore';

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

interface Paris {
  match: Match | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function BetModal({ match, isOpen, onClose, onSuccess }: Paris) {
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [betAmount, setBetAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthStore();

  if (!isOpen || !match) return null;

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

  const handleConfirmBet = async () => {
    if (!match || !selectedTeam || !betAmount) {
      alert('Veuillez sélectionner une équipe et entrer un montant');
      return;
    }

    const amount = parseFloat(betAmount);
    if (amount < 1) {
      alert('Le montant minimum est de 1€');
      return;
    }

    try {
      setIsSubmitting(true);

      // Créer le pari dans PocketBase
      await pb.collection('Paris').create({
        IDUser: user?.id,
        IDMatches: match.id,
        IDTeams: selectedTeam,
        montant: amount,
      });

      alert('Paris  enregistré avec succès !');
      
      // Réinitialiser le formulaire
      setSelectedTeam('');
      setBetAmount('');
      
      // Appeler le callback de succès si fourni
      if (onSuccess) {
        onSuccess();
      }
      
      // Fermer le modal
      onClose();
    } catch (error) {
      console.error('Erreur lors de la création du pari:', error);
      alert('Erreur lors de l\'enregistrement du pari. Assurez-vous que la collection Bets existe dans PocketBase.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedTeam('');
    setBetAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
      <div className="rounded-2xl p-6 max-w-md w-full border shadow-2xl animate-in fade-in zoom-in duration-200" style={{ 
        backgroundColor: 'var(--background)',
        borderColor: 'rgba(216, 121, 67, 0.3)',
      }}>
        {/* En-tête */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#d87943' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
              Placer un pari
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:rotate-90"
            style={{ backgroundColor: 'rgba(128, 128, 128, 0.2)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--foreground)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Informations du match */}
        <div className="mb-6 p-4 rounded-xl border" style={{ 
          backgroundColor: 'rgba(128, 128, 128, 0.05)',
          borderColor: 'rgba(128, 128, 128, 0.2)',
        }}>
          <p className="text-xs mb-3" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
            {formatDate(match.match_date)}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
              {match.expand?.team1_id?.name}
            </span>
            <span className="text-sm px-3 py-1 rounded-md font-medium" style={{ 
              background: 'linear-gradient(135deg, #d87943 0%, #ff6b35 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              VS
            </span>
            <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
              {match.expand?.team2_id?.name}
            </span>
          </div>
        </div>

        {/* Sélection de l'équipe */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3" style={{ color: 'var(--foreground)' }}>
            Quelle équipe va gagner ?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* Team 1 */}
            <button
              onClick={() => setSelectedTeam(match.team1_id)}
              className="p-4 rounded-xl border-2 transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: selectedTeam === match.team1_id ? 'rgba(216, 121, 67, 0.1)' : 'rgba(128, 128, 128, 0.05)',
                borderColor: selectedTeam === match.team1_id ? '#d87943' : 'rgba(128, 128, 128, 0.2)',
              }}
            >
              <div className="flex flex-col items-center gap-2">
                {match.expand?.team1_id && getLogoUrl(match.expand.team1_id) ? (
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={getLogoUrl(match.expand.team1_id)!}
                      alt={match.expand.team1_id.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ 
                    background: 'linear-gradient(135deg, #d87943 0%, #ff6b35 100%)',
                  }}>
                    <span className="text-white font-bold text-xl">
                      {match.expand?.team1_id?.tag || 'T1'}
                    </span>
                  </div>
                )}
                <span className="font-medium text-sm text-center" style={{ color: 'var(--foreground)' }}>
                  {match.expand?.team1_id?.name}
                </span>
                <span className="text-xs px-2 py-1 rounded-md" style={{ 
                  backgroundColor: 'rgba(216, 121, 67, 0.1)',
                  color: '#d87943',
                }}>
                  {match.expand?.team1_id?.tag}
                </span>
              </div>
            </button>

            {/* Team 2 */}
            <button
              onClick={() => setSelectedTeam(match.team2_id)}
              className="p-4 rounded-xl border-2 transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: selectedTeam === match.team2_id ? 'rgba(255, 107, 53, 0.1)' : 'rgba(128, 128, 128, 0.05)',
                borderColor: selectedTeam === match.team2_id ? '#ff6b35' : 'rgba(128, 128, 128, 0.2)',
              }}
            >
              <div className="flex flex-col items-center gap-2">
                {match.expand?.team2_id && getLogoUrl(match.expand.team2_id) ? (
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={getLogoUrl(match.expand.team2_id)!}
                      alt={match.expand.team2_id.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ 
                    background: 'linear-gradient(135deg, #ff6b35 0%, #d87943 100%)',
                  }}>
                    <span className="text-white font-bold text-xl">
                      {match.expand?.team2_id?.tag || 'T2'}
                    </span>
                  </div>
                )}
                <span className="font-medium text-sm text-center" style={{ color: 'var(--foreground)' }}>
                  {match.expand?.team2_id?.name}
                </span>
                <span className="text-xs px-2 py-1 rounded-md" style={{ 
                  backgroundColor: 'rgba(255, 107, 53, 0.1)',
                  color: '#ff6b35',
                }}>
                  {match.expand?.team2_id?.tag}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Montant du pari */}
        <div className="mb-6">
          <label htmlFor="betAmount" className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
            Montant du pari (€)
          </label>
          <div className="relative">
            <input
              type="number"
              id="betAmount"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder="Ex: 10"
              min="1"
              step="1"
              className="w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:border-opacity-100"
              style={{
                backgroundColor: 'var(--background)',
                borderColor: betAmount ? '#d87943' : 'rgba(128, 128, 128, 0.2)',
                color: 'var(--foreground)',
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium" style={{ color: 'var(--foreground)', opacity: 0.5 }}>
              €
            </div>
          </div>
          {betAmount && parseFloat(betAmount) > 0 && (
            <p className="text-xs mt-2" style={{ color: '#d87943' }}>
              Vous pariez {betAmount}€ sur {selectedTeam === match.team1_id ? match.expand?.team1_id?.name : selectedTeam === match.team2_id ? match.expand?.team2_id?.name : 'une équipe'}
            </p>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'rgba(128, 128, 128, 0.2)',
              color: 'var(--foreground)',
            }}
          >
            Annuler
          </button>
          <button
            onClick={handleConfirmBet}
            disabled={!selectedTeam || !betAmount || parseFloat(betAmount) < 1 || isSubmitting}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #d87943 0%, #ff6b35 100%)',
              boxShadow: '0 4px 15px rgba(216, 121, 67, 0.4)',
            }}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Confirmation...
              </>
            ) : (
              'Confirmer le pari'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
