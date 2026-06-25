import { UnifiedGrant } from "./normalizeGrantData";

export interface GrantStats {
  totalGrants: number;
  totalBudget: number;
  utilized: number;
  utilizationRate: number;
  reports: number;
}

export const getGrantStats = (grants: UnifiedGrant[]): GrantStats => {
  if (grants.length === 0) {
    return {
      totalGrants: 0,
      totalBudget: 0,
      utilized: 0,
      utilizationRate: 0,
      reports: 0,
    };
  }

  const totalBudget = grants.reduce((sum, g) => sum + g.budget, 0);
  const utilized = grants.reduce((sum, g) => sum + g.utilized, 0);

  return {
    totalGrants: grants.length,
    totalBudget,
    utilized,
    utilizationRate:
      totalBudget === 0
        ? 0
        : Number(((utilized / totalBudget) * 100).toFixed(1)),
    reports: grants.filter((g) => g.reportStatus === "Submitted").length,
  };
};