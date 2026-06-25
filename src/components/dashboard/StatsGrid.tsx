import StatsCard from "./StatsCards";
import { getDashboardStats } from "../../utils/dashboardHelpers";
import { SchoolData } from "../../utils/normalizeData";
import { useDashboard } from "../../context/DashboardContext";
import { DEFAULT_FILTERS } from "../../utils/filterHelpers";

interface Props {
  data: SchoolData[];
  previousData?: SchoolData[]; // prior month slice for MoM delta
}

function delta(current: number, previous?: number): string | undefined {
  if (previous === undefined || previous === 0) return undefined;
  const diff = current - previous;
  return `${diff >= 0 ? "+" : ""}${diff.toFixed(1)}%`;
}

export default function StatsGrid({ data, previousData }: Props) {
  const stats = getDashboardStats(data);
  const prevStats = previousData ? getDashboardStats(previousData) : undefined;
  const { filters, setFilters } = useDashboard();

  const isAllActive =
    filters.search === "" &&
    filters.month === "All" &&
    filters.district === "All" &&
    filters.block === "All" &&
    filters.grade === "All" &&
    filters.subject === "All" &&
    filters.risk === "All";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      <StatsCard
        title="Total Schools"
        value={stats.totalSchools}
        active={isAllActive}
        onClick={() => setFilters(DEFAULT_FILTERS)}
      />
      <StatsCard
        title="Participating"
        value={stats.participatingSchools}
        subtitle={`${stats.participationRate}%`}
        trend={delta(stats.participationRate, prevStats?.participationRate)}
      />
      <StatsCard
        title="Evidence Submitted"
        value={`${stats.evidenceSubmissionRate}%`}
        trend={delta(stats.evidenceSubmissionRate, prevStats?.evidenceSubmissionRate)}
      />
      <StatsCard
        title="Total Enrollment"
        value={stats.totalStudents.toLocaleString()}
      />
      <StatsCard
        title="Total Attendance"
        value={stats.totalAttendance.toLocaleString()}
      />
      <StatsCard
        title="Avg Attendance"
        value={`${stats.avgAttendance}%`}
        trend={delta(stats.avgAttendance, prevStats?.avgAttendance)}
      />
      <StatsCard
        title="Critical / At Risk"
        value={`${stats.criticalCount} / ${stats.atRiskCount}`}
        active={filters.risk === "Critical"}
        onClick={() =>
          setFilters((prev) => ({
            ...prev,
            risk: prev.risk === "Critical" ? "All" : "Critical",
          }))
        }
      />
    </div>
  );
}