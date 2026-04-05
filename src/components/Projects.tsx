/* eslint-disable */
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function useOnScreen(
  ref: MutableRefObject<HTMLDivElement | null>,
  rootMargin = "0px"
) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    let currentRef: any = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setIntersecting(true);
      },
      { rootMargin }
    );
    if (ref?.current) {
      currentRef = ref.current;
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref, rootMargin]);
  return isIntersecting;
}

/* ─────────────────────── Product data ─────────────────────── */

interface Product {
  namePrefix: string;
  nameSuffix: string;
  accent: string;
  accentGlow: string;
  tagline: string;
  blurb: string;
  chatbotPrefix: string;
  chatbotSuffix: string;
  chatbotLine: string;
}

const products: Product[] = [
  {
    namePrefix: "Onco",
    nameSuffix: "Vision",
    accent: "#18D3C5",
    accentGlow: "rgba(24,211,197,0.12)",
    tagline: "Oncology Diagnostic Suite",
    blurb:
      "Unified AI diagnostics integrating pathology, radiology, and clinical decision support for cancer detection, assessment, and longitudinal monitoring.",
    chatbotPrefix: "Onco",
    chatbotSuffix: "Assist",
    chatbotLine: "Clinical chatbot sourcing NCCN/ESMO guidelines and approved literature",
  },
  {
    namePrefix: "Rad",
    nameSuffix: "Metrix",
    accent: "#7B2FF7",
    accentGlow: "rgba(123,47,247,0.12)",
    tagline: "Radiology Analytics Platform",
    blurb:
      "Quantitative imaging biomarkers, automated measurement extraction, and longitudinal comparison across MRI, CT, and X-ray modalities.",
    chatbotPrefix: "Rad",
    chatbotSuffix: "Assist",
    chatbotLine: "Clinical chatbot referencing approved imaging guidelines and protocols",
  },
  {
    namePrefix: "D",
    nameSuffix: "X",
    accent: "#2685ba",
    accentGlow: "rgba(38,133,186,0.12)",
    tagline: "Dental Analytics",
    blurb:
      "AI-powered practice management integrating imaging analysis, treatment planning, insurance optimization, and practice analytics in one platform.",
    chatbotPrefix: "D",
    chatbotSuffix: "X Assist",
    chatbotLine: "Clinical chatbot sourcing approved dental literature and CDA guidelines",
  },
];

/* ════════════════════════════════════════════════════════════
   ONCOVISION VISUALS — Based on actual product features
   ════════════════════════════════════════════════════════════ */

