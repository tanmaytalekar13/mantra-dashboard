import { PBLRecord } from "../types/pbl";

export interface SchoolData {
  schoolName: string;
  schoolCode: string;
  district: string;
  block: string;
  enrollment: number;
  attendance: number;
  attendanceRate: number;
  riskStatus: string;
  month: string;
}

export const normalizeData = (
  rows: PBLRecord[]
): SchoolData[] => {
  return rows.map((row) => ({
    schoolName:
      String(row["What is the name of your school?"]),

    schoolCode:
      String(row["What is your school's synthetic school code?"]),

    district:
      String(row["What is the name of your district?"]),

    block:
      String(row["Block Details"]),

    enrollment:
      Number(
        row[
          "Derived: Total enrollment across Classes 6-8"
        ]
      ),

    attendance:
      Number(
        row[
          "Derived: Total attendance across PBL Science and Math sessions"
        ]
      ),

    attendanceRate:
      Number(
        row[
          "Derived: Overall PBL attendance rate"
        ]
      ) * 100,

    riskStatus:
      String(row["Derived: Risk status"]),

    month:
      String(row.month),
  }));
};