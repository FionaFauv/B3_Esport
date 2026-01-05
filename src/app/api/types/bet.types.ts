/**
 * Types TypeScript pour la collection Paris (Bets)
 */

export interface Bet {
  id: string;
  user_id: string;
  match_id: string;
  team_bet_id: string;
  amount: number;
  odds: number;
  potential_win: number;
  status: 'pending' | 'won' | 'lost' | 'cancelled';
  created: string;
  updated: string;
  expand?: {
    user_id?: {
      id: string;
      username: string;
      email: string;
    };
    match_id?: {
      id: string;
      match_date: string;
      status: string;
    };
    team_bet_id?: {
      id: string;
      name: string;
      tag: string;
    };
  };
}

export interface BetCreateData {
  user_id: string;
  match_id: string;
  team_bet_id: string;
  amount: number;
  odds: number;
  status?: 'pending' | 'won' | 'lost' | 'cancelled';
}

export interface BetUpdateData {
  user_id?: string;
  match_id?: string;
  team_bet_id?: string;
  amount?: number;
  odds?: number;
  potential_win?: number;
  status?: 'pending' | 'won' | 'lost' | 'cancelled';
}

export interface BetListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
  expand?: string;
}
