interface Props {
  grants: string[];
  selectedGrant: string;
  onChange: (grant: string) => void;
}

export default function GrantSelector({
  grants,
  selectedGrant,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Grant Selector
        </h2>

        <p className="text-sm text-gray-500">
          Select a grant to view finance, performance and evidence.
        </p>
      </div>

      <select
        value={selectedGrant}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      >
        <option value="All">All Grants</option>

        {grants.map((grant) => (
          <option key={grant} value={grant}>
            {grant}
          </option>
        ))}
      </select>
    </div>
  );
}