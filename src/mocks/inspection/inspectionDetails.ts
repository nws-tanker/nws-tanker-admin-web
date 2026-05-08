import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { MOCK_INSPECTION_RECORDS } from './inspections';

const STAGE_TO_STATUS: Record<string, string> = {
  pending_review: 'in_review',
  pending_inspection: 'pending',
  lab_testing: 'lab_pending',
  approved: 'approved',
  rejected: 'rejected',
};

const MOCK_SECTIONS: InspectionDetailsApiResponse['inspection']['sections'] = [
  {
    section: 'General Vehicle Condition',
    items: [
      {
        item: 'No significant corrosion affecting vehicle',
        result: 'pass',
        comment: '',
        photos: [],
      },
      {
        item: 'Tyres in good condition',
        result: 'pass',
        comment: '',
        photos: [],
      },
      {
        item: 'Lights and indicators functioning properly',
        result: 'pass',
        comment: '',
        photos: [],
      },
    ],
  },
  {
    section: 'Tank Inspection',
    items: [
      {
        item: 'Tank material and internal coating suitable',
        result: 'pass',
        comment: '',
        photos: [],
      },
      { item: 'No leakage observed', result: 'pass', comment: '', photos: [] },
      {
        item: 'Tank clean internally',
        result: 'pass',
        comment: '',
        photos: [],
      },
      {
        item: 'Manhole cover properly sealed',
        result: 'pass',
        comment: '',
        photos: [],
      },
    ],
  },
  {
    section: 'Pump System Inspection',
    items: [
      {
        item: 'Pump operates efficiently',
        result: 'pass',
        comment: '',
        photos: [],
      },
      {
        item: 'No leakage from pump or connections',
        result: 'pass',
        comment: '',
        photos: [],
      },
      {
        item: 'Hoses in good condition',
        result: 'pass',
        comment: '',
        photos: [],
      },
    ],
  },
  {
    section: 'Health, Safety & Environment',
    items: [
      {
        item: 'Fire extinguisher available',
        result: 'pass',
        comment: '',
        photos: [],
      },
      { item: 'PPE available', result: 'pass', comment: '', photos: [] },
      {
        item: 'Tank securely mounted',
        result: 'pass',
        comment: '',
        photos: [],
      },
    ],
  },
];

const MOCK_SECTIONS_WITH_FAIL: InspectionDetailsApiResponse['inspection']['sections'] =
  [
    {
      section: 'General Vehicle Condition',
      items: [
        {
          item: 'No significant corrosion affecting vehicle',
          result: 'fail',
          comment: 'Severe rust on body panels',
          photos: [],
        },
        {
          item: 'Tyres in good condition',
          result: 'pass',
          comment: '',
          photos: [],
        },
        {
          item: 'Lights and indicators functioning properly',
          result: 'pass',
          comment: '',
          photos: [],
        },
      ],
    },
    {
      section: 'Tank Inspection',
      items: [
        {
          item: 'Tank material and internal coating suitable',
          result: 'pass',
          comment: '',
          photos: [],
        },
        {
          item: 'No leakage observed',
          result: 'fail',
          comment: 'Minor leak at rear hatch',
          photos: [],
        },
        {
          item: 'Tank clean internally',
          result: 'pass',
          comment: '',
          photos: [],
        },
        {
          item: 'Manhole cover properly sealed',
          result: 'fail',
          comment: 'Seal worn',
          photos: [],
        },
      ],
    },
    {
      section: 'Health, Safety & Environment',
      items: [
        {
          item: 'Fire extinguisher available',
          result: 'fail',
          comment: 'Extinguisher expired',
          photos: [],
        },
        { item: 'PPE available', result: 'pass', comment: '', photos: [] },
        {
          item: 'Tank securely mounted',
          result: 'pass',
          comment: '',
          photos: [],
        },
      ],
    },
  ];

