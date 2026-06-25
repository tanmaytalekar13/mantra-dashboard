import { Filters, RISK_BANDS } from "../../utils/filterHelpers";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  districts: string[];
  blocks: string[];
  grades: string[];
  subjects: string[];
}

export default function FilterBar({
  filters,
  setFilters,
  districts,
  blocks,
  grades,
  subjects,
}: Props) {
  const update =
    (key: keyof Filters) =>
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
      setFilters((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 bg-white p-4 rounded-xl shadow">
      {/* Search */}
      <input
        placeholder="Search school…"
        className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-2 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
        value={filters.search}
        onChange={update("search")}
      />

      {/* Month */}
      <select
        className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
        value={filters.month}
        onChange={update("month")}
      >
        <option value="All">All Months</option>
        <option>July</option>
        <option>August</option>
        <option>September</option>
      </select>

      {/* District */}
      <select
        className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
        value={filters.district}
        onChange={update("district")}
      >
        <option value="All">All Districts</option>
        {districts.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>

      {/* Block */}
      <select
        className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
        value={filters.block}
        onChange={update("block")}
      >
        <option value="All">All Blocks</option>
        {blocks.map((b) => (
          <option key={b}>{b}</option>
        ))}
      </select>

      {/* Grade */}
      <select
        className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
        value={filters.grade}
        onChange={update("grade")}
      >
        <option value="All">All Grades</option>
        {grades.map((g) => (
          <option key={g}>{g}</option>
        ))}
      </select>

      {/* Subject */}
      <select
        className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
        value={filters.subject}
        onChange={update("subject")}
      >
        <option value="All">All Subjects</option>
        {subjects.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      {/* Risk */}
      <select
        className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
        value={filters.risk}
        onChange={update("risk")}
      >
        <option value="All">All Risk Levels</option>
        {RISK_BANDS.map((band) => (
          <option key={band}>{band}</option>
        ))}
      </select>
    </div>
  );
}