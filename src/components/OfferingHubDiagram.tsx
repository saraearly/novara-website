/* eslint-disable */
import React from "react";
import { motion } from "framer-motion";

// SVG icon paths for offering nodes (right side) — only Clinical Insights & Predictive Analytics
const offeringIconPaths = [
  // Clinical Insights - Medical doc with cross
  "M15 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9l-6-6zM5 5h9v5h5v9H5V5zm4 9h2v-2h2v2h2v2h-2v2h-2v-2H9v-2z",
  // Predictive Analytics - Trending chart
  "M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z",
];

// SVG icon paths for data sources (left side)
const dataSourceIconPaths = [
  // EHR - Clipboard with medical cross
  "M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14h-2v-2H9v-2h3v-2h2v2h3v2h-2v2z",
  // Imaging - CT/MRI scan
  "M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z",
  // Lab Results - Flask / beaker
  "M7 2v2h1v7.15l-4.65 7.19C2.77 19.4 3.42 21 4.72 21h14.56c1.3 0 1.95-1.6 1.37-2.66L16 11.15V4h1V2H7zm6 9.3l4.09 6.32c.17.26-.02.59-.31.59H7.22c-.29 0-.48-.33-.31-.59L11 11.3V4h2v7.3z",
  // Genomics - DNA helix
  "M4 2h2v3.5c0 1.94.95 3.72 2.5 4.83L10 11.5l-1.5 1.17A5.764 5.764 0 006 17.5V22H4v-4.5c0-2.46 1.25-4.69 3.24-6L8.5 10.5l-1.26-1C5.25 8.19 4 5.96 4 3.5V2zm16 0h-2v1.5c0 2.46-1.25 4.69-3.24 6l-1.26 1 1.26 1C16.75 12.81 18 15.04 18 17.5V22h2v-4.5c0-1.94-.95-3.72-2.5-4.83L16 11.5l1.5-1.17A5.764 5.764 0 0020 5.5V2zm-8 7a1 1 0 110 2 1 1 0 010-2zm-2 4a1 1 0 110 2 1 1 0 010-2zm4 0a1 1 0 110 2 1 1 0 010-2z",
  // Wearables - Smartwatch
  "M20 12c0-2.54-1.19-4.81-3.04-6.27L16 0H8l-.95 5.73C5.19 7.19 4 9.45 4 12s1.19 4.81 3.05 6.27L8 24h8l.96-5.73A7.976 7.976 0 0020 12zM6 12c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z",
];

// Data sources layout
const DS_NODE_R = 20;
const dataSources = [
  { label: "EHR", x: 80, y: 75 },
  { label: "Imaging", x: 70, y: 165 },
  { label: "Lab Results", x: 60, y: 255 },
  { label: "Genomics", x: 70, y: 345 },
  { label: "Wearables", x: 80, y: 430 },
];

// Hub center
const HUB_X = 290;
const HUB_Y = 255;
const HUB_R = 44;

// Offering node positions (right side, 2 nodes balanced)
const nodePositions = [
  { x: 510, y: 170 },
  { x: 510, y: 340 },
];

const NODE_R = 30;

// Curved paths from data sources to hub
const dataSourcePaths = dataSources.map(
  (src) =>
    `M ${src.x + DS_NODE_R + 4} ${src.y} Q ${(src.x + HUB_X) / 2} ${
      (src.y + HUB_Y) / 2
    } ${HUB_X - HUB_R - 4} ${HUB_Y + (src.y - HUB_Y) * 0.15}`
);

interface OfferingHubDiagramProps {
  activeIndex: number;
  onSelect: (index: number) => void;
  isInView: boolean;
  items: Array<{ shortTitle?: string; title: string }>;
}

