import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Distinct SVG icons per stage (reused from ServiceHubDiagram patterns)
const stageIcons: React.ReactNode[] = [
  // Clinical Feasibility — medical document with cross
  <svg key="icon-0" viewBox="0 0 24 24" fill="none" className="w-7 h-7">
    <path
      d="M15 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9l-6-6zM5 5h9v5h5v9H5V5zm4 9h2v-2h2v2h2v2h-2v2h-2v-2H9v-2z"
      fill="currentColor"
    />
  </svg>,
  // Model Development & Training — neural network hub
  <svg key="icon-1" viewBox="0 0 24 24" fill="none" className="w-7 h-7">
    <path
      d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 110 2h-1.07A7.001 7.001 0 0113 22h-2a7.001 7.001 0 01-6.93-6H3a1 1 0 110-2h1a7 7 0 017-7h1V5.73A2.002 2.002 0 0112 2zm0 7a5 5 0 00-5 5 5 5 0 005 5 5 5 0 005-5 5 5 0 00-5-5zm0 2a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3z"
      fill="currentColor"
    />
  </svg>,
  // Clinical Deployment — trending chart
  <svg key="icon-2" viewBox="0 0 24 24" fill="none" className="w-7 h-7">
    <path
      d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z"
      fill="currentColor"
    />
  </svg>,
  // Monitoring & Maintenance — bar chart / analytics
  <svg key="icon-3" viewBox="0 0 24 24" fill="none" className="w-7 h-7">
    <path
      d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V5h14v14zM19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"
      fill="currentColor"
    />
  </svg>,
  // SaaS Platform — cloud icon
  <svg key="icon-4" viewBox="0 0 24 24" fill="none" className="w-7 h-7">
    <path
      d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6a5.5 5.5 0 015.5 4.99l.01.51H19c1.65 0 3 1.35 3 3s-1.35 3-3 3z"
      fill="currentColor"
    />
  </svg>,
];

// Pipeline stages (consolidated from 7 to 5)
const stages = [
  { id: 0, label: "Clinical Feasibility", team: "research" },
  { id: 1, label: "Model Development & Training", team: "research" },
  { id: 2, label: "Clinical Deployment", team: "engineering" },
  { id: 3, label: "Monitoring & Maintenance", team: "ops" },
  { id: 4, label: "SaaS Platform", team: "ops" },
];

// Phase 1 scattered positions (chaotic layout — no team grouping)
const scatteredPositions = [
  { x: 100, y: 80 }, // Clinical Feasibility — top left (moved right)
  { x: 300, y: 70 }, // Model Dev & Training — top right
  { x: 200, y: 230 }, // Clinical Deployment — center
  { x: 100, y: 390 }, // Monitoring & Maintenance — bottom left (moved right)
  { x: 310, y: 340 }, // SaaS Platform — bottom right
];

// Phase 3 pipeline positions (left-aligned, 5 nodes with ~75px spacing)
const pipelinePositions = [
  { x: 80, y: 130 },
  { x: 80, y: 205 },
  { x: 80, y: 280 },
  { x: 80, y: 355 },
  { x: 80, y: 430 },
];

// Curved connection lines between scattered nodes (one per pair, quadratic bezier)
// Endpoints offset ~25px from node centers so curves don't overlap nodes
const tangledCurves = [
  // Node 0 (100,80) → Node 1 (300,70)
  "M 125 75 Q 200 20 275 68",
  // Node 0 (100,80) → Node 2 (200,230)
  "M 110 105 Q 70 170 180 215",
  // Node 0 (100,80) → Node 3 (100,390)
  "M 85 105 Q 30 240 85 365",
  // Node 1 (300,70) → Node 2 (200,230)
  "M 285 95 Q 310 165 220 215",
  // Node 1 (300,70) → Node 4 (310,340)
  "M 315 95 Q 370 210 320 315",
  // Node 2 (200,230) → Node 3 (100,390)
  "M 178 248 Q 100 320 105 365",
  // Node 2 (200,230) → Node 4 (310,340)
  "M 222 248 Q 310 280 305 315",
  // Node 3 (100,390) → Node 4 (310,340)
  "M 125 388 Q 210 430 290 355",
];

