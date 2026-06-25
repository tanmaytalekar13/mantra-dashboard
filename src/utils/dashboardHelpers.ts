import { SchoolData } from "./normalizeData";

export const getDashboardStats = (
  data: SchoolData[]
) => {

  const totalSchools = data.length;

  const totalStudents = data.reduce(
    (sum, row) => sum + row.enrollment,
    0
  );

  const avgAttendance =
    data.reduce(
      (sum, row) => sum + row.attendanceRate,
      0
    ) / data.length;

  const highRisk = data.filter(
    (r) => r.riskStatus === "Behind"
  ).length;

  const districts = new Set(
    data.map((d) => d.district)
  ).size;

  const blocks = new Set(
    data.map((d) => d.block)
  ).size;

  return {
    totalSchools,
    totalStudents,
    avgAttendance,
    highRisk,
    districts,
    blocks,
  };
};