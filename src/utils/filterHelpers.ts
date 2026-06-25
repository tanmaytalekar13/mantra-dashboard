import { SchoolData } from "./normalizeData";

export interface Filters {
  search: string;
  month: string;
  district: string;
  risk: string;
}

export const filterSchools = (
  schools: SchoolData[],
  filters: Filters
) => {
  return schools.filter((school) => {
    const matchSearch =
      school.schoolName
        .toLowerCase()
        .includes(filters.search.toLowerCase());

    const matchMonth =
      filters.month === "All" ||
      school.month === filters.month;

    const matchDistrict =
      filters.district === "All" ||
      school.district === filters.district;

    const matchRisk =
      filters.risk === "All" ||
      school.riskStatus === filters.risk;

    return (
      matchSearch &&
      matchMonth &&
      matchDistrict &&
      matchRisk
    );
  });
};