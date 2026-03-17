export interface CardProps {
  id: number;
  name: string;
  imageUrl?: string | null;
  subtitle?: string;
  linkTo: string;
  placeholderIcon: string;
}