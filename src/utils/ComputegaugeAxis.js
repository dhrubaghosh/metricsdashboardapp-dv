// utils/computeGaugeAxis.js
export function ComputegaugeAxis({ value, threshold, historyValues = [] }) {
  const nums = [
    Number(value),
    Number(threshold),
    ...historyValues.map((v) => Number(v)),
  ].filter((n) => Number.isFinite(n));

  // Fallback if nothing numeric is available
  if (nums.length === 0) return { min: 0, max: 100, tickAmount: 5, isPercent: true };

  const rawMin = Math.min(...nums);
  const rawMax = Math.max(...nums);
  const span = Math.max(1, rawMax - rawMin);

  // Heuristic: treat as percent if everything is between 0–100
  const isPercent = nums.every((n) => n >= 0 && n <= 100);

  // Padding ~15% of span (with sensible floors)
  const pad = Math.max(isPercent ? 5 : span * 0.15, 1);
  let min = Math.floor(rawMin - pad);
  let max = Math.ceil(rawMax + pad);

  if (isPercent) {
    min = Math.max(0, min);
    max = Math.min(100, Math.max(max, 10)); // keep reasonable headroom
  }
  if (min === max) max = min + 1;

  return { min, max, tickAmount: 5, isPercent };
}
