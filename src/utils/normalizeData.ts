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

const str = (row: PBLRecord, key: string): string => {
  const v = row[key];
  if (v === null || v === undefined) return "";
  return String(v).trim();
};

const num = (row: PBLRecord, key: string): number => {
  const v = row[key];
  if (v === null || v === undefined || v === "") return 0;
  const n = Number(String(v).replace(/,/g, "").replace(/%/g, "").trim());
  return isNaN(n) ? 0 : n;
};

export const normalizeData = (rows: PBLRecord[]): SchoolData[] => {
  return rows.map((row) => {
    const rawRate = num(row, "Derived: Overall PBL attendance rate");
    // CSV stores 0–1 decimal (e.g. 0.7074) — convert to percentage
    const attendanceRate = rawRate > 1 ? rawRate : rawRate * 100;

    return {
      schoolName: str(row, "What is the name of your school?"),
      schoolCode: str(row, "What is your school's synthetic school code?"),
      district: str(row, "What is the name of your district?"),
      block: str(row, "Block Details"),
      // ✅ FIXED: actual CSV column names
      grades: str(row, "In which class/classes did you conduct the PBL project?"),
      subjects: str(row, "Which subject do you teach?"),
      participated:
        str(row, "Was the PBL project conducted in your school this month?").toLowerCase() === "yes",
      evidenceSubmitted:
        str(row, "Was evidence submitted for the completed PBL project?").toLowerCase() === "yes",
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