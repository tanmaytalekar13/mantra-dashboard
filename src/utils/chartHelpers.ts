import { SchoolData } from "./normalizeData";

/* ---------- Attendance Trend ---------- */

export const getAttendanceTrend = (data: SchoolData[]) => {
  const grouped: Record<
    string,
    { total: number; count: number }
  > = {};

  data.forEach((row) => {
    if (!grouped[row.month]) {
      grouped[row.month] = {
        total: 0,
        count: 0,
      };
    }

    grouped[row.month].total += row.attendanceRate;
    grouped[row.month].count++;
  });

  return Object.entries(grouped).map(([month, value]) => ({
    month,
    attendance: Number(
      (value.total / value.count).toFixed(2)
    ),
  }));
};

/* ---------- Risk Distribution ---------- */

export const getRiskDistribution = (data: SchoolData[]) => {
  const grouped: Record<string, number> = {};

  data.forEach((row) => {
    grouped[row.riskStatus] =
      (grouped[row.riskStatus] || 0) + 1;
  });

  return Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }));
};

/* ---------- District Comparison ---------- */

export const getDistrictData = (data: SchoolData[]) => {
  const grouped: Record<string, number> = {};

  data.forEach((row) => {
    grouped[row.district] =
      (grouped[row.district] || 0) + row.enrollment;
  });

  return Object.entries(grouped).map(([district, students]) => ({
    district,
    students,
  }));
};