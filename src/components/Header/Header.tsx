import { NavLink } from 'react-router-dom';
import './Header.css';
import fifaLogo from '../../assets/images/fifa_logo.png';

export function Header() {
    return (
        <header className="main-header">
            <div className="header-container">
                <div className="header-logo">
                    <NavLink to="/" aria-label="На главную" className="header-logo-link">
                        <img
                            src={fifaLogo}
                            alt="FIFA"
                            width={120}
                            height={40}
                            className="header-logo-img"
                        />
                    </NavLink>
                </div>

                <nav className="header-nav">
                    <NavLink
                        to="/leagues"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        Лиги
                    </NavLink>
                    <NavLink
                        to="/teams"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        Команды
                    </NavLink>
                </nav>

            </div>
        </header>
    );
}