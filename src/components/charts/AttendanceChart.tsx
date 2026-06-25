import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { getAttendanceTrend } from "../../utils/chartHelpers";
import { SchoolData } from "../../utils/normalizeData";

interface Props {
  data: SchoolData[];
}

export default function AttendanceChart({ data }: Props) {
  const chartData = getAttendanceTrend(data);

  return (
    <div className="bg-white rounded-xl shadow p-5 h-[350px]">
      <h2 className="text-xl font-semibold mb-4">
        Attendance Trend
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="attendance"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}