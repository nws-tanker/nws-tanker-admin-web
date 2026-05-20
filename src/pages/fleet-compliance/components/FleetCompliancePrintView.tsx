import { useEffect, useRef } from 'react';
import type {
  FleetComplianceKpiResponse,
  GovernorateComplianceResponse,
  InspectorPerformanceResponse,
} from '@/types/fleetCompliance';
import type { ComplianceByTankerTypeResponse } from '@/types/executiveDashboard';
import type { Lookups } from '@/types/lookups';
import type { FleetComplianceFilters } from '../hooks/useFleetComplianceFilters';
import FleetKpiStrip from './FleetKpiStrip';
import FleetComplianceBanner from './FleetComplianceBanner';
import FleetTankerTypeCompliance from './FleetTankerTypeCompliance';
import GovernorateComplianceTable from './GovernorateComplianceTable';
import InspectorPerformanceTable from './InspectorPerformanceTable';

type Props = {
  filters: FleetComplianceFilters;
  lookupsData: Lookups | null;
  kpiData: FleetComplianceKpiResponse;
  tankerTypeData: ComplianceByTankerTypeResponse;
  governorateData: GovernorateComplianceResponse;
  inspectorData: InspectorPerformanceResponse;
  onReady: (sections: HTMLElement[]) => void;
};

function buildFilterLabel(
  filters: FleetComplianceFilters,
  lookupsData: Lookups | null,
): string {
  const parts: string[] = [];

  if (filters.fiscalYearIds.length > 0) {
    parts.push(filters.fiscalYearIds.map((y) => `FY ${y}`).join(', '));
  } else {
    parts.push('All Years');
  }

  if (filters.clusterIds.length === 0) {
    parts.push('All Clusters');
  } else if (filters.clusterIds.length === 1 && lookupsData) {
    const cluster = lookupsData.clusters.find(
      (c) => c.id === filters.clusterIds[0],
    );
    parts.push(cluster ? cluster.name : `Cluster ${filters.clusterIds[0]}`);
  } else {
    parts.push(`${filters.clusterIds.length} Clusters`);
  }

  if (filters.governorateIds.length === 1 && lookupsData) {
    const gov = lookupsData.governorates.find(
      (g) => g.id === filters.governorateIds[0],
    );
    if (gov) parts.push(gov.name);
  } else if (filters.governorateIds.length > 1) {
    parts.push(`${filters.governorateIds.length} Governorates`);
  }

  return parts.join(' · ');
}

export function buildFleetCompliancePdfFilename(
  filters: FleetComplianceFilters,
): string {
  let name = 'fleet-compliance';
  if (filters.fiscalYearIds.length > 0)
    name += `-fy${filters.fiscalYearIds.join('-')}`;
  if (filters.clusterIds.length > 0)
    name += `-cluster${filters.clusterIds.join('-')}`;
  return `${name}.pdf`;
}

export default function FleetCompliancePrintView({
  filters,
  lookupsData,
  kpiData,
  tankerTypeData,
  governorateData,
  inspectorData,
  onReady,
}: Props) {
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  const headerRef = useRef<HTMLDivElement>(null);
  const kpiRef = useRef<HTMLDivElement>(null);
  const tankerTypeRef = useRef<HTMLDivElement>(null);
  const governorateRef = useRef<HTMLDivElement>(null);
  const inspectorRef = useRef<HTMLDivElement>(null);

  // 600 ms lets any charts / layout reflows settle before capture
  useEffect(() => {
    const timer = setTimeout(() => {
      const sections = [
        headerRef.current,
        kpiRef.current,
        tankerTypeRef.current,
        governorateRef.current,
        inspectorRef.current,
      ].filter((el): el is HTMLDivElement => el !== null);
      onReadyRef.current(sections);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filterLabel = buildFilterLabel(filters, lookupsData);
  const generatedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div style={{ width: 1190 }} className="bg-white">
      {/* Page header */}
      <div ref={headerRef} className="bg-white px-8 pb-4 pt-8">
        <div className="flex items-end justify-between border-b border-ink-200 pb-4">
          <div>
            <h1 className="text-xl font-bold text-ink-800">Fleet Compliance</h1>
            <p className="mt-1 text-sm text-ink-500">{filterLabel}</p>
          </div>
          <p className="text-xs text-ink-400">Generated {generatedDate}</p>
        </div>
      </div>

      {/* KPI strip + compliance banner */}
      <div ref={kpiRef} className="flex flex-col gap-4 bg-white px-8 py-2">
        <FleetKpiStrip data={kpiData} />
        <FleetComplianceBanner data={kpiData.fleet_wide_compliance} />
      </div>

      {/* Tanker type compliance */}
      <div ref={tankerTypeRef} className="bg-white px-8 py-2">
        <FleetTankerTypeCompliance data={tankerTypeData} />
      </div>

      {/* Governorate compliance table */}
      <div ref={governorateRef} className="bg-white px-8 py-2">
        <GovernorateComplianceTable data={governorateData} printMode />
      </div>

      {/* Inspector performance table */}
      <div ref={inspectorRef} className="bg-white px-8 py-2">
        <InspectorPerformanceTable data={inspectorData} printMode />
      </div>
    </div>
  );
}
