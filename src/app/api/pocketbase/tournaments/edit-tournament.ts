import { pb } from '@/lib/pocketbase';
import { Tournament, TournamentUpdateData } from '@/app/api/types';

/**
 * Met à jour un tournoi existant
 */
export const EditTournament = {
  async update(id: string, data: TournamentUpdateData): Promise<Tournament> {
    try {
      const result = await pb.collection('Tournaments').update<Tournament>(id, data);
      console.log(`Tournoi ${id} mis à jour avec succès:`, result);
      return result;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du tournoi ${id}:`, error);
      throw error;
    }
  }
};
