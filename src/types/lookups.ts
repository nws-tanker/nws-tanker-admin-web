import type {
  Inspector,
  PermitStatus,
  SampleCollector,
  TankerType,
} from './fleet';

export type Cluster = {
  id: string;
  name: string;
};

export type Governorate = {
  id: string;
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
};