const OncoVisuals = ({
  accent,
  isInView,
}: {
  accent: string;
  isInView: boolean;
}) => {
  /* RANO Assessment Timeline */
  const ranoTimeline = [
    { label: "Baseline", status: "Baseline", vol: 42.1, color: "#6B7280" },
    { label: "Post-Op", status: "PR", vol: 28.3, color: accent },
    { label: "Wk 12", status: "SD", vol: 26.8, color: "#f59e0b" },
    { label: "Wk 24", status: "PR", vol: 18.4, color: accent },
    { label: "Wk 36", status: "SD", vol: 17.1, color: "#f59e0b" },
  ];

  /* Tumor volumetrics */
  const volumes = [
    { label: "Whole Tumor", val: "18.4 mL", pct: 74, color: accent },
    { label: "Tumor Core", val: "8.2 mL", pct: 52, color: "#f59e0b" },
    { label: "Enhancing", val: "5.1 mL", pct: 38, color: "#ef4444" },
    { label: "Edema", val: "12.7 mL", pct: 62, color: "#7B2FF7" },
  ];

  /* Radiomics features */
  const radiomics = [
    { name: "Sphericity", val: "0.847", cat: "Shape" },
    { name: "Elongation", val: "0.723", cat: "Shape" },
    { name: "Entropy", val: "4.21", cat: "Texture" },
    { name: "Homogeneity", val: "0.312", cat: "Texture" },
    { name: "Skewness", val: "-0.45", cat: "Intensity" },
    { name: "Kurtosis", val: "3.12", cat: "Intensity" },
  ];

  /* Survival curves */
  const svW = 320;
  const svH = 110;
  const svPad = { l: 30, r: 8, t: 12, b: 20 };
  const svIW = svW - svPad.l - svPad.r;
  const svIH = svH - svPad.t - svPad.b;
  const treated = [1, 0.97, 0.93, 0.88, 0.84, 0.8, 0.77, 0.74, 0.72, 0.7, 0.68];
  const control = [1, 0.95, 0.87, 0.78, 0.68, 0.59, 0.51, 0.45, 0.4, 0.36, 0.33];
  const svX = (i: number) => svPad.l + (i / (treated.length - 1)) * svIW;
  const svY = (v: number) => svPad.t + (1 - v) * svIH;
  const stepLine = (data: number[]) =>
    data.map((v, i) => (i === 0 ? `M ${svX(i)} ${svY(v)}` : `H ${svX(i)} V ${svY(v)}`)).join(" ");

  /* BI-RADS mammography */
  const birads = { category: 4, density: "C", risk: "Intermediate", pct: 62 };

  return (
    <div className="space-y-6">
      {/* 1 - RANO Assessment Timeline */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          RANO Assessment Timeline
        </p>
        <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-end justify-between gap-1">
            {ranoTimeline.map((tp, i) => (
              <motion.div key={i} className="flex flex-col items-center flex-1"
                initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }}>
                <span className="text-[10px] font-bold mb-1" style={{ color: tp.color }}>{tp.status}</span>
                <div className="w-full rounded-t-sm mx-0.5" style={{ height: `${(tp.vol / 50) * 60}px`, background: tp.color, opacity: 0.7 }} />
                <div className="w-full h-[1px] bg-white/[0.1]" />
                <span className="text-[7px] text-gray-500 mt-1">{tp.label}</span>
                <span className="text-[8px] text-gray-400 font-medium">{tp.vol} mL</span>
              </motion.div>
            ))}
          </div>
          {/* Connecting line */}
          <div className="flex items-center gap-0.5 mt-2 px-2">
            {ranoTimeline.map((tp, i) => (
              <React.Fragment key={i}>
                <div className="w-2 h-2 rounded-full" style={{ background: tp.color, opacity: 0.8 }} />
                {i < ranoTimeline.length - 1 && <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(90deg, ${tp.color}, ${ranoTimeline[i + 1]?.color || tp.color})`, opacity: 0.4 }} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* 2 - Tumor Volumetrics */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          Tumor Volumetric Segmentation
        </p>
        <div className="space-y-2 rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {volumes.map((v, i) => (
            <motion.div key={i} className="flex items-center gap-3" initial={{ opacity: 0, x: -8 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.5 + i * 0.1 }}>
              <span className="text-[10px] text-gray-500 w-24 flex-shrink-0">{v.label}</span>
              <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: v.color }}
                  initial={{ width: 0 }} animate={isInView ? { width: `${v.pct}%` } : {}} transition={{ delay: 0.7 + i * 0.1, duration: 0.6 }} />
              </div>
              <span className="text-xs text-white font-semibold w-16 text-right">{v.val}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3 - Radiomics Feature Panel */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          Radiomics Feature Extraction
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {radiomics.map((r, i) => (
            <motion.div key={i} className="rounded-md px-2 py-1.5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
              initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.6 + i * 0.06 }}>
              <p className="text-[7px] text-gray-500 uppercase">{r.cat}</p>
              <p className="text-xs text-white font-semibold">{r.val}</p>
              <p className="text-[8px] text-gray-400">{r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4 - Survival Prediction Curves */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          Survival Prediction Model
        </p>
        <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <svg viewBox={`0 0 ${svW} ${svH}`} className="w-full">
            {[0, 0.25, 0.5, 0.75, 1].map((v) => (
              <React.Fragment key={v}>
                <line x1={svPad.l} y1={svY(v)} x2={svW - svPad.r} y2={svY(v)} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                <text x={svPad.l - 4} y={svY(v) + 2.5} textAnchor="end" fill="rgba(255,255,255,0.2)" fontSize="6">{(v * 100).toFixed(0)}%</text>
              </React.Fragment>
            ))}
            <motion.path d={stepLine(treated)} fill="none" stroke={accent} strokeWidth="1.5"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ delay: 0.4, duration: 1.2 }} />
            <motion.path d={stepLine(control)} fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ delay: 0.6, duration: 1.2 }} />
            <text x={svW - svPad.r} y={svY(0.68) - 4} textAnchor="end" fill={accent} fontSize="6" fontWeight="600">Treated</text>
            <text x={svW - svPad.r} y={svY(0.33) - 4} textAnchor="end" fill="#ef4444" fontSize="6" fontWeight="600">Control</text>
            {[0, 5, 10].map((m) => (
              <text key={m} x={svX(m)} y={svH - 4} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6">{m * 3}mo</text>
            ))}
          </svg>
          <div className="flex justify-between mt-1 px-1">
            <span className="text-[8px] text-gray-500">HR: 0.54 (95% CI: 0.38-0.76)</span>
            <span className="text-[8px] font-bold" style={{ color: accent }}>p &lt; 0.001</span>
          </div>
        </div>
      </div>

      {/* 5 - BI-RADS / Mammography Classification */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          Mammography Assessment
        </p>
        <div className="rounded-lg p-3 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <motion.div className="flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center"
            style={{ background: `${accent}15`, border: `1px solid ${accent}33` }}
            initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: 0.8, type: "spring" }}>
            <span className="text-[8px] text-gray-500">BI-RADS</span>
            <span className="text-2xl font-bold" style={{ color: "#f59e0b" }}>{birads.category}</span>
          </motion.div>
          <div className="flex-1 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[10px] text-gray-500">ACR Density</span>
              <span className="text-xs text-white font-semibold">Category {birads.density}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-gray-500">Tissue Density</span>
              <span className="text-xs text-white font-semibold">{birads.pct}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-gray-500">Risk Level</span>
              <span className="text-[10px] font-bold text-amber-400">{birads.risk}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 - WHO Grade Classification */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          AI Classification
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "WHO Grade", value: "IV", sub: "Glioblastoma", conf: 94, color: "#ef4444" },
            { label: "IDH Status", value: "Wild-type", sub: "Molecular", conf: 91, color: "#f59e0b" },
          ].map((c, i) => (
            <motion.div key={i} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
              initial={{ opacity: 0, y: 8 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1 + i * 0.1 }}>
              <p className="text-[8px] text-gray-500 uppercase">{c.label}</p>
              <p className="text-lg font-bold" style={{ color: c.color }}>{c.value}</p>
              <p className="text-[9px] text-gray-400">{c.sub}</p>
              <div className="mt-1 flex items-center gap-1">
                <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ background: accent }}
                    initial={{ width: 0 }} animate={isInView ? { width: `${c.conf}%` } : {}} transition={{ delay: 1.2, duration: 0.5 }} />
                </div>
                <span className="text-[8px] font-bold" style={{ color: accent }}>{c.conf}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   RADMETRIX VISUALS
   ════════════════════════════════════════════════════════════ */

const RadVisuals = ({
  accent,
  isInView,
}: {
  accent: string;
  isInView: boolean;
}) => {
  /* Quantitative metrics */
  const measurements = [
    { label: "Lesion Volume", current: "12.4 cm³", change: -18, prior: "15.1 cm³" },
    { label: "ADC Mean", current: "1.42×10⁻³", change: 12, prior: "1.27×10⁻³" },
    { label: "Enhancement Peak", current: "64 HU", change: -8, prior: "70 HU" },
    { label: "T2 Signal Ratio", current: "2.1", change: -5, prior: "2.2" },
  ];

  /* Volume tracking */
  const volW = 320;
  const volH = 100;
  const volPad = { l: 36, r: 10, t: 10, b: 20 };
  const volIW = volW - volPad.l - volPad.r;
  const volIH = volH - volPad.t - volPad.b;
  const vols = [22.1, 20.4, 18.8, 17.2, 15.1, 14.0, 12.4];
  const maxV = 25;
  const vX = (i: number) => volPad.l + (i / (vols.length - 1)) * volIW;
  const vY = (v: number) => volPad.t + (1 - v / maxV) * volIH;
  const volLine = vols.map((v, i) => `${i === 0 ? "M" : "L"} ${vX(i)} ${vY(v)}`).join(" ");
  const volArea = volLine + ` L ${vX(vols.length - 1)} ${vY(0)} L ${vX(0)} ${vY(0)} Z`;

  /* Multi-sequence signal */
  const sequences = [
    { name: "T1w", signal: 0.4 }, { name: "T2w", signal: 0.85 },
    { name: "FLAIR", signal: 0.72 }, { name: "DWI", signal: 0.9 }, { name: "ADC", signal: 0.25 },
  ];

  /* Automated findings */
  const findings = [
    { region: "Right frontal", finding: "Mass lesion 2.4×1.8 cm", severity: "high" },
    { region: "Perilesional", finding: "Vasogenic edema, 3.2 cm spread", severity: "medium" },
    { region: "Midline", finding: "No significant shift (1.2 mm)", severity: "low" },
    { region: "Ventricles", finding: "Mild asymmetric dilatation", severity: "low" },
  ];

  return (
    <div className="space-y-6">
      {/* 1 - MRI Scan Image */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          MRI Scan Analysis
        </p>
        <motion.div
          className="rounded-lg overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${accent}33` }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="relative">
            <img
              src="/assets/images/brain-mri.png"
              alt="Brain MRI scan"
              className="w-full h-auto object-cover"
              style={{ maxHeight: 220 }}
            />
            <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md" style={{ background: "rgba(15,23,36,0.8)", border: `1px solid ${accent}44` }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
              <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color: accent }}>AI Analysis Active</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2 - Automated findings */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          AI-Detected Findings
        </p>
        <div className="space-y-1.5">
          {findings.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md"
              style={{ background: "rgba(255,255,255,0.03)", borderLeft: `2px solid ${f.severity === "high" ? "#ef4444" : f.severity === "medium" ? "#f59e0b" : accent}` }}>
              <span className="text-[9px] font-bold text-gray-400 w-20 flex-shrink-0">{f.region}</span>
              <span className="text-[11px] text-gray-300 flex-1">{f.finding}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3 - Quantitative metrics */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          Quantitative Imaging Metrics
        </p>
        <div className="space-y-2 rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {measurements.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-3">
              <span className="text-[10px] text-gray-500 w-28 flex-shrink-0">{m.label}</span>
              <span className="text-xs text-white font-semibold w-20">{m.current}</span>
              <span className="text-[10px] font-bold" style={{ color: m.change < 0 ? accent : "#ef4444" }}>
                {m.change > 0 ? "+" : ""}{m.change}%
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: m.change < 0 ? accent : "#ef4444" }}
                  initial={{ width: 0 }} animate={isInView ? { width: `${Math.abs(m.change) * 3}%` } : {}} transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4 - Volume tracking */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          Lesion Volume Tracking
        </p>
        <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <svg viewBox={`0 0 ${volW} ${volH}`} className="w-full">
            {[0, 10, 20].map((v) => (
              <React.Fragment key={v}>
                <line x1={volPad.l} y1={vY(v)} x2={volW - volPad.r} y2={vY(v)} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                <text x={volPad.l - 4} y={vY(v) + 2.5} textAnchor="end" fill="rgba(255,255,255,0.2)" fontSize="6">{v}</text>
              </React.Fragment>
            ))}
            <motion.path d={volArea} fill={accent} opacity={0.08} initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.08 } : {}} transition={{ delay: 0.5 }} />
            <motion.path d={volLine} fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ delay: 0.5, duration: 1 }} />
            {vols.map((v, i) => (
              <motion.circle key={i} cx={vX(i)} cy={vY(v)} r={2.5} fill="#0f1724" stroke={accent} strokeWidth="1.5"
                initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 + i * 0.1 }} />
            ))}
            {vols.map((_, i) => (
              <text key={`l-${i}`} x={vX(i)} y={volH - 4} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="5">Scan {i + 1}</text>
            ))}
          </svg>
          <div className="flex justify-between mt-1 px-1">
            <span className="text-[8px] text-gray-500">Total change: -44%</span>
            <span className="text-[8px] font-bold" style={{ color: accent }}>RECIST: Partial Response</span>
          </div>
        </div>
      </div>

      {/* 5 - Multi-sequence signals */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          Multi-Sequence Signal Analysis
        </p>
        <div className="rounded-lg p-3 space-y-2" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {sequences.map((s, i) => (
            <motion.div key={s.name} className="flex items-center gap-3" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.8 + i * 0.08 }}>
              <span className="text-[10px] text-gray-400 font-mono w-10 flex-shrink-0">{s.name}</span>
              <div className="flex-1 h-3 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${accent}66, ${accent})` }}
                  initial={{ width: 0 }} animate={isInView ? { width: `${s.signal * 100}%` } : {}} transition={{ delay: 1 + i * 0.08, duration: 0.6 }} />
              </div>
              <span className="text-[10px] text-gray-400 w-8 text-right">{(s.signal * 100).toFixed(0)}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   PEARLAI VISUALS — Based on actual product features
   ════════════════════════════════════════════════════════════ */

const DentalVisuals = ({
  accent,
  isInView,
}: {
  accent: string;
  isInView: boolean;
}) => {
  /* X-ray AI findings */
  const findings = [
    { tooth: "#16", finding: "Periapical radiolucency", conf: 94, severity: "critical" as const },
    { tooth: "#26", finding: "Mesial caries detected", conf: 91, severity: "critical" as const },
    { tooth: "#47", finding: "Moderate bone loss", conf: 87, severity: "warning" as const },
    { tooth: "#27", finding: "Calculus deposits", conf: 83, severity: "warning" as const },
    { tooth: "#36", finding: "Early enamel erosion", conf: 79, severity: "info" as const },
  ];

  const severityColor = { critical: "#ef4444", warning: "#f59e0b", info: accent };

  /* Treatment plan with CDA codes */
  const txPlan = [
    { phase: "Urgent", items: [
      { code: "33111", desc: "Root canal therapy #16", fee: "$890", coverage: 80 },
      { code: "23101", desc: "Composite restoration #26", fee: "$245", coverage: 80 },
    ]},
    { phase: "Standard", items: [
      { code: "11101", desc: "Complete scaling (2 units)", fee: "$210", coverage: 100 },
      { code: "43421", desc: "Porcelain crown #16", fee: "$1,250", coverage: 50 },
    ]},
  ];

  /* Benefit Intelligence */
  const benefits = {
    annualMax: 2000, used: 480, remaining: 1520,
    expiry: "Dec 2026", utilization: 24,
    err: 1840,
  };

  /* Perio probing depths */
  const probing = [
    { tooth: 16, depths: [4, 5, 3, 3, 6, 4] },
    { tooth: 15, depths: [2, 3, 2, 2, 3, 2] },
    { tooth: 14, depths: [2, 2, 2, 2, 2, 2] },
    { tooth: 13, depths: [2, 2, 2, 2, 2, 2] },
    { tooth: 12, depths: [2, 3, 2, 2, 2, 2] },
    { tooth: 11, depths: [2, 2, 2, 2, 2, 2] },
  ];
  const depthColor = (d: number) => d >= 5 ? "#ef4444" : d >= 4 ? "#f59e0b" : d >= 3 ? accent : "rgba(255,255,255,0.15)";

  /* Practice KPIs */
  const kpis = [
    { label: "Collection Rate", val: "94.2%", trend: "+2.1%" },
    { label: "Acceptance Rate", val: "78%", trend: "+5%" },
    { label: "Chair Utilization", val: "86%", trend: "+3.4%" },
  ];

  return (
    <div className="space-y-6">
      {/* 0 - Dental X-ray Image */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          Panoramic Radiograph
        </p>
        <motion.div
          className="rounded-lg overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${accent}33` }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative">
            <img
              src="/assets/images/dental-xray.jpg"
              alt="Dental panoramic X-ray"
              className="w-full h-auto object-cover"
              style={{ maxHeight: 200 }}
            />
            <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md" style={{ background: "rgba(15,23,36,0.8)", border: `1px solid ${accent}44` }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
              <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color: accent }}>AI Analysis Active</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 1 - AI X-ray Findings */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          AI Imaging Analysis
        </p>
        <div className="space-y-1.5">
          {findings.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: "rgba(255,255,255,0.03)", borderLeft: `2px solid ${severityColor[f.severity]}` }}>
              <span className="text-[10px] font-bold text-gray-400 w-7 flex-shrink-0">{f.tooth}</span>
              <span className="text-xs text-gray-300 flex-1">{f.finding}</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ color: severityColor[f.severity], background: `${severityColor[f.severity]}15` }}>
                {f.conf}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2 - AI Treatment Plan */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          AI-Generated Treatment Plan
        </p>
        <div className="rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          {txPlan.map((phase, pi) => (
            <div key={pi}>
              <div className="px-3 py-1.5" style={{ background: pi === 0 ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.03)" }}>
                <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: pi === 0 ? "#ef4444" : "#f59e0b" }}>
                  {phase.phase}
                </span>
              </div>
              {phase.items.map((item, ii) => (
                <motion.div key={ii} className="px-3 py-2 flex items-center gap-2 border-t border-white/[0.04]"
                  initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 + pi * 0.2 + ii * 0.1 }}>
                  <span className="text-[8px] text-gray-500 font-mono w-12 flex-shrink-0">{item.code}</span>
                  <span className="text-[11px] text-gray-300 flex-1">{item.desc}</span>
                  <span className="text-xs text-white font-semibold">{item.fee}</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded-full" style={{ color: accent, background: `${accent}15` }}>
                    {item.coverage}%
                  </span>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 3 - Benefit Intelligence */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          Benefit Intelligence
        </p>
        <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-gray-500">Annual Benefit Usage</span>
            <span className="text-xs text-gray-400">Resets {benefits.expiry}</span>
          </div>
          <div className="w-full h-3 rounded-full bg-white/[0.06] overflow-hidden mb-2">
            <motion.div className="h-full rounded-full" style={{ background: accent }}
              initial={{ width: 0 }} animate={isInView ? { width: `${benefits.utilization}%` } : {}} transition={{ delay: 0.7, duration: 0.8 }} />
          </div>
          <div className="flex justify-between text-[9px] mb-3">
            <span className="text-gray-400">Used: ${benefits.used}</span>
            <span className="font-bold" style={{ color: accent }}>Remaining: ${benefits.remaining}</span>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-md" style={{ background: `${accent}08`, border: `1px solid ${accent}22` }}>
            <div className="flex-1">
              <p className="text-[8px] text-gray-500 uppercase">Expected Revenue Recovery</p>
              <p className="text-lg font-bold" style={{ color: accent }}>${benefits.err.toLocaleString()}</p>
            </div>
            <span className="text-[8px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ color: "#ef4444", background: "rgba(239,68,68,0.1)" }}>
              HIGH Priority
            </span>
          </div>
        </div>
      </div>

      {/* 4 - Periodontal Charting */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          Periodontal Assessment
        </p>
        <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: 220 }}>
              <thead>
                <tr>
                  <th className="text-[7px] text-gray-500 text-left pb-1 pr-1">Tooth</th>
                  <th className="text-[6px] text-gray-500 pb-1 px-0.5" colSpan={3}>Facial</th>
                  <th className="text-[6px] text-gray-500 pb-1 px-0.5" colSpan={3}>Lingual</th>
                </tr>
              </thead>
              <tbody>
                {probing.map((t, ti) => (
                  <motion.tr key={t.tooth} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.8 + ti * 0.05 }}>
                    <td className="text-[9px] text-gray-400 font-medium pr-1 py-0.5">#{t.tooth}</td>
                    {t.depths.map((d, di) => (
                      <td key={di} className="px-0.5 py-0.5 text-center">
                        <div className="w-5 h-5 rounded-sm flex items-center justify-center mx-auto text-[8px] font-bold text-white"
                          style={{ background: depthColor(d) }}>
                          {d}
                        </div>
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.05]">
            <div className="flex gap-2">
              {[{ l: "Healthy", c: "rgba(255,255,255,0.15)" }, { l: "3mm", c: accent }, { l: "4mm", c: "#f59e0b" }, { l: "5mm+", c: "#ef4444" }].map((x) => (
                <div key={x.l} className="flex items-center gap-0.5">
                  <div className="w-2 h-2 rounded-sm" style={{ background: x.c }} />
                  <span className="text-[6px] text-gray-500">{x.l}</span>
                </div>
              ))}
            </div>
            <span className="text-[8px] font-bold" style={{ color: "#f59e0b" }}>AAP Stage II, Grade B</span>
          </div>
        </div>
      </div>

      {/* 5 - Practice Analytics KPIs */}
      <div>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
          Practice Analytics
        </p>
        <div className="grid grid-cols-3 gap-2">
          {kpis.map((k, i) => (
            <motion.div key={i} className="rounded-lg p-2 text-center"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
              initial={{ opacity: 0, y: 8 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1 + i * 0.1 }}>
              <p className="text-[7px] text-gray-500 uppercase mb-0.5">{k.label}</p>
              <p className="text-sm font-bold text-white">{k.val}</p>
              <p className="text-[8px] font-bold" style={{ color: accent }}>{k.trend}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const renderVisual = (index: number, accent: string, isInView: boolean) => {
  if (index === 0) return <OncoVisuals accent={accent} isInView={isInView} />;
  if (index === 1) return <RadVisuals accent={accent} isInView={isInView} />;
  return <DentalVisuals accent={accent} isInView={isInView} />;
};

/* ─────────────────── Product card ─────────────────── */

interface CardProps {
  product: Product;
  index: number;
  isInView: boolean;
}

const ProductCard: React.FC<CardProps> = ({ product, index, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(180deg, #141b2d 0%, #0f1724 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Product name + tagline */}
      <div className="px-6 pt-6 pb-2">
        <h3 className="text-2xl font-bold text-white mb-0.5">
          <span style={{ color: product.accent }}>{product.namePrefix}</span>
          {product.nameSuffix}
        </h3>
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: product.accent, opacity: 0.6 }}>
          {product.tagline}
        </p>
        <p className="text-sm text-gray-400 leading-relaxed">{product.blurb}</p>
      </div>

      {/* Scrollable analytics visual area */}
      <div className="px-6 py-4 flex-grow overflow-y-auto max-h-[520px] custom-scrollbar">
        {renderVisual(index, product.accent, isInView)}
      </div>

      {/* Chatbot module */}
      <div className="mx-6 border-t border-white/[0.05]" />
      <div className="p-5 pt-4">
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3"
          style={{
            background: `linear-gradient(135deg, ${product.accentGlow}, rgba(255,255,255,0.02))`,
            border: `1px solid ${product.accent}22`,
          }}
        >
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${product.accent}20` }}>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" fill={product.accent} />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white leading-tight">
              <span style={{ color: product.accent }}>{product.chatbotPrefix}</span>
              {product.chatbotSuffix}
            </p>
            <p className="text-[10px] text-gray-400 truncate">{product.chatbotLine}</p>
          </div>
          <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ color: product.accent, background: `${product.accent}15` }}>AI Chat</span>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────── Section ─────────────────── */

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useOnScreen(sectionRef, "-100px");

  return (
    <section className="bg-[#111827] py-16 lg:py-24" id="projects" ref={sectionRef}>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white mb-4 max-w-4xl mx-auto">
            Product Suite
          </h2>
          <p className="text-lg text-gray-400 font-medium tracking-wide max-w-3xl mx-auto">
            Specialized AI analytics platforms, each with a dedicated clinical
            chatbot powered by approved medical sources
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <ProductCard
              key={product.namePrefix}
              product={product}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
