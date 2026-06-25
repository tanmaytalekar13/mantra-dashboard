import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

import { getDistrictData } from "../../utils/chartHelpers";
import { SchoolData } from "../../utils/normalizeData";
import { useDashboard } from "../../context/DashboardContext";

interface Props {
  data: SchoolData[];
}

export default function DistrictChart({ data }: Props) {
  const chartData = getDistrictData(data);

  const { filters, setFilters } = useDashboard();

  return (
    <div className="bg-white rounded-xl shadow p-5 h-[380px]">

      <h2 className="text-xl font-semibold mb-5">
        District Enrollment
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="district" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="students"
            radius={[8, 8, 0, 0]}
            cursor="pointer"
            onClick={(bar) => {
              if (!bar) return;

              setFilters((prev) => ({
                ...prev,
                district:
                  prev.district === bar.district
                    ? "All"
                    : bar.district,
              }));
            }}
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.district}
                fill={
                  filters.district === entry.district
                    ? "#2563eb"
                    : "#93c5fd"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}