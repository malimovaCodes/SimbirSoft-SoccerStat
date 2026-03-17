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