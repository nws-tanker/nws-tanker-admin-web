export type InspectionStats = {
  pending: number;
  submitted: number;
  labPending: number;
  review: number;
  approved: number;
  rejected: number;
  cancelled: number;
};

export type InspectorDashboardResponse = {
  userName: string;
  statsByType: {
    all: { inspectionStats: InspectionStats };
  };
};
