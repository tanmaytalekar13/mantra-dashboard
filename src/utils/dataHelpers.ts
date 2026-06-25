import { PBLRecord } from "../types/pbl";

export const cleanNumber = (value: any): number => {
  if (!value) return 0;

  return Number(
    value
      .toString()
      .replace(/,/g, "")
      .replace("%", "")
      .trim()
  );
};

export const safeValue = (value: any) => {
  if (value === null || value === undefined) return "";

  return value.toString().trim();
};

export const normalizeRisk = (risk: any) => {
  return safeValue(risk);
};

export const normalizeAttendance = (attendance: any) => {
  return cleanNumber(attendance);
};

export const prepareData = (data: PBLRecord[]) => {
  return data.map((row) => ({
    ...row,
  }));
};