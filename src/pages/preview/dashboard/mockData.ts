// PREVIEW ONLY — static mock data mirroring the design HTML.
// Delete this file (and the page component) when real API integration begins.

export const CLUSTER_TYPES = {
  'Cluster 1': [
    {
      key: 'DW',
      label: 'Drinking Water',
      target: 1000,
      active: 843,
      expired: 48,
      noPermit: 109,
    },
    {
      key: 'SW',
      label: 'Sewage Water',
      target: 476,
      active: 388,
      expired: 22,
      noPermit: 66,
    },
    {
      key: 'TE',
      label: 'Treated Effluent',
      target: 238,
      active: 193,
      expired: 12,
      noPermit: 33,
    },
  ],
  'Cluster 2': [
    {
      key: 'DW',
      label: 'Drinking Water',
      target: 873,
      active: 651,
      expired: 98,
      noPermit: 124,
    },
    {
      key: 'SW',
      label: 'Sewage Water',
      target: 416,
      active: 317,
      expired: 35,
      noPermit: 64,
    },
    {
      key: 'TE',
      label: 'Treated Effluent',
      target: 209,
      active: 150,
      expired: 20,
      noPermit: 39,
    },
  ],
  'Cluster 3': [
    {
      key: 'DW',
      label: 'Drinking Water',
      target: 607,
      active: 491,
      expired: 110,
      noPermit: 6,
    },
    {
      key: 'SW',
      label: 'Sewage Water',
      target: 291,
      active: 147,
      expired: 65,
      noPermit: 79,
    },
    {
      key: 'TE',
      label: 'Treated Effluent',
      target: 144,
      active: 53,
      expired: 30,
      noPermit: 61,
    },
  ],
} as const;

export const OPERATIONAL = {
  clusters: {
    'Cluster 1': {
      exp30: 176,
      pass: 94,
      sla: 91,
      lab: 12,
      contractor: 'Aldar',
      name: 'Cluster 1 — Muscat / North',
    },
    'Cluster 2': {
      exp30: 134,
      pass: 88,
      sla: 83,
      lab: 28,
      contractor: 'Maulam',
      name: 'Cluster 2 — Batinah / Dhahirah',
    },
    'Cluster 3': {
      exp30: 71,
      pass: 79,
      sla: 71,
      lab: 35,
      contractor: 'National Strategic',
      name: 'Cluster 3 — Dhofar / Sharqiyah / South',
    },
  },
  kpi: {
    passRate: 89,
    passDelta: 1.4,
    sla: 84,
    slaDelta: -0.8,
    complianceTarget: 80,
    complianceDelta: 2.1,
    labOverdue: 75,
    pendingReview: 6,
    exp7: 81,
  },
  lifecycle: {
    inspectionPending: 180,
    inspectionInProgress: 47,
    labPending: 135,
    underReview: 52,
    inspectionRejected: 15,
    decommissioned: 318,
    permitsExpiredInQueue: 18,
  },
  heat: [
    ['Muscat', 92, 88, 90],
    ['Dhofar', 78, 72, 74],
    ['Musandam', 85, null, 80],
    ['Al Buraimi', 82, 79, null],
    ['Al Dakhiliyah', 76, 68, 71],
    ['North Batinah', 81, 77, 74],
    ['South Batinah', 83, 80, 72],
    ['South Sharqiyah', 69, 64, 66],
    ['North Sharqiyah', 72, 70, 65],
    ['Al Dhahirah', 74, 68, null],
    ['Al Wusta', 68, null, 62],
  ] as [string, number | null, number | null, number | null][],
} as const;

// ── Derived aggregates (same formulas as design HTML) ──────────────────────

const clusterKeys = Object.keys(
  CLUSTER_TYPES,
) as (keyof typeof CLUSTER_TYPES)[];

function sumField(
  typeKey: string,
  field: 'target' | 'active' | 'expired' | 'noPermit',
) {
  return clusterKeys.reduce((s, c) => {
    const t = CLUSTER_TYPES[c].find((x) => x.key === typeKey);
    return s + (t ? t[field] : 0);
  }, 0);
}

export const clusters = clusterKeys.map((cKey) => {
  const cts = CLUSTER_TYPES[cKey];
  const op = OPERATIONAL.clusters[cKey];
  const fleet = cts.reduce((s, t) => s + t.target, 0);
  const active = cts.reduce((s, t) => s + t.active, 0);
  const expired = cts.reduce((s, t) => s + t.expired, 0);
  return {
    name: op.name,
    contractor: op.contractor,
    fleet,
    dw: cts.find((t) => t.key === 'DW')!.target,
    sw: cts.find((t) => t.key === 'SW')!.target,
    te: cts.find((t) => t.key === 'TE')!.target,
    active,
    expired,
    comp: Math.round((active / fleet) * 100),
    exp30: op.exp30,
    pass: op.pass,
    sla: op.sla,
    lab: op.lab,
  };
});

