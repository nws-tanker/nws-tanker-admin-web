import { useState } from 'react';
import type { InspectionTab } from '@/types/inspection';

export type InspectionFilters = {
  activeTab: InspectionTab;
  search: string;
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
  const [page, setPageRaw] = useState(0);

  function setActiveTab(tab: InspectionTab) {
    setActiveTabRaw(tab);
    setPageRaw(0);
    setSearchRaw('');
  }

  function setSearch(s: string) {
    setSearchRaw(s);
    setPageRaw(0);
  }

  return {
    activeTab,
    search,
    page,
    setActiveTab,
    setSearch,
    setPage: setPageRaw,
  };
}
