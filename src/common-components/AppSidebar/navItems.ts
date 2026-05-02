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
import { ROUTES } from '@/constants/routes';
import type { SidebarCounts } from '@/types';

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export type NavItem = {
  key: string;
  label: string;
  icon: IconType;
  path: string;
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
        path: ROUTES.dashboard,
      },
      {
        key: 'operations',
        label: 'Operations',
        icon: ActivityIcon,
        path: ROUTES.operations,
      },
      {
        key: 'fleet-compliance',
        label: 'Fleet Compliance',
        icon: ShieldIcon,
        path: ROUTES.fleetCompliance,
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
        path: ROUTES.inspectionReview,
        countKey: 'pendingInspectionReviews',
      },
      {
        key: 'permit-renewal',
        label: 'Permit Renewal',
        icon: FileIcon,
        path: ROUTES.permitRenewal,
        countKey: 'expiringPermitRenewals',
      },
      {
        key: 'reports',
        label: 'Reports',
        icon: ChartIcon,
        path: ROUTES.reports,
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
        path: ROUTES.fleetRegistry,
      },
      {
        key: 'configuration',
        label: 'Configuration',
        icon: GearIcon,
        path: ROUTES.configuration,
      },
    ],
  },
];