const tKeys = ['DW', 'SW', 'TE'] as const;
const tLabels = {
  DW: 'Drinking Water',
  SW: 'Sewage Water',
  TE: 'Treated Effluent',
};

export const types = tKeys.map((key) => {
  const target = sumField(key, 'target');
  const active = sumField(key, 'active');
  const expired = sumField(key, 'expired');
  const noPermit = sumField(key, 'noPermit');
  const pct = Math.round((active / target) * 100);
  return {
    key,
    label: tLabels[key],
    pct,
    target,
    active,
    expired,
    noPermit,
    status: pct >= 80 ? 'On Track' : 'At Risk',
    sCls: pct >= 80 ? 'green' : 'amber',
  };
});

const totalFleet = clusters.reduce((s, c) => s + c.fleet, 0);
const activePermits = clusters.reduce((s, c) => s + c.active, 0);
const expired = clusters.reduce((s, c) => s + c.expired, 0);
const expiringSoon = clusters.reduce((s, c) => s + c.exp30, 0);
const compliance = Math.round((activePermits / totalFleet) * 100);
const lc = OPERATIONAL.lifecycle;
const neverInspected =
  totalFleet -
  lc.inspectionPending -
  lc.inspectionInProgress -
  lc.labPending -
  lc.underReview -
  lc.inspectionRejected -
  activePermits -
  expired;

export const kpi = {
  totalFleet,
  dw: clusters.reduce((s, c) => s + c.dw, 0),
  sw: clusters.reduce((s, c) => s + c.sw, 0),
  te: clusters.reduce((s, c) => s + c.te, 0),
  compliance,
  complianceTarget: OPERATIONAL.kpi.complianceTarget,
  complianceDelta: OPERATIONAL.kpi.complianceDelta,
  expired,
  expiringSoon,
  passRate: OPERATIONAL.kpi.passRate,
  passDelta: OPERATIONAL.kpi.passDelta,
  sla: OPERATIONAL.kpi.sla,
  slaDelta: OPERATIONAL.kpi.slaDelta,
  activePermits,
  neverInspected,
  labOverdue: OPERATIONAL.kpi.labOverdue,
  pendingReview: OPERATIONAL.kpi.pendingReview,
};

export const INSP_TREND = [
  { m: 'May', approved: 241, rejected: 48, labPending: 28 },
  { m: 'Jun', approved: 228, rejected: 52, labPending: 22 },
  { m: 'Jul', approved: 256, rejected: 44, labPending: 31 },
  { m: 'Aug', approved: 271, rejected: 40, labPending: 25 },
  { m: 'Sep', approved: 248, rejected: 45, labPending: 18 },
  { m: 'Oct', approved: 279, rejected: 36, labPending: 24 },
  { m: 'Nov', approved: 292, rejected: 31, labPending: 20 },
  { m: 'Dec', approved: 238, rejected: 42, labPending: 27 },
  { m: 'Jan', approved: 301, rejected: 28, labPending: 22 },
  { m: 'Feb', approved: 318, rejected: 24, labPending: 18 },
  { m: 'Mar', approved: 332, rejected: 21, labPending: 15 },
  { m: 'Apr', approved: 316, rejected: 26, labPending: 19 },
];

export const SPARKLINES = {
  compliance: [68, 70, 69, 71, 73, 72, 74, 73, 75, 74, 76, 76],
  passRate: [86, 85, 87, 87, 88, 87, 88, 89, 89, 89, 88, 89],
  sla: [82, 84, 85, 86, 85, 85, 84, 84, 85, 84, 84, 84],
  expired: [520, 510, 498, 485, 480, 476, 470, 465, 475, 470, 445, expired],
  expiringSoon: [18, 22, 25, 28, 24, 30, 34, 29, 35, 33, 30, expiringSoon],
};

export const GOV_CLUSTER: Record<string, string> = {
  Muscat: 'Cluster 1',
  'North Batinah': 'Cluster 1',
  'South Batinah': 'Cluster 1',
  'Al Buraimi': 'Cluster 1',
  'Al Dakhiliyah': 'Cluster 2',
  'Al Dhahirah': 'Cluster 2',
  'North Sharqiyah': 'Cluster 2',
  Musandam: 'Cluster 2',
  Dhofar: 'Cluster 3',
  'South Sharqiyah': 'Cluster 3',
  'Al Wusta': 'Cluster 3',
};
