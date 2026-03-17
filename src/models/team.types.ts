import type { Match } from './match.types';

export interface Team {
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
  address: string
  website: string
  founded: number
  clubColors?: string
  venue?: string
  lastUpdated: string
}

export interface TeamsResponse {
  count: number;
  teams: Team[];
}

export interface TeamMatchesResponse {
  count: number;
  filters?: {
    dateFrom?: string;
    dateTo?: string;
  };
  team?: {
    id: number;
    name: string;
    crest?: string;
  };
  matches: Match[];
}