import { pb } from '@/lib/pocketbase';
import { Team } from '@/app/api/types';

interface TeamListResult {
  items: Team[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

/**
 * Récupère la liste des équipes avec pagination
 */
export const fetchTeams = async (page: number = 1, perPage: number = 8): Promise<TeamListResult> => {
  try {
    const records = await pb.collection('Teams').getList<Team>(page, perPage, {
      sort: '-created',
    });
    return {
      items: records.items,
      page: records.page,
      perPage: records.perPage,
      totalItems: records.totalItems,
      totalPages: records.totalPages,
    };
  } catch (error) {
    console.error('Erreur lors du chargement des équipes:', error);
    throw error;
  }
};

/**
 * Recherche des équipes par nom ou tag
 */
export const searchTeams = async (query: string, page: number = 1, perPage: number = 8): Promise<TeamListResult> => {
  try {
    const filter = `name ~ "${query}" || tag ~ "${query}" || country ~ "${query}"`;
    const records = await pb.collection('Teams').getList<Team>(page, perPage, {
      filter,
      sort: '-created',
    });
    return {
      items: records.items,
      page: records.page,
      perPage: records.perPage,
      totalItems: records.totalItems,
      totalPages: records.totalPages,
    };
  } catch (error) {
    console.error('Erreur lors de la recherche des équipes:', error);
    throw error;
  }
};

/**
 * Récupère une équipe par son ID
 */
export const fetchTeamById = async (id: string): Promise<Team> => {
  try {
    return await pb.collection('Teams').getOne<Team>(id);
  } catch (error) {
    console.error(`Erreur lors du chargement de l'équipe ${id}:`, error);
    throw error;
  }
};

/**
 * Récupère toutes les équipes (sans pagination)
 */
export const fetchAllTeams = async (): Promise<Team[]> => {
  try {
    return await pb.collection('Teams').getFullList<Team>({
      sort: 'name',
    });
  } catch (error) {
    console.error('Erreur lors du chargement de toutes les équipes:', error);
    throw error;
  }
};