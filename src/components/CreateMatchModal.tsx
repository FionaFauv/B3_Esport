'use client';

import { useState, useEffect } from 'react';
import { pb } from '@/lib/pocketbase';

interface CreateMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Team {
  id: string;
  name: string;
  abbreviation: string;
}

export default function CreateMatchModal({ isOpen, onClose, onSuccess }: CreateMatchModalProps) {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const records = await pb.collection('Teams').getFullList<Team>({
          sort: 'name',
        });
        setTeams(records);
      } catch (err) {
        console.error('Erreur lors du chargement des équipes:', err);
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

    if (!team1 || !team2 || !date) {
      setError('Veuillez remplir tous les champs obligatoires');
      setLoading(false);
      return;
    }

    try {
      // Convertir la date locale en ISO string pour PocketBase
      const dateISO = new Date(date).toISOString();
      
      console.log('Création du match avec:', { team1, team2, date: dateISO, location });
      
      const record = await pb.collection('Matches').create({
        team1: team1,
        team2: team2,
        date: dateISO,
        location: location || '',
        status: 'upcoming',
      });

      console.log('Match créé avec succès:', record);

      // Réinitialiser le formulaire
      setTeam1('');
      setTeam2('');
      setDate('');
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
                  {team.name} ({team.abbreviation})
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
                  {team.name} ({team.abbreviation})
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
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">
              Lieu
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Ex: LEC Arena, Berlin"
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
