import { pb } from '@/lib/pocketbase';

/**
 * Supprime un jeu
 */
export const DeleteGame = {
  async delete(id: string): Promise<boolean> {
    try {
      await pb.collection('Games').delete(id);
      console.log(`Jeu ${id} supprimé avec succès`);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression du jeu ${id}:`, error);
      throw error;
    }
  }
};
