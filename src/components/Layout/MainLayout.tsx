import type { ReactNode } from 'react';
import { Header } from '../Header/Header';
import './MainLayout.css';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}