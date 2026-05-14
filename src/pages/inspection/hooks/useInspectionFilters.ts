import { useEffect, useState } from 'react';
import type { InspectionTab } from '@/types/inspection';

const SEARCH_DEBOUNCE_MS = 400;

export type InspectionFilters = {
  activeTab: InspectionTab;
  search: string;
  debouncedSearch: string;
  page: number;
};

type UseInspectionFiltersReturn = InspectionFilters & {
  setActiveTab: (tab: InspectionTab) => void;
  setSearch: (s: string) => void;
  setPage: (p: number) => void;
};

export function useInspectionFilters(): UseInspectionFiltersReturn {
  const [activeTab, setActiveTabRaw] =
    useState<InspectionTab>('pending-review');
  const [search, setSearchRaw] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPageRaw] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [search]);

  function setActiveTab(tab: InspectionTab) {
    setActiveTabRaw(tab);
    setPageRaw(0);
    setSearchRaw('');
    setDebouncedSearch('');
  }

  function setSearch(s: string) {
    setSearchRaw(s);
    setPageRaw(0);
  }

  return {
    activeTab,
    search,
    debouncedSearch,
    page,
    setActiveTab,
    setSearch,
    setPage: setPageRaw,
  };
}
