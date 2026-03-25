import React from "react";
import Image from "next/image";

import config from "../config/index.json";

const About = () => {
  const { company, about } = config;
  const { name: companyName } = company;
  const { sections = [] } = about;

  return (
    <div
      id="about"
      className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 py-8"
    >
      <div className="flex flex-col items-center justify-center">
        <div>
          <Image
            src="/assets/images/logo.svg"
            alt={companyName}
            className="h-6 w-auto"
            width={24}
            height={24}
          />
        </div>
        {sections && sections.length > 0 && (
          <div className="flex flex-wrap sm:gap-10 gap-8 items-center justify-center mt-4 h-12">
            {sections.map((section: any, index: number) => (
              <a
                key={`${section.name}-${index}`}
                href={section.href}
                className="hover:text-primary text-base cursor-pointer leading-4 text-gray-800 dark:text-gray-400 dark:hover:text-white"
              >
                {section.name}
              </a>
            ))}
          </div>
        )}
        <div className="flex items-center mt-6">
          <p className="mt-6 text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-50">
            &copy; {new Date().getFullYear()} {companyName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
export default About;
