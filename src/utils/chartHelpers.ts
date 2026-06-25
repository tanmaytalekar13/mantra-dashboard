import { SchoolData } from "./normalizeData";

const MONTH_ORDER = ["July", "August", "September"];

/* ---------- Attendance Trend (sorted) ---------- */
export const getAttendanceTrend = (data: SchoolData[]) => {
  const grouped: Record<string, { total: number; count: number }> = {};

  data.forEach((row) => {
    if (!grouped[row.month]) {
      grouped[row.month] = { total: 0, count: 0 };
    }
    grouped[row.month].total += row.attendanceRate;
    grouped[row.month].count++;
  });

  return MONTH_ORDER.filter((m) => grouped[m]).map((month) => ({
    month,
    attendance: Number(
      (grouped[month].total / grouped[month].count).toFixed(2)
    ),
  }));
};

/* ---------- Participation Trend (sorted) ---------- */
export const getParticipationTrend = (data: SchoolData[]) => {
  const grouped: Record<string, { participating: number; total: number }> = {};

  data.forEach((row) => {
    if (!grouped[row.month]) {
      grouped[row.month] = { participating: 0, total: 0 };
    }
    grouped[row.month].total++;
    if (row.participated) grouped[row.month].participating++;
  });

  return MONTH_ORDER.filter((m) => grouped[m]).map((month) => ({
    month,
    participation: Number(
      ((grouped[month].participating / grouped[month].total) * 100).toFixed(2)
    ),
  }));
};

/* ---------- Risk Distribution ---------- */
export const getRiskDistribution = (data: SchoolData[]) => {
  const grouped: Record<string, number> = {};

  data.forEach((row) => {
    if (!row.riskStatus) return;
    grouped[row.riskStatus] = (grouped[row.riskStatus] || 0) + 1;
  });

  const order = ["On Track", "Behind", "At Risk", "Critical"];
  return order
    .filter((name) => grouped[name] !== undefined)
    .map((name) => ({ name, value: grouped[name] }));
};

/* ---------- District Participation Rate ---------- */
export const getDistrictData = (data: SchoolData[]) => {
  const grouped: Record<string, { participating: number; total: number }> = {};

  data.forEach((row) => {
    if (!grouped[row.district]) {
      grouped[row.district] = { participating: 0, total: 0 };
    }
    grouped[row.district].total++;
    if (row.participated) grouped[row.district].participating++;
  });

  return Object.entries(grouped)
    .map(([district, val]) => ({
      district,
      participationRate: Number(
        ((val.participating / val.total) * 100).toFixed(1)
      ),
      total: val.total,
    }))
    .sort((a, b) => b.participationRate - a.participationRate);
};

