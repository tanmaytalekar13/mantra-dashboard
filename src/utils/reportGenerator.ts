import { UnifiedGrant } from "./normalizeGrantData";

export const generateReport = (grant: UnifiedGrant) => {
  return `
# Executive Summary

${grant.name} is funded by ${grant.donor}.

The grant has completed ${grant.schoolsCompleted} schools during the ${grant.month} reporting cycle.

----------------------------------------

# Budget Analysis

Approved Budget : ${grant.budget}

Utilized Budget : ${grant.utilized}

Remaining Budget : ${grant.remaining}

Budget Utilization : ${grant.utilizationRate.toFixed(1)}%

----------------------------------------

# Performance

Attendance Rate : ${grant.attendanceRate.toFixed(1)}%

Risk Status : ${grant.riskStatus}

Report Status : ${grant.reportStatus}

----------------------------------------

# Evidence

${grant.evidence.length} evidence records submitted.

----------------------------------------

# Recommendation

${
  grant.riskStatus === "Behind"
    ? "Immediate intervention is recommended to improve attendance and implementation."
    : grant.riskStatus === "Needs Attention"
    ? "Continue monitoring and provide additional mentoring."
    : "The project is progressing well. Maintain the current implementation strategy."
}
`;
};