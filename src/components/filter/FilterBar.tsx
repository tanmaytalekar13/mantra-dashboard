import { Filters } from "../../utils/filterHelpers";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  districts: string[];
}

export default function FilterBar({
  filters,
  setFilters,
  districts,
}: Props) {
  return (
    <div className="grid md:grid-cols-4 gap-4 bg-white p-4 rounded-xl shadow">

      <input
        placeholder="Search School..."
        className="border rounded-lg px-3 py-2"
        value={filters.search}
        onChange={(e) =>
          setFilters({
            ...filters,
            search: e.target.value,
          })
        }
      />

      <select
        className="border rounded-lg px-3 py-2"
        value={filters.month}
        onChange={(e) =>
          setFilters({
            ...filters,
            month: e.target.value,
          })
        }
      >
        <option>All</option>
        <option>July</option>
        <option>August</option>
        <option>September</option>
      </select>

      <select
        className="border rounded-lg px-3 py-2"
        value={filters.district}
        onChange={(e) =>
          setFilters({
            ...filters,
            district: e.target.value,
          })
        }
      >
        <option>All</option>

        {districts.map((district) => (
          <option key={district}>
            {district}
          </option>
        ))}
      </select>

      <select
        className="border rounded-lg px-3 py-2"
        value={filters.risk}
        onChange={(e) =>
          setFilters({
            ...filters,
            risk: e.target.value,
          })
        }
      >
        <option>All</option>
        <option>On Track</option>
        <option>Behind</option>
        <option>Needs Attention</option>
      </select>

    </div>
  );
}