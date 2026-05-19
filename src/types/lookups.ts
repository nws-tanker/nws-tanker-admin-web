import type {
  Inspector,
  PermitStatus,
  SampleCollector,
  TankerType,
} from './fleet';

export type Cluster = {
  id: number;
  name: string;
};

export type FiscalYearBound = {
  month: string;
  year: number;
};

export type FiscalYear = {
  year: number;
  default?: boolean;
  start: FiscalYearBound;
  end: FiscalYearBound;
};

export type Quarter = {
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  start_month: string;
  end_month: string;
};

export type Governorate = {
  id: number;
  name: string;
  clusterId: string;
};

export type TankerTypeLookup = {
  id: TankerType;
  name: string;
};

export type PermitStatusLookup = {
  id: PermitStatus;
  name: string;
};

export type Lookups = {
  clusters: Cluster[];
  governorates: Governorate[];
  tankerTypes: TankerTypeLookup[];
  permitStatuses: PermitStatusLookup[];
  inspectors: Inspector[];
  sampleCollectors: SampleCollector[];
  fiscal_year: FiscalYear[];
  quarters: Quarter[];
};
