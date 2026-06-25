import { SchoolData } from "./normalizeData";

export interface Filters {
  search: string;
  month: string;
  district: string;
  block: string;
  grade: string;
  subject: string;
  risk: string;
}

export const DEFAULT_FILTERS: Filters = {
  search: "",
  month: "All",
  district: "All",
  block: "All",
  grade: "All",
  subject: "All",
  risk: "All",
};

export const filterSchools = (
  schools: SchoolData[],
  filters: Filters
): SchoolData[] => {
  return schools.filter((school) => {
    const matchSearch =
      !filters.search ||
      school.schoolName.toLowerCase().includes(filters.search.toLowerCase()) ||
      school.schoolCode.toLowerCase().includes(filters.search.toLowerCase());

    const matchMonth =
      filters.month === "All" || school.month === filters.month;

    const matchDistrict =
      filters.district === "All" || school.district === filters.district;

    const matchBlock =
      filters.block === "All" || school.block === filters.block;

    const matchGrade =
      filters.grade === "All" ||
      school.grades.toLowerCase().includes(filters.grade.toLowerCase());

    const matchSubject =
      filters.subject === "All" ||
      school.subjects.toLowerCase().includes(filters.subject.toLowerCase());

    const matchRisk =
      filters.risk === "All" || school.riskStatus === filters.risk;

    return (
      matchSearch &&
      matchMonth &&
      matchDistrict &&
      matchBlock &&
      matchGrade &&
      matchSubject &&
      matchRisk
    );
  });
};

export const RISK_BANDS = [
  "On Track",
  "Behind",
  "At Risk",
  "Critical",
] as const;

export type RiskBand = (typeof RISK_BANDS)[number];