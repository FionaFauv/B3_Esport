/**
 * Types TypeScript pour la collection Teams
 */

export interface Team {
  id: string;
  name: string;
  tag: string;
  country: string;
  founded_year: number;
  logo_url: string;
  created: string;
  updated: string;
}

export interface TeamCreateData {
  name: string;
  tag: string;
  country: string;
  founded_year: number;
  logo_url?: File;
}

export interface TeamUpdateData {
  name?: string;
  tag?: string;
  country?: string;
  founded_year?: number;
  logo_url?: File | null;
}

export interface TeamListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
}
