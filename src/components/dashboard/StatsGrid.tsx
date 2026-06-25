import StatsCard from "./StatsCards";
import { getDashboardStats } from "../../utils/dashboardHelpers";
import { SchoolData } from "../../utils/normalizeData";

import { useDashboard } from "../../context/DashboardContext";

interface Props {
  data: SchoolData[];
}

export default function StatsGrid({ data }: Props) {
  const stats = getDashboardStats(data);

  const { filters, setFilters } = useDashboard();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">

      <StatsCard
        title="Schools"
        value={stats.totalSchools}
        active={
          filters.search === "" &&
          filters.month === "All" &&
          filters.district === "All" &&
          filters.risk === "All"
        }
        onClick={() =>
          setFilters({
            search: "",
            month: "All",
            district: "All",
            risk: "All",
          })
        }
      />

      <StatsCard
        title="Students"
        value={stats.totalStudents}
      />

      <StatsCard
        title="Attendance"
        value={`${stats.avgAttendance.toFixed(1)}%`}
      />

      <StatsCard
        title="High Risk"
        value={stats.highRisk}
        active={filters.risk === "Behind"}
        onClick={() =>
          setFilters((prev) => ({
            ...prev,
            risk: prev.risk === "Behind" ? "All" : "Behind",
          }))
        }
      />

      <StatsCard
        title="Districts"
        value={stats.districts}
      />

      <StatsCard
        title="Blocks"
        value={stats.blocks}
      />
    </div>
  );
}