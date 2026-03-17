import { Typography } from 'antd';
import styles from './Home.module.css';

const { Title, Paragraph } = Typography;

export function Home() {
  return (
    <main className={styles['home-page']}>
      <Title level={1}>
        Добро пожаловать в Soccer Stat!
      </Title>

      <Paragraph>
        Выберите раздел из меню
      </Paragraph>
    </main>
  );
}