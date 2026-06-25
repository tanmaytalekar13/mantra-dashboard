import Papa from "papaparse";
import { PBLRecord } from "../types/pbl";

const PBL_FILES = [
  {
    path: "/data/pbl/PBL_School_Response_Data_July_2025.csv",
    month: "July",
  },
  {
    path: "/data/pbl/PBL_School_Response_Data_August_2025.csv",
    month: "August",
  },
  {
    path: "/data/pbl/PBL_School_Response_Data_September_2025.csv",
    month: "September",
  },
];

export const loadCSV = <T extends object>(
  path: string,
  extra?: Partial<T>
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<T>(path, {
      download: true,
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        const data = results.data.map((row) => ({
          ...row,
          ...extra,
        }));

        resolve(data as T[]);
      },

      error: reject,
    });
  });
};

export const loadAllPBLData = async (): Promise<PBLRecord[]> => {
  const datasets = await Promise.all(
    PBL_FILES.map((file) =>
      loadCSV<PBLRecord>(file.path, {
        month: file.month,
      })
    )
  );

  return datasets.flat();
};