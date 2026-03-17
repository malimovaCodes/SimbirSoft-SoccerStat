import { Pagination, Skeleton } from 'antd';
import type { ReactElement, ReactNode } from 'react';
import styles from './PaginatedList.module.css';

interface PaginatedListProps<T> {
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

export function PaginatedList<T>({
  items,
  renderItem,
  children,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  title,
  emptyMessage = 'Ничего не найдено',
}: PaginatedListProps<T>) {
  
  if (loading) {
    return (
      <div className={styles['paginated-list']}>
        <h1>{title}</h1>
        <div className={styles['list-grid']}>
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <Skeleton.Node key={i} active style={{ width: '100%', height: 200 }} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['paginated-list']}>
        <h1>{title}</h1>
        <div className={styles['error']}>{error}</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles['paginated-list']}>
        <h1>{title}</h1>
        <div className={styles['no-results']}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className={styles['paginated-list']}>
      <h1>{title}</h1>
      
      {children ? (
        children
      ) : (
        renderItem && (
          <ul className={styles['list-grid']}>
            {items.map(renderItem)}
          </ul>
        )
      )}

      {totalPages > 1 && (
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={totalItems}
          onChange={onPageChange}
          showSizeChanger={false}
          showQuickJumper={false}
          showTotal={(total) =>
            `Страница ${currentPage} из ${totalPages} (всего: ${total})`
          }
          className={styles['custom-pagination']}
        />
      )}
    </div>
  );
}