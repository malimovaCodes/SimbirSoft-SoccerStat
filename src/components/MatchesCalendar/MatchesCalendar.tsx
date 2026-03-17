import { Link } from 'react-router-dom';
import { DatePicker, Button, Table, Breadcrumb, Divider, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Match } from '../../models/interfaces';
import { useMatchesCalendar } from '../../hooks/useMatchesCalendar';
import { ITEMS_PER_PAGE_CALENDAR, STATUS_TRANSLATIONS } from '../../constants/constants';
import './MatchesCalendar.css';

const { RangePicker } = DatePicker;

interface MatchesCalendarProps {
  breadcrumbItems: { title: React.ReactNode; path?: string }[];
  
  endpoint: string;
  
  highlightTeamId?: number;
  
  errorMessages: {
    forbidden: string;
    notFound: string;
    backLink: string;
    backPath: string;
  };
}

export function MatchesCalendar({
  breadcrumbItems,
  endpoint,
  highlightTeamId,
  errorMessages,
}: MatchesCalendarProps) {
  const {
    currentPage,
    setCurrentPage,
    dates,
    handleDateChange,
    data,
    loading,
    error,
    formatDateTime,
    formatScore,
    getStatusClass,
  } = useMatchesCalendar({ endpoint });

  if (error?.includes('403')) {
    return (
      <div className="calendar-error">
        <p>{errorMessages.forbidden}</p>
        <Link to={errorMessages.backPath}>← {errorMessages.backLink}</Link>
      </div>
    );
  }

  if (error) return <div className="calendar-error">❌ {error}</div>;
  if (loading) return <div className="loader">Загрузка календаря...</div>;
  if (!data?.matches) return <div>Загрузка...</div>;

  const columns: ColumnsType<Match> = [
    {
      title: 'Дата',
      dataIndex: 'utcDate',
      key: 'date',
      width: 120,
      render: (utcDate: string) => formatDateTime(utcDate).date,
    },
    {
      title: 'Время',
      dataIndex: 'utcDate',
      key: 'time',
      width: 80,
      render: (utcDate: string) => formatDateTime(utcDate).time,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status: string) => (
        <span className={getStatusClass(status)}>
          {STATUS_TRANSLATIONS[status] || status}
        </span>
      ),
    },
    {
      title: 'Команды',
      key: 'teams',
      render: (_: unknown, match: Match) => (
        <>
          <span className={highlightTeamId && match.homeTeam?.id === highlightTeamId ? 'highlight-team' : ''}>
            {match.homeTeam?.name}
          </span>
          {' - '}
          <span className={highlightTeamId && match.awayTeam?.id === highlightTeamId ? 'highlight-team' : ''}>
            {match.awayTeam?.name}
          </span>
        </>
      ),
    },
    {
      title: 'Счёт',
      key: 'score',
      width: 150,
      align: 'right',
      render: (_: unknown, match: Match) => formatScore(match),
    },
  ];

  return (
    <div className="matches-calendar-page">
      <Breadcrumb separator="›" items={breadcrumbItems} className="calendar-breadcrumb" />
      
      <Divider />

      <Space wrap className="date-filter">
        <RangePicker
          value={dates}
          onChange={handleDateChange}
          format="DD.MM.YYYY"
          placeholder={['Дата с', 'Дата по']}
        />
        
        {dates && (
          <Button 
            onClick={() => {
              handleDateChange(null);
              setCurrentPage(1);
            }}
            danger
          >
            Сбросить
          </Button>
        )}
      </Space>

      <Divider />

      <div className="matches-table-container">
        <Table
          columns={columns}
          dataSource={data.matches}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: ITEMS_PER_PAGE_CALENDAR,
            current: currentPage,
            total: data.count,
            onChange: (page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            },
            showSizeChanger: false,
            showTotal: (total) =>
              `Страница ${currentPage} из ${Math.ceil(total / ITEMS_PER_PAGE_CALENDAR)} (всего: ${total})`,
          }}
          size="middle"
        />
      </div>
    </div>
  );
}