import React, { createContext, useContext, useState, useCallback } from "react";

const GridExportContext = createContext();

export const GridExportProvider = ({ children }) => {
  const [grid, setGrid] = useState(null);
  const [customExport, setCustomExport] = useState(null);
  const [schedule, setSchedule] = useState({});

  const downloadCSV = useCallback(() => {
    if (grid && grid.api) {
      grid.api.exportDataAsCsv(); 
    } else if (customExport) {
      customExport(); // Fallback to custom export if grid is not available
    } else {
      console.warn("No grid or export function registered.");
    }
  }, [grid, customExport]);
  

  return (
    <GridExportContext.Provider value={{ setGrid, downloadCSV, setCustomExport }}>
      {children}
    </GridExportContext.Provider>
  );
};

export const useGridExport = () => useContext(GridExportContext);
export { GridExportContext };
