import type { MainLayoutProps } from '../../models/mainLayoutProps.types';
import { Header } from '../Header/Header';
import styles from './MainLayout.module.css';

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className={styles['app']}>
            <Header />
            <main className={styles['main-content']}>
                {children}
            </main>
        </div>
    );
}