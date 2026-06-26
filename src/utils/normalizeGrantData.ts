import {
  GrantFinance,
  GrantPerformance,
  GrantEvidence,
} from "../types/grant";

export interface UnifiedGrant {
  id: string;
  name: string;
  donor: string;
  month: string;        // stored as "2025-07" internally
  monthLabel: string;   // display label "July 2025"
  budget: number;
  utilized: number;
  remaining: number;
  utilizationRate: number;
  attendanceRate: number;
  completionRate: number;
  reportStatus: string;
  riskStatus: string;
  schoolsCompleted: number;
  finance: GrantFinance[];
  performance: GrantPerformance;
  evidence: GrantEvidence[];
}

export type NormalizedGrant = UnifiedGrant;

// "2025-07" → "July 2025"
const MONTH_LABELS: Record<string, string> = {
  "2025-07": "July 2025",
  "2025-08": "August 2025",
  "2025-09": "September 2025",
};

export const normalizeGrantData = (
  finance: GrantFinance[],
  performance: GrantPerformance[],
  evidence: GrantEvidence[]
): UnifiedGrant[] => {
  return performance.map((perf) => {
    const financeRows = finance.filter(
      (f) =>
        f.grant_id === perf.grant_id &&
        f.reporting_month === perf.reporting_month
    );

    const evidenceRows = evidence.filter(
      (e) =>
        e.grant_id === perf.grant_id &&
        e.reporting_month === perf.reporting_month
    );

    const budget = financeRows.reduce(
      (sum, row) => sum + Number(row.approved_budget_units || 0),
      0
    );

    const utilized = financeRows.reduce(
      (sum, row) => sum + Number(row.cumulative_utilized_units || 0),
      0
    );

    // CSV stores 0–1 decimal
    const rawAttendance = Number(perf.attendance_rate);
    const attendanceRate = rawAttendance > 1 ? rawAttendance : rawAttendance * 100;

    const rawCompletion = Number(perf.pbl_completion_rate);
    const completionRate = rawCompletion > 1 ? rawCompletion : rawCompletion * 100;

    return {
      id: perf.grant_id,
      name: perf.grant_name,
      donor: perf.donor,
      month: perf.reporting_month,                          // "2025-07"
      monthLabel: MONTH_LABELS[perf.reporting_month] ?? perf.reporting_month,
      budget,
      utilized,
      remaining: budget - utilized,
      utilizationRate:
        budget === 0
          ? 0
          : Math.min(Number(((utilized / budget) * 100).toFixed(2)), 100),
      attendanceRate: Number(attendanceRate.toFixed(2)),
      completionRate: Number(completionRate.toFixed(2)),
      reportStatus: perf.report_status ?? "",
      riskStatus: perf.risk_status ?? "",
      schoolsCompleted: Number(perf.schools_completed_pbl || 0),
      finance: financeRows,
      performance: perf,
      evidence: evidenceRows,
    };
  });
};