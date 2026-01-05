import { pb } from '@/lib/pocketbase';
import { Game, GameCreateData } from '@/app/api/types';

/**
 * Crée un nouveau jeu
 */
export const CreateGame = {
  async create(data: GameCreateData): Promise<Game> {
    try {
      const result = await pb.collection('Games').create<Game>(data);
      console.log('Jeu créé avec succès:', result);
      return result;
    } catch (error) {
      console.error('Erreur lors de la création du jeu:', error);
      throw error;
    }
  }
};
