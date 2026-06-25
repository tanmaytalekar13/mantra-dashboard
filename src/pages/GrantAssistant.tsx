import { useMemo, useState } from "react";

import { useGrantData } from "../hooks/useGrantData";
import { normalizeGrantData } from "../utils/normalizeGrantData";

import GrantStats from "../components/grant/GrantStats";
import GrantSelector from "../components/grant/GrantSelector";
import BudgetChart from "../components/grant/BudgetChart";
import EvidenceGallery from "../components/grant/EvidenceGallery";
import AIReport from "../components/ai/AIReport";
import AIChat from "../components/ai/AIChat";

export default function GrantAssistant() {
  const { data, loading, error } = useGrantData();

  const unifiedGrants = useMemo(() => {
    if (!data) return [];

    return normalizeGrantData(
      data.profile,
      data.performance,
      data.evidence
    );
  }, [data]);

  const [selectedGrant, setSelectedGrant] = useState("All");

  const grantNames = useMemo(() => {
    return [...new Set(unifiedGrants.map((grant) => grant.name))];
  }, [unifiedGrants]);

  const filteredGrants = useMemo(() => {
    if (selectedGrant === "All") {
      return unifiedGrants;
    }

    return unifiedGrants.filter(
      (grant) => grant.name === selectedGrant
    );
  }, [selectedGrant, unifiedGrants]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold">
        Loading Grant Dashboard...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-screen items-center justify-center text-red-600 text-xl">
        {error || "No Data Found"}
      </div>
    );
  }

  const selected = filteredGrants[0];

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">
          Grant Reporting Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Finance • Performance • Evidence Analytics
        </p>
      </div>

      {/* KPI Cards */}
      <GrantStats grants={filteredGrants} />

      {/* Selector + Budget Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <GrantSelector
          grants={grantNames}
          selectedGrant={selectedGrant}
          onChange={setSelectedGrant}
        />

        <div className="lg:col-span-2">
          <BudgetChart grants={filteredGrants} />
        </div>

      </div>

      {/* Evidence Gallery */}
      <EvidenceGallery grants={filteredGrants} />

      {/* Grant Summary */}
      {selected ? (
        <>
          <div className="rounded-xl bg-white shadow p-6">

            <h2 className="text-2xl font-bold mb-6">
              Grant Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              <SummaryItem
                label="Grant Name"
                value={selected.name}
              />

              <SummaryItem
                label="Donor"
                value={selected.donor}
              />

              <SummaryItem
                label="Reporting Month"
                value={selected.month}
              />

              <SummaryItem
                label="Budget"
                value={selected.budget.toLocaleString()}
              />

              <SummaryItem
                label="Utilized"
                value={selected.utilized.toLocaleString()}
              />

              <SummaryItem
                label="Remaining"
                value={selected.remaining.toLocaleString()}
              />

              <SummaryItem
                label="Budget Utilization"
                value={`${selected.utilizationRate.toFixed(1)}%`}
              />

              <SummaryItem
                label="Attendance"
                value={`${selected.attendanceRate.toFixed(1)}%`}
              />

              <div>
                <p className="text-sm text-gray-500">
                  Risk Status
                </p>

                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                    selected.riskStatus === "On Track"
                      ? "bg-green-100 text-green-700"
                      : selected.riskStatus === "Needs Attention"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selected.riskStatus}
                </span>
              </div>

            </div>

          </div>

          {/* AI Report */}
          <AIReport grant={selected} />
            {/* AI Chat */}
            <AIChat grant={selected} />
        </>
      ) : (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <h2 className="text-xl font-semibold text-gray-700">
            No Grant Selected
          </h2>

          <p className="mt-2 text-gray-500">
            Select a grant to view its summary and generate an AI report.
          </p>
        </div>
      )}

    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-semibold">
        {value}
      </p>
    </div>
  );
}