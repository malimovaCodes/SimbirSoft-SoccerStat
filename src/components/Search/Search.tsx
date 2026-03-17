import { Input } from 'antd';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from './Search.module.css';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceDelay?: number;
  isLoading?: boolean;
}

export function Search({ 
  isLoading = false,
  value, 
  onChange, 
  placeholder = 'Search' 
}: SearchProps) {
  return (
    <div className={styles['search-component']}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        allowClear
        className={styles['search-input']}
        suffix={isLoading ? <LoadingOutlined /> : <SearchOutlined />}
      />
    </div>
  );
}