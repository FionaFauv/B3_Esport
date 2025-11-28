'use client';

import { useState, useEffect } from 'react';
import { pb } from '@/lib/pocketbase';
import { DateTime } from 'luxon';


interface CreateMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Team {
  id: string;
  name: string;
  tag: string;
}

interface Tournaments {
  id: string;
  name: string;
  game_id: string;
}

interface Game {
  id: string;
  name: string;
  category: string;
  created: string;
}

export default function CreateMatchModal({ isOpen, onClose, onSuccess }: CreateMatchModalProps) {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [date, setDate] = useState('');
  const [tournament, setTournament] = useState('');
  const [tournaments, setTournaments] = useState<Tournaments[]>([]);
  const [prizepool, setPrizepool] = useState('');
  const [location, setLocation] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [game, setGame] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [status, setStatus] = useState('Prévu');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const recordsTeams = await pb.collection('Teams').getFullList<Team>({
          sort: 'name',
        });
        setTeams(recordsTeams);
      } catch (err) {
        console.error('Erreur lors du chargement des équipes:', err);
      };

      try {
        const recordsTournaments = await pb.collection('Tournaments').getFullList<Tournaments>({
          sort: 'name',
        });
        setTournaments(recordsTournaments);
      } catch (err) {
        console.error('Erreur lors du chargement des Tournois:', err);
      };

          try {
            setGamesLoading(true);
            const recordsGames = await pb.collection('Games').getFullList<Game>({
              sort: 'name',
            });
            setGames(recordsGames);
          } catch (error) {
            console.error('Erreur lors du chargement des jeux:', error);
          } finally {
            setGamesLoading(false);
          }
  
    
    };

    if (isOpen) {
      fetchTeams();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (team1 === team2) {
      setError('Les deux équipes doivent être différentes');
      setLoading(false);
      return;
    }

    if (!team1 || !team2 || !date || !tournament || !game) {
      setError('Veuillez remplir tous les champs obligatoires');
      setLoading(false);
      return;
    }

    try {
      const dateISO = DateTime.fromISO(date, { zone: 'Europe/Paris' }).toUTC().toISO();
      
      console.log('Création du match avec:', { team1, team2, date: dateISO, tournament, game, prizepool, location });
      
      const record = await pb.collection('Matches').create({
        team1_id: team1,
        team2_id: team2,
        match_date: dateISO,
        tournament_id: tournament,
        game_id: game,
        prizepool: prizepool ? parseFloat(prizepool) : 0,
        location: location || '',
        status: status,
      });

      console.log('Match créé avec succès:', record);

      // Réinitialiser le formulaire
      setTeam1('');
      setTeam2('');
      setDate('');
      setGame('');
      setTournament('');
      setPrizepool('');
      setLocation('');
      setStatus('Prévu');
      
      onSuccess();
      onClose();
    } catch (err: unknown) {
      console.error('Erreur lors de la création du match:', err);
      
      // Extraction détaillée de l'erreur PocketBase
      let errorMessage = 'Erreur lors de la création du match';
      
      if (err && typeof err === 'object' && 'response' in err) {
        const pbError = err as { response?: { data?: { message?: string; data?: Record<string, { message: string }> } } };
        if (pbError.response?.data) {
          const data = pbError.response.data;
          console.error('Détails de l\'erreur PocketBase:', data);
          
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
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0, 0, 0, 0.7)' }}>
      <div className="rounded-2xl p-8 w-full max-w-2xl shadow-2xl" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--foreground)' }}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d87943' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Créer un match
          </h2>
          <button
            onClick={onClose}
            className="text-2xl w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
            style={{ color: 'var(--foreground)', opacity: 0.6 }}
          >
            ×
          </button>
        </div>
        
        {error && (
          <div className="px-4 py-3 rounded-lg mb-4" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                Équipe 1 *
              </label>
              <select
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
                className="w-full p-3 rounded-lg focus:outline-none transition-all"
                style={{ 
                  background: 'var(--background)', 
                  color: 'var(--foreground)', 
                  border: '1px solid var(--border)',
                }}
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
            
            <div>
              <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                Équipe 2 *
              </label>
              <select
                value={team2}
                onChange={(e) => setTeam2(e.target.value)}
                className="w-full p-3 rounded-lg focus:outline-none transition-all"
                style={{ 
                  background: 'var(--background)', 
                  color: 'var(--foreground)', 
                  border: '1px solid var(--border)',
                }}
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
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
              Date et heure *
            </label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 rounded-lg focus:outline-none transition-all"
              style={{ 
                background: 'var(--background)', 
                color: 'var(--foreground)', 
                border: '1px solid var(--border)',
              }}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
              Statut *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 rounded-lg focus:outline-none transition-all"
              style={{ 
                background: 'var(--background)', 
                color: 'var(--foreground)', 
                border: '1px solid var(--border)',
              }}
              required
            >
              <option value="Prévu">Prévu</option>
              <option value="Annulé">Annulé</option>
              <option value="Terminé">Terminé</option>
              <option value="Reporté">Reporté</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                Tournoi *
              </label>
              <select
                value={tournament}
                onChange={(e) => setTournament(e.target.value)}
                className="w-full p-3 rounded-lg focus:outline-none transition-all"
                style={{ 
                  background: 'var(--background)', 
                  color: 'var(--foreground)', 
                  border: '1px solid var(--border)',
                }}
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
            
            <div>
              <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                Jeu vidéo *
              </label>
              <select
                value={game}
                onChange={(e) => setGame(e.target.value)}
                className="w-full p-3 rounded-lg focus:outline-none transition-all"
                style={{ 
                  background: 'var(--background)', 
                  color: 'var(--foreground)', 
                  border: '1px solid var(--border)',
                }}
                required
                disabled={gamesLoading}
              >
                <option value="">
                  {gamesLoading ? 'Chargement des jeux...' : 'Sélectionner un jeu'}
                </option>
                {games.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} {g.category && `(${g.category})`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                Prix pour les gagnants (€)
              </label>
              <input
                type="number"
                value={prizepool}
                onChange={(e) => setPrizepool(e.target.value)}
                className="w-full p-3 rounded-lg focus:outline-none transition-all"
                style={{ 
                  background: 'var(--background)', 
                  color: 'var(--foreground)', 
                  border: '1px solid var(--border)',
                }}
                placeholder="Ex: 50000"
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                Lieu
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 rounded-lg focus:outline-none transition-all"
                style={{ 
                  background: 'var(--background)', 
                  color: 'var(--foreground)', 
                  border: '1px solid var(--border)',
                }}
                placeholder="Ex: Chine, Berlin"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg transition-all font-medium"
              style={{ 
                background: 'var(--background)', 
                color: 'var(--foreground)', 
                border: '1px solid var(--border)' 
              }}
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                background: '#d87943', 
                color: '#ffffff' 
              }}
            >
              {loading ? 'Création...' : 'Créer le match'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
