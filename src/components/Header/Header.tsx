import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import fifaLogo from '../../assets/images/fifa_logo.svg';

export function Header() {
    return (
        <header className={styles['main-header']}>
            <div className={styles['header-container']}>
                <div className={styles['header-logo']}>
                    <NavLink to="/" aria-label="На главную" className={styles['header-logo-link']}>
                        <img
                            src={fifaLogo}
                            alt="FIFA"
                            width={120}
                            height={40}
                            className={styles['header-logo-img']}
                        />
                    </NavLink>
                </div>

                <nav className={styles['header-nav']}>
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