import { pb } from '@/lib/pocketbase';

/**
 * Supprime une équipe
 */
export const DeleteTeam = {
  async delete(id: string): Promise<boolean> {
    try {
      await pb.collection('Teams').delete(id);
      console.log(`Équipe ${id} supprimée avec succès`);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'équipe ${id}:`, error);
      throw error;
    }
  }
};
