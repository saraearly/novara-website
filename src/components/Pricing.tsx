import React from "react";

import config from "../config/index.json";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  degree?: string;
  linkedin?: string;
}

const Pricing = () => {
  const { pricing } = config;
  const { subgroups, title, subtitle } = pricing;

  return (
    <section className="bg-[#FAFAFA] py-16 lg:py-24" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4 max-w-4xl mx-auto">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 font-medium tracking-wide">
              {subtitle}
            </p>
          )}
        </div>

        {subgroups.map((subgroup) => (
          <div key={subgroup.name} className="mb-12 last:mb-0">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
              {subgroup.name}
            </h3>
            {subgroup.items.length > 0 ? (
              <div
                className={
                  subgroup.name === "Senior Advisor"
                    ? "flex justify-center"
                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
                }
              >
                {(subgroup.items as TeamMember[]).map((member, index) => (
                  <div
                    key={`${member.name}-${index}`}
                    className={`bg-white rounded-[2rem] p-5 sm:p-6 flex flex-col border-2 border-gray-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 ${
                      subgroup.name === "Senior Advisor"
                        ? "max-w-sm w-full"
                        : ""
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-3 flex-shrink-0 bg-gray-100">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-xl font-medium text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-gray-400 font-medium mb-2 text-sm">
                        {member.role}
                      </p>
                    </div>

                    {(member.degree || member.linkedin) && (
                      <div className="mt-auto pt-3 border-t border-gray-50 flex flex-col items-start gap-2">
                        {member.degree && (
                          <div className="flex items-start text-left">
                            <svg
                              className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                            <p className="text-sm text-gray-600">
                              {member.degree}
                            </p>
                          </div>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${member.name} LinkedIn`}
                            className="text-gray-400 hover:text-primary transition-colors self-end"
                          >
                            <svg
                              className="w-5 h-5 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 italic">
                No members in this group yet.
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
