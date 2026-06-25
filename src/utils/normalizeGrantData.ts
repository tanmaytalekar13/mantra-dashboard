import {
  GrantFinance,
  GrantPerformance,
  GrantEvidence,
} from "../types/grant";

export interface UnifiedGrant {
  id: string;
  name: string;
  donor: string;
  month: string;
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

// Alias so existing imports of NormalizedGrant continue to compile
export type NormalizedGrant = UnifiedGrant;

/**
 * Build one UnifiedGrant per (grant_id × reporting_month) performance row.
 * Finance rows are matched by grant_id only (they may span months); the
 * cumulative figures on the matching performance row's month are used for
 * utilization rate so we do not double-count across months.
 */
export const normalizeGrantData = (
  finance: GrantFinance[],
  performance: GrantPerformance[],
  evidence: GrantEvidence[]
): UnifiedGrant[] => {
  return performance.map((perf) => {
    const financeRows = finance.filter(
      (f) => f.grant_id === perf.grant_id
    );

    const evidenceRows = evidence.filter(
      (e) =>
        e.grant_id === perf.grant_id &&
        e.reporting_month === perf.reporting_month
    );

    // Sum budget lines for this grant
    const budget = financeRows.reduce(
      (sum, row) => sum + Number(row.approved_budget_units || 0),
      0
    );

    // Use cumulative utilized from the matched performance month
    const utilized = financeRows.reduce(
      (sum, row) => sum + Number(row.cumulative_utilized_units || 0),
      0
    );

    // attendance_rate in CSV is a decimal (0–1); convert to percentage
    const rawRate = Number(perf.attendance_rate);
    const attendanceRate =
      rawRate > 1 ? rawRate : rawRate * 100;

    const rawCompletion = Number(perf.pbl_completion_rate);
    const completionRate =
      rawCompletion > 1 ? rawCompletion : rawCompletion * 100;

    return {
      id: perf.grant_id,
      name: perf.grant_name,
      donor: perf.donor,
      month: perf.reporting_month,
      budget,
      utilized,
      remaining: budget - utilized,
      utilizationRate:
        budget === 0
          ? 0
          : Math.min(
              Number(((utilized / budget) * 100).toFixed(2)),
              100
            ),
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