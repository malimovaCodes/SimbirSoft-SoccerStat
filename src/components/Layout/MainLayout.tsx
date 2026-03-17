import type { ReactNode } from 'react';
import { Header } from '../Header/Header';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: ReactNode;
}

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