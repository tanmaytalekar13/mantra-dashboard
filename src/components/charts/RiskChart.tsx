import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getRiskDistribution } from "../../utils/chartHelpers";
import { SchoolData } from "../../utils/normalizeData";

// Colors aligned to spec bands: On Track, Behind, At Risk, Critical
const BAND_COLORS: Record<string, string> = {
  "On Track": "#22c55e",
  Behind: "#f59e0b",
  "At Risk": "#ef4444",
  Critical: "#7f1d1d",
};

interface Props {
  data: SchoolData[];
}

export default function RiskPieChart({ data }: Props) {
  const chartData = getRiskDistribution(data);

  return (
    <div className="bg-white rounded-xl shadow p-5 h-[350px]">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Risk Distribution
      </h2>
      {chartData.length === 0 ? (
        <div className="flex h-4/5 items-center justify-center text-gray-400 text-sm">
          No data to display
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="88%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label={({ name, value }) => `${name}: ${value}`}
              labelLine={false}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={BAND_COLORS[entry.name] ?? "#94a3b8"}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}