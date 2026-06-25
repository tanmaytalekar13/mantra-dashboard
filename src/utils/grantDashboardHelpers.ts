import { NormalizedGrant } from "./normalizeGrantData";

export const getGrantStats = (
  grants: NormalizedGrant[]
) => {

  const totalGrants = grants.length;

  const totalBudget = grants.reduce(
    (sum, g) => sum + g.budget,
    0
  );

  const utilized = grants.reduce(
    (sum, g) => sum + g.utilized,
    0
  );

  const reports = grants.filter(
    g => g.reportStatus === "Submitted"
  ).length;

  return {

    totalGrants,

    totalBudget,

    utilized,

    reports,

  };

};