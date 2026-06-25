import { NormalizedGrant } from "./normalizeGrantData";

export const getBudgetChartData = (
  grants: NormalizedGrant[]
) => {
  const budget = grants.reduce(
    (sum, grant) => sum + grant.budget,
    0
  );

  const utilized = grants.reduce(
    (sum, grant) => sum + grant.utilized,
    0
  );

  const remaining = budget - utilized;

  return [
    {
      name: "Budget",
      value: budget,
    },
    {
      name: "Utilized",
      value: utilized,
    },
    {
      name: "Remaining",
      value: remaining,
    },
  ];
};