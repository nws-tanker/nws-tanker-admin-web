import type { Assignment } from '@/types';

export type AssignInspectorMockResponse = {
  plateNumber: string;
  assignment: Assignment;
  assignedAt: string;
};

export function buildAssignInspectorMock(
  plateNumber: string,
  assignment: Assignment,
): AssignInspectorMockResponse {
  return {
    plateNumber,
    assignment,
    assignedAt: new Date().toISOString(),
  };
}

export type ClearAssignmentMockResponse = {
  plateNumber: string;
  clearedAt: string;
};

export function buildClearAssignmentMock(
  plateNumber: string,
): ClearAssignmentMockResponse {
  return {
    plateNumber,
    clearedAt: new Date().toISOString(),
  };
}
