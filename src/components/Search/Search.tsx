import { Input } from 'antd';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import './Search.css';

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
    <div className="search-component">
      <Input
        placeholder={placeholder}
        prefix={<SearchOutlined className="search-icon" />}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        allowClear
        className="search-input"
        suffix={isLoading ? <LoadingOutlined /> : <SearchOutlined />}
      />
    </div>
  );
}