import { UnifiedGrant } from "./normalizeGrantData";

export const getBudgetChartData = (grants: UnifiedGrant[]) => {
  return grants.map((grant) => ({
    name: grant.name,
    Budget: grant.budget,
    Utilized: grant.utilized,
    Remaining: grant.remaining,
  }));
};