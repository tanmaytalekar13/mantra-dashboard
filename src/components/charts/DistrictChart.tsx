import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
} from "recharts";
import { getDistrictData } from "../../utils/chartHelpers";
import { SchoolData } from "../../utils/normalizeData";
import { useDashboard } from "../../context/DashboardContext";

interface Props {
  data: SchoolData[];
}

const RISK_COLOR = (rate: number) => {
  if (rate >= 75) return "#22c55e";
  if (rate >= 60) return "#f59e0b";
  if (rate >= 35) return "#ef4444";
  return "#7f1d1d";
};

export default function DistrictChart({ data }: Props) {
  const chartData = getDistrictData(data);
  const { filters, setFilters } = useDashboard();

  return (
    <div className="bg-white rounded-xl shadow p-5 h-[380px]">
      <h2 className="text-lg font-semibold mb-1 text-gray-800">
        District Participation Rate
      </h2>
      <p className="text-xs text-gray-400 mb-4">
        Click a bar to filter the dashboard by district
      </p>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={chartData} margin={{ bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="district"
            tick={{ fontSize: 11 }}
            angle={-30}
            textAnchor="end"
          />
          <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
          {/* Threshold reference lines */}
          <ReferenceLine y={75} stroke="#22c55e" strokeDasharray="4 2" label={{ value: "On Track 75%", fontSize: 10, fill: "#22c55e", position: "insideTopRight" }} />
          <ReferenceLine y={60} stroke="#f59e0b" strokeDasharray="4 2" label={{ value: "Behind 60%", fontSize: 10, fill: "#f59e0b", position: "insideTopRight" }} />
          <ReferenceLine y={35} stroke="#ef4444" strokeDasharray="4 2" label={{ value: "At Risk 35%", fontSize: 10, fill: "#ef4444", position: "insideTopRight" }} />
          <Bar
            dataKey="participationRate"
            radius={[6, 6, 0, 0]}
            cursor="pointer"
            onClick={(bar) => {
              if (!bar) return;
              setFilters((prev) => ({
                ...prev,
                district:
                  prev.district === bar.district ? "All" : bar.district,
              }));
            }}
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.district}
                fill={
                  filters.district === entry.district
                    ? "#1d4ed8"
                    : RISK_COLOR(entry.participationRate)
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}