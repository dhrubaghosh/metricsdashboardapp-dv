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

  const renderKpiCard = (kpi) => {
    const latest = kpi.history[kpi.history.length - 1];
    return (
      <div
        key={kpi.kpiname}
        onClick={() =>
          navigate(
            `/kpi/${slugify(kpi.kpiname, { lower: true, strict: true })}`,
          )
        }
        className="cursor-pointer bg-white border border-gray-200 rounded shadow-sm p-1.5 
                   flex flex-col items-center justify-center text-center
                   hover:shadow-md transition h-20"
      >
        <p className="text-[10px] text-gray-700 font-medium mb-0.5 line-clamp-2 leading-tight">
          {kpi.kpiname}
        </p>
        <span
          className={`px-1.5 py-0.5 text-xs rounded font-bold ${
            latest.status === "Green"
              ? "bg-green-200 text-black"
              : latest.status === "Amber"
                ? "bg-yellow-200 text-black"
                : "bg-red-200 text-black"
          }`}
        >
          {latest.value}
        </span>
        <p className="text-[9px] text-gray-400 mt-0.5">{latest.period}</p>
      </div>
    );
  };

  const renderDimensionCards = (dimension) => (
    <div className="grid grid-cols-2 gap-1.5">
      {groupedData[dimension]?.map((kpi) => renderKpiCard(kpi))}
    </div>
  );

  return (
    <div className="w-full bg-gray-100 min-h-screen flex flex-col relative">
      {/* MAIN CONTENT */}
      <div className="flex-1 px-2 py-1">
        {/* TOP ROW */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          {/* LEFT: Engineering KPIs */}
          <div>
            <h3 className="text-xs font-semibold text-gray-800 mb-1.5">
              Engineering
            </h3>
            {renderDimensionCards("Engineering")}
          </div>

          {/* CENTER: Empty space for absolute circle */}
          <div></div>

          {/* RIGHT: Velocity KPIs */}
          <div>
            <h3 className="text-xs font-semibold text-gray-800 mb-1.5">
              Velocity
            </h3>
            {renderDimensionCards("Velocity")}
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-3 gap-2">
          {/* LEFT: Collaboration KPIs */}
          <div>
            <h3 className="text-xs font-semibold text-gray-800 mb-1.5">
              Collaboration
            </h3>
            {renderDimensionCards("Collaboration")}
          </div>

          {/* CENTER: Empty space for absolute circle */}
          <div></div>

          {/* RIGHT: Quality KPIs */}
          <div>
            <h3 className="text-xs font-semibold text-gray-800 mb-1.5">
              Quality
            </h3>
            {renderDimensionCards("Quality")}
          </div>
        </div>
      </div>

      {/* ABSOLUTE CENTERED CIRCLE */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        {/* Circle */}
        <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-lg border-3 border-gray-300">
          {/* Top-Left: Engineering (Purple) */}
          <div
            className="absolute inset-0 bg-purple-500 flex items-center justify-center"
            style={{ clipPath: "polygon(0 0, 50% 0, 50% 50%, 0 50%)" }}
          >
            <p
              className="text-white font-bold text-sm absolute drop-shadow-lg"
              style={{
                top: "30%",
                left: "30%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Engineering
            </p>
          </div>

          {/* Top-Right: Velocity (Red) */}
          <div
            className="absolute inset-0 bg-red-400 flex items-center justify-center"
            style={{
              clipPath: "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)",
            }}
          >
            <p
              className="text-white font-bold text-sm absolute drop-shadow-lg"
              style={{
                top: "30%",
                right: "30%",
                transform: "translate(50%, -50%)",
              }}
            >
              Velocity
            </p>
          </div>

          {/* Bottom-Left: Collaboration (Green) */}
          <div
            className="absolute inset-0 bg-green-400 flex items-center justify-center"
            style={{
              clipPath: "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)",
            }}
          >
            <p
              className="text-white font-bold text-sm absolute drop-shadow-lg"
              style={{
                bottom: "30%",
                left: "30%",
                transform: "translate(-50%, 50%)",
              }}
            >
              Collaboration
            </p>
          </div>

          {/* Bottom-Right: Quality (Orange) */}
          <div
            className="absolute inset-0 bg-orange-400 flex items-center justify-center"
            style={{
              clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
            }}
          >
            <p
              className="text-white font-bold text-sm absolute drop-shadow-lg"
              style={{
                bottom: "30%",
                right: "30%",
                transform: "translate(50%, 50%)",
              }}
            >
              Quality
            </p>
          </div>

          {/* Center cross lines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-0.5 h-full bg-white/60 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute h-0.5 w-full bg-white/60 top-1/2 transform -translate-y-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
