import { useMemo, useState } from "react";

import { usePBLData } from "../hooks/usePBLData";

import StatsGrid from "../components/dashboard/StatsGrid";
import AttendanceChart from "../components/charts/AttendanceChart";
import RiskPieChart from "../components/charts/RiskChart";
import DistrictChart from "../components/charts/DistrictChart";
import FilterBar from "../components/filter/FilterBar";
import SchoolTable from "../components/tables/SchoolTable";

import { Filters, filterSchools } from "../utils/filterHelpers";

import { DashboardContext } from "../context/DashboardContext";

export default function Dashboard() {
  const { data, loading, error } = usePBLData();

  const [filters, setFilters] = useState<Filters>({
    search: "",
    month: "All",
    district: "All",
    risk: "All",
  });

  const filteredData = useMemo(() => {
    return filterSchools(data, filters);
  }, [data, filters]);

  const districts = useMemo(() => {
    return [...new Set(data.map((d) => d.district))].sort();
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <DashboardContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      <div className="min-h-screen bg-gray-100 p-8 space-y-8">

        {/* Heading */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            PBL Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            School Performance Analytics
          </p>
        </div>

        {/* Stats */}
        <StatsGrid data={filteredData} />

        {/* Attendance */}
        <AttendanceChart data={filteredData} />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RiskPieChart data={filteredData} />
          <DistrictChart data={filteredData} />
        </div>

        {/* Filters */}
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          districts={districts}
        />

        {/* Table */}
        <SchoolTable data={filteredData} />
      </div>
    </DashboardContext.Provider>
  );
}