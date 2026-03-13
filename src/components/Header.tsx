import React, { Fragment } from "react";
import { Link } from "react-scroll";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/outline";
import Image from "next/image";
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
    <header className="fixed top-4 left-0 w-full z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8">
      <div
        className={`max-w-7xl mx-auto rounded-full border border-white/10 transition-all duration-300 ${
          isScrolled
            ? "bg-[#091232]/80 shadow-lg backdrop-blur-md"
            : "bg-white/10 backdrop-blur-md shadow-sm"
        }`}
      >
        <Popover className="relative">
          <div className="flex items-center justify-between h-12 px-4 sm:px-6">
            {/* Logo */}
            <a href="#" className="flex items-center pl-4">
              <span className="sr-only">{companyName}</span>
              <Image
                src={logo}
                alt="logo"
                width={96}
                height={96}
                className="h-10 w-auto"
                priority
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  smooth
                  duration={1000}
                  className="text-base font-semibold leading-none text-white hover:text-gray-200 cursor-pointer whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#091232]/50 border border-white/20 rounded-md hover:bg-[#091232]/80 transition-colors"
              >
                Contact
              </a>
              <a
                href="#"
                className="px-5 py-2.5 text-sm font-semibold text-[#091232] bg-white rounded-md hover:bg-gray-100 transition-colors"
              >
                Log In
              </a>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden pr-4">
              <Popover.Button className="bg-transparent p-2 inline-flex items-center justify-center text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
