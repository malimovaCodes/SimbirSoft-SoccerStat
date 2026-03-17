import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import type { CardProps } from '../../models/cardProps.types';
import styles from './SportCard.module.css';

const { Title, Text } = Typography;

export function SportCard({
  name,
  imageUrl,
  subtitle,
  linkTo,
  placeholderIcon
}: CardProps) {
  return (
    <li className={styles['sport-card']}>
      <Link to={linkTo} className={styles['card-link']}>
        <div className={styles['sport-image-container']}>
          {imageUrl ? (
            <img src={imageUrl} alt={name} className={styles['sport-logo']} />
          ) : (
            <div className={styles['sport-logo-placeholder']}>{placeholderIcon}</div>
          )}
        </div>
        <Title level={5} className={styles['sport-name']} ellipsis={{ rows: 2 }}>
          {name}
        </Title>
        {subtitle && (
          <Text type="secondary" className={styles['sport-subtitle']}>
            {subtitle}
          </Text>
        )}

      </Link>
    </li>
  );
}