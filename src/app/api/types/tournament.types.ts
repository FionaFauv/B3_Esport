/**
 * Types TypeScript pour la collection Tournaments
 */

export interface Tournament {
  id: string;
  name: string;
  game_id: string;
  prize_pool: number;
  start_date: string;
  end_date: string;
  location: string;
  created: string;
  updated: string;
  expand?: {
    game_id?: {
      id: string;
      name: string;
      category: string;
    };
  };
}

export interface TournamentCreateData {
  name: string;
  game_id: string;
  prize_pool: number;
  start_date: string;
  end_date: string;
  location: string;
}

export interface TournamentUpdateData {
  name?: string;
  game_id?: string;
  prize_pool?: number;
  start_date?: string;
  end_date?: string;
  location?: string;
}

export interface TournamentListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
  expand?: string;
}