export function buildMockInspectionDetails(
  id: string,
): InspectionDetailsApiResponse {
  const record = MOCK_INSPECTION_RECORDS.find((r) => r.id === id);

  const status = record
    ? (STAGE_TO_STATUS[record.prior_stage] ?? 'in_review')
    : 'in_review';
  const isRejected = status === 'rejected';
  const isApproved = status === 'approved';
  const tankerType = (record?.tanker_type ?? 'DW') as 'DW' | 'SW' | 'TE';
  const isDW = tankerType === 'DW';

  return {
    id,
    status,
    tanker: {
      plate: record?.plate ?? 'OM 00 XX',
      type: tankerType,
      owner: {
        name: 'Abdullah Al-Habsi',
        phone: '+968 9512 3456',
        whatsapp: '+968 9512 3456',
        email: 'habsi.transport@gmail.com',
      },
      cluster: record?.cluster ?? 'Cluster 1',
      governorate: record?.governorate ?? 'Muscat',
      capacity_litres: 8000,
    },
    assignment: {
      inspector_name: record?.inspector_name ?? 'Ahmed Al-Balushi',
      scheduled_date: record?.scheduled_date ?? null,
      physical_date:
        record?.physical_date ?? record?.inspection_date ?? '2026-04-10',
      physical_score:
        record?.physical_score ?? (isRejected ? 54 : isApproved ? 82 : null),
      submitted_at: record?.submitted_at ?? '2026-04-10T09:30:00',
    },
    permit: {
      status: isApproved ? 'active' : null,
      permit_number:
        record?.permit_number ?? (isApproved ? 'PRM-2026-00050' : null),
      issued_at: isApproved ? '2026-04-12T00:00:00' : null,
      expires_at:
        record?.permit_expires_at ?? (isApproved ? '2027-04-12' : null),
    },
    rejection: {
      reason: record?.rejection_reason ?? null,
      stage: record?.rejection_stage ?? null,
    },
    inspection: {
      sections: isRejected ? MOCK_SECTIONS_WITH_FAIL : MOCK_SECTIONS,
      checklistStatus: { pass: null, fail: null },
      final_result: isRejected ? 'fail' : status === 'pending' ? null : 'pass',
      inspector_comments: isRejected
        ? 'Vehicle failed multiple structural checks. Re-inspection required after repairs.'
        : 'Vehicle meets all inspection criteria. No issues observed.',
      required_documents: [],
    },
    lab: {
      required: isDW,
      status: isDW
        ? isApproved
          ? 'passed'
          : isRejected
            ? 'failed'
            : 'pending'
        : null,
      report: {
        id: isDW && (isApproved || isRejected) ? 'LAB-RPT-0042' : null,
        presigned_url: null,
        presigned_thumbnail_url: null,
        presigned_url_expires_at: null,
      },
    },
    timeline: [
      {
        at: '2026-04-08T08:00:00',
        event: 'Inspection Scheduled',
        actor: 'System',
        note: null,
      },
      {
        at: '2026-04-10T09:30:00',
        event: 'Physical Inspection',
        actor: record?.inspector_name ?? 'Ahmed Al-Balushi',
        note: null,
      },
      ...(isDW
        ? [
            {
              at: '2026-04-10T14:00:00',
              event: 'Lab Sample Collected',
              actor: record?.inspector_name ?? 'Ahmed Al-Balushi',
              note: null,
            },
          ]
        : []),
      ...(isApproved
        ? [
            {
              at: '2026-04-12T10:00:00',
              event: 'Permit Issued',
              actor: 'Hamed Al-Rashdi',
              note: null,
            },
          ]
        : []),
      ...(isRejected
        ? [
            {
              at: '2026-04-12T10:00:00',
              event: 'Inspection Rejected',
              actor: 'Hamed Al-Rashdi',
              note: record?.rejection_reason ?? null,
            },
          ]
        : []),
    ],
    is_reinspection: false,
    reinspection_of: null,
    permit_history: isApproved
      ? [
          {
            permit_number: 'PRM-2025-00021',
            issued_at: '2025-04-01',
            expires_at: '2026-04-01',
            status: 'expired',
          },
        ]
      : [],
  };
}
