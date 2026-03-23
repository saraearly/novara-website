import React from "react";
import { motion } from "framer-motion";
import config from "../config/index.json";

const MainHero = () => {
  const { mainHero } = config;

  return (
    <div className="max-w-xl">
      {/* Title */}
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight font-bold leading-[1.1]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="block">Innovate Medical</span>
        <span className="block">
          Intelligence with{" "}
          <span
            className="inline-block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #7B2FF7 0%, #18D3C5 100%)",
            }}
          >
            NOVARA
          </span>
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        {mainHero.description}
      </motion.p>

      {/* CTA Button */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      >
        <a
          href={mainHero.primaryAction.href}
          className="inline-flex items-center px-8 py-3.5 text-base font-semibold text-white bg-[#7B2FF7] rounded-lg hover:bg-[#6a22e0] transition-colors shadow-lg shadow-[#7B2FF7]/25"
        >
          {mainHero.primaryAction.text}
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </motion.div>
    </div>
  );
};

export default MainHero;
