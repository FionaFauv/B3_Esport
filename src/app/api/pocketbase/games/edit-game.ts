import { pb } from '@/lib/pocketbase';
import { Game, GameUpdateData } from '@/app/api/types';

/**
 * Met à jour un jeu existant
 */
export const EditGame = {
  async update(id: string, data: GameUpdateData): Promise<Game> {
    try {
      const result = await pb.collection('Games').update<Game>(id, data);
      console.log(`Jeu ${id} mis à jour avec succès:`, result);
      return result;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du jeu ${id}:`, error);
      throw error;
    }
  }
};
