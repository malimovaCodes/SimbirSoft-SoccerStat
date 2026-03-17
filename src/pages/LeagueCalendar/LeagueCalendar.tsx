import { useParams } from 'react-router-dom';
import { MatchesCalendar } from '../../components/MatchesCalendar/MatchesCalendar';

export function LeagueCalendar() {
  const { id } = useParams<{ id: string }>();

  return (
    <MatchesCalendar
      breadcrumbItems={[
        { title: 'Лиги', path: '/leagues' },
        { title: 'Календарь лиги' },
      ]}
      endpoint={`/competitions/${id}/matches`}
      highlightTeamId={undefined}
      errorMessages={{
        forbidden: 'Детальные матчи для этой лиги недоступны.',
        notFound: 'Лига не найдена.',
        backLink: 'Вернуться к списку лиг',
        backPath: '/leagues',
      }}
    />
  );
}