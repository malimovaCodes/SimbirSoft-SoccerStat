import { Link } from 'react-router-dom';
import type { CardProps } from '../../models/interfaces';
import './Card.css';


export function Card({ 
  id, 
  name, 
  imageUrl, 
  subtitle, 
  linkTo, 
  placeholderIcon 
}: CardProps) {
  return (
    <li className="sport-card">
      <Link to={linkTo}>
        <div className="sport-image-container">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="sport-logo" />
          ) : (
            <div className="sport-logo-placeholder">{placeholderIcon}</div>
          )}
        </div>

        <h3>{name}</h3>
        {subtitle && <p>{subtitle}</p>}
      </Link>
    </li>
  );
}