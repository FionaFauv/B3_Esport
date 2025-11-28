'use client';

import { useState, useEffect } from 'react';
import { pb } from '@/lib/pocketbase';
import { DateTime } from 'luxon';

interface Tournament {
  id: string;
  name: string;
  game_id: string;
  prize_pool: number;
  location: string;
  start_date: string;
  end_date: string;
}

interface EditTournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tournament: Tournament;
}

interface Game {
  id: string;
  name: string;
  category: string;
}

export default function EditTournamentModal({ isOpen, onClose, onSuccess, tournament }: EditTournamentModalProps) {
  const [name, setName] = useState(tournament.name);
  const [gameId, setGameId] = useState(tournament.game_id);
  const [games, setGames] = useState<Game[]>([]);
  const [prizePool, setPrizePool] = useState(tournament.prize_pool.toString());
  const [location, setLocation] = useState(tournament.location);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Convertir les dates UTC en dates locales pour l'affichage
      const start = DateTime.fromISO(tournament.start_date, { zone: 'utc' })
        .setZone('Europe/Paris')
        .toFormat("yyyy-MM-dd'T'HH:mm");
      const end = DateTime.fromISO(tournament.end_date, { zone: 'utc' })
        .setZone('Europe/Paris')
        .toFormat("yyyy-MM-dd'T'HH:mm");
      
      setStartDate(start);
      setEndDate(end);
      
      // Charger les jeux
      const fetchGames = async () => {
        try {
          const records = await pb.collection('Games').getFullList<Game>({
            sort: 'name',
          });
          setGames(records);
        } catch (err) {
          console.error('Erreur lors du chargement des jeux:', err);
        }
      };

      fetchGames();
    }
  }, [isOpen, tournament]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!name || !gameId || !startDate || !endDate) {
      setError('Veuillez remplir tous les champs obligatoires');
      setLoading(false);
      return;
    }

    // Vérifier que la date de fin est après la date de début
    const start = DateTime.fromISO(startDate);
    const end = DateTime.fromISO(endDate);
    
    if (end < start) {
      setError('La date de fin doit être après la date de début');
      setLoading(false);
      return;
    }

    try {
      const startDateISO = DateTime.fromISO(startDate, { zone: 'Europe/Paris' }).toUTC().toISO();
      const endDateISO = DateTime.fromISO(endDate, { zone: 'Europe/Paris' }).toUTC().toISO();
      
      console.log('Modification du tournoi avec:', { name, gameId, prizePool, location, startDate: startDateISO, endDate: endDateISO });
      
      await pb.collection('Tournaments').update(tournament.id, {
        name: name,
        game_id: gameId,
        prize_pool: prizePool ? parseFloat(prizePool) : 0,
        location: location || '',
        start_date: startDateISO,
        end_date: endDateISO,
      });

      console.log('Tournoi modifié avec succès');

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      setError('Erreur lors de la modification du tournoi');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--background)] rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[var(--border)]">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Modifier le tournoi</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-[var(--foreground)] text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nom du tournoi */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Nom du tournoi *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d87943] text-[var(--foreground)]"
                  placeholder="LEC Spring Split 2025"
                  required
                />
              </div>

              {/* Jeu vidéo */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Jeu vidéo *
                </label>
                <select
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d87943] text-[var(--foreground)]"
                  required
                >
                  <option value="">Sélectionner un jeu</option>
                  {games.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Localisation */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Localisation
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d87943] text-[var(--foreground)]"
                  placeholder="Paris, France"
                />
              </div>

              {/* Prize Pool */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Prize Pool (€)
                </label>
                <input
                  type="number"
                  value={prizePool}
                  onChange={(e) => setPrizePool(e.target.value)}
                  className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d87943] text-[var(--foreground)]"
                  placeholder="250000"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Date de début */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Date de début *
                </label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d87943] text-[var(--foreground)]"
                  required
                />
              </div>

              {/* Date de fin */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Date de fin *
                </label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d87943] text-[var(--foreground)]"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[var(--border)]">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-[var(--border)] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                disabled={loading}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#d87943] text-white rounded-lg hover:bg-[#c46835] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Modification...' : 'Modifier le tournoi'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
