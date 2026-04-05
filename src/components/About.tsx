import React from "react";

import config from "../config/index.json";

const About = () => {
  const { company, about } = config;
  const { name: companyName, logo } = company;
  const { sections = [] } = about;

  return (
    <div
      id="about"
      className="bg-[#0a0e1a] border-t border-white/[0.05]"
    >
      <div className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 py-8">
        <div className="flex flex-col items-center justify-center">
          <img
            src={logo}
            alt={companyName}
            className="h-8 w-auto mb-4"
          />
          {sections && sections.length > 0 && (
            <div className="flex flex-wrap sm:gap-10 gap-8 items-center justify-center mt-4 h-12">
              {sections.map((section: any, index: number) => (
                <a
                  key={`${section.name}-${index}`}
                  href={section.href}
                  className="hover:text-[#18D3C5] text-base cursor-pointer leading-4 text-gray-400 transition-colors"
                >
                  {section.name}
                </a>
              ))}
            </div>
          )}
          <div className="flex items-center mt-6">
            <p className="mt-6 text-xs lg:text-sm leading-none text-gray-500">
              &copy; {new Date().getFullYear()} {companyName}. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
