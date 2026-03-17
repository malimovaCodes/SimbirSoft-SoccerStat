import { useState } from 'react';
import dayjs from 'dayjs';
import type { Match, MatchesResponse } from '../models/types';
import { useApi } from './useApi';

interface UseMatchesCalendarOptions {
  endpoint: string; 
  dependencies?: unknown[]; 
}

export function useMatchesCalendar({ endpoint, dependencies = [] }: UseMatchesCalendarOptions) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dates, setDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);

  const dateFrom = dates?.[0]?.format('YYYY-MM-DD') || '';
  const dateTo = dates?.[1]?.format('YYYY-MM-DD') || '';

  let fullEndpoint = endpoint;
  if (dateFrom && dateTo) {
    fullEndpoint += `?dateFrom=${dateFrom}&dateTo=${dateTo}`;
  }

  const { data, loading, error } = useApi<MatchesResponse>(fullEndpoint, [dateFrom, dateTo, ...dependencies]);

  const handleDateChange = (newDates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    setDates(newDates);
    setCurrentPage(1);
  };

  const formatDateTime = (utcDate: string) => {
    const date = new Date(utcDate);
    return {
      date: date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      time: date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const formatScore = (match: Match): string => {
    const parts: string[] = [];
    if (match.score.fullTime?.home != null && match.score.fullTime?.away != null) {
      parts.push(`${match.score.fullTime.home}:${match.score.fullTime.away}`);
    }
    if (match.score.extraTime?.home != null && match.score.extraTime?.away != null) {
      parts.push(`(${match.score.extraTime.home}:${match.score.extraTime.away})`);
    }
    if (match.score.penalties?.home != null && match.score.penalties?.away != null) {
      parts.push(`[${match.score.penalties.home}:${match.score.penalties.away}]`);
    }
    return parts.join(' ') || '-';
  };

  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'FINISHED': return 'status-finished';
      case 'LIVE': case 'IN_PLAY': return 'status-live';
      case 'POSTPONED': case 'CANCELED': return 'status-canceled';
      default: return 'status-scheduled';
    }
  };

  return {
    currentPage,
    setCurrentPage,
    dates,
    setDates,
    
    data,
    loading,
    error,
    
    handleDateChange,
    
    formatDateTime,
    formatScore,
    getStatusClass,
  };
}