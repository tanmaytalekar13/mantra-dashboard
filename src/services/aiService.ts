import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function generateGrantReport(grant) {
  const financeNotes =
    grant.finance?.map((item) => item.finance_note).join("\n- ") ||
    "No finance notes available.";

  const budgetBreakdown =
    grant.finance
      ?.map(
        (item) =>
          `${item.budget_line}
Approved: ${item.approved_budget_units}
Monthly Used: ${item.monthly_utilized_units}
Cumulative Used: ${item.cumulative_utilized_units}`
      )
      .join("\n\n") || "No budget details available.";

  const evidenceSummary =
    grant.evidence
      ?.map(
        (item) =>
          `Title: ${item.title}
District: ${item.district}
Caption: ${item.summary_or_caption}`
      )
      .join("\n\n") || "No evidence available.";

  const prompt = `
You are a senior Monitoring & Evaluation (M&E) Officer preparing a donor-ready grant report.

IMPORTANT RULES

- Use ONLY the information provided below.
- Do NOT invent facts or statistics.
- If information is missing, explicitly state that it is unavailable.
- Write in a professional NGO reporting style.
- Use clear headings.
- Be concise but informative.

=====================================================

GRANT DETAILS

Grant Name:
${grant.name}

Grant ID:
${grant.id}

Donor:
${grant.donor}

Reporting Month:
${grant.month}

=====================================================

FINANCIAL SUMMARY

Approved Budget:
${grant.budget}

Utilized Budget:
${grant.utilized}

Remaining Budget:
${grant.remaining}

Budget Utilization:
${grant.utilizationRate.toFixed(2)}%

Budget Breakdown

${budgetBreakdown}

Finance Notes

${financeNotes}

=====================================================

PROGRAM PERFORMANCE

Schools Completed

${grant.schoolsCompleted}

Attendance Rate

${grant.attendanceRate.toFixed(2)}%

Risk Status

${grant.riskStatus}

Report Status

${grant.reportStatus}

Existing Draft Report

${grant.performance?.draft_report_text || "Not Available"}

=====================================================

EVIDENCE

Total Evidence Submitted

${grant.evidence.length}

Evidence Details

${evidenceSummary}

=====================================================

Prepare a donor-ready report with the following sections.

1. Executive Summary

2. Financial Performance

3. Program Performance

4. Evidence Summary

5. Risk Assessment

6. Recommendations

At the end add a section called

"AI Sources Used"

listing exactly which datasets were used.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}