// Particle component for data flow animation
const FlowParticle = ({
  startX,
  startY,
  endX,
  endY,
  delay,
  duration,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
  duration: number;
}) => {
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  return (
    <motion.circle
      r={2.5}
      fill="#18D3C5"
      initial={{ cx: startX, cy: startY, opacity: 0 }}
      animate={{
        cx: [startX, midX, endX],
        cy: [startY, midY, endY],
        opacity: [0, 0.8, 0.8, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const OfferingHubDiagram: React.FC<OfferingHubDiagramProps> = ({
  activeIndex,
  onSelect,
  isInView,
  items,
}) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div
        className="relative w-full max-w-[680px]"
        style={{ aspectRatio: "620/520" }}
      >
        <svg viewBox="0 0 620 520" className="w-full h-full">
          <defs>
            <clipPath id="hubLogoClip">
              <circle cx={HUB_X} cy={HUB_Y} r={HUB_R - 4} />
            </clipPath>
            <linearGradient id="hubGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0f1d4a" />
              <stop offset="100%" stopColor="#162355" />
            </linearGradient>
            <linearGradient id="dsGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f0fdfa" />
              <stop offset="100%" stopColor="#e0f7f4" />
            </linearGradient>
            <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="3"
                floodColor="#0f1d4a"
                floodOpacity="0.15"
              />
            </filter>
            <filter id="hubShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow
                dx="0"
                dy="3"
                stdDeviation="6"
                floodColor="#7B2FF7"
                floodOpacity="0.2"
              />
            </filter>
          </defs>

          {/* Data source → hub curved paths */}
          {dataSourcePaths.map((d, i) => (
            <motion.path
              key={`ds-path-${i}`}
              d={d}
              fill="none"
              stroke="#18D3C5"
              strokeWidth="1"
              strokeDasharray="5 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isInView
                  ? { pathLength: 1, opacity: 0.3 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
            />
          ))}

          {/* Hub → offering node connection lines */}
          {nodePositions.map((pos, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.line
                key={`conn-${i}`}
                x1={HUB_X}
                y1={HUB_Y}
                x2={pos.x}
                y2={pos.y}
                stroke={isActive ? "#18D3C5" : "#CBD5E1"}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  isInView
                    ? { pathLength: 1, opacity: isActive ? 0.6 : 0.25 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 0.8, delay: 0.8 + i * 0.15 }}
              />
            );
          })}

          {/* Data flow particles */}
          {isInView &&
            dataSources.map((src, i) =>
              [0, 1, 2].map((p) => (
                <FlowParticle
                  key={`particle-${i}-${p}`}
                  startX={src.x + DS_NODE_R + 4}
                  startY={src.y}
                  endX={HUB_X - HUB_R - 4}
                  endY={HUB_Y + (src.y - HUB_Y) * 0.15}
                  delay={1.8 + i * 0.4 + p * 1.0}
                  duration={2.8}
                />
              ))
            )}

          {/* Data source nodes (left side) */}
          {dataSources.map((src, i) => (
            <motion.g
              key={`ds-${i}`}
              initial={{ opacity: 0, x: -30 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -30 }
              }
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              filter="url(#nodeShadow)"
            >
              {/* Node circle background */}
              <circle
                cx={src.x}
                cy={src.y}
                r={DS_NODE_R}
                fill="url(#dsGradient)"
                stroke="#18D3C5"
                strokeWidth="1.5"
                opacity={0.95}
              />
              {/* Inner subtle ring */}
              <circle
                cx={src.x}
                cy={src.y}
                r={DS_NODE_R - 4}
                fill="none"
                stroke="#18D3C5"
                strokeWidth="0.5"
                opacity={0.3}
              />
              {/* Icon inside node */}
              <g
                transform={`translate(${src.x - 10}, ${src.y - 10}) scale(0.833)`}
              >
                <path d={dataSourceIconPaths[i]} fill="#0f8a7e" />
              </g>
              {/* Label below node */}
              <text
                x={src.x}
                y={src.y + DS_NODE_R + 14}
                textAnchor="middle"
                fill="#374151"
                fontSize="11"
                fontFamily="Google Sans, sans-serif"
                fontWeight="600"
              >
                {src.label}
              </text>
            </motion.g>
          ))}

          {/* Central hub */}
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.5 }
            }
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5,
            }}
            style={{ originX: `${HUB_X}px`, originY: `${HUB_Y}px` }}
            filter="url(#hubShadow)"
          >
            {/* Outer soft glow ring */}
            <circle
              cx={HUB_X}
              cy={HUB_Y}
              r={HUB_R + 12}
              fill="#7B2FF7"
              opacity={0.06}
            />
            <circle
              cx={HUB_X}
              cy={HUB_Y}
              r={HUB_R + 6}
              fill="#7B2FF7"
              opacity={0.1}
            />
            {/* Main hub circle */}
            <circle
              cx={HUB_X}
              cy={HUB_Y}
              r={HUB_R}
              fill="white"
            />
            {/* Inner accent ring */}
            <circle
              cx={HUB_X}
              cy={HUB_Y}
              r={HUB_R - 3}
              fill="none"
              stroke="#7B2FF7"
              strokeWidth="1.5"
              opacity={0.5}
            />
            {/* Logo image */}
            <image
              href="/assets/images/network_bluebackground.svg"
              x={HUB_X - (HUB_R - 4)}
              y={HUB_Y - (HUB_R - 4)}
              width={(HUB_R - 4) * 2}
              height={(HUB_R - 4) * 2}
              clipPath="url(#hubLogoClip)"
            />
          </motion.g>

          {/* Hub pulse rings */}
          {isInView && (
            <>
              <motion.circle
                cx={HUB_X}
                cy={HUB_Y}
                r={HUB_R}
                fill="none"
                stroke="#7B2FF7"
                strokeWidth="1"
                animate={{
                  r: [HUB_R, HUB_R + 28],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1.0,
                }}
              />
              <motion.circle
                cx={HUB_X}
                cy={HUB_Y}
                r={HUB_R}
                fill="none"
                stroke="#7B2FF7"
                strokeWidth="1"
                animate={{
                  r: [HUB_R, HUB_R + 28],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 2.5,
                }}
              />
            </>
          )}

          {/* Offering nodes (right side) */}
          {nodePositions.map((pos, i) => {
            const isActive = activeIndex === i;
            const shortTitle =
              items[i]?.shortTitle || items[i]?.title || "";

            return (
              <motion.g
                key={`node-${i}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 1.0 + i * 0.15,
                }}
                style={{
                  originX: `${pos.x}px`,
                  originY: `${pos.y}px`,
                  cursor: "pointer",
                }}
                onClick={() => onSelect(i)}
                filter="url(#nodeShadow)"
              >
                {/* Invisible larger tap target */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={NODE_R + 14}
                  fill="transparent"
                />

                {/* Active pulse ring */}
                {isActive && isInView && (
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={NODE_R}
                    fill="none"
                    stroke="#18D3C5"
                    strokeWidth="1.5"
                    animate={{
                      r: [NODE_R, NODE_R + 16],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}

                {/* Node outer glow for active */}
                {isActive && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={NODE_R + 4}
                    fill="#18D3C5"
                    opacity={0.08}
                  />
                )}

                {/* Node background */}
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={NODE_R}
                  fill="#0f1d4a"
                  strokeWidth={isActive ? 2.5 : 1.5}
                  animate={{
                    stroke: isActive ? "#18D3C5" : "#334155",
                  }}
                  transition={{ duration: 0.3 }}
                />
                {/* Inner accent circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={NODE_R - 5}
                  fill="#18D3C5"
                  opacity={isActive ? 0.18 : 0.06}
                />

                {/* Icon */}
                <g
                  transform={`translate(${pos.x - 12}, ${
                    pos.y - 12
                  }) scale(1)`}
                >
                  <path
                    d={offeringIconPaths[i]}
                    fill={isActive ? "#18D3C5" : "#64B5AC"}
                  />
                </g>

                {/* Hover overlay */}
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={NODE_R}
                  fill="transparent"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Label below node */}
                <text
                  x={pos.x}
                  y={pos.y + NODE_R + 16}
                  textAnchor="middle"
                  fill={isActive ? "#0f1d4a" : "#6B7280"}
                  fontSize="11.5"
                  fontFamily="Google Sans, sans-serif"
                  fontWeight={isActive ? "700" : "500"}
                >
                  {shortTitle}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default OfferingHubDiagram;
