import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import { parseThreshold } from "../utils/ThresholdParser";
import { FiCopy } from "react-icons/fi";
import { FaArrowUp, FaArrowDown, FaChartLine } from "react-icons/fa";

export default function PlotLineChart({
  title,
  categories,
  values,
  threshold,
  guidelines,
}) {
  const chartRef = useRef(null);
  const [summary, setSummary] = useState({});
  const [copied, setCopied] = useState(false);

  const buildBands = () => {
    const bands = [];
    if (!guidelines) return bands;

    if (guidelines.red) {
      const max = parseThreshold(guidelines.red);
      bands.push({ from: 0, to: max, color: "rgba(255,0,0,0.1)" });
    }

    if (guidelines.amber) {
      const [min, max] = guidelines.amber
        .split("-")
        .map((s) => parseInt(s, 10));
      bands.push({ from: min, to: max + 1, color: "rgba(255,165,0,0.1)" });
    }

    if (guidelines.green) {
      const min = parseThreshold(guidelines.green);
      bands.push({ from: min, to: 100, color: "rgba(0,128,0,0.1)" });
    }

    return bands;
  };

  // ✅ Render Chart
  useEffect(() => {
    if (!chartRef.current) return;

    Highcharts.chart(chartRef.current, {
      chart: { type: "line" },
      title: { text: "" },
      credits: { enabled: false },
      xAxis: { categories: categories || [] },
      yAxis: {
        title: { text: null },
        plotLines: threshold
          ? [
              {
                value: threshold,
                color: "green",
                dashStyle: "Dot",
                width: 2,
                label: {
                  text: `Ideal >= ${threshold}`,
                  align: "right",
                  x: -20,
                  style: { color: "green", fontWeight: "bold" },
                },
                zIndex: 5,
              },
            ]
          : [],
        plotBands: buildBands(),
      },
      series: [{ showInLegend: false, name: "", data: values || [] }],
    });
  }, [title, categories, values, threshold, guidelines]);

  useEffect(() => {
    if (!categories || !values || values.length === 0) return;

    const maxVal = Math.max(...values);
    const minVal = Math.min(...values);
    const lastVal = values[values.length - 1];

    const maxIndex = values.indexOf(maxVal);
    const minIndex = values.indexOf(minVal);

    let majorImpact = null;
    if (values.length >= 2) {
      const prev = values[values.length - 2];
      const change = ((lastVal - prev) / prev) * 100;
      majorImpact = `Between ${categories[values.length - 2]} → ${
        categories[values.length - 1]
      }, ${change > 0 ? "increased" : "declined"} by ${Math.abs(
        change.toFixed(1)
      )}%`;
    }

    let improvementStreak = 0,
      declineStreak = 0,
      maxImprovement = 0,
      maxDecline = 0;

    for (let i = 1; i < values.length; i++) {
      if (values[i] > values[i - 1]) {
        improvementStreak++;
        declineStreak = 0;
      } else if (values[i] < values[i - 1]) {
        declineStreak++;
        improvementStreak = 0;
      } else {
        improvementStreak = 0;
        declineStreak = 0;
      }
      maxImprovement = Math.max(maxImprovement, improvementStreak);
      maxDecline = Math.max(maxDecline, declineStreak);
    }

    const overallTrend = (((lastVal - values[0]) / values[0]) * 100).toFixed(1);

    const compliance = { green: 0, amber: 0, red: 0 };
    values.forEach((val) => {
      if (guidelines.green && val >= parseThreshold(guidelines.green))
        compliance.green++;
      else if (guidelines.amber) {
        const [min, max] = guidelines.amber
          .split("-")
          .map((s) => parseInt(s, 10));
        if (val >= min && val <= max) compliance.amber++;
        else compliance.red++;
      } else {
        compliance.red++;
      }
    });

    setSummary({
      highest: `Highest: ${maxVal} (${categories[maxIndex]})`,
      lowest: `Lowest: ${minVal} (${categories[minIndex]})`,
      latest: `Latest: ${lastVal} (${categories[values.length - 1]})`,
      impact: majorImpact,
      improvement: `Improvement streak: ${maxImprovement} sprints`,
      decline: `Decline streak: ${maxDecline} sprints`,
      trend: `Overall trend: ${overallTrend}% over last ${values.length} sprints`,
      compliance: `Guideline compliance: Green - ${compliance.green} , Amber - ${compliance.amber}, Red - ${compliance.red}`,
    });
  }, [categories, values, guidelines]);

  const handleCopy = () => {
    const textToCopy = [
      `${title} - Highlights`,
      ...Object.values(summary).filter(Boolean),
    ].join("\n");

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div ref={chartRef} style={{ height: "400px", width: "100%" }} />

      <div className="bg-white shadow-md rounded-lg p-4 relative">
        <h2 className="text-lg font-semibold mb-4">{title} - Highlights </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-md">
            <FaArrowUp className="text-green-600 " />
            <span className="text-gray-700 text-xs">{summary.highest}</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-red-50 rounded-md">
            <FaArrowDown className="text-red-600" />
            <span className="text-gray-700 text-xs">{summary.lowest}</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-md">
            <FaChartLine className="text-blue-600" />
            <span className="text-gray-700 text-xs">{summary.latest}</span>
          </div>

          {summary.impact && (
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-md">
              <FaChartLine className="text-yellow-600 " />
              <span className="text-gray-700 text-xs">{summary.impact}</span>
            </div>
          )}

          <div className="flex items-center gap-3 p-3 bg-green-100 rounded-md">
            <FaArrowUp className="text-green-700 " />
            <span className="text-gray-700 text-xs">{summary.improvement}</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-red-100 rounded-md">
            <FaArrowDown className="text-red-700 " />
            <span className="text-gray-700 text-xs">{summary.decline}</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-blue-100 rounded-md">
            <FaChartLine className="text-blue-700 " />
            <span className="text-gray-700 text-xs">{summary.trend}</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-purple-100 rounded-md">
            <FaChartLine className="text-purple-700" />
            <span className="text-gray-700 text-xs">{summary.compliance}</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FiCopy size={18} />
        </button>

        {copied && (
          <span className="absolute bottom-2 right-4 text-green-600 text-sm">
            ✅ Copied!
          </span>
        )}
      </div>
    </div>
  );
}
