import { pb } from '@/lib/pocketbase';

/**
 * Supprime un match
 */
export const DeleteMatch = {
  async delete(id: string): Promise<boolean> {
    try {
      await pb.collection('Matches').delete(id);
      console.log(`Match ${id} supprimé avec succès`);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression du match ${id}:`, error);
      throw error;
    }
  }
};
