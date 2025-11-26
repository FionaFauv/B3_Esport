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

    if (!team1 || !team2 || !date || !tournament) {
      setError('Veuillez remplir tous les champs obligatoires');
      setLoading(false);
      return;
    }

    try {
      const dateISO = DateTime.fromISO(date, { zone: 'Europe/Paris' }).toUTC().toISO();
      
      console.log('Création du match avec:', { team1, team2, date: dateISO, tournament, prizepool, location });
      
      const record = await pb.collection('Matches').create({
        team1: team1,
        team2: team2,
        date: dateISO,
        tournament: tournament,
        prizepool: prizepool ? parseFloat(prizepool) : 0,
        location: location || '',
        status: 'upcoming',
      });

      console.log('Match créé avec succès:', record);

      // Réinitialiser le formulaire
      setTeam1('');
      setTeam2('');
      setDate('');
      setTournament('');
      setPrizepool('');
      setLocation('');
      
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Créer un match</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 font-medium">
              Équipe 1 *
            </label>
            <select
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
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
            <label className="block text-gray-300 mb-2 font-medium">
              Équipe 2 *
            </label>
            <select
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
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
            <label className="block text-gray-300 mb-2 font-medium">
              Date et heure *
            </label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 font-medium">
              Tournoi *
            </label>
            <select
              value={tournament}
              onChange={(e) => setTournament(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
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
            <label className="block text-gray-300 mb-2 font-medium">
              Prix pour les gagnants (€)
            </label>
            <input
              type="number"
              value={prizepool}
              onChange={(e) => setPrizepool(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Ex: 50000"
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">
              Lieu
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Ex: Chine, Berlin"
            />
          </div>
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-medium"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              {loading ? 'Création...' : 'Créer le match'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
