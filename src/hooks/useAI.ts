import { useState } from "react";
import { generateGrantReport } from "../services/aiService";

export default function useAI() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");

  async function generate(grant) {
    setLoading(true);

    try {
      const response = await generateGrantReport(grant);
      setReport(response);
    } catch (error) {
      console.error(error);
      setReport("Unable to generate report.");
    } finally {
      setLoading(false);
    }
  }

  return {
    report,
    loading,
    generate,
  };
}