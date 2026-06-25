import useAI from "../../hooks/useAI";
import { downloadPDF } from "../../utils/pdfGenerator";
import { UnifiedGrant } from "../../utils/normalizeGrantData";

interface AIReportProps {
  grant: UnifiedGrant;
}

export default function AIReport({
  grant,
}: AIReportProps) {
  const { report, loading, generate } = useAI();

  const copyReport = async () => {
    if (!report) return;

    await navigator.clipboard.writeText(report);

    alert("✅ Report copied to clipboard");
  };

  const exportPDF = () => {
    if (!report) return;

    downloadPDF(
      `${grant.name}_Grant_Report`,
      report
    );
  };

  if (!grant) return null;

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            🤖 AI Grant Report
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Generate a professional donor-ready report using
            Gemini AI.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">

          <button
            onClick={() => generate(grant)}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Generating..."
              : "✨ Generate Report"}
          </button>

          <button
            onClick={copyReport}
            disabled={!report}
            className="rounded-lg bg-gray-700 px-5 py-2 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            📋 Copy
          </button>

          <button
            onClick={exportPDF}
            disabled={!report}
            className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            📄 Export PDF
          </button>

        </div>

      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-700">
          Gemini is generating your report...
        </div>
      )}

      {/* Report */}
      {report && (
        <div className="mt-8">

          <h3 className="mb-4 text-xl font-semibold">
            Generated Report
          </h3>

          <div className="max-h-[700px] overflow-y-auto rounded-xl border bg-gray-50 p-6">

            <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-gray-800">
              {report}
            </pre>

          </div>

        </div>
      )}

    </div>
  );
}