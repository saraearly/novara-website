import React, { Fragment } from "react";
import { Link } from "react-scroll";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/outline";
import config from "../config/index.json";

const Header = () => {
  const { navigation, company } = config;
  const { name: companyName, logo } = company;
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 w-full z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
        isScrolled ? "top-2" : "top-4"
      }`}
    >
      <div
        className={`mx-auto rounded-full border transition-all duration-300 ${
          isScrolled
            ? "max-w-3xl bg-white shadow-lg border-gray-200"
            : "max-w-7xl bg-white/10 backdrop-blur-md border-white/10 shadow-sm"
        }`}
      >
        <Popover className="relative">
          <div
            className={`flex items-center justify-between px-4 sm:px-6 transition-all duration-300 ${
              isScrolled ? "h-10" : "h-12"
            }`}
          >
            {/* Logo */}
            <a href="#" className="flex items-center pl-4">
              <span className="sr-only">{companyName}</span>
              <img
                src={logo}
                alt="logo"
                style={{ height: '24px', width: 'auto' }}
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 pr-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  smooth
                  duration={1000}
                  className={`text-base font-semibold leading-none cursor-pointer whitespace-nowrap transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-700 hover:text-gray-900"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden pr-4">
              <Popover.Button
                className={`bg-transparent p-2 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset transition-colors duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900 focus:ring-gray-400"
                    : "text-white hover:text-gray-300 focus:ring-white"
                }`}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-2"
          >
            <Popover.Panel
              focus
              className="absolute top-14 inset-x-0 md:hidden bg-[#091232ff] shadow-lg border-t border-gray-700"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    smooth
                    duration={1000}
                    className="block px-3 py-4 text-base font-medium text-white hover:text-primary hover:bg-gray-800 rounded-md transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
