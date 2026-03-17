import { Link } from 'react-router-dom';
import type { CardProps } from '../../models/types';
import styles from './Card.module.css';

export function Card({ 
  name, 
  imageUrl, 
  subtitle, 
  linkTo, 
  placeholderIcon 
}: CardProps) {
  return (
    <li className={styles['sport-card']}>
      <Link to={linkTo}>
        <div className={styles['sport-image-container']}>
          {imageUrl ? (
            <img src={imageUrl} alt={name} className={styles['sport-logo']} />
          ) : (
            <div className={styles['sport-logo-placeholder']}>{placeholderIcon}</div>
          )}
        </div>

        <h3>{name}</h3>
        {subtitle && <p>{subtitle}</p>}
      </Link>
    </li>
  );
}