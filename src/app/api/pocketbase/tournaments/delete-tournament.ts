import { pb } from '@/lib/pocketbase';

/**
 * Supprime un tournoi
 */
export const DeleteTournament = {
  async delete(id: string): Promise<boolean> {
    try {
      await pb.collection('Tournaments').delete(id);
      console.log(`Tournoi ${id} supprimé avec succès`);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression du tournoi ${id}:`, error);
      throw error;
    }
  }
};
