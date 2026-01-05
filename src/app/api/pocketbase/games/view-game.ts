import { pb } from '@/lib/pocketbase';
import { Game } from '@/app/api/types';

/**
 * Récupère la liste des jeux
 */
export const fetchGames = async (page: number = 1, perPage: number = 50): Promise<Game[]> => {
  try {
    const records = await pb.collection('Games').getList<Game>(page, perPage, {
      sort: '-created',
    });
    return records.items;
  } catch (error) {
    console.error('Erreur lors du chargement des jeux:', error);
    throw error;
  }
};

/**
 * Récupère un jeu par son ID
 */
export const fetchGameById = async (id: string): Promise<Game> => {
  try {
    return await pb.collection('Games').getOne<Game>(id);
  } catch (error) {
    console.error(`Erreur lors du chargement du jeu ${id}:`, error);
    throw error;
  }
};

/**
 * Récupère tous les jeux (sans pagination)
 */
export const fetchAllGames = async (): Promise<Game[]> => {
  try {
    return await pb.collection('Games').getFullList<Game>({
      sort: 'name',
    });
  } catch (error) {
    console.error('Erreur lors du chargement de tous les jeux:', error);
    throw error;
  }
};
