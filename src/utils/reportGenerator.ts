import { UnifiedGrant } from "./normalizeGrantData";

/**
 * Deterministic grant report generator.
 * Works with AI disabled — this is the required fallback per spec.
 * Every fact cited here comes from computed grant data, not invented.
 */
export const generateReport = (grant: UnifiedGrant): string => {
  const riskRecommendation =
    grant.riskStatus === "Critical"
      ? "Immediate corrective action is required. Attendance and participation are critically below threshold. Escalation to program leadership is recommended."
      : grant.riskStatus === "At Risk"
      ? "Targeted intervention is recommended. A support visit to underperforming schools should be scheduled within the current reporting cycle."
      : grant.riskStatus === "Behind"
      ? "Continue monitoring. Mentoring support and closer follow-up with block coordinators are advised."
      : "The grant is progressing on track. Continue the current implementation strategy and maintain documentation for the final report.";

  const evidenceLines =
    grant.evidence.length > 0
      ? grant.evidence
          .map((e) => `  • [${e.record_type}] ${e.title} — ${e.district}: ${e.summary_or_caption}`)
          .join("\n")
      : "  No evidence records linked for this reporting month.";

  const financeLines =
    grant.finance.length > 0
      ? grant.finance
          .map(
            (f) =>
              `  • ${f.budget_line}: Approved ${Number(f.approved_budget_units).toLocaleString()} | ` +
              `Monthly used ${Number(f.monthly_utilized_units).toLocaleString()} | ` +
              `Cumulative used ${Number(f.cumulative_utilized_units).toLocaleString()}`
          )
          .join("\n")
      : "  No budget line details available.";

  return `GRANT REPORT — ${grant.name}
Donor: ${grant.donor}    |    Reporting Month: ${grant.month}    |    Status: ${grant.reportStatus}
${"─".repeat(72)}

1. EXECUTIVE SUMMARY
   ${grant.name} (${grant.id}), funded by ${grant.donor}, covers the ${grant.month} 2025
   reporting cycle. ${grant.schoolsCompleted} school(s) completed PBL implementation.
   Overall attendance rate: ${grant.attendanceRate.toFixed(1)}%.
   Budget utilisation stands at ${grant.utilizationRate.toFixed(1)}% of approved budget.
   Risk classification: ${grant.riskStatus}.

${"─".repeat(72)}
2. FINANCIAL PERFORMANCE
   Approved Budget  : ${grant.budget.toLocaleString()}
   Utilized Budget  : ${grant.utilized.toLocaleString()}
   Remaining Budget : ${grant.remaining.toLocaleString()}
   Utilization Rate : ${grant.utilizationRate.toFixed(1)}%

   Budget Line Breakdown:
${financeLines}

${"─".repeat(72)}
3. PROGRAM PERFORMANCE
   Schools Completed PBL : ${grant.schoolsCompleted}
   PBL Completion Rate   : ${grant.completionRate.toFixed(1)}%
   Attendance Rate       : ${grant.attendanceRate.toFixed(1)}%
   Risk Classification   : ${grant.riskStatus}

${"─".repeat(72)}
4. EVIDENCE SUMMARY
   Total Evidence Records : ${grant.evidence.length}

${evidenceLines}

${"─".repeat(72)}
5. RISK ASSESSMENT
   Current status: ${grant.riskStatus}
   Thresholds — On Track: ≥75% | Behind: 60–74% | At Risk: 35–59% | Critical: <35%

${"─".repeat(72)}
6. RECOMMENDATIONS
   ${riskRecommendation}

${"─".repeat(72)}
SOURCE FACTS USED
   • Grant ID: ${grant.id}
   • Reporting month: ${grant.month}
   • Schools completed: ${grant.schoolsCompleted}
   • Attendance rate: ${grant.attendanceRate.toFixed(1)}%
   • Budget utilization: ${grant.utilizationRate.toFixed(1)}%
   • Risk status: ${grant.riskStatus}
   • Evidence records: ${grant.evidence.length}
   ⓘ  This report was generated deterministically from computed grant data.
      No AI was used. All figures are derived from the source CSV files.
`;
};