import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { DatePicker, Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TeamMatchesResponse, Match } from '../../models/interfaces';
import './TeamCalendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { STATUS_TRANSLATIONS } from '../../constants/constants';

dayjs.locale('ru');

const ITEMS_PER_PAGE = 16;

const { RangePicker } = DatePicker;

export function TeamCalendar() {
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [dates, setDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);

  const dateFrom = dates?.[0]?.format('YYYY-MM-DD') || '';
  const dateTo = dates?.[1]?.format('YYYY-MM-DD') || '';

  let endpoint = `/teams/${id}/matches`;
  if (dateFrom && dateTo) {
    endpoint += `?dateFrom=${dateFrom}&dateTo=${dateTo}`;
  }

  const { data, loading, error } = useApi<TeamMatchesResponse>(endpoint, [dateFrom, dateTo]);

  if (loading) return <div className="loader">Загрузка календаря...</div>;
  if (error) {
    if (error.includes('403')) {
      return (
        <div className="error">
          Детальные матчи для этой команды недоступны.
          <br />
          <Link to="/teams">← Вернуться к списку команд</Link>
        </div>
      );
    }
    return <div className="error">{error}</div>;
  }
  if (!data || !data.matches) return <div>Загрузка...</div>;

  /* const totalPages = Math.ceil(data.count / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE; */
  /* const endIndex = startIndex + ITEMS_PER_PAGE; */
  /* const currentMatches = data.matches.slice(startIndex, endIndex); */

  /* const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }; */

  const formatDateTime = (utcDate: string) => {
    const date = new Date(utcDate);
    return {
      date: date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      time: date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    };
  };


  type ScorePart = {
    home?: number | null;
    away?: number | null;
    homeTeam?: number | null;
    awayTeam?: number | null;
  };

  const getScorePair = (part?: ScorePart | null): string | null => {
    const home = part?.home ?? part?.homeTeam;
    const away = part?.away ?? part?.awayTeam;

    if (home != null && away != null) {
      return `${home}:${away}`;
    }

    return null;
  };

  const formatScore = (match: Match): string => {
    const fullTime = getScorePair(match.score.fullTime);
    const extraTime = getScorePair(match.score.extraTime);
    const penalties = getScorePair(match.score.penalties);

    const parts = [
      fullTime,
      extraTime ? `(${extraTime})` : null,
      penalties ? `[${penalties}]` : null,
    ].filter(Boolean);

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

  const isHomeTeam = (match: Match): boolean => {
    return match.homeTeam?.id === Number(id);
  };

  const handleDateChange = (
    newDates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    setDates(newDates);
    setCurrentPage(1); 
  };

  if (loading) return <div className="loader">Загрузка календаря...</div>;
  if (error) {
    if (error.includes('403')) {
      return (
        <div className="error">
          Детальные матчи для этой команды недоступны.
          <br />
          <Link to="/teams">← Вернуться к списку команд</Link>
        </div>
      );
    }
    return <div className="error">{error}</div>;
  }
  if (!data || !data.matches) return <div>Загрузка...</div>;

  const columns: ColumnsType<Match> = [
    {
      title: 'ДД.ММ.ГГГГ',
      dataIndex: 'utcDate',
      key: 'date',
      className: 'col-date',
      render: (utcDate: string) => formatDateTime(utcDate).date,
      width: 120,
    },
    {
      title: 'ЧЧ:ММ',
      dataIndex: 'utcDate',
      key: 'time',
      className: 'col-time',
      render: (utcDate: string) => formatDateTime(utcDate).time,
      width: 80,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      className: 'col-status',
      render: (status: string) => (
        <span className={getStatusClass(status)}>
          {STATUS_TRANSLATIONS[status] || status}
        </span>
      ),
      width: 140,
    },
    {
      title: 'Команда А - Команда Б',
      key: 'teams',
      className: 'col-teams',
      render: (_: unknown, match: Match) => (
        <>
          <span className={isHomeTeam(match) ? 'home-team' : ''}>
            {match.homeTeam?.name}
          </span>
          {' - '}
          <span className={!isHomeTeam(match) ? 'away-team' : ''}>
            {match.awayTeam?.name}
          </span>
        </>
      ),
      minWidth: 300,
    },
    {
      title: 'XY (Z;G)[N;M]',
      key: 'score',
      className: 'col-score',
      render: (_: unknown, match: Match) => formatScore(match),
      width: 150,
      align: 'right',
    },
  ];

  return (
    <div className="team-calendar-page">
      <nav className="breadcrumbs">
        <Link to="/teams">Команды</Link>
        <span className="separator">›</span>
        <span className="current">{data?.team?.name || 'Календарь'}</span>
      </nav>

      <div className="date-filter">
        <RangePicker
          value={dates}
          onChange={handleDateChange}
          format="DD.MM.YYYY"
          placeholder={['Дата с', 'Дата по']}
          className="date-range-picker"
        />

        {dates && (
          <Button
            onClick={() => {
              setDates(null);
              setCurrentPage(1);
            }}
            className="date-filter-reset"
          >
            Сбросить
          </Button>
        )}
      </div>

      <div className="matches-table-container">
        <Table
          columns={columns}
          dataSource={data.matches}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: ITEMS_PER_PAGE,
            current: currentPage,
            total: data.count,
            onChange: (page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            },
            showSizeChanger: false,
            showTotal: (total) =>
              `Страница ${currentPage} из ${Math.ceil(total / ITEMS_PER_PAGE)} (всего: ${total})`,
          }}
          className="matches-table"
        />
      </div>
    </div>
  );
}