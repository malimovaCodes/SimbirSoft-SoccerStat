import styles from './Home.module.css';

export function Home() {
  return (
    <main className={styles['home-page']}>
      <h1>Добро пожаловать в Soccer Stat!</h1>
      <p>Выберите раздел из меню</p>
    </main>
  );
}