import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LeaguesPage } from './pages/LeaguesPage/LeaguesPage';
import { LeagueCalendar } from './pages/LeagueCalendar/LeagueCalendar';
import { TeamsPage } from './pages/TeamsPage/TeamsPage';
import { TeamCalendar } from './pages/TeamCalendar/TeamCalendar';
import { Header } from './components/Header/Header';
import './App.css';
import { Home } from './pages/Home/Home';


function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leagues" element={<LeaguesPage />} />
        <Route path="/leagues/:id" element={<LeagueCalendar />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/teams/:id" element={<TeamCalendar />} />
      </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;