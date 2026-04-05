/* eslint-disable */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OfferingVisualExampleProps {
  activeIndex: number;
  isInView: boolean;
}

/* ─── Clinical Insights Visual ─── */
const ClinicalInsightsVisual = () => {
  const findings = [
    { label: "Elevated inflammatory markers", severity: "high", icon: "⚠" },
    { label: "Declining renal function trend", severity: "medium", icon: "↓" },
    { label: "Drug interaction risk detected", severity: "high", icon: "⚠" },
  ];

  const treatments = [
    { name: "Adjust immunosuppressant dosage", confidence: 94 },
    { name: "Initiate nephroprotective protocol", confidence: 87 },
    { name: "Schedule follow-up imaging", confidence: 79 },
  ];

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
            AI Clinical Analysis
          </span>
        </div>
        <span className="text-[10px] text-gray-500 font-mono">
          Patient #4829 • Updated 2m ago
        </span>
      </div>

      {/* Key Findings */}
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Key Findings
        </p>
        <div className="space-y-1.5">
          {findings.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md"
              style={{
                background:
                  f.severity === "high"
                    ? "rgba(239,68,68,0.08)"
                    : "rgba(251,191,36,0.08)",
                borderLeft: `2px solid ${
                  f.severity === "high" ? "#ef4444" : "#f59e0b"
                }`,
              }}
            >
              <span className="text-xs">{f.icon}</span>
              <span className="text-xs text-gray-300">{f.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommended Actions */}
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Recommended Actions
        </p>
        <div className="space-y-2">
          {treatments.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.15 }}
              className="px-3 py-2 rounded-md bg-white/[0.03]"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-200">{t.name}</span>
                <span className="text-[10px] font-bold text-teal-400">
                  {t.confidence}%
                </span>
              </div>
              <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #18D3C5 0%, #7B2FF7 100%)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${t.confidence}%` }}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Risk Score */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex items-center justify-between px-3 py-2 rounded-md border border-white/[0.06]"
      >
        <span className="text-[10px] text-gray-400">
          Composite Risk Score
        </span>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="w-3 h-1.5 rounded-sm"
                style={{
                  background:
                    n <= 4
                      ? n <= 2
                        ? "#f59e0b"
                        : "#ef4444"
                      : "rgba(255,255,255,0.06)",
                }}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-red-400">High</span>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Predictive Analytics Visual ─── */
const PredictiveAnalyticsVisual = () => {
  // Historical + predicted data points for a biomarker trend
  const chartWidth = 320;
  const chartHeight = 120;
  const padL = 30;
  const padR = 10;
  const padT = 10;
  const padB = 24;
  const w = chartWidth - padL - padR;
  const h = chartHeight - padT - padB;

  // Values represent normalized biomarker level (0–1 mapped to chart)
  const historical = [0.32, 0.35, 0.41, 0.38, 0.45, 0.52, 0.49, 0.58];
  const predicted = [0.58, 0.64, 0.71, 0.76, 0.82];
  const upperBand = [0.58, 0.72, 0.82, 0.90, 0.96];
  const lowerBand = [0.58, 0.56, 0.60, 0.62, 0.68];

  const totalPts = historical.length + predicted.length - 1; // -1 for overlap
  const xStep = w / (totalPts - 1);

  const toX = (i: number) => padL + i * xStep;
  const toY = (v: number) => padT + h - v * h;

  const histLine = historical
    .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`)
    .join(" ");

  const predStart = historical.length - 1;
  const predLine = predicted
    .map(
      (v, i) =>
        `${i === 0 ? "M" : "L"} ${toX(predStart + i)} ${toY(v)}`
    )
    .join(" ");

  const bandPath =
    upperBand
      .map(
        (v, i) =>
          `${i === 0 ? "M" : "L"} ${toX(predStart + i)} ${toY(v)}`
      )
      .join(" ") +
    " " +
    [...lowerBand]
      .reverse()
      .map(
        (v, i) =>
          `L ${toX(predStart + (lowerBand.length - 1 - i))} ${toY(v)}`
      )
      .join(" ") +
    " Z";

  const thresholdY = toY(0.7);

  const metrics = [
    { label: "Predicted Peak", value: "Day 32", sub: "82nd percentile" },
    { label: "Time to Threshold", value: "~14 days", sub: "CI: 10–18 days" },
    { label: "Trend Velocity", value: "+0.04/day", sub: "Accelerating" },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
            Predictive Model Output
          </span>
        </div>
        <span className="text-[10px] text-gray-500 font-mono">
          Biomarker CRP-hs • Forecast
        </span>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="rounded-lg bg-white/[0.02] border border-white/[0.05] p-2"
      >
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full"
          style={{ maxHeight: 160 }}
        >
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((v) => (
            <line
              key={v}
              x1={padL}
              y1={toY(v)}
              x2={chartWidth - padR}
              y2={toY(v)}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.5"
            />
          ))}

          {/* Threshold line */}
          <line
            x1={padL}
            y1={thresholdY}
            x2={chartWidth - padR}
            y2={thresholdY}
            stroke="#ef4444"
            strokeWidth="0.5"
            strokeDasharray="4 3"
            opacity={0.5}
          />
          <text
            x={chartWidth - padR - 1}
            y={thresholdY - 3}
            textAnchor="end"
            fill="#ef4444"
            fontSize="6"
            opacity={0.7}
          >
            Clinical threshold
          </text>

          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1.0].map((v) => (
            <text
              key={v}
              x={padL - 4}
              y={toY(v) + 2.5}
              textAnchor="end"
              fill="rgba(255,255,255,0.25)"
              fontSize="6"
            >
              {(v * 100).toFixed(0)}
            </text>
          ))}

          {/* X-axis labels */}
          <text
            x={toX(0)}
            y={chartHeight - 4}
            textAnchor="start"
            fill="rgba(255,255,255,0.25)"
            fontSize="6"
          >
            Day 0
          </text>
          <text
            x={toX(predStart)}
            y={chartHeight - 4}
            textAnchor="middle"
            fill="rgba(255,255,255,0.25)"
            fontSize="6"
          >
            Today
          </text>
          <text
            x={toX(totalPts - 1)}
            y={chartHeight - 4}
            textAnchor="end"
            fill="rgba(255,255,255,0.25)"
            fontSize="6"
          >
            Day 40
          </text>

          {/* Today divider */}
          <line
            x1={toX(predStart)}
            y1={padT}
            x2={toX(predStart)}
            y2={chartHeight - padB}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />

          {/* Confidence band */}
          <motion.path
            d={bandPath}
            fill="#7B2FF7"
            opacity={0.12}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            transition={{ delay: 0.8 }}
          />

          {/* Historical line */}
          <motion.path
            d={histLine}
            fill="none"
            stroke="#18D3C5"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
          />

          {/* Predicted line */}
          <motion.path
            d={predLine}
            fill="none"
            stroke="#7B2FF7"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          />

          {/* Data points - historical */}
          {historical.map((v, i) => (
            <motion.circle
              key={`h-${i}`}
              cx={toX(i)}
              cy={toY(v)}
              r={2}
              fill="#18D3C5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08 }}
            />
          ))}

          {/* Data points - predicted */}
          {predicted.slice(1).map((v, i) => (
            <motion.circle
              key={`p-${i}`}
              cx={toX(predStart + 1 + i)}
              cy={toY(v)}
              r={2}
              fill="#7B2FF7"
              stroke="#7B2FF7"
              strokeWidth="0.5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
            />
          ))}
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-4 px-1 mt-1">
          <div className="flex items-center gap-1">
            <div className="w-4 h-0.5 bg-teal-400 rounded" />
            <span className="text-[9px] text-gray-500">Observed</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-4 h-0.5 rounded"
              style={{
                background: "#7B2FF7",
                backgroundImage:
                  "repeating-linear-gradient(90deg, #7B2FF7 0 3px, transparent 3px 5px)",
              }}
            />
            <span className="text-[9px] text-gray-500">Predicted</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-2 rounded-sm"
              style={{ background: "rgba(123,47,247,0.2)" }}
            />
            <span className="text-[9px] text-gray-500">95% CI</span>
          </div>
        </div>
      </motion.div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-2">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 + i * 0.12 }}
            className="px-2 py-2 rounded-md bg-white/[0.03] border border-white/[0.05]"
          >
            <p className="text-[9px] text-gray-500 mb-0.5">{m.label}</p>
            <p className="text-sm font-bold text-gray-200">{m.value}</p>
            <p className="text-[9px] text-gray-500">{m.sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
const OfferingVisualExample: React.FC<OfferingVisualExampleProps> = ({
  activeIndex,
  isInView,
}) => {
  const titles = ["Clinical Insights", "Predictive Analytics"];
  const descriptions = [
    "We uncover clinically meaningful patterns in multi-modal patient data, surfacing risk factors, treatment recommendations, and actionable findings that support faster, more informed decisions.",
    "We develop prognostic models that forecast patient outcomes, disease progression, and treatment response, enabling proactive clinical planning with quantified confidence intervals.",
  ];

  if (!isInView) return null;

  return (
    <div className="w-full">
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="rounded-xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0f1724 0%, #131b2e 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="p-5 md:p-6">
            {activeIndex === 0 ? (
              <ClinicalInsightsVisual />
            ) : (
              <PredictiveAnalyticsVisual />
            )}
          </div>

          {/* Description */}
          <div
            className="px-5 md:px-6 py-4 border-t border-white/[0.05]"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <h3 className="text-lg font-bold text-white mb-1">
              {titles[activeIndex]}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {descriptions[activeIndex]}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OfferingVisualExample;
