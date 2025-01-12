import React from "react";
import logo from "../../../assets/images/logo.png";
import { quickLinks, navLinks } from "../../../utils/NavigationLinks";
import { Link, NavLink } from "react-router-dom";

const DesktopNav = () => {

  return (
    <nav className="hidden container lg:flex justify-between items-center py-2 text-[var(--bs-white)] h-20 w-full bg-[var(--bs-body-bg)] z-50 sticky top-0 ">
      <div className=" flex items-center space-x-6">
        <img src={logo} alt="Logo" className="h-20 object-cover" />
        <ul className="flex items-center space-x-4">
          {quickLinks?.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.address}
                className={({ isActive }) =>
                  `text-[var(--bs-gray-300)] flex items-center space-x-1 transition-all duration-300 ${
                    isActive
                      ? "text-[var(--bs-text)]"
                      : "text-[var(--bs-gray-300)]"
                  } hover:text-[var(--bs-text)]`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className="flex items-center space-x-6">
          {navLinks?.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.address}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded transition-all duration-300 ${
                    isActive
                      ? "bg-[#9288ec30] text-[var(--bs-text)]"
                      : "text-[var(--bs-gray-300)]"
                  }  hover:text-[var(--bs-text)] hover:bg-[#8f85e61b]`
                }
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default DesktopNav;
