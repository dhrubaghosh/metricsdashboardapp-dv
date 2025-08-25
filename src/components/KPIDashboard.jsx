import { useNavigate } from "react-router-dom";
import kpiData from "../data/mockData.json";
import slugify from "slugify";

export default function KPIDashboard() {
  const navigate = useNavigate();

  // Group KPIs by dimension
  const groupedData = kpiData.reduce((acc, kpi) => {
    if (!acc[kpi.dimension]) acc[kpi.dimension] = [];
    acc[kpi.dimension].push(kpi);
    return acc;
  }, {});

  const renderKpis = (dimension) => (
    <div className="grid grid-cols-3 gap-5 min-h-[200px]">
      {groupedData[dimension]?.map((kpi, idx) => {
        const latest = kpi.history[kpi.history.length - 1];
        return (
          <div
            key={idx}
            onClick={() =>
              navigate(
                `/kpi/${slugify(kpi.kpiname, { lower: true, strict: true })}`
              )
            }
            className="cursor-pointer border rounded-md shadow-sm w-32 h-24 
                       flex flex-col items-center justify-center 
                       hover:bg-gray-100 transition"
          >
            <p className="text-[11px] text-gray-700 font-medium text-center line-clamp-2">
              {kpi.kpiname}
            </p>
            <span
              className={`mt-1 px-2 py-1 text-xs rounded font-bold ${
                latest.status === "Green"
                  ? "bg-green-200 text-black"
                  : latest.status === "Amber"
                  ? "bg-yellow-200 text-black"
                  : "bg-red-200 text-black"
              }`}
            >
              {latest.value}
            </span>
            <p className="text-[10px] mt-1 text-gray-500">{latest.period}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex justify-center items-center h-screen w-full px-6 gap-10">
      {/* LEFT SIDE (Quality + Collaboration) */}
      <div className="flex flex-col h-full py-10 justify-between">
        <div className="flex justify-center items-start h-1/2">
          <div>
            <h2 className="font-semibold mb-2 text-gray-800">Quality KPIs</h2>
            {renderKpis("Quality")}
          </div>
        </div>
        <div className="flex justify-center items-end h-1/2">
          <div>
            <h2 className="font-semibold mb-2 text-gray-800">Collaboration KPIs</h2>
            {renderKpis("Collaboration")}
          </div>
        </div>
      </div>

      {/* CENTER QUADRANT */}
      <div className="flex items-center justify-center">
        <div className="relative w-72 h-72 rounded-full overflow-hidden shadow-xl">
          <div
            className="absolute inset-0 bg-red-400"
            style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%)" }}
          >
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white font-bold">
              Velocity
            </span>
          </div>
          <div
            className="absolute inset-0 bg-green-400"
            style={{ clipPath: "polygon(50% 50%, 100% 100%, 0 100%)" }}
          >
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold">
              Engineering
            </span>
          </div>
          <div
            className="absolute inset-0 bg-purple-400"
            style={{ clipPath: "polygon(50% 50%, 0 100%, 0 0)" }}
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold">
              Collaboration
            </span>
          </div>
          <div
            className="absolute inset-0 bg-orange-400"
            style={{ clipPath: "polygon(50% 50%, 0 0, 100% 0)" }}
          >
            <span className="absolute top-4 left-1/2 -translate-x-1/2 text-white font-bold">
              Quality
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (Velocity + Engineering) */}
      <div className="flex flex-col h-full py-10 justify-between">
        <div className="flex justify-center items-start h-1/2">
          <div>
            <h2 className="font-semibold mb-2 text-gray-800">Velocity KPIs</h2>
            {renderKpis("Velocity")}
          </div>
        </div>
        <div className="flex justify-center items-end h-1/2 mt-48">
          <div>
            <h2 className="font-semibold mb-2 text-gray-800">Engineering KPIs</h2>
            {renderKpis("Engineering")}
          </div>
        </div>
      </div>
    </div>
  );
}