/* eslint-disable */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface OfferingItem {
  title: string;
  shortTitle?: string;
  description: string;
  img: string;
}

interface OfferingDetailPanelProps {
  item: OfferingItem;
  activeIndex: number;
}

const OfferingDetailPanel: React.FC<OfferingDetailPanelProps> = ({
  item,
  activeIndex,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/5 flex-shrink-0">
              <Image
                src={item.img}
                alt={item.title}
                width={500}
                height={300}
                className="object-cover w-full h-48 md:h-full"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OfferingDetailPanel;
