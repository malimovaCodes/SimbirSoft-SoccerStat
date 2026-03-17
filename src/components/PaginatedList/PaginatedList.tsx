import { Pagination, Skeleton } from 'antd';
import type { ReactElement } from 'react';
import './PaginatedList.css';

interface PaginatedListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactElement;
  loading: boolean;
  error: string | null;
  
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  getPageNumbers: () => (number | string)[];
  totalItems: number;
  itemsPerPage: number;
  
  title: string;
  emptyMessage?: string;
}

export function PaginatedList<T>({
  items,
  renderItem,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  getPageNumbers,
  totalItems,
  itemsPerPage,
  title,
  emptyMessage = 'Ничего не найдено',
}: PaginatedListProps<T>) {
  
  if (loading) {
    return (
      <div className="paginated-list">
        <h1>{title}</h1>
        <div className="list-grid">
          {Array.from({ length: 16 }).map((_, i) => (
            <Skeleton.Node key={i} active style={{ width: '100%', height: 200 }} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="paginated-list">
        <h1>{title}</h1>
        <div className="error">❌ {error}</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="paginated-list">
        <h1>{title}</h1>
        <div className="no-results">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="paginated-list">
      <h1>{title}</h1>
      
      <ul className="list-grid">
        {items.map(renderItem)}
      </ul>

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
          className="custom-pagination"
        />
      )}
    </div>
  );
}