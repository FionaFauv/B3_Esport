/**
 * Types TypeScript pour la collection Matches
 */

export interface Match {
  id: string;
  tournament_id: string;
  team1_id: string;
  team2_id: string;
  game_id: string;
  match_date: string;
  status: 'upcoming' | 'ongoing' | 'finished';
  team1_score: number;
  team2_score: number;
  winner_id: string;
  created: string;
  updated: string;
  expand?: {
    team1_id?: {
      id: string;
      name: string;
      tag: string;
      logo_url: string;
    };
    team2_id?: {
      id: string;
      name: string;
      tag: string;
      logo_url: string;
    };
    game_id?: {
      id: string;
      name: string;
      category: string;
    };
    tournament_id?: {
      id: string;
      name: string;
      location: string;
    };
  };
}

export interface MatchCreateData {
  tournament_id: string;
  team1_id: string;
  team2_id: string;
  game_id: string;
  match_date: string;
  status?: 'upcoming' | 'ongoing' | 'finished';
  team1_score?: number;
  team2_score?: number;
  winner_id?: string;
}

export interface MatchUpdateData {
  tournament_id?: string;
  team1_id?: string;
  team2_id?: string;
  game_id?: string;
  match_date?: string;
  status?: 'upcoming' | 'ongoing' | 'finished';
  team1_score?: number;
  team2_score?: number;
  winner_id?: string;
}

export interface MatchListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
  expand?: string;
}
