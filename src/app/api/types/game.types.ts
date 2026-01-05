/**
 * Types TypeScript pour la collection Games
 */

export interface Game {
  id: string;
  name: string;
  category: string;
  created: string;
  updated: string;
}

export interface GameCreateData {
  name: string;
  category: string;
}

export interface GameUpdateData {
  name?: string;
  category?: string;
}

export interface GameListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
}
