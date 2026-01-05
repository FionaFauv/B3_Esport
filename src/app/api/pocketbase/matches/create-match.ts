import { pb } from '@/lib/pocketbase';
import { Match, MatchCreateData } from '@/app/api/types';

/**
 * Crée un nouveau match
 */
export const CreateMatch = {
  async create(data: MatchCreateData): Promise<Match> {
    try {
      const matchData = {
        tournament_id: data.tournament_id,
        team1_id: data.team1_id,
        team2_id: data.team2_id,
        game_id: data.game_id,
        match_date: data.match_date,
        status: data.status || 'upcoming',
        team1_score: data.team1_score || 0,
        team2_score: data.team2_score || 0,
        winner_id: data.winner_id || '',
      };

      const result = await pb.collection('Matches').create<Match>(matchData);
      console.log('Match créé avec succès:', result);
      return result;
    } catch (error) {
      console.error('Erreur lors de la création du match:', error);
      throw error;
    }
  }
};
