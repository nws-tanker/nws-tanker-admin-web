import { describe, expect, it } from 'vitest';
import {
  RAG_AT_RISK,
  RAG_ON_TRACK,
  buildQuarterOptions,
  currentQuarterLabel,
  ragBgClass,
  ragStatusLabel,
} from './executiveDashboardHelpers';

describe('executiveDashboardHelpers', () => {
  it('currentQuarterLabel returns YYYY-Qn format', () => {
    const label = currentQuarterLabel();
    expect(label).toMatch(/^\d{4}-Q[1-4]$/);
  });

  it('buildQuarterOptions returns descending quarters', () => {
    const options = buildQuarterOptions(4);
    expect(options).toHaveLength(4);
    expect(options[0].value).toBe(currentQuarterLabel());
  });

  it('ragBgClass applies RAG thresholds', () => {
    expect(ragBgClass(85)).toContain('teal');
    expect(ragBgClass(75)).toContain('amber');
    expect(ragBgClass(65)).toContain('red');
    expect(ragBgClass(null)).toContain('ink');
  });

  it('ragStatusLabel maps status codes', () => {
    expect(ragStatusLabel('on_track')).toBe('On track');
    expect(ragStatusLabel('at_risk')).toBe('At Risk');
    expect(ragStatusLabel('critical')).toBe('Critical');
  });

  it('documents RAG constants', () => {
    expect(RAG_ON_TRACK).toBe(80);
    expect(RAG_AT_RISK).toBe(70);
  });
});
