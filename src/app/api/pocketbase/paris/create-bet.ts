import { pb } from '@/lib/pocketbase';
import { Bet, BetCreateData } from '@/app/api/types';

/**
 * Calcule le gain potentiel d'un pari
 */
const calculatePotentialWin = (amount: number, odds: number): number => {
  return parseFloat((amount * odds).toFixed(2));
};

/**
 * Crée un nouveau pari
 */
export const CreateBet = {
  async create(data: BetCreateData): Promise<Bet> {
    try {
      // Calculer le gain potentiel
      const potentialWin = calculatePotentialWin(data.amount, data.odds);

      const betData = {
        user_id: data.user_id,
        match_id: data.match_id,
        team_bet_id: data.team_bet_id,
        amount: data.amount,
        odds: data.odds,
        potential_win: potentialWin,
        status: data.status || 'pending',
      };

      const result = await pb.collection('Paris').create<Bet>(betData);
      console.log('Pari créé avec succès:', result);
      return result;
    } catch (error) {
      console.error('Erreur lors de la création du pari:', error);
      throw error;
    }
  }
};
