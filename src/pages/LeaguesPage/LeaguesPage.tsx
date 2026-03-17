import { useApi } from '../../hooks/useApi';
import type { CompetitionsResponse, Competition } from '../../models/types';
import './LeaguesPage.css';
import { ITEMS_PER_PAGE_LEAGUES } from '../../constants/constants';
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
    isSearching,
  } = usePaginatedSearch<Competition>({
    items: data?.competitions || [],
    searchFields: (league) => [league.name, league.area?.name || ''].filter(Boolean),
    itemsPerPage: ITEMS_PER_PAGE_LEAGUES,
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
        placeholderIcon=""
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
        totalItems={data?.count || 0}
        itemsPerPage={ITEMS_PER_PAGE_LEAGUES}
        title="Лиги и соревнования"
        emptyMessage="Ничего не найдено"
      />
    </div>
  );
}