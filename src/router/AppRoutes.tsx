import { Routes, Route } from 'react-router-dom';
import { LeaguesPage } from '../pages/LeaguesPage/LeaguesPage';
import { LeagueCalendar } from '../pages/LeagueCalendar/LeagueCalendar';
import { TeamsPage } from '../pages/TeamsPage/TeamsPage';
import { TeamCalendar } from '../pages/TeamCalendar/TeamCalendar';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LeaguesPage />} />
      <Route path="/leagues" element={<LeaguesPage />} />
      <Route path="/leagues/:id" element={<LeagueCalendar />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/teams/:id" element={<TeamCalendar />} />
    </Routes>
  );
}