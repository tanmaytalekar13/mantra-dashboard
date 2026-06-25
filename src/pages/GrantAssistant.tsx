import { useMemo, useState } from "react";
import { useGrantData } from "../hooks/useGrantData";
import { normalizeGrantData } from "../utils/normalizeGrantData";

import GrantStats from "../components/grant/GrantStats";
import GrantSelector from "../components/grant/GrantSelector";
import BudgetChart from "../components/grant/BudgetChart";
import EvidenceGallery from "../components/grant/EvidenceGallery";
import AIReport from "../components/ai/AIReport";
import AIChat from "../components/ai/AIChat";

const RISK_BADGE: Record<string, string> = {
  "On Track": "bg-green-100 text-green-700",
  Behind: "bg-yellow-100 text-yellow-700",
  "At Risk": "bg-red-100 text-red-700",
  Critical: "bg-red-900 text-white",
};

export default function GrantAssistant() {
  const { data, loading, error } = useGrantData();

  const unifiedGrants = useMemo(() => {
    if (!data) return [];
    return normalizeGrantData(data.profile, data.performance, data.evidence);
  }, [data]);

  const [selectedGrantName, setSelectedGrantName] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");

  const grantNames = useMemo(
    () => [...new Set(unifiedGrants.map((g) => g.name))].sort(),
    [unifiedGrants]
  );

  const months = useMemo(
    () => [...new Set(unifiedGrants.map((g) => g.month))].sort(),
    [unifiedGrants]
  );

  const filteredGrants = useMemo(() => {
    return unifiedGrants.filter((g) => {
      const matchName = selectedGrantName === "All" || g.name === selectedGrantName;
      const matchMonth = selectedMonth === "All" || g.month === selectedMonth;
      return matchName && matchMonth;
    });
  }, [unifiedGrants, selectedGrantName, selectedMonth]);

  // Only show individual grant detail when exactly one grant is selected by name
  const selectedGrant =
    selectedGrantName !== "All" && filteredGrants.length > 0
      ? filteredGrants[0]
      : null;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-700">
            Loading Grant Dashboard…
          </div>
          <p className="text-gray-400 text-sm mt-2">Parsing grant data files</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-screen items-center justify-center text-red-600">
        <div className="text-center">
          <div className="text-xl font-semibold">{error || "No data found"}</div>
          <p className="text-sm text-red-400 mt-2">
            Check that the grant CSV files are present in /public/data/grant/csv/
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Grant Reporting</h1>
        <p className="mt-1 text-sm text-gray-500">
          Finance · Performance · Evidence Analytics
        </p>
      </div>

      {/* KPI Cards */}
      <GrantStats grants={filteredGrants} />

      {/* Selectors + Budget Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <GrantSelector
            grants={grantNames}
            selectedGrant={selectedGrantName}
            onChange={setSelectedGrantName}
          />
          {/* Month filter */}
          <div className="rounded-xl bg-white p-4 shadow">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reporting Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white p-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            >
              <option value="All">All Months</option>
              {months.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="lg:col-span-2">
          <BudgetChart grants={filteredGrants} />
        </div>
      </div>

      {/* Evidence Gallery */}
      <EvidenceGallery grants={filteredGrants} />

      {/* Grant Detail — only when a specific grant is selected */}
      {selectedGrant ? (
        <>
          {/* Grant Summary */}
          <div className="rounded-xl bg-white shadow p-6">
            <h2 className="text-xl font-bold mb-5 text-gray-800">
              Grant Summary — {selectedGrant.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              <SummaryItem label="Grant ID" value={selectedGrant.id} />
              <SummaryItem label="Donor" value={selectedGrant.donor} />
              <SummaryItem label="Reporting Month" value={selectedGrant.month} />
              <SummaryItem
                label="Report Status"
                value={selectedGrant.reportStatus}
              />
              <SummaryItem
                label="Budget"
                value={selectedGrant.budget.toLocaleString()}
              />
              <SummaryItem
                label="Utilized"
                value={selectedGrant.utilized.toLocaleString()}
              />
              <SummaryItem
                label="Remaining"
                value={selectedGrant.remaining.toLocaleString()}
              />
              <SummaryItem
                label="Utilization Rate"
                value={`${selectedGrant.utilizationRate.toFixed(1)}%`}
              />
              <SummaryItem
                label="Schools Completed PBL"
                value={selectedGrant.schoolsCompleted}
              />
              <SummaryItem
                label="PBL Completion Rate"
                value={`${selectedGrant.completionRate.toFixed(1)}%`}
              />
              <SummaryItem
                label="Attendance Rate"
                value={`${selectedGrant.attendanceRate.toFixed(1)}%`}
              />
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Risk Status
                </p>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    RISK_BADGE[selectedGrant.riskStatus] ??
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {selectedGrant.riskStatus || "Unknown"}
                </span>
              </div>
            </div>
          </div>

          {/* Reports */}
          <AIReport grant={selectedGrant} />
          <AIChat grant={selectedGrant} />
        </>
      ) : (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <h2 className="text-lg font-semibold text-gray-700">
            Select a specific grant to view its summary and generate a report
          </h2>
          <p className="mt-2 text-gray-400 text-sm">
            Use the Grant Selector on the left to choose a grant by name.
          </p>
        </div>
      )}
    </div>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
}