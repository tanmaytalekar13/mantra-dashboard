import { UnifiedGrant } from "../../utils/normalizeGrantData";

interface Props {
  grants: UnifiedGrant[];
}

export default function EvidenceGallery({
  grants,
}: Props) {

  if (grants.length === 0) {
    return null;
  }

  const evidence = grants.flatMap(
    (grant) => grant.evidence
  );

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Evidence Gallery
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {evidence.map((item) => (

          <div
            key={item.record_id}
            className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
          >

            <img
              src={`/data/grant/${item.relative_path}`}
              alt={item.title}
              className="h-52 w-full object-cover"
            />

            <div className="space-y-2 p-4">

              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600">

                {item.district}

              </p>

              <p className="text-sm text-gray-500">

                {item.summary_or_caption}

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}