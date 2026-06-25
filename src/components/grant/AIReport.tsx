import { useState } from "react";

import { UnifiedGrant } from "../../utils/normalizeGrantData";
import { generateReport } from "../../utils/reportGenerator";

interface Props {
  grant?: UnifiedGrant;
}

export default function AIReport({
  grant,
}: Props) {

  const [report, setReport] = useState("");

  if (!grant) return null;

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          AI Grant Report
        </h2>

        <button
          onClick={() =>
            setReport(generateReport(grant))
          }
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Generate Report
        </button>

      </div>

      {report && (
        <pre className="mt-6 whitespace-pre-wrap rounded-lg bg-gray-100 p-5 text-sm">
          {report}
        </pre>
      )}

    </div>
  );
}