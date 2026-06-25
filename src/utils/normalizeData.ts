import { PBLRecord } from "../types/pbl";

export interface SchoolData {
  schoolName: string;
  schoolCode: string;
  district: string;
  block: string;
  grades: string;
  subjects: string;
  participated: boolean;
  evidenceSubmitted: boolean;
  enrollment: number;
  attendance: number;
  attendanceRate: number;
  riskStatus: string;
  month: string;
}

/** Safely read a string column; returns "" on missing */
const str = (row: PBLRecord, key: string): string => {
  const v = row[key];
  if (v === null || v === undefined) return "";
  return String(v).trim();
};

/** Safely read a numeric column; returns 0 on missing/NaN */
const num = (row: PBLRecord, key: string): number => {
  const v = row[key];
  if (v === null || v === undefined || v === "") return 0;
  const n = Number(String(v).replace(/,/g, "").replace(/%/g, "").trim());
  return isNaN(n) ? 0 : n;
};

export const normalizeData = (rows: PBLRecord[]): SchoolData[] => {
  return rows.map((row) => {
    const rawRate = num(row, "Derived: Overall PBL attendance rate");

    // CSV may store 0–1 (decimal) or 0–100 (percentage); normalise to 0–100
    const attendanceRate = rawRate > 1 ? rawRate : rawRate * 100;

    return {
      schoolName: str(row, "What is the name of your school?"),
      schoolCode: str(row, "What is your school's synthetic school code?"),
      district: str(row, "What is the name of your district?"),
      block: str(row, "Block Details"),
      grades: str(row, "Which grades participated?"),
      subjects: str(row, "Which subjects were covered?"),
      participated:
        str(row, "Did your school participate in PBL this month?").toLowerCase() === "yes",
      evidenceSubmitted:
        str(row, "Was evidence submitted this month?").toLowerCase() === "yes",
      enrollment: num(row, "Derived: Total enrollment across Classes 6-8"),
      attendance: num(
        row,
        "Derived: Total attendance across PBL Science and Math sessions"
      ),
      attendanceRate: Number(attendanceRate.toFixed(2)),
      riskStatus: str(row, "Derived: Risk status"),
      month: str(row, "month"),
    };
  });
};