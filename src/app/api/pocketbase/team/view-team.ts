import { pb } from '@/lib/pocketbase';
import { Team } from '@/app/api/types';

/**
 * Récupère la liste des équipes (limité à 50)
 * @returns Liste des 50 premières équipes triées par date de création
 */
export const fetchTeams = async (): Promise<Team[]> => {
  try {
    const records = await pb.collection('Teams').getList<Team>(1, 50, {
      sort: '-created',
    });
    return records.items;
  } catch (error) {
    console.error('Erreur lors du chargement des équipes:', error);
    throw error;
  }
};