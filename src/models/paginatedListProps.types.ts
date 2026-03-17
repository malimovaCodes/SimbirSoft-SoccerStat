import type { ReactElement, ReactNode } from 'react';

export interface PaginatedListProps<T> {
  items: T[];
  renderItem?: (item: T) => ReactElement;
  children?: ReactNode;
  loading: boolean;
  error: string | null;

  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;

  title: string;
  emptyMessage?: string;
}