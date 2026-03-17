import { Link } from 'react-router-dom';
import './Home.css';

export function Home() {
  return (
    <main className="home-page">
      <h1>Добро пожаловать в Soccer Stat</h1>
      <p>Выберите раздел:</p>

      <div className="home-actions">
        <Link to="/leagues" className="home-link">Лиги</Link>
        <Link to="/teams" className="home-link">Команды</Link>
      </div>
    </main>
  );
}