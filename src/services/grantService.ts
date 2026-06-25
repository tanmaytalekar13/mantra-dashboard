import { loadCSV } from "./csvService";
import {
  GrantFinance,
  GrantPerformance,
  GrantEvidence,
  GrantData,
} from "../types/grant";

export const loadGrantData = async (): Promise<GrantData> => {
  const [profile, performance, evidence] = await Promise.all([
    loadCSV<GrantFinance>(
      "/data/grant/csv/01_Grant_Profile_and_Finance.csv"
    ),

    loadCSV<GrantPerformance>(
      "/data/grant/csv/02_Grant_Performance_and_Report_Material.csv"
    ),

    loadCSV<GrantEvidence>(
      "/data/grant/csv/03_Evidence_and_Media_Index.csv"
    ),
  ]);

  return {
    profile,
    performance,
    evidence,
  };
};