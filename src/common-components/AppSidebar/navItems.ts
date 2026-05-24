import type { ComponentType, SVGProps } from 'react';
import {
  ActivityIcon,
  ChartIcon,
  ClipIcon,
  DashboardIcon,
  FileIcon,
  GearIcon,
  ShieldIcon,
  TruckIcon,
} from '@/atoms/icons';
import type { RouteKey } from '@/constants/routes';
import type { SidebarCounts } from '@/types';

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export type NavItem = {
  key: string;
  label: string;
  icon: IconType;
  routeKey: RouteKey;
  /** If set, the sidebar injects a CountBadge using this field from SidebarCounts. */
  countKey?: keyof SidebarCounts;
};

export type NavSection = {
  heading: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    heading: 'OVERVIEW',
    items: [
      {
        key: 'dashboard',
        label: 'Executive Dashboard',
        icon: DashboardIcon,
        routeKey: 'dashboard',
      },
      {
        key: 'operations',
        label: 'Operations',
        icon: ActivityIcon,
        routeKey: 'operations',
      },
      {
        key: 'fleet-compliance',
        label: 'Fleet Compliance',
        icon: ShieldIcon,
        routeKey: 'fleetCompliance',
      },
    ],
  },
  {
    heading: 'WORK',
    items: [
      {
        key: 'inspection-review',
        label: 'Inspection Review',
        icon: ClipIcon,
        routeKey: 'inspectionReview',
        countKey: 'pendingInspectionReviews',
      },
      {
        key: 'permit-regeneration',
        label: 'Permit Regeneration',
        icon: FileIcon,
        routeKey: 'permitRegeneration',
      },
      {
        key: 'permit-renewal',
        label: 'Permit Renewal',
        icon: FileIcon,
        routeKey: 'permitRenewal',
      },
      {
        key: 'reports',
        label: 'Reports',
        icon: ChartIcon,
        routeKey: 'reports',
      },
    ],
  },
  {
    heading: 'ADMIN',
    items: [
      {
        key: 'fleet-registry',
        label: 'Fleet Registry',
        icon: TruckIcon,
        routeKey: 'fleetRegistry',
      },
      {
        key: 'configuration',
        label: 'Configuration',
        icon: GearIcon,
        routeKey: 'configuration',
      },
    ],
  },
];
