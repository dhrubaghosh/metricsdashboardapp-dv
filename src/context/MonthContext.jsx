import React, { createContext, useContext, useState } from "react";

const MonthContext = createContext();

export const useMonth = () => {
  const context = useContext(MonthContext);
  if (!context) {
    throw new Error("useMonth must be used within MonthProvider");
  }
  return context;
};

export const MonthProvider = ({ children }) => {
  const months = [
    "Feb 2026",
    "Jan 2026",
    "Dec 2025",
    "Nov 2025",
    "Oct 2025",
    "Sep 2025"
  ];
  
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  const value = {
    selectedMonth,
    setSelectedMonth,
    months
  };

  return (
    <MonthContext.Provider value={value}>
      {children}
    </MonthContext.Provider>
  );
};