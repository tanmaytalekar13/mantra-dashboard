import { SchoolData } from "../../utils/normalizeData";

interface Props {
  data: SchoolData[];
}

export default function SchoolTable({
  data,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-auto">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              School
            </th>

            <th className="p-3 text-left">
              District
            </th>

            <th className="p-3 text-left">
              Month
            </th>

            <th className="p-3 text-left">
              Enrollment
            </th>

            <th className="p-3 text-left">
              Attendance %
            </th>

            <th className="p-3 text-left">
              Risk
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((school) => (
            <tr
              key={`${school.schoolCode}-${school.month}`}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-3">
                {school.schoolName}
              </td>

              <td className="p-3">
                {school.district}
              </td>

              <td className="p-3">
                {school.month}
              </td>

              <td className="p-3">
                {school.enrollment}
              </td>

              <td className="p-3">
                {school.attendanceRate.toFixed(1)}%
              </td>

              <td className="p-3">
                {school.riskStatus}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}