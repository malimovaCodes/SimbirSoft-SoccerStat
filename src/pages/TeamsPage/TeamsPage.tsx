import { useEffect, useState, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Skeleton } from 'antd';
import { useApi } from '../../hooks/useApi';
import type { TeamsResponse, Team } from '../../models/interfaces';
import './TeamsPage.css';
import { Search } from '../../components/Search/Search';
import { useDebounce } from '../../hooks/useDebounce';
import { Card } from '../../components/Card/Card';
import { PaginatedList } from '../../components/PaginatedList/PaginatedList';
import { usePaginatedSearch } from '../../hooks/usePaginatedSearch';


const ITEMS_PER_PAGE = 16;

export function TeamsPage() {
  const { data, loading, error } = useApi<TeamsResponse>('/teams');

  const {
    searchQuery,
    setSearchQuery,
    currentItems,
    currentPage,
    totalPages,
    goToPage,
    getPageNumbers,
    isSearching,
  } = usePaginatedSearch<Team>({
    items: data?.teams || [],
    searchFields: (team) => [team.name || ''].filter(Boolean),
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const renderTeamCard = (team: Team) => {
    const imageUrl = team.crest?.trim() || null;
    return (
      <Card
        key={team.id}
        id={team.id}
        name={team.name}
        imageUrl={imageUrl}
        linkTo={`/teams/${team.id}`}
        placeholderIcon="⚽"
      />
    );
  };

  return (
    <div className="teams-page">
      <div className="page-search">
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Поиск команд..."
          isLoading={isSearching}
        />
      </div>

      <PaginatedList
        items={currentItems}
        renderItem={renderTeamCard}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        getPageNumbers={getPageNumbers}
        totalItems={data?.teams?.length || 0}
        itemsPerPage={ITEMS_PER_PAGE}
        title="Команды"
        emptyMessage="Команды не найдены"
      />
    </div>
  );
}