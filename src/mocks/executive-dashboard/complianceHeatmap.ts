// nama/v1/api/executive-dashboard/compliance-heatmap
// Color = RAG: ≥80% green · 70–79% amber · <70% red/pink
// Values spread across all density levels to preview the full color range:
//   Green:  80 · 83 · 87 · 90 · 95 · 100
//   Amber:  70 · 72 · 74 · 76 · 78 · 79
//   Red:    60 · 63 · 65 · 67 · 69 · 55
import type { ComplianceHeatmapResponse } from '@/types/executiveDashboard';

export const MOCK_COMPLIANCE_HEATMAP: ComplianceHeatmapResponse = {
  x_axis: [
    'Muscat',
    'Dhofar',
    'Musandam',
    'Al Buraimi',
    'Al Dakhiliyah',
    'North Batinah',
    'South Batinah',
    'South Sharqiyah',
    'North Sharqiyah',
    'Al Dhahirah',
    'Al Wusta',
  ],
  y_axis: ['dw', 'sw', 'te'],
  data: [
    {
      row: 'dw',
      average: 82,
      values: [
        { governorate: 'Muscat', percentage: 100 }, // deepest green
        { governorate: 'Dhofar', percentage: 95 }, // very dark green
        { governorate: 'Musandam', percentage: 90 }, // dark green
        { governorate: 'Al Buraimi', percentage: 87 }, // medium-dark green
        { governorate: 'Al Dakhiliyah', percentage: 83 }, // medium green
        { governorate: 'North Batinah', percentage: 80 }, // lightest green
        { governorate: 'South Batinah', percentage: 79 }, // darkest amber
        { governorate: 'South Sharqiyah', percentage: 76 }, // medium amber
        { governorate: 'North Sharqiyah', percentage: 74 }, // medium amber
        { governorate: 'Al Dhahirah', percentage: 72 }, // lighter amber
        { governorate: 'Al Wusta', percentage: 70 }, // lightest amber
      ],
    },
    {
      row: 'sw',
      average: 73,
      values: [
        { governorate: 'Muscat', percentage: 78 }, // darker amber
        { governorate: 'Dhofar', percentage: 76 }, // medium amber
        { governorate: 'Musandam', percentage: null },
        { governorate: 'Al Buraimi', percentage: 74 }, // lighter amber
        { governorate: 'Al Dakhiliyah', percentage: 70 }, // lightest amber
        { governorate: 'North Batinah', percentage: 69 }, // lightest red
        { governorate: 'South Batinah', percentage: 67 }, // light red
        { governorate: 'South Sharqiyah', percentage: 65 }, // medium red
        { governorate: 'North Sharqiyah', percentage: 63 }, // medium-dark red
        { governorate: 'Al Dhahirah', percentage: 60 }, // dark red
        { governorate: 'Al Wusta', percentage: null },
      ],
    },
    {
      row: 'te',
      average: 76,
      values: [
        { governorate: 'Muscat', percentage: 88 }, // dark green
        { governorate: 'Dhofar', percentage: 84 }, // medium green
        { governorate: 'Musandam', percentage: 80 }, // lightest green
        { governorate: 'Al Buraimi', percentage: null },
        { governorate: 'Al Dakhiliyah', percentage: 79 }, // darkest amber
        { governorate: 'North Batinah', percentage: 75 }, // medium amber
        { governorate: 'South Batinah', percentage: 71 }, // lighter amber
        { governorate: 'South Sharqiyah', percentage: 67 }, // light red
        { governorate: 'North Sharqiyah', percentage: 63 }, // medium-dark red
        { governorate: 'Al Dhahirah', percentage: 55 }, // deepest red
        { governorate: 'Al Wusta', percentage: 62 }, // dark red
      ],
    },
  ],
  final_average: [
    { governorate: 'Muscat', percentage: 89 },
    { governorate: 'Dhofar', percentage: 85 },
    { governorate: 'Musandam', percentage: 85 },
    { governorate: 'Al Buraimi', percentage: 81 },
    { governorate: 'Al Dakhiliyah', percentage: 77 },
    { governorate: 'North Batinah', percentage: 75 },
    { governorate: 'South Batinah', percentage: 75 },
    { governorate: 'South Sharqiyah', percentage: 66 },
    { governorate: 'North Sharqiyah', percentage: 67 },
    { governorate: 'Al Dhahirah', percentage: 66 },
    { governorate: 'Al Wusta', percentage: 66 },
  ],
  overall_average: 75,
};
