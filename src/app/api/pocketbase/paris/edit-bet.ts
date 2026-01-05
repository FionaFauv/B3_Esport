import { pb } from '@/lib/pocketbase';
import { Bet, BetUpdateData } from '@/app/api/types';

/**
 * Calcule le gain potentiel d'un pari
 */
const calculatePotentialWin = (amount: number, odds: number): number => {
  return parseFloat((amount * odds).toFixed(2));
};

/**
 * Met à jour un pari existant
 */
export const EditBet = {
  async update(id: string, data: BetUpdateData): Promise<Bet> {
    try {
      // Recalculer le gain potentiel si amount ou odds changent
      if (data.amount !== undefined && data.odds !== undefined) {
        data.potential_win = calculatePotentialWin(data.amount, data.odds);
      }

      const result = await pb.collection('Paris').update<Bet>(id, data);
      console.log(`Pari ${id} mis à jour avec succès:`, result);
      return result;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du pari ${id}:`, error);
      throw error;
    }
  },

  /**
   * Règle un pari comme gagnant
   */
  async settleBetAsWon(id: string): Promise<Bet> {
    try {
      return await this.update(id, { status: 'won' });
    } catch (error) {
      console.error(`Erreur lors du règlement du pari gagnant ${id}:`, error);
      throw error;
    }
  },

  /**
   * Règle un pari comme perdant
   */
  async settleBetAsLost(id: string): Promise<Bet> {
    try {
      return await this.update(id, { status: 'lost' });
    } catch (error) {
      console.error(`Erreur lors du règlement du pari perdant ${id}:`, error);
      throw error;
    }
  },

  /**
   * Annule un pari
   */
  async cancelBet(id: string): Promise<Bet> {
    try {
      return await this.update(id, { status: 'cancelled' });
    } catch (error) {
      console.error(`Erreur lors de l'annulation du pari ${id}:`, error);
      throw error;
    }
  },
};
