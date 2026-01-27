import React from "react";
import { useParams, Link } from "react-router-dom";
import kpiData from "../data/mockData.json";
import GaugeChart from "../components/GaugeChart";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoMdArrowRoundBack } from "react-icons/io";
import { parseThreshold } from "../utils/ThresholdParser";
import slugify from "slugify";

export default function KPIDetails() {
  const { kpiName } = useParams();

  const kpi = kpiData.find(
    (k) => slugify(k.kpiname, { lower: true, strict: true }) === kpiName
  );

  if (!kpi) {
    return <div className="p-6 text-red-500">KPI not found</div>;
  }

  const lastSix = [...kpi.history].slice(-6).reverse();

  const lastSixValues = lastSix
    .map((r) => parseFloat(r.value)) 
    .filter((n) => Number.isFinite(n));

  return (
    <div className="p-2 pt-4 bg-gray-400 min-h-screen">
      {/* <Header /> */}

      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-lg"
        >
          <IoMdArrowRoundBack size={20} />
        </button>

        <h1
          className="text-xl font-bold bg-stone-800 rounded-lg py-2 px-2 text-white
                     inline-block md:mx-2"
        >
          {kpi.kpiname}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lastSix.map((record) => (
          <div key={record.id} className="h-72">
            <GaugeChart
              title={record.period}
              updated={record.updated_at}
              value={record.value}
              status={record.status}
              threshold={parseThreshold(kpi.guidelines?.ideal)}
              historyValues={lastSixValues}
            />
          </div>
        ))}
      </div>

      <div className="p-2 flex justify-end">
        <Link
          to={`/trendanalysis/${slugify(kpi.kpiname, {
            lower: true,
            strict: true,
          })}`}
          className="text-blue-600 hover:text-blue-800 underline"
          state={{ kpi }}
        >
          Go to Trend Analysis
        </Link>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
