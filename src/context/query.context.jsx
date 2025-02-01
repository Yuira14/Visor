import { createContext, useState } from "react";

// Creación del contexto
export const QueryContext = createContext({
  selectedMapsC: false,
  setSelectedMapsC: () => null,
  baseMap: false,
  setBaseMap: () => null,
});

export const QueryProvider = ({ children }) => {
  const [selectedMapsC, setSelectedMapsC] = useState(false); // Cambiado a false
  const [baseMap, setBaseMap] = useState("administratiu");

  const value = {
    selectedMapsC,
    setSelectedMapsC,
    baseMap,
    setBaseMap,
  };

  return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
  );
};
