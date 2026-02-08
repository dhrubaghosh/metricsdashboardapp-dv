import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlotLineChart from "../components/PlotLineChart";
import kpiData from "../data/mockData.json";
import slugify from "slugify";
import { parseThreshold } from "../utils/ThresholdParser";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function TrendAnalysisPage() {
  const { kpiName } = useParams();
  const location = useLocation();
  const { kpi: passedKpi } = location.state || {}; 
  const kpi =
    passedKpi ||
    kpiData.find(
      (k) => slugify(k.kpiname, { lower: true, strict: true }) === kpiName
    );

  if (!kpi) {
    return <div className="p-6 text-red-500">KPI not found</div>;
  }

  const lastSix = [...kpi.history].slice(-6).reverse();
  const categories = lastSix.map((h) => h.period); 
  const values = lastSix.map((h) => h.value); 
  const threshold = parseThreshold(kpi.guidelines.ideal);

  return (
    <div className="min-h-screen flex flex-col p-2 mt-2">
      {/* <Header /> */}
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-lg "
        >
          <IoMdArrowRoundBack size={20} />
        </button>

        <h1
          className="text-xl font-bold bg-sky-800 rounded-lg py-2 px-2 text-white
                   inline-block md:mx-2"
        >
          {kpi.kpiname} - Trend Analysis
        </h1>
      </div>
      <main className="flex-1 flex flex-col">
        <PlotLineChart
          title={kpi.kpiname}
          categories={categories}
          values={values}
          threshold={threshold}
          guidelines={kpi.guidelines}
        />

        
      </main>
      {/* <Footer /> */}
    </div>
  );
}
