'use client';

import { useState, useEffect } from 'react';
import { pb } from '@/lib/pocketbase';
import { DateTime } from 'luxon';

interface Match {
  id: string;
  tournament_id: string;
  team1_id: string;
  team2_id: string;
  match_date: string;
  status: string;
  team1_score?: number;
  team2_score?: number;
  winner_id?: string;
}

interface EditMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  match: Match;
}

interface Team {
  id: string;
  name: string;
  tag: string;
}

interface Tournament {
  id: string;
  name: string;
}

export default function EditMatchModal({ isOpen, onClose, onSuccess, match }: EditMatchModalProps) {
  const [team1, setTeam1] = useState(match.team1_id);
  const [team2, setTeam2] = useState(match.team2_id);
  const [match_date, setDate] = useState('');
  const [tournament, setTournament] = useState(match.tournament_id);
  const [status, setStatus] = useState(match.status);
  const [team1Score, setTeam1Score] = useState(match.team1_score?.toString() || '');
  const [team2Score, setTeam2Score] = useState(match.team2_score?.toString() || '');
  const [winnerId, setWinnerId] = useState(match.winner_id || '');
  const [teams, setTeams] = useState<Team[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Convertir la date UTC en date locale pour l'affichage
      const matchDate = DateTime.fromISO(match.match_date, { zone: 'utc' })
        .setZone('Europe/Paris')
        .toFormat("dd/MM/yyyy'T'HH:mm");
      setDate(matchDate);
      
      // Charger les équipes et tournois
      const fetchData = async () => {
        try {
          const recordsTeams = await pb.collection('Teams').getFullList<Team>({
            sort: 'name',
          });
          setTeams(recordsTeams);

          const recordsTournaments = await pb.collection('Tournaments').getFullList<Tournament>({
            sort: 'name',
          });
          setTournaments(recordsTournaments);
        } catch (err) {
          console.error('Erreur lors du chargement des données:', err);
        }
      };

      fetchData();
    }
  }, [isOpen, match]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (team1 === team2) {
      setError('Les deux équipes doivent être différentes');
      setLoading(false);
      return;
    }

    if (!team1 || !team2 || !match_date || !tournament) {
      setError('Veuillez remplir tous les champs obligatoires');
      setLoading(false);
      return;
    }

    try {
      const dateISO = DateTime.fromISO(match_date, { zone: 'Europe/Paris' }).toUTC().toISO();
      
      const updateData: Record<string, unknown> = {
        team1_id: team1,
        team2_id: team2,
        match_date: dateISO,
        tournament_id: tournament,
        status: status,
      };

      // Ajouter les scores seulement si le match est terminé
      if (status === 'finished') {
        updateData.team1_score = team1Score ? parseInt(team1Score) : 0;
        updateData.team2_score = team2Score ? parseInt(team2Score) : 0;
        updateData.winner_id = winnerId || '';
      }

      await pb.collection('Matches').update(match.id, updateData);

      onSuccess();
      onClose();
    } catch (err: unknown) {
      console.error('Erreur lors de la modification du match:', err);
      
      let errorMessage = 'Erreur lors de la modification du match';
      
      if (err && typeof err === 'object' && 'response' in err) {
        const pbError = err as { response?: { data?: { message?: string; data?: Record<string, { message: string }> } } };
        if (pbError.response?.data) {
          const data = pbError.response.data;
          
          if (data.message) {
            errorMessage = data.message;
          } else if (data.data) {
            const fields = Object.keys(data.data);
            if (fields.length > 0) {
              errorMessage = `Erreur sur le champ ${fields[0]}: ${data.data[fields[0]].message}`;
            }
          }
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-auto" style={{ background: 'var(--background)' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Modifier le match</h2>
          <button
            onClick={onClose}
            className="text-2xl transition"
            style={{ color: 'var(--foreground)', opacity: 0.6 }}
          >
            ×
          </button>
        </div>
        
        {error && (
          <div className="px-4 py-3 rounded mb-4" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium" style={{ color: 'var(--foreground)' }}>
              Équipe 1 *
            </label>
            <select
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              className="w-full p-3 rounded-lg"
              style={{ background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
              required
            >
              <option value="">Sélectionner une équipe</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name} ({team.tag})
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-medium" style={{ color: 'var(--foreground)' }}>
              Équipe 2 *
            </label>
            <select
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              className="w-full p-3 rounded-lg"
              style={{ background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
              required
            >
              <option value="">Sélectionner une équipe</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name} ({team.tag})
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-medium" style={{ color: 'var(--foreground)' }}>
              Date et heure *
            </label>
            <input
              type="datetime-local"
              value={match_date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 rounded-lg"
              style={{ background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-medium" style={{ color: 'var(--foreground)' }}>
              Tournoi *
            </label>
            <select
              value={tournament}
              onChange={(e) => setTournament(e.target.value)}
              className="w-full p-3 rounded-lg"
              style={{ background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
              required
            >
              <option value="">Sélectionner un tournoi</option>
              {tournaments.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-medium" style={{ color: 'var(--foreground)' }}>
              Statut *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 rounded-lg"
              style={{ background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
              required
            >
                <option value="">Sélectionner le statut</option>
                <option>{match.status}</option>
            </select>
          </div>
          
          {status === 'finished' && (
            <>
              <div className="mb-4">
                <label className="block mb-2 font-medium" style={{ color: 'var(--foreground)' }}>
                  Score Équipe 1
                </label>
                <input
                  type="number"
                  value={team1Score}
                  onChange={(e) => setTeam1Score(e.target.value)}
                  className="w-full p-3 rounded-lg"
                  style={{ background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
                  min="0"
                  placeholder="0"
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 font-medium" style={{ color: 'var(--foreground)' }}>
                  Score Équipe 2
                </label>
                <input
                  type="number"
                  value={team2Score}
                  onChange={(e) => setTeam2Score(e.target.value)}
                  className="w-full p-3 rounded-lg"
                  style={{ background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
                  min="0"
                  placeholder="0"
                />
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium" style={{ color: 'var(--foreground)' }}>
                  Gagnant
                </label>
                <select
                  value={winnerId}
                  onChange={(e) => setWinnerId(e.target.value)}
                  className="w-full p-3 rounded-lg"
                  style={{ background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
                >
                  <option value="">Sélectionner le gagnant</option>
                  {teams.filter(t => t.id === team1 || t.id === team2).map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg transition font-medium"
              style={{ background: 'rgba(128, 128, 128, 0.2)', color: 'var(--foreground)' }}
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: '#d87943', color: '#ffffff' }}
            >
              {loading ? 'Modification...' : 'Modifier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
