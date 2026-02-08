import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MonthProvider } from "./context/MonthContext";
import HomePage from "./pages/HomePage";
import KPIDetailsPage from "./pages/KPIDetailsPage";
import TrendAnalysisPage from "./pages/TrendAnalysisPage";

function App() {
  return (
    <div className="font-montserrat">
      <MonthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kpi/:kpiName" element={<KPIDetailsPage />} />
            <Route
              path="/trendanalysis/:kpiName"
              element={<TrendAnalysisPage />}
            />
          </Routes>
        </Router>
      </MonthProvider>
    </div>
  );
}

export default App;
