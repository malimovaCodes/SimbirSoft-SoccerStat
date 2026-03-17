import { Link } from 'react-router-dom';
import { useState, type ReactElement } from 'react';
import { useApi } from '../../hooks/useApi';
import type { CompetitionsResponse, Competition } from '../../models/interfaces';
import './LeaguesPage.css';
import { ITEMS_PER_PAGE } from '../../constants/constants';
import { Card } from '../../components/Card/Card';
import { PaginatedList } from '../../components/PaginatedList/PaginatedList';
import { Search } from '../../components/Search/Search';
import { usePaginatedSearch } from '../../hooks/usePaginatedSearch';


export function LeaguesPage() {
  const { data, loading, error } = useApi<CompetitionsResponse>('/competitions');

  const {
    searchQuery,
    setSearchQuery,
    currentItems,
    currentPage,
    totalPages,
    goToPage,
    getPageNumbers,
    isSearching,
  } = usePaginatedSearch<Competition>({
    items: data?.competitions || [],
    searchFields: (league) => [league.name, league.area?.name || ''].filter(Boolean),
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const renderLeagueCard = (league: Competition) => {
    const imageUrl = league.emblem?.trim() || league.area?.flag?.trim() || null;
    return (
      <Card
        key={league.id}
        id={league.id}
        name={league.name}
        imageUrl={imageUrl}
        subtitle={league.area?.name || 'Не указано'}
        linkTo={`/leagues/${league.id}`}
        placeholderIcon="🏆"
      />
    );
  };

  return (
    <div className="leagues-page">
      <div className="page-search">
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Поиск лиг..."
          isLoading={isSearching}
        />
      </div>

      <PaginatedList
        items={currentItems}
        renderItem={renderLeagueCard}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        getPageNumbers={getPageNumbers}
        totalItems={data?.competitions?.length || 0}
        itemsPerPage={ITEMS_PER_PAGE}
        title="Лиги и соревнования"
        emptyMessage="Лиги не найдены"
      />
    </div>
  );
}