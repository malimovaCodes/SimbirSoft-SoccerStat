import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';

interface UsePaginatedSearchOptions<T> {
  items: T[]; 
  searchFields: (item: T) => string[]; 
  itemsPerPage: number;
}

export function usePaginatedSearch<T>({
  items,
  searchFields,
  itemsPerPage,
}: UsePaginatedSearchOptions<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  
  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    setIsSearching(searchQuery !== debouncedQuery);
  }, [searchQuery, debouncedQuery]);

  const filteredItems = items.filter((item) => {
    const query = debouncedQuery.toLowerCase().trim();
    if (!query) return true;
    
    return searchFields(item).some((field) =>
      field.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return {
    searchQuery,
    debouncedQuery,
    currentPage,
    totalPages,
    isSearching,
    
    filteredItems,
    currentItems,
    
    setSearchQuery,
    goToPage,
    getPageNumbers,
  };
}