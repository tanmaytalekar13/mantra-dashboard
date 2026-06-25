import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getRiskDistribution } from "../../utils/chartHelpers";
import { SchoolData } from "../../utils/normalizeData";

const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
];

interface Props {
  data: SchoolData[];
}

export default function RiskPieChart({ data }: Props) {
  const chartData = getRiskDistribution(data);

  return (
    <div className="bg-white rounded-xl shadow p-5 h-[350px]">
      <h2 className="text-xl font-semibold mb-4">
        Risk Distribution
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {chartData.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}