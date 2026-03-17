import { useParams } from 'react-router-dom';
import { MatchesCalendar } from '../../components/MatchesCalendar/MatchesCalendar';

export function TeamCalendar() {
  const { id } = useParams<{ id: string }>();

  return (
    <MatchesCalendar
      breadcrumbItems={[
        { title: 'Команды', path: '/teams' },
        { title: 'Календарь команды' },
      ]}
      endpoint={`/teams/${id}/matches`}
      highlightTeamId={Number(id)}
      errorMessages={{
        forbidden: 'Детальные матчи для этой команды недоступны.',
        notFound: 'Команда не найдена.',
        backLink: 'Вернуться к списку команд',
        backPath: '/teams',
      }}
    />
  );
}