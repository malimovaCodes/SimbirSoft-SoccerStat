export interface Competition {
  id: number
  area: Area
  name: string
  code?: string
  type: string
  emblem?: string
  plan?: string
  currentSeason?: CurrentSeason
  numberOfAvailableSeasons: number
  lastUpdated: string
}

export interface Area {
  id: number
  name: string
  code: string
  flag?: string
}

export interface CurrentSeason {
  id: number
  startDate: string
  endDate: string
  currentMatchday?: number
  winner?: Winner
}

export interface Winner {
  id: number
  name: string
  shortName?: string
  tla?: string
  crest?: string
  address: string
  website?: string
  founded?: number
  clubColors?: string
  venue?: string
  lastUpdated: string
}

export interface CompetitionsResponse {
  count: number;
  competitions: Competition[];
}

export interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface Match {
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
  stage: string;
  homeTeam: {
    id: number;
    name: string;
    crest?: string;
  };
  awayTeam: {
    id: number;
    name: string;
    crest?: string;
  };
  score: {
    winner?: string;
    duration: string;
    fullTime: {
      home?: number;
      away?: number;
    };
    extraTime?: {
      home?: number;
      away?: number;
    };
    penalties?: {
      home?: number;
      away?: number;
    };
  };
  competition?: {
    id: number;
    name: string;
  };
}

export interface MatchesResponse {
  count: number;
  filters: {
    dateFrom?: string;
    dateTo?: string;
  };
  competition?: {
    id: number;
    name: string;
    code?: string;
    type?: string;
    emblem?: string;
  };
  matches: Match[];
}

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

interface CardProps {
  id: number;
  name: string;
  imageUrl?: string | null;
  subtitle?: string;
  linkTo: string;
  placeholderIcon: string;
}