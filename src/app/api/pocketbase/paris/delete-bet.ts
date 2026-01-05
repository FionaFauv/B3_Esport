import { pb } from '@/lib/pocketbase';

/**
 * Supprime un pari
 */
export const DeleteBet = {
  async delete(id: string): Promise<boolean> {
    try {
      await pb.collection('Paris').delete(id);
      console.log(`Pari ${id} supprimé avec succès`);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression du pari ${id}:`, error);
      throw error;
    }
  }
};
