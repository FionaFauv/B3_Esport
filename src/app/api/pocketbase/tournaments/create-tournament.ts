import { pb } from '@/lib/pocketbase';
import { Tournament, TournamentCreateData } from '@/app/api/types';

/**
 * Crée un nouveau tournoi
 */
export const CreateTournament = {
  async create(data: TournamentCreateData): Promise<Tournament> {
    try {
      const result = await pb.collection('Tournaments').create<Tournament>(data);
      console.log('Tournoi créé avec succès:', result);
      return result;
    } catch (error) {
      console.error('Erreur lors de la création du tournoi:', error);
      throw error;
    }
  }
};
