import { useMemo, useState } from "react";
import { usePBLData } from "../hooks/usePBLData";
import StatsGrid from "../components/dashboard/StatsGrid";
import AttendanceChart from "../components/charts/AttendanceChart";
import RiskPieChart from "../components/charts/RiskChart";
import DistrictChart from "../components/charts/DistrictChart";
import FilterBar from "../components/filter/FilterBar";
import SchoolTable from "../components/tables/SchoolTable";
import { Filters, DEFAULT_FILTERS, filterSchools } from "../utils/filterHelpers";
import { DashboardContext } from "../context/DashboardContext";

const MONTH_ORDER = ["July", "August", "September"];

export default function Dashboard() {
  const { data, loading, error } = usePBLData();

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const filteredData = useMemo(
    () => filterSchools(data, filters),
    [data, filters]
  );

  // Derive unique filter options from full dataset (not filtered)
  const districts = useMemo(
    () => [...new Set(data.map((d) => d.district))].filter(Boolean).sort(),
    [data]
  );
  const blocks = useMemo(
    () => [...new Set(data.map((d) => d.block))].filter(Boolean).sort(),
    [data]
  );
  const grades = useMemo(() => {
    const all = new Set<string>();
    data.forEach((d) =>
      d.grades.split(",").forEach((g) => {
        const t = g.trim();
        if (t) all.add(t);
      })
    );
    return [...all].sort();
  }, [data]);
  const subjects = useMemo(() => {
    const all = new Set<string>();
    data.forEach((d) =>
      d.subjects.split(",").forEach((s) => {
        const t = s.trim();
        if (t) all.add(t);
      })
    );
    return [...all].sort();
  }, [data]);

  // Previous month slice for MoM delta on stats
  const previousMonthData = useMemo(() => {
    if (filters.month === "All") return undefined;
    const idx = MONTH_ORDER.indexOf(filters.month);
    if (idx <= 0) return undefined;
    const prevMonth = MONTH_ORDER[idx - 1];
    return filterSchools(data, { ...filters, month: prevMonth });
  }, [data, filters]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-700 mb-2">
            Loading Dashboard…
          </div>
          <p className="text-gray-400 text-sm">Parsing PBL data files</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-600">
          <div className="text-2xl font-semibold mb-2">Failed to load data</div>
          <p className="text-sm text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardContext.Provider value={{ filters, setFilters }}>
      <div className="min-h-screen bg-gray-50 p-6 space-y-6">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">PBL Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">
            School Performance Analytics — July to September 2025
          </p>
        </div>

        {/* Filters — above everything per UX spec */}
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          districts={districts}
          blocks={blocks}
          grades={grades}
          subjects={subjects}
        />

        {/* KPI Cards with MoM */}
        <StatsGrid data={filteredData} previousData={previousMonthData} />

        {/* Trend Charts */}
        <AttendanceChart data={filteredData} />

        {/* District + Risk Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RiskPieChart data={filteredData} />
          <DistrictChart data={filteredData} />
        </div>

        {/* School Table */}
        <SchoolTable data={filteredData} />
      </div>
    </DashboardContext.Provider>
  );
}