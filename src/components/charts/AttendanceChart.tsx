import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getAttendanceTrend, getParticipationTrend } from "../../utils/chartHelpers";
import { SchoolData } from "../../utils/normalizeData";

interface Props {
  data: SchoolData[];
}

export default function AttendanceChart({ data }: Props) {
  const attendanceTrend = getAttendanceTrend(data);
  const participationTrend = getParticipationTrend(data);

  // Merge by month
  const merged = attendanceTrend.map((a) => {
    const p = participationTrend.find((pt) => pt.month === a.month);
    return {
      month: a.month,
      "Attendance %": a.attendance,
      "Participation %": p?.participation ?? 0,
    };
  });

  return (
    <div className="bg-white rounded-xl shadow p-5 h-[350px]">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Monthly Trends — Attendance & Participation
      </h2>
      <ResponsiveContainer width="100%" height="88%">
        <LineChart data={merged}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="Attendance %"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="Participation %"
            stroke="#16a34a"
            strokeWidth={2.5}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}