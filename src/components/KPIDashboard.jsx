import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import kpiData from "../data/mockData.json";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

export default function KPIDashboard() {
  const [selectedDimension, setSelectedDimension] = useState(null);
  const navigate = useNavigate();
  const handleRediret = () => {
    navigate("/kpi-detailspage");
  };

  return (
    <div className="flex flex-col items-center flex-1 mt-24">
      <div className="relative w-72 h-72 rounded-full overflow-hidden shadow-xl mb-8">
        <div
          className="absolute inset-0 bg-red-400 cursor-pointer"
          style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%)" }}
          onClick={() => setSelectedDimension("Velocity")}
        >
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white font-bold">
            Velocity
          </span>
        </div>
        <div
          className="absolute inset-0 bg-green-400 cursor-pointer"
          style={{ clipPath: "polygon(50% 50%, 100% 100%, 0 100%)" }}
          onClick={() => setSelectedDimension("Engineering")}
        >
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold">
            Engineering
          </span>
        </div>
        <div
          className="absolute inset-0 bg-purple-400 cursor-pointer"
          style={{ clipPath: "polygon(50% 50%, 0 100%, 0 0)" }}
          onClick={() => setSelectedDimension("Collaboration")}
        >
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold">
            Collaboration
          </span>
        </div>
        <div
          className="absolute inset-0 bg-orange-400 cursor-pointer"
          style={{ clipPath: "polygon(50% 50%, 0 0, 100% 0)" }}
          onClick={() => setSelectedDimension("Quality")}
        >
          <span className="absolute top-4 left-1/2 -translate-x-1/2 text-white font-bold">
            Quality
          </span>
        </div>
      </div>
      {selectedDimension && (
        <div className="w-full max-w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {selectedDimension} KPIs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {kpiData
              .filter((k) => k.dimension === selectedDimension)
              .map((kpi, idx) => (
                <Card key={idx} className="border shadow-sm h-full">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div>
                      <p className="text-sm text-gray-800 font-semibold">
                        {kpi.kpiname}
                      </p>

                      {kpi.history.length > 0 && (
                        <div className="mt-2 flex items-center justify-between">
                          <span
                            className={`px-2 py-1 text-sm rounded font-bold ${
                              kpi.history[kpi.history.length - 1].status ===
                              "Green"
                                ? "bg-green-200 text-black"
                                : kpi.history[kpi.history.length - 1].status ===
                                  "Amber"
                                ? "bg-yellow-200 text-black"
                                : "bg-red-200 text-black"
                            }`}
                          >
                            {kpi.history[kpi.history.length - 1].value}
                          </span>
                          <span className="text-xs">
                            {kpi.history[kpi.history.length - 1].period}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-4 text-xs">
                      <div>
                        Updated:{" "}
                        {kpi.history[kpi.history.length - 1].updated_at}
                      </div>
                      <Button
                        size="sm"
                        variant="link"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                        onClick={() =>
                          navigate(
                            `/kpi/${slugify(kpi.kpiname, {
                              lower: true,
                              strict: true,
                            })}`
                          )
                        }
                      >
                        <GoArrowRight className="text-2xl" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
