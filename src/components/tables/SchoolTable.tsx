import { useState } from "react";
import { SchoolData } from "../../utils/normalizeData";

const RISK_CLASSES: Record<string, string> = {
  "On Track": "bg-green-100 text-green-700",
  Behind: "bg-yellow-100 text-yellow-700",
  "At Risk": "bg-red-100 text-red-700",
  Critical: "bg-red-900 text-white",
};

const PAGE_SIZE = 15;

interface Props {
  data: SchoolData[];
}

export default function SchoolTable({ data }: Props) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  const pageData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <p className="text-gray-500 text-sm">
          No schools match the current filters. Adjust your selection above.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[
                "School",
                "Code",
                "District",
                "Block",
                "Month",
                "Participated",
                "Evidence",
                "Enrollment",
                "Attendance %",
                "Risk",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pageData.map((school) => (
              <tr
                key={`${school.schoolCode}-${school.month}`}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-800">
                  {school.schoolName || "—"}
                </td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                  {school.schoolCode || "—"}
                </td>
                <td className="px-4 py-3">{school.district || "—"}</td>
                <td className="px-4 py-3">{school.block || "—"}</td>
                <td className="px-4 py-3">{school.month}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      school.participated
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {school.participated ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      school.evidenceSubmitted
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {school.evidenceSubmitted ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3">{school.enrollment.toLocaleString()}</td>
                <td className="px-4 py-3">{school.attendanceRate.toFixed(1)}%</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      RISK_CLASSES[school.riskStatus] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {school.riskStatus || "Unknown"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-sm text-gray-500">
          <span>
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, data.length)} of {data.length} schools
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}