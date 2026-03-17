import { useApi } from '../../hooks/useApi';
import type { TeamsResponse, Team } from '../../models/types';
import styles from './TeamsPage.module.css';
import { Search } from '../../components/Search/Search';
import { Card } from '../../components/Card/Card';
import { PaginatedList } from '../../components/PaginatedList/PaginatedList';
import { usePaginatedSearch } from '../../hooks/usePaginatedSearch';
import { ITEMS_PER_PAGE_TEAMS } from '../../constants/constants';

export function TeamsPage() {
  const { data, loading, error } = useApi<TeamsResponse>('/teams');

  const {
    searchQuery,
    setSearchQuery,
    currentItems,
    currentPage,
    totalPages,
    goToPage,
    isSearching,
  } = usePaginatedSearch<Team>({
    items: data?.teams || [],
    searchFields: (team) => [team.name || ''].filter(Boolean),
    itemsPerPage: ITEMS_PER_PAGE_TEAMS,
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
        placeholderIcon=""
      />
    );
  };

  return (
    <div className={styles['teams-page']}>
      <div className={styles['page-search']}>
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
        totalItems={data?.count || 0}
        itemsPerPage={ITEMS_PER_PAGE_TEAMS}
        title="Команды"
        emptyMessage="Ничего не найдено"
      />
    </div>
  );
}