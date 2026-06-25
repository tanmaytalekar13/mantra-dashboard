import { UnifiedGrant } from "../../utils/normalizeGrantData";

interface Props {
  grants: UnifiedGrant[];
}

/**
 * Normalise the image path from the CSV's relative_path field.
 * The CSV may include "images/..." or just "filename.jpg".
 * Files are served from /data/grant/images/ in the public folder.
 */
function resolveImagePath(relativePath: string): string {
  if (!relativePath) return "";
  // Avoid double-prefixing if relative_path already starts with images/
  const clean = relativePath.replace(/^images\//, "");
  return `/data/grant/images/${clean}`;
}

export default function EvidenceGallery({ grants }: Props) {
  const evidence = grants.flatMap((g) => g.evidence);

  if (evidence.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <p className="text-gray-400 text-sm">
          No evidence records for the selected grant and month.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-1 text-xl font-bold text-gray-800">Evidence Gallery</h2>
      <p className="text-xs text-gray-400 mb-6">
        {evidence.length} record{evidence.length !== 1 ? "s" : ""} linked to selected grant(s)
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {evidence.map((item) => (
          <div
            key={item.record_id}
            className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
          >
            {item.relative_path ? (
              <img
                src={resolveImagePath(item.relative_path)}
                alt={item.title}
                className="h-48 w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%239ca3af' font-size='14'%3EImage unavailable%3C/text%3E%3C/svg%3E";
                }}
              />
            ) : (
              <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No image</span>
              </div>
            )}
            <div className="p-4 space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                {item.record_type}
              </span>
              <h3 className="font-semibold text-gray-800 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500">{item.district}</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.summary_or_caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}