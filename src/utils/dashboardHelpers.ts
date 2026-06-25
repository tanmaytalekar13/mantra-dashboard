import { SchoolData } from "./normalizeData";

const MONTH_ORDER = ["July", "August", "September"];

export interface DashboardStats {
  totalSchools: number;
  participatingSchools: number;
  participationRate: number;
  evidenceSubmissionRate: number;
  totalStudents: number;
  totalAttendance: number;
  avgAttendance: number;
  criticalCount: number;
  atRiskCount: number;
  districts: number;
  blocks: number;
}

export const getDashboardStats = (data: SchoolData[]): DashboardStats => {
  const totalSchools = data.length;

  if (totalSchools === 0) {
    return {
      totalSchools: 0,
      participatingSchools: 0,
      participationRate: 0,
      evidenceSubmissionRate: 0,
      totalStudents: 0,
      totalAttendance: 0,
      avgAttendance: 0,
      criticalCount: 0,
      atRiskCount: 0,
      districts: 0,
      blocks: 0,
    };
  }

  const participatingSchools = data.filter((r) => r.participated).length;
  const evidenceSchools = data.filter((r) => r.evidenceSubmitted).length;
  const totalStudents = data.reduce((sum, r) => sum + r.enrollment, 0);
  const totalAttendance = data.reduce((sum, r) => sum + r.attendance, 0);
  const avgAttendance =
    data.reduce((sum, r) => sum + r.attendanceRate, 0) / totalSchools;

  const criticalCount = data.filter((r) => r.riskStatus === "Critical").length;
  const atRiskCount = data.filter((r) => r.riskStatus === "At Risk").length;

  return {
    totalSchools,
    participatingSchools,
    participationRate: Number(
      ((participatingSchools / totalSchools) * 100).toFixed(1)
    ),
    evidenceSubmissionRate: Number(
      ((evidenceSchools / totalSchools) * 100).toFixed(1)
    ),
    totalStudents,
    totalAttendance,
    avgAttendance: Number(avgAttendance.toFixed(1)),
    criticalCount,
    atRiskCount,
    districts: new Set(data.map((d) => d.district)).size,
    blocks: new Set(data.map((d) => d.block)).size,
  };
};

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

  // Return in spec order
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