import StatsCard from "../dashboard/StatsCards";
import { getGrantStats } from "../../utils/grantDashboardHelpers";
import { NormalizedGrant } from "../../utils/normalizeGrantData";

interface Props{
    grants:NormalizedGrant[]
}

export default function GrantStats({grants}:Props){

const stats=getGrantStats(grants);

return(

<div className="grid grid-cols-4 gap-6">

<StatsCard
title="Grants"
value={stats.totalGrants}
/>

<StatsCard
title="Budget"
value={stats.totalBudget.toLocaleString()}
/>

<StatsCard
title="Utilized"
value={stats.utilized.toLocaleString()}
/>

<StatsCard
title="Reports"
value={stats.reports}
/>

</div>

)

}