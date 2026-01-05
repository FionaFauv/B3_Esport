import { pb } from '@/lib/pocketbase';
import { Tournament } from '@/app/api/types';

/**
 * Récupère la liste des tournois avec expansion du jeu
 */
export const fetchTournaments = async (page: number = 1, perPage: number = 50): Promise<Tournament[]> => {
  try {
    const records = await pb.collection('Tournaments').getList<Tournament>(page, perPage, {
      sort: '-start_date',
      expand: 'game_id',
    });
    return records.items;
  } catch (error) {
    console.error('Erreur lors du chargement des tournois:', error);
    throw error;
  }
};

/**
 * Récupère un tournoi par son ID avec expansion
 */
export const fetchTournamentById = async (id: string): Promise<Tournament> => {
  try {
    return await pb.collection('Tournaments').getOne<Tournament>(id, {
      expand: 'game_id',
    });
  } catch (error) {
    console.error(`Erreur lors du chargement du tournoi ${id}:`, error);
    throw error;
  }
};

/**
 * Récupère tous les tournois (sans pagination)
 */
export const fetchAllTournaments = async (): Promise<Tournament[]> => {
  try {
    return await pb.collection('Tournaments').getFullList<Tournament>({
      sort: '-start_date',
      expand: 'game_id',
    });
  } catch (error) {
    console.error('Erreur lors du chargement de tous les tournois:', error);
    throw error;
  }
};

/**
 * Récupère les tournois en cours
 */
export const fetchOngoingTournaments = async (): Promise<Tournament[]> => {
  try {
    const now = new Date().toISOString();
    return await pb.collection('Tournaments').getFullList<Tournament>({
      filter: `start_date <= "${now}" && end_date >= "${now}"`,
      sort: 'start_date',
      expand: 'game_id',
    });
  } catch (error) {
    console.error('Erreur lors du chargement des tournois en cours:', error);
    throw error;
  }
};

/**
 * Récupère les tournois à venir
 */
export const fetchUpcomingTournaments = async (): Promise<Tournament[]> => {
  try {
    const now = new Date().toISOString();
    return await pb.collection('Tournaments').getFullList<Tournament>({
      filter: `start_date > "${now}"`,
      sort: 'start_date',
      expand: 'game_id',
    });
  } catch (error) {
    console.error('Erreur lors du chargement des tournois à venir:', error);
    throw error;
  }
};
