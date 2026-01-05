import { pb } from '@/lib/pocketbase';
import { Match } from '@/app/api/types';

/**
 * Récupère la liste des matchs avec toutes les relations
 */
export const fetchMatches = async (page: number = 1, perPage: number = 50): Promise<Match[]> => {
  try {
    const records = await pb.collection('Matches').getList<Match>(page, perPage, {
      sort: '-match_date',
      expand: 'team1_id,team2_id,game_id,tournament_id',
    });
    return records.items;
  } catch (error) {
    console.error('Erreur lors du chargement des matchs:', error);
    throw error;
  }
};

/**
 * Récupère un match par son ID avec toutes les relations
 */
export const fetchMatchById = async (id: string): Promise<Match> => {
  try {
    return await pb.collection('Matches').getOne<Match>(id, {
      expand: 'team1_id,team2_id,game_id,tournament_id',
    });
  } catch (error) {
    console.error(`Erreur lors du chargement du match ${id}:`, error);
    throw error;
  }
};

/**
 * Récupère tous les matchs (sans pagination)
 */
export const fetchAllMatches = async (): Promise<Match[]> => {
  try {
    return await pb.collection('Matches').getFullList<Match>({
      sort: '-match_date',
      expand: 'team1_id,team2_id,game_id,tournament_id',
    });
  } catch (error) {
    console.error('Erreur lors du chargement de tous les matchs:', error);
    throw error;
  }
};

/**
 * Récupère les matchs par statut
 */
export const fetchMatchesByStatus = async (status: 'upcoming' | 'ongoing' | 'finished'): Promise<Match[]> => {
  try {
    return await pb.collection('Matches').getFullList<Match>({
      filter: `status = "${status}"`,
      sort: status === 'finished' ? '-match_date' : 'match_date',
      expand: 'team1_id,team2_id,game_id,tournament_id',
    });
  } catch (error) {
    console.error(`Erreur lors du chargement des matchs ${status}:`, error);
    throw error;
  }
};

/**
 * Récupère les matchs d'une équipe
 */
export const fetchMatchesByTeam = async (teamId: string): Promise<Match[]> => {
  try {
    return await pb.collection('Matches').getFullList<Match>({
      filter: `team1_id = "${teamId}" || team2_id = "${teamId}"`,
      sort: '-match_date',
      expand: 'team1_id,team2_id,game_id,tournament_id',
    });
  } catch (error) {
    console.error(`Erreur lors du chargement des matchs de l'équipe ${teamId}:`, error);
    throw error;
  }
};

/**
 * Récupère les matchs d'un tournoi
 */
export const fetchMatchesByTournament = async (tournamentId: string): Promise<Match[]> => {
  try {
    return await pb.collection('Matches').getFullList<Match>({
      filter: `tournament_id = "${tournamentId}"`,
      sort: 'match_date',
      expand: 'team1_id,team2_id,game_id',
    });
  } catch (error) {
    console.error(`Erreur lors du chargement des matchs du tournoi ${tournamentId}:`, error);
    throw error;
  }
};

/**
 * Récupère les matchs à venir (prochaines 24h)
 */
export const fetchUpcomingMatches = async (): Promise<Match[]> => {
  try {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await pb.collection('Matches').getFullList<Match>({
      filter: `status = "upcoming" && match_date >= "${now.toISOString()}" && match_date <= "${tomorrow.toISOString()}"`,
      sort: 'match_date',
      expand: 'team1_id,team2_id,game_id,tournament_id',
    });
  } catch (error) {
    console.error('Erreur lors du chargement des matchs à venir:', error);
    throw error;
  }
};

/**
 * Récupère les matchs en cours
 */
export const fetchLiveMatches = async (): Promise<Match[]> => {
  try {
    return await pb.collection('Matches').getFullList<Match>({
      filter: 'status = "ongoing"',
      sort: 'match_date',
      expand: 'team1_id,team2_id,game_id,tournament_id',
    });
  } catch (error) {
    console.error('Erreur lors du chargement des matchs en cours:', error);
    throw error;
  }
};

/**
 * Récupère les derniers matchs terminés
 */
export const fetchRecentFinishedMatches = async (limit: number = 10): Promise<Match[]> => {
  try {
    const result = await pb.collection('Matches').getList<Match>(1, limit, {
      filter: 'status = "finished"',
      sort: '-match_date',
      expand: 'team1_id,team2_id,game_id,tournament_id',
    });
    return result.items;
  } catch (error) {
    console.error('Erreur lors du chargement des derniers matchs:', error);
    throw error;
  }
};
