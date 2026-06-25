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
  reportStatus: string;
 riskStatus: string;
  schoolsCompleted: number;

  finance: GrantFinance[];

  performance: GrantPerformance;

  evidence: GrantEvidence[];
}

export const normalizeGrantData = (
  finance: GrantFinance[],
  performance: GrantPerformance[],
  evidence: GrantEvidence[]
): UnifiedGrant[] => {
  return performance.map((grant) => {
    const financeRows = finance.filter(
      (f) => f.grant_id === grant.grant_id
    );

    const evidenceRows = evidence.filter(
      (e) => e.grant_id === grant.grant_id
    );

    const budget = financeRows.reduce(
      (sum, row) =>
        sum + Number(row.approved_budget_units),
      0
    );

    const utilized = financeRows.reduce(
      (sum, row) =>
        sum + Number(row.cumulative_utilized_units),
      0
    );

    return {
      id: grant.grant_id,

      name: grant.grant_name,

      donor: grant.donor,

      month: grant.reporting_month,

      budget,

      utilized,

      remaining: budget - utilized,

      utilizationRate:
        budget === 0
          ? 0
          : Number(((utilized / budget) * 100).toFixed(2)),

      attendanceRate:
        Number(grant.attendance_rate) * 100,

      reportStatus: grant.report_status,

      riskStatus: grant.risk_status,

      schoolsCompleted:
        Number(grant.schools_completed_pbl),

      finance: financeRows,

      performance: grant,

      evidence: evidenceRows,
    };
  });
};