import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { NormalizedGrant } from "../../utils/normalizeGrantData";
import { getBudgetChartData } from "../../utils/grantChartHelpers";

interface Props {
  grants: NormalizedGrant[];
}

export default function BudgetChart({
  grants,
}: Props) {

  const chartData = getBudgetChartData(grants);

  return (
    <div className="bg-white rounded-xl shadow p-6 h-[400px]">

      <h2 className="text-xl font-semibold mb-5">
        Budget Utilization
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis dataKey="name"/>

          <YAxis/>

          <Tooltip/>

          <Bar
            dataKey="value"
            fill="#2563eb"
            radius={[8,8,0,0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}