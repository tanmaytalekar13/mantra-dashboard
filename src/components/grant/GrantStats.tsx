import StatsCard from "../dashboard/StatsCards";
import { getGrantStats } from "../../utils/grantDashboardHelpers";
import { UnifiedGrant } from "../../utils/normalizeGrantData";

interface Props {
  grants: UnifiedGrant[];
}

export default function GrantStats({ grants }: Props) {
  const stats = getGrantStats(grants);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard title="Grants" value={stats.totalGrants} />
      <StatsCard
        title="Total Budget"
        value={stats.totalBudget.toLocaleString()}
      />
      <StatsCard
        title="Utilized"
        value={`${stats.utilized.toLocaleString()} (${stats.utilizationRate}%)`}
      />
      <StatsCard title="Reports Submitted" value={stats.reports} />
    </div>
  );
}