import { getModel } from "./aiConfig";
import { UnifiedGrant } from "../utils/normalizeGrantData";

export async function askGrantAI(
  grant: UnifiedGrant,
  question: string
): Promise<string> {
  const model = getModel();

  const evidenceLines =
    grant.evidence
      .map((e) => `• ${e.title} (${e.district}): ${e.summary_or_caption}`)
      .join("\n") || "No evidence records available.";

  const prompt = `You are an AI Grant Monitoring Assistant.
Answer questions using ONLY the grant data provided. Do not invent any figures, names, or outcomes.
If the answer is not in the data, say so clearly.

GRANT DATA:
Name: ${grant.name}
Donor: ${grant.donor}
Month: ${grant.month}
Budget: ${grant.budget.toLocaleString()}
Utilized: ${grant.utilized.toLocaleString()}
Remaining: ${grant.remaining.toLocaleString()}
Utilization Rate: ${grant.utilizationRate.toFixed(2)}%
Attendance Rate: ${grant.attendanceRate.toFixed(2)}%
Completion Rate: ${grant.completionRate.toFixed(2)}%
Risk Status: ${grant.riskStatus}
Schools Completed: ${grant.schoolsCompleted}

Evidence:
${evidenceLines}

Question: ${question}

Answer professionally and concisely.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}