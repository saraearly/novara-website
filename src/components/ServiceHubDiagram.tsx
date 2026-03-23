import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    label: "Medical\nAnalytics",
    angle: -60,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V5h14v14zM19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Deep\nLearning",
    angle: 0,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 110 2h-1.07A7.001 7.001 0 0113 22h-2a7.001 7.001 0 01-6.93-6H3a1 1 0 110-2h1a7 7 0 017-7h1V5.73A2.002 2.002 0 0112 2zm0 7a5 5 0 00-5 5 5 5 0 005 5 5 5 0 005-5 5 5 0 00-5-5zm0 2a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Clinical\nInsights",
    angle: 60,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M15 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9l-6-6zM5 5h9v5h5v9H5V5zm4 9h2v-2h2v2h2v2h-2v2h-2v-2H9v-2z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Predictive\nModeling",
    angle: 120,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Brain\nImaging",
    angle: 180,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Signal\nProcessing",
    angle: 240,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 0.5,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const ServiceHubDiagram = () => {
  const cx = 200;
  const cy = 200;
  const radius = 140;

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative w-full max-w-[420px] aspect-square">
        {/* Glow background */}
        <div className="absolute inset-0 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm" />

        <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
          {/* Dashed connection lines */}
          {services.map((service, i) => {
            const rad = (service.angle * Math.PI) / 180;
            const x = cx + radius * Math.cos(rad);
            const y = cy + radius * Math.sin(rad);
            return (
              <motion.line
                key={`line-${i}`}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="#18D3C5"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                variants={lineVariants}
              />
            );
          })}

          {/* Center hub */}
          <motion.g variants={nodeVariants}>
            {/* Outer glow */}
            <circle cx={cx} cy={cy} r="52" fill="#7B2FF7" opacity="0.15" />
            {/* Main circle */}
            <circle cx={cx} cy={cy} r="42" fill="#7B2FF7" />
            {/* Inner accent */}
            <circle
              cx={cx}
              cy={cy}
              r="36"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity="0.3"
            />
            {/* N letter */}
            <text
              x={cx}
              y={cy + 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="28"
              fontWeight="700"
              fontFamily="Google Sans, sans-serif"
            >
              N
            </text>
          </motion.g>

          {/* Service nodes */}
          {services.map((service, i) => {
            const rad = (service.angle * Math.PI) / 180;
            const x = cx + radius * Math.cos(rad);
            const y = cy + radius * Math.sin(rad);
            const lines = service.label.split("\n");
            return (
              <motion.g key={i} variants={nodeVariants}>
                {/* Node background */}
                <circle
                  cx={x}
                  cy={y}
                  r="28"
                  fill="#0e1a42"
                  stroke="#18D3C5"
                  strokeWidth="1.5"
                />
                {/* Icon placeholder circle */}
                <circle cx={x} cy={y} r="22" fill="#18D3C5" opacity="0.1" />
                {/* Icon */}
                <foreignObject x={x - 12} y={y - 12} width="24" height="24">
                  <div className="text-[#18D3C5] flex items-center justify-center w-full h-full">
                    {service.icon}
                  </div>
                </foreignObject>
                {/* Label */}
                {lines.map((line, li) => (
                  <text
                    key={li}
                    x={x}
                    y={y + 38 + li * 14}
                    textAnchor="middle"
                    fill="white"
                    fontSize="11"
                    fontFamily="Google Sans, sans-serif"
                    opacity="0.8"
                  >
                    {line}
                  </text>
                ))}
              </motion.g>
            );
          })}
        </svg>

        {/* Floating pulse rings on center */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[84px] h-[84px] rounded-full border border-[#7B2FF7]/30"
          animate={{ scale: [1, 1.6, 1.6], opacity: [0.6, 0, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[84px] h-[84px] rounded-full border border-[#7B2FF7]/30"
          animate={{ scale: [1, 1.6, 1.6], opacity: [0.6, 0, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1.5,
          }}
        />
      </div>
    </motion.div>
  );
};

export default ServiceHubDiagram;
