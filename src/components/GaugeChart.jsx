import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";
import { ComputegaugeAxis } from "../utils/ComputegaugeAxis";

if (typeof HighchartsMore === "function") HighchartsMore(Highcharts);
if (typeof SolidGauge === "function") SolidGauge(Highcharts);

export default function GaugeChart({
  title,
  updated,
  value,
  status,
  threshold,
  historyValues = [], // pass recent values to scale smarter (optional)
}) {
  const chartRef = useRef(null);

  const getColor = () => {
    if (status === "Green") return "#55BF3B";
    if (status === "Amber") return "#DDDF0D";
    if (status === "Red") return "#DF5353";
    return "#7cb5ec";
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const axis = ComputegaugeAxis({ value, threshold, historyValues });
    const showPlotLine =
      Number.isFinite(Number(threshold)) &&
      Number(threshold) >= axis.min &&
      Number(threshold) <= axis.max;

    Highcharts.chart(chartRef.current, {
      chart: {
        type: "solidgauge",
        height: "100%",
        backgroundColor: "transparent",
        spacingTop: 10,
        spacingBottom: 40,
        spacingLeft: 25,
        spacingRight: 30,
      },
      title: null,
      tooltip: { enabled: false },
      credits: { enabled: false },

      pane: {
        center: ["50%", "80%"],
        size: "100%",
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: "#EEE",
          innerRadius: "60%",
          outerRadius: "100%",
          shape: "arc",
        },
      },

      yAxis: {
        min: axis.min,
        max: axis.max,
        tickAmount: axis.tickAmount,          // let Highcharts place nice ticks
        lineWidth: 0,
        tickWidth: 2,
        tickColor: "#000000",
        tickPosition: "outside",
        labels: {
          enabled: true,
          distance: 17,
          style: { fontSize: "11px", color: "#000000", fontWeight: "normal" },
          formatter: function () {
            return axis.isPercent ? `${this.value}` : this.value;
          },
        },
        plotLines: showPlotLine
          ? [
              {
                value: Number(threshold),
                color: "#000000",
                width: 3,
                zIndex: 10,
              },
            ]
          : [],
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -25,
            borderWidth: 0,
            useHTML: true,
            format: `<div style="text-align:center">
                      <span style="font-size:18px; font-weight:bold">
                        {y}${axis.isPercent ? "" : ""}
                      </span>
                    </div>`,
          },
        },
      },

      series: [
        {
          name: title,
          data: [{ y: Number(value), color: getColor() }],
        },
      ],
    });
  }, [value, title, updated, status, threshold, historyValues]);

  return (
    <div className="flex flex-col items-center justify-between h-full shadow rounded-lg bg-white">
      <div ref={chartRef} className="w-72 h-full" />
      <div className="w-full mb-6 relative">
        <h3 className="text-sm text-center">{title}</h3>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-normal text-gray-500">
          Updated: {updated}
        </span>
      </div>
    </div>
  );
}
