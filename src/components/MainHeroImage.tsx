import React from "react";
import { motion } from "framer-motion";
import config from "../config/index.json";

type MainHeroImageProps = {
  className?: string;
};

const MainHeroImage = ({ className }: MainHeroImageProps) => {
  const { mainHero } = config;

  return (
    <motion.img
      src={mainHero.img}
      alt="Hero image"
      className={className}
      animate={{
        y: [0, -20, 0],
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default MainHeroImage;
