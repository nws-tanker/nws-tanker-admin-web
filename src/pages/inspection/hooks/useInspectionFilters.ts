import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { INSPECTION_TAB_API_PARAM } from '@/types/inspection';
import type { InspectionTab } from '@/types/inspection';

const SEARCH_DEBOUNCE_MS = 400;
const DEFAULT_TAB: InspectionTab = 'pending-review';

// Read the active tab from the URL (?tab=...) so it survives navigating to a
// details page and coming back. Falls back to the default for missing/unknown
// values.
function parseTab(value: string | null): InspectionTab {
  return value && value in INSPECTION_TAB_API_PARAM
    ? (value as InspectionTab)
    : DEFAULT_TAB;
}

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
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = parseTab(searchParams.get('tab'));
  const [search, setSearchRaw] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPageRaw] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [search]);

  function setActiveTab(tab: InspectionTab) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('tab', tab);
        return next;
      },
      { replace: true },
    );
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
