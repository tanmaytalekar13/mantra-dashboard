import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { UnifiedGrant } from "../../utils/normalizeGrantData";
import { getBudgetChartData } from "../../utils/grantChartHelpers";

interface Props {
  grants: UnifiedGrant[];
}

export default function BudgetChart({ grants }: Props) {
  const chartData = getBudgetChartData(grants);

  return (
    <div className="bg-white rounded-xl shadow p-6 h-[400px]">
      <h2 className="text-lg font-semibold mb-5 text-gray-800">
        Budget vs Utilization per Grant
      </h2>
      <ResponsiveContainer width="100%" height="88%">
        <BarChart data={chartData} margin={{ bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11 }}
            angle={-20}
            textAnchor="end"
          />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip
            formatter={(v: number) => v.toLocaleString()}
          />
          <Legend />
          <Bar dataKey="Budget" fill="#93c5fd" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Utilized" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}