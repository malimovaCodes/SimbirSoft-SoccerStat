import { Pagination, Skeleton, Typography, Row, Alert, Empty } from 'antd';
import type { ReactElement, ReactNode } from 'react';
import styles from './PaginatedList.module.css';

const { Title } = Typography;

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
        <Title level={1}>{title}</Title>
        <Row gutter={[16, 16]} className={styles['list-grid']}>
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <Skeleton.Node key={i} active style={{ width: '100%', height: 200 }} />
          ))}
        </Row>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['paginated-list']}>
        <Title level={1}>{title}</Title>
        <Alert 
          description={error} 
          type="error" 
          showIcon 
          className={styles['error']}
        />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles['paginated-list']}>
        <Title level={1}>{title}</Title>
        <Empty 
          description={emptyMessage} 
          className={styles['no-results']}
        />
      </div>
    );
  }

  return (
    <div className={styles['paginated-list']}>
      <Title level={1}>{title}</Title>
      
      {children ? (
        children
      ) : (
        renderItem && (
          <div className={styles['list-grid']}>
            {items.map(renderItem)}
          </div>
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