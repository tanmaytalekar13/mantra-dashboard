import { getModel } from "./aiConfig";
import { UnifiedGrant } from "../utils/normalizeGrantData";

export async function generateGrantReport(grant: UnifiedGrant): Promise<string> {
  const model = getModel();

  const financeLines =
    grant.finance
      .map(
        (f) =>
          `• ${f.budget_line}: Approved ${Number(f.approved_budget_units).toLocaleString()} | ` +
          `Cumulative Used ${Number(f.cumulative_utilized_units).toLocaleString()} | Note: ${f.finance_note}`
      )
      .join("\n") || "No budget details available.";

  const evidenceLines =
    grant.evidence
      .map(
        (e) =>
          `• [${e.record_type}] ${e.title} — ${e.district}: ${e.summary_or_caption}`
      )
      .join("\n") || "No evidence records available.";

  const prompt = `You are a senior Monitoring & Evaluation officer preparing a donor-ready grant report.

STRICT RULES:
- Use ONLY the data provided below. Do not invent any figures, names, locations, or outcomes.
- If a field is missing, write "Not available" — do not guess or extrapolate.
- Write in professional NGO reporting style with clear section headings.
- At the end, include a section titled "AI Sources Used" that lists every data field you referenced.

=====================================================
GRANT DETAILS
Name: ${grant.name}
ID: ${grant.id}
Donor: ${grant.donor}
Reporting Month: ${grant.month}
Report Status: ${grant.reportStatus}

FINANCIAL SUMMARY
Approved Budget: ${grant.budget.toLocaleString()}
Utilized Budget: ${grant.utilized.toLocaleString()}
Remaining Budget: ${grant.remaining.toLocaleString()}
Utilization Rate: ${grant.utilizationRate.toFixed(2)}%

Budget Lines:
${financeLines}

PROGRAM PERFORMANCE
Schools Completed PBL: ${grant.schoolsCompleted}
PBL Completion Rate: ${grant.completionRate.toFixed(2)}%
Attendance Rate: ${grant.attendanceRate.toFixed(2)}%
Risk Status: ${grant.riskStatus}

Draft Report Text (if available):
${grant.performance?.draft_report_text || "Not available"}

EVIDENCE (${grant.evidence.length} records):
${evidenceLines}
=====================================================

Write the following sections:
1. Executive Summary
2. Financial Performance
3. Program Performance
4. Evidence Summary
5. Risk Assessment
6. Recommendations
7. AI Sources Used`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}