function getScatteredPos(index: number) {
  return scatteredPositions[index]!;
}

const TRANSITION_SMOOTH = { duration: 0.8, ease: "easeInOut" as const };

const CYCLE_DURATION = 9000; // total loop: 3s phase1 + 2.5s phase2 + 3.5s phase3

const PipelineStoryAnimation = () => {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 2 starts at 3s
    timers.push(setTimeout(() => setPhase(2), 3000));

    // Phase 3 starts at 5.5s
    timers.push(setTimeout(() => setPhase(3), 5500));

    // Reset to phase 1 and remount to replay
    timers.push(
      setTimeout(() => {
        setPhase(1);
        setLoopKey((k) => k + 1);
      }, CYCLE_DURATION)
    );

    return () => timers.forEach(clearTimeout);
  }, [loopKey]);

  const showClusters = phase === 1;
  const isPipeline = phase >= 2;
  const isFinal = phase === 3;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="relative w-full max-w-[480px]"
        style={{ aspectRatio: "480/560" }}
      >
        {/* Glow background */}
        <div className="absolute inset-0 rounded-2xl bg-white/[0.07] border border-white/15 backdrop-blur-xl shadow-lg shadow-black/20" />

        <svg
          key={loopKey}
          viewBox="0 0 420 520"
          className="w-full h-full relative z-10"
          style={{ padding: "20px 30px" }}
        >
          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrowWhite"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#ffffff" opacity="0.5" />
            </marker>
          </defs>

          {/* Phase 1: Tangled curved connection lines (draw in after nodes) */}
          {tangledCurves.map((d, i) => (
            <motion.path
              key={`tangled-${i}`}
              d={d}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeDasharray="5 5"
              markerEnd="url(#arrowWhite)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: showClusters ? 1 : 0,
                opacity: showClusters ? 0.5 : 0,
              }}
              transition={{
                duration: 0.8,
                delay: showClusters ? 1.0 + i * 0.1 : 0,
                ease: "easeOut",
              }}
            />
          ))}

          {/* NOVARA logo hub — always rendered, animated visibility */}
          <motion.g
            animate={{
              opacity: isFinal ? 1 : 0,
              scale: isFinal ? 1 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            style={{ originX: "80px", originY: "50px" }}
          >
            <circle cx={80} cy={50} r={36} fill="none" />
            <circle
              cx={80}
              cy={50}
              r={30}
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity={0.3}
            />
            <defs>
              <clipPath id="logoClip">
                <circle cx={80} cy={50} r={30} />
              </clipPath>
            </defs>
            <image
              href="/assets/images/network_bluebackground.svg"
              x={80 - 30}
              y={50 - 30}
              width={60}
              height={60}
              clipPath="url(#logoClip)"
            />
          </motion.g>

          {/* Pulse rings on logo — always rendered */}
          <motion.circle
            cx={80}
            cy={50}
            r={36}
            fill="none"
            stroke="#7B2FF7"
            strokeWidth="1.5"
            animate={
              isFinal
                ? { r: [36, 58], opacity: [0.5, 0] }
                : { r: 36, opacity: 0 }
            }
            transition={
              isFinal
                ? { duration: 3, repeat: Infinity, ease: "easeOut" }
                : { duration: 0.3 }
            }
          />
          <motion.circle
            cx={80}
            cy={50}
            r={36}
            fill="none"
            stroke="#7B2FF7"
            strokeWidth="1.5"
            animate={
              isFinal
                ? { r: [36, 58], opacity: [0.5, 0] }
                : { r: 36, opacity: 0 }
            }
            transition={
              isFinal
                ? {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 1.5,
                  }
                : { duration: 0.3 }
            }
          />

          {/* Pipeline connection lines — always rendered */}
          {pipelinePositions.slice(0, -1).map((pos, i) => {
            const next = pipelinePositions[i + 1]!;
            return (
              <motion.line
                key={`pipe-${i}`}
                x1={pos.x}
                y1={pos.y + 26}
                x2={next.x}
                y2={next.y - 26}
                stroke="#18D3C5"
                strokeWidth="2"
                animate={{
                  pathLength: isFinal ? 1 : 0,
                  opacity: isFinal ? 0.6 : 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: isFinal ? i * 0.2 : 0,
                  ease: "easeOut",
                }}
              />
            );
          })}

          {/* Line from hub to first node — always rendered */}
          <motion.line
            x1={80}
            y1={86}
            x2={80}
            y2={110}
            stroke="#7B2FF7"
            strokeWidth="2"
            animate={{
              pathLength: isFinal ? 1 : 0,
              opacity: isFinal ? 0.6 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Nodes */}
          {stages.map((stage, i) => {
            const scattered = getScatteredPos(i);
            const pipePos = pipelinePositions[i]!;
            const targetX = isPipeline ? pipePos.x : scattered.x;
            const targetY = isPipeline ? pipePos.y : scattered.y;

            return (
              <motion.g
                key={stage.id}
                initial={{ opacity: 0, x: scattered.x, y: scattered.y }}
                animate={{
                  opacity: 1,
                  x: targetX,
                  y: targetY,
                }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 18,
                  delay: i * 0.1 + 0.2,
                }}
              >
                {/* Node circle — animate stroke color smoothly */}
                <motion.circle
                  cx={0}
                  cy={0}
                  r={26}
                  fill="#0f1d4a"
                  strokeWidth="2"
                  animate={{ stroke: isFinal ? "#18D3C5" : "#4B5563" }}
                  transition={TRANSITION_SMOOTH}
                />
                <circle cx={0} cy={0} r={21} fill="#18D3C5" opacity={0.15} />

                {/* Distinct icon inside node */}
                <foreignObject x={-14} y={-14} width="28" height="28">
                  <div className="text-[#18D3C5] flex items-center justify-center w-full h-full">
                    {stageIcons[i]}
                  </div>
                </foreignObject>

                {/* Label — animate position smoothly, always textAnchor start */}
                <motion.text
                  animate={{
                    x: isPipeline ? 40 : -(stage.label.length * 4),
                    y: isPipeline ? 2 : 40,
                    opacity: isPipeline ? [0, 0, 1] : 1,
                  }}
                  transition={TRANSITION_SMOOTH}
                  textAnchor="start"
                  fill="white"
                  fontSize="15"
                  fontFamily="Google Sans, sans-serif"
                >
                  {stage.label}
                </motion.text>

                {/* Checkmark — animate visibility smoothly */}
                <motion.text
                  x={40 + stage.label.length * 8 + 8}
                  y={3}
                  fill="#18D3C5"
                  fontSize="17"
                  fontFamily="Google Sans, sans-serif"
                  animate={{ opacity: isFinal ? 1 : 0 }}
                  transition={{
                    duration: 0.4,
                    delay: isFinal ? i * 0.15 + 0.8 : 0,
                  }}
                >
                  &#x2713;
                </motion.text>
              </motion.g>
            );
          })}

          {/* Energy flow line — always rendered */}
          <motion.line
            x1={80}
            y1={110}
            x2={80}
            y2={450}
            stroke="url(#energyGradient)"
            strokeWidth="2"
            strokeDasharray="4 8"
            animate={{
              opacity: isFinal ? 0.15 : 0,
              strokeDashoffset: isFinal ? [0, -48] : 0,
            }}
            transition={
              isFinal
                ? { duration: 2, repeat: Infinity, ease: "linear" }
                : { duration: 0.3 }
            }
          />

          {/* Gradient def for energy flow */}
          <defs>
            <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7B2FF7" />
              <stop offset="100%" stopColor="#18D3C5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default PipelineStoryAnimation;
