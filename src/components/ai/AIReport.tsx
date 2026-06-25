import useAI from "../../hooks/useAI";
import { downloadPDF } from "../../utils/pdfGenerator";
import { generateReport } from "../../utils/reportGenerator";
import { UnifiedGrant } from "../../utils/normalizeGrantData";

interface Props {
  grant: UnifiedGrant;
}

export default function AIReport({ grant }: Props) {
  const { report, loading, error, generate } = useAI();

  // Deterministic fallback — always available regardless of AI
  const deterministicReport = generateReport(grant);

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Report copied to clipboard");
  };

  const exportPDF = (title: string, content: string) => {
    downloadPDF(`${title}_Grant_Report`, content);
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">Grant Report</h2>
        <p className="text-xs text-gray-400 mt-1">
          The deterministic report below is always available. AI generation
          requires a valid API key and produces a narrative version.
        </p>
      </div>

      {/* Deterministic Report (always shown) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-700">
            Deterministic Fact Report
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => copyText(deterministicReport)}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition"
            >
              Copy
            </button>
            <button
              onClick={() => exportPDF(grant.name, deterministicReport)}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition"
            >
              Export PDF
            </button>
          </div>
        </div>
        <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 border border-gray-100 p-5 text-xs leading-6 text-gray-800 font-mono max-h-[400px] overflow-y-auto">
          {deterministicReport}
        </pre>
      </div>

      {/* AI Report Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-700">AI Narrative Report</h3>
          <div className="flex gap-2">
            <button
              onClick={() => generate(grant)}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Generating…" : "Generate with AI"}
            </button>
            {report && (
              <>
                <button
                  onClick={() => copyText(report)}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition"
                >
                  Copy
                </button>
                <button
                  onClick={() => exportPDF(`${grant.name}_AI`, report)}
                  className="rounded-lg border border-green-200 px-3 py-1.5 text-xs text-green-700 hover:bg-green-50 transition"
                >
                  Export PDF
                </button>
              </>
            )}
          </div>
        </div>

        {loading && (
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-blue-700 text-sm">
            Generating AI report using computed grant data…
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        {report && !loading && (
          <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 border border-gray-100 p-5 text-xs leading-6 text-gray-800 font-sans max-h-[600px] overflow-y-auto">
            {report}
          </pre>
        )}

        {!report && !loading && !error && (
          <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-gray-400 text-sm">
            Click "Generate with AI" to produce a narrative version of this report.
          </div>
        )}
      </div>
    </div>
  );
}