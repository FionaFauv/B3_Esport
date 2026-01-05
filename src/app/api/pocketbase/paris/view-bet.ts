import { pb } from '@/lib/pocketbase';
import { Bet } from '@/app/api/types';

/**
 * Récupère la liste des paris avec toutes les relations
 */
export const fetchBets = async (page: number = 1, perPage: number = 50): Promise<Bet[]> => {
  try {
    const records = await pb.collection('Paris').getList<Bet>(page, perPage, {
      sort: '-created',
      expand: 'user_id,match_id,team_bet_id',
    });
    return records.items;
  } catch (error) {
    console.error('Erreur lors du chargement des paris:', error);
    throw error;
  }
};

/**
 * Récupère un pari par son ID avec toutes les relations
 */
export const fetchBetById = async (id: string): Promise<Bet> => {
  try {
    return await pb.collection('Paris').getOne<Bet>(id, {
      expand: 'user_id,match_id,team_bet_id',
    });
  } catch (error) {
    console.error(`Erreur lors du chargement du pari ${id}:`, error);
    throw error;
  }
};

/**
 * Récupère tous les paris (sans pagination)
 */
export const fetchAllBets = async (): Promise<Bet[]> => {
  try {
    return await pb.collection('Paris').getFullList<Bet>({
      sort: '-created',
      expand: 'user_id,match_id,team_bet_id',
    });
  } catch (error) {
    console.error('Erreur lors du chargement de tous les paris:', error);
    throw error;
  }
};

/**
 * Récupère les paris d'un utilisateur
 */
export const fetchBetsByUser = async (userId: string, page: number = 1, perPage: number = 50): Promise<Bet[]> => {
  try {
    const result = await pb.collection('Paris').getList<Bet>(page, perPage, {
      filter: `user_id = "${userId}"`,
      sort: '-created',
      expand: 'match_id,team_bet_id',
    });
    return result.items;
  } catch (error) {
    console.error(`Erreur lors du chargement des paris de l'utilisateur ${userId}:`, error);
    throw error;
  }
};

/**
 * Récupère les paris d'un match
 */
export const fetchBetsByMatch = async (matchId: string): Promise<Bet[]> => {
  try {
    return await pb.collection('Paris').getFullList<Bet>({
      filter: `match_id = "${matchId}"`,
      sort: '-created',
      expand: 'user_id,team_bet_id',
    });
  } catch (error) {
    console.error(`Erreur lors du chargement des paris du match ${matchId}:`, error);
    throw error;
  }
};

/**
 * Récupère les paris par statut
 */
export const fetchBetsByStatus = async (status: 'pending' | 'won' | 'lost' | 'cancelled'): Promise<Bet[]> => {
  try {
    return await pb.collection('Paris').getFullList<Bet>({
      filter: `status = "${status}"`,
      sort: '-created',
      expand: 'user_id,match_id,team_bet_id',
    });
  } catch (error) {
    console.error(`Erreur lors du chargement des paris ${status}:`, error);
    throw error;
  }
};

/**
 * Récupère les paris en attente d'un utilisateur
 */
export const fetchPendingBetsByUser = async (userId: string): Promise<Bet[]> => {
  try {
    return await pb.collection('Paris').getFullList<Bet>({
      filter: `user_id = "${userId}" && status = "pending"`,
      sort: '-created',
      expand: 'match_id,team_bet_id',
    });
  } catch (error) {
    console.error(`Erreur lors du chargement des paris en attente de l'utilisateur ${userId}:`, error);
    throw error;
  }
};

/**
 * Récupère les paris gagnants d'un utilisateur
 */
export const fetchWonBetsByUser = async (userId: string): Promise<Bet[]> => {
  try {
    return await pb.collection('Paris').getFullList<Bet>({
      filter: `user_id = "${userId}" && status = "won"`,
      sort: '-created',
      expand: 'match_id,team_bet_id',
    });
  } catch (error) {
    console.error(`Erreur lors du chargement des paris gagnants de l'utilisateur ${userId}:`, error);
    throw error;
  }
};

/**
 * Récupère les paris perdants d'un utilisateur
 */
export const fetchLostBetsByUser = async (userId: string): Promise<Bet[]> => {
  try {
    return await pb.collection('Paris').getFullList<Bet>({
      filter: `user_id = "${userId}" && status = "lost"`,
      sort: '-created',
      expand: 'match_id,team_bet_id',
    });
  } catch (error) {
    console.error(`Erreur lors du chargement des paris perdants de l'utilisateur ${userId}:`, error);
    throw error;
  }
};

/**
 * Calcule le total misé par un utilisateur
 */
export const calculateTotalBetAmount = async (userId: string): Promise<number> => {
  try {
    const bets = await pb.collection('Paris').getFullList<Bet>({
      filter: `user_id = "${userId}" && (status = "pending" || status = "won" || status = "lost")`,
    });
    
    return bets.reduce((total, bet) => total + bet.amount, 0);
  } catch (error) {
    console.error(`Erreur lors du calcul du total misé pour l'utilisateur ${userId}:`, error);
    throw error;
  }
};

/**
 * Calcule le total des gains d'un utilisateur
 */
export const calculateTotalWinnings = async (userId: string): Promise<number> => {
  try {
    const bets = await pb.collection('Paris').getFullList<Bet>({
      filter: `user_id = "${userId}" && status = "won"`,
    });
    
    return bets.reduce((total, bet) => total + bet.potential_win, 0);
  } catch (error) {
    console.error(`Erreur lors du calcul des gains totaux pour l'utilisateur ${userId}:`, error);
    throw error;
  }
};

/**
 * Calcule le profit net d'un utilisateur (gains - mises)
 */
export const calculateNetProfit = async (userId: string): Promise<number> => {
  try {
    const totalBet = await calculateTotalBetAmount(userId);
    const totalWinnings = await calculateTotalWinnings(userId);
    
    return parseFloat((totalWinnings - totalBet).toFixed(2));
  } catch (error) {
    console.error(`Erreur lors du calcul du profit net pour l'utilisateur ${userId}:`, error);
    throw error;
  }
};
