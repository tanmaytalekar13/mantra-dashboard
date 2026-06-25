import { GoogleGenerativeAI } from "@google/generative-ai";
import { UnifiedGrant } from "../utils/normalizeGrantData";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function askGrantAI(
  grant: UnifiedGrant,
  question: string
) {
  const prompt = `
You are an AI Grant Monitoring Assistant.

Use ONLY the provided data.

Do not invent facts.

Grant

Name: ${grant.name}

Donor: ${grant.donor}

Budget: ${grant.budget}

Utilized: ${grant.utilized}

Remaining: ${grant.remaining}

Attendance: ${grant.attendanceRate}%

Risk: ${grant.riskStatus}

Schools Completed: ${grant.schoolsCompleted}

Evidence

${grant.evidence
  .map(
    (e) =>
      `${e.title}

${e.summary_or_caption}`
  )
  .join("\n\n")}

Question

${question}

Answer professionally.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}