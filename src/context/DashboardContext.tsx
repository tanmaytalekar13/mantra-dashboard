import { createContext, useContext } from "react";
import { Filters } from "../utils/filterHelpers";

interface DashboardContextType {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export const DashboardContext =
  createContext<DashboardContextType | null>(null);

export const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("DashboardContext not found");
  }

  return context;
};