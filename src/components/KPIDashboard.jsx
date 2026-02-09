import { useNavigate } from "react-router-dom";
import kpiDataOriginal from "../data/mockData.json";
import slugify from "slugify";
import { useMonth } from "../context/MonthContext";

export default function KPIDashboard() {
  const navigate = useNavigate();
  const { selectedMonth } = useMonth();

  const getKPIDataForMonth = (month) => {
    return kpiDataOriginal
      .map((kpi) => {
        const monthData = kpi.history.find((h) => h.period === month);
        if (!monthData) return null;
        return {
          dimension: kpi.dimension,
          kpiname: kpi.kpiname,
          definition: kpi.definition,
          guidelines: kpi.guidelines,
          value: monthData.value,
          status: monthData.status,
          updated_at: monthData.updated_at,
          history: kpi.history,
        };
      })
      .filter(Boolean);
  };

  const kpiData = getKPIDataForMonth(selectedMonth);

  const groupedData = kpiData.reduce((acc, kpi) => {
    if (!acc[kpi.dimension]) acc[kpi.dimension] = [];
    acc[kpi.dimension].push(kpi);
    return acc;
  }, {});

  const renderKpiCard = (kpi) => {
    return (
      <div
        key={kpi.kpiname}
        onClick={() =>
          navigate(
            `/kpi/${slugify(kpi.kpiname, { lower: true, strict: true })}`,
          )
        }
        className="cursor-pointer bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-lg shadow-sm flex flex-col items-center justify-center text-center hover:shadow-lg hover:scale-[1.02] transition-all duration-200 p-1.5 h-[70px]"
      >
        <p className="text-[10px] text-gray-700 font-medium mb-1 line-clamp-2 leading-tight px-1">
          {kpi.kpiname}
        </p>
        <span
          className={`px-1.5 py-0.5 text-xs rounded-md font-bold shadow-sm ${
            kpi.status === "Green"
              ? "bg-green-500 text-white"
              : kpi.status === "Amber"
                ? "bg-amber-500 text-white"
                : "bg-red-500 text-white"
          }`}
        >
          {kpi.value}
        </span>
        <p className="text-[10px] text-gray-500 mt-0.5">{selectedMonth}</p>
      </div>
    );
  };

  const renderDimensionCards = (dimension) => (
    <div className="grid grid-cols-2 gap-2">
      {groupedData[dimension]?.map((kpi) => renderKpiCard(kpi))}
    </div>
  );

  return (
    <div className="w-full h-[calc(98vh-64px)] overflow-hidden bg-gray-50 flex flex-col relative">
      <div className="flex-1 px-3 py-2 grid grid-rows-2 gap-3 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-[1fr_320px_1fr] gap-4">
          <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-3 shadow-lg">
            <h3 className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-red-500 rounded-full" />
              Engineering
            </h3>
            {renderDimensionCards("Engineering")}
          </div>
          <div className="relative" />
          <div className="bg-gradient-to-br from-lime-100 to-green-100 rounded-2xl p-3 shadow-lg">
            <h3 className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-lime-500 rounded-full" />
              Velocity
            </h3>
            {renderDimensionCards("Velocity")}
          </div>
        </div>
        <div className="grid grid-cols-[1fr_320px_1fr] gap-4">
          <div className="bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl p-3 shadow-lg mb-5">
            <h3 className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-500 rounded-full" />
              Collaboration
            </h3>
            {renderDimensionCards("Collaboration")}
          </div>
          <div className="relative" />
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-3 shadow-lg mb-5">
            <h3 className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-orange-500 rounded-full" />
              Quality
            </h3>
            {renderDimensionCards("Quality")}
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="relative w-60 h-60 rounded-full overflow-hidden shadow-2xl border-[5px] border-white">
          <div
            className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-400"
            style={{ clipPath: "polygon(0 0, 50% 0, 50% 50%, 0 50%)" }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-bl from-lime-400 to-green-400"
            style={{ clipPath: "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)" }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-tr from-purple-400 to-violet-400"
            style={{ clipPath: "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)" }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-tl from-orange-400 to-amber-400"
            style={{
              clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
            }}
          />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-0.5 h-full bg-white/90 left-1/2 -translate-x-1/2 shadow-sm" />
            <div className="absolute h-0.5 w-full bg-white/90 top-1/2 -translate-y-1/2 shadow-sm" />
          </div>
          <div className="absolute top-[25%] left-[28%] -translate-x-1/2 -translate-y-1/2">
            <p className="text-white text-[12px] font-bold drop-shadow-md whitespace-nowrap">
              Engineering
            </p>
          </div>
          <div className="absolute top-[25%] right-[25%] translate-x-1/2 -translate-y-1/2">
            <p className="text-white text-[12px] font-bold drop-shadow-md whitespace-nowrap">
              Velocity
            </p>
          </div>
          <div className="absolute bottom-[25%] left-[28%] -translate-x-1/2 translate-y-1/2">
            <p className="text-white text-[12px] font-bold drop-shadow-md whitespace-nowrap">
              Collaboration
            </p>
          </div>
          <div className="absolute bottom-[25%] right-[25%] translate-x-1/2 translate-y-1/2">
            <p className="text-white text-[12px] font-bold drop-shadow-md whitespace-nowrap">
              Quality
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
