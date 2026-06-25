import { useEffect, useState } from "react";

import { loadGrantData } from "../services/grantService";

import { GrantData } from "../types/grant";

export const useGrantData = () => {
  const [data, setData] = useState<GrantData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await loadGrantData();

        setData(result);
      } catch {
        setError("Unable to load Grant Data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
  };
};