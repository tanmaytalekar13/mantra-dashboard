import { useEffect, useState } from "react";
import { loadAllPBLData } from "../services/csvService";
import { normalizeData, SchoolData } from "../utils/normalizeData";

export const usePBLData = () => {
  const [data, setData] = useState<SchoolData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const rows = await loadAllPBLData();

        // Normalize the raw CSV data
        const normalizedRows = normalizeData(rows);

        setData(normalizedRows);
      } catch (err) {
        console.error(err);
        setError("Unable to load CSV");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    data,
    loading,
    error,
  };
};