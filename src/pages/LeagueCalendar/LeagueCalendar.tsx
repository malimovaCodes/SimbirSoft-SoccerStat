import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import type { MatchesResponse, Match } from '../../models/interfaces';
import './LeagueCalendar.css';
import { STATUS_TRANSLATIONS } from '../../constants/constants';

const ITEMS_PER_PAGE = 16;

export function LeagueCalendar() {
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  let endpoint = `/competitions/${id}/matches`;
  if (dateFrom && dateTo) {
    endpoint += `?dateFrom=${dateFrom}&dateTo=${dateTo}`;
  }

  const { data, loading, error } = useApi<MatchesResponse>(endpoint, [dateFrom, dateTo]);

  if (loading) return <div className="loader">Загрузка календаря...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!data || !data.matches) return <div>Загрузка...</div>;

  const totalPages = Math.ceil(data.count / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMatches = data.matches.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatDateTime = (utcDate: string) => {
    const date = new Date(utcDate);
    const formattedDate = date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return { date: formattedDate, time: formattedTime };
  };

  const formatScore = (match: Match): string => {
    const parts: string[] = [];
    
    const fullTimeHome = match.score.fullTime?.home;
    const fullTimeAway = match.score.fullTime?.away;
    if (fullTimeHome != null && fullTimeAway != null) {
      parts.push(`${fullTimeHome}:${fullTimeAway}`);
    }

    const extraTimeHome = match.score.extraTime?.home;
    const extraTimeAway = match.score.extraTime?.away;
    if (extraTimeHome != null && extraTimeAway != null) {
      parts.push(`(${extraTimeHome}:${extraTimeAway})`);
    }

    const penaltiesHome = match.score.penalties?.home;
    const penaltiesAway = match.score.penalties?.away;
    if (penaltiesHome != null && penaltiesAway != null) {
      parts.push(`[${penaltiesHome}:${penaltiesAway}]`);
    }

    return parts.join(' ') || '-';
  };

  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'FINISHED':
        return 'status-finished';
      case 'LIVE':
      case 'IN_PLAY':
        return 'status-live';
      case 'POSTPONED':
      case 'CANCELED':
        return 'status-canceled';
      default:
        return 'status-scheduled';
    }
  };

  return (
    <div className="league-calendar-page">
      <nav className="breadcrumbs">
        <Link to="/leagues">Лиги</Link>
        <span className="separator">›</span>
        <span className="current">{data.competition?.name || 'Календарь'}</span>
      </nav>

      <div className="date-filter">
        <label className="date-filter-label">
          Матчи с
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setCurrentPage(1);
            }}
            className="date-input"
          />
        </label>
        <span className="date-filter-separator">по</span>
        <label className="date-filter-label">
          <input
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setCurrentPage(1);
            }}
            className="date-input"
          />
        </label>
        {(dateFrom || dateTo) && (
          <button
            className="date-filter-reset"
            onClick={() => {
              setDateFrom('');
              setDateTo('');
              setCurrentPage(1);
            }}
          >
            Сбросить
          </button>
        )}
      </div>

      <div className="matches-table-container">
        <table className="matches-table">
          <thead>
            <tr>
              <th className="col-date">ДД.ММ.ГГГГ</th>
              <th className="col-time">ЧЧ:ММ</th>
              <th className="col-status">Статус</th>
              <th className="col-teams">Команда A - Команда B</th>
              <th className="col-score">XY (Z;G)[N;M]</th>
            </tr>
          </thead>
          <tbody>
            {currentMatches.map((match) => {
              const { date, time } = formatDateTime(match.utcDate);
              const statusText = STATUS_TRANSLATIONS[match.status] || match.status;
              
              return (
                <tr key={match.id} className="match-row">
                  <td className="col-date">{date}</td>
                  <td className="col-time">{time}</td>
                  <td className={`col-status ${getStatusClass(match.status)}`}>
                    {statusText}
                  </td>
                  <td className="col-teams">
                    {match.homeTeam?.name} - {match.awayTeam?.name}
                  </td>
                  <td className="col-score">{formatScore(match)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ←
          </button>
          
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return (
                  page <= 3 ||
                  page > totalPages - 3 ||
                  Math.abs(page - currentPage) <= 1
                );
              })
              .reduce((acc: (number | string)[], page, i, arr) => {
                if (i > 0 && page - arr[i - 1] > 1) {
                  acc.push('...');
                }
                acc.push(page);
                return acc;
              }, [])
              .map((page, index) => (
                <button
                  key={index}
                  className={`pagination-number ${page === currentPage ? 'active' : ''} ${
                    page === '...' ? 'dots' : ''
                  }`}
                  onClick={() => typeof page === 'number' && goToPage(page)}
                  disabled={page === '...'}
                >
                  {page}
                </button>
              ))}
          </div>

          <button
            className="pagination-button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>
      )}

      <div className="pagination-info">
        Страница {currentPage} из {totalPages} (всего: {data.count})
      </div>
    </div>
  );
}