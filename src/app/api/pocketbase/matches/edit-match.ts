import { pb } from '@/lib/pocketbase';
import { Match, MatchUpdateData } from '@/app/api/types';

/**
 * Met à jour un match existant
 */
export const EditMatch = {
  async update(id: string, data: MatchUpdateData): Promise<Match> {
    try {
      const result = await pb.collection('Matches').update<Match>(id, data);
      console.log(`Match ${id} mis à jour avec succès:`, result);
      return result;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du match ${id}:`, error);
      throw error;
    }
  },

  /**
   * Met à jour le score d'un match
   */
  async updateScore(id: string, team1Score: number, team2Score: number, winnerId?: string): Promise<Match> {
    try {
      const updateData: MatchUpdateData = {
        team1_score: team1Score,
        team2_score: team2Score,
      };

      if (winnerId) {
        updateData.winner_id = winnerId;
        updateData.status = 'finished';
      }

      return await this.update(id, updateData);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du score du match ${id}:`, error);
      throw error;
    }
  },

  /**
   * Démarre un match (change le statut en "ongoing")
   */
  async startMatch(id: string): Promise<Match> {
    try {
      return await this.update(id, { status: 'ongoing' });
    } catch (error) {
      console.error(`Erreur lors du démarrage du match ${id}:`, error);
      throw error;
    }
  },

  /**
   * Termine un match
   */
  async finishMatch(id: string, winnerId: string): Promise<Match> {
    try {
      return await this.update(id, { 
        status: 'finished',
        winner_id: winnerId,
      });
    } catch (error) {
      console.error(`Erreur lors de la finalisation du match ${id}:`, error);
      throw error;
    }
  },
};
