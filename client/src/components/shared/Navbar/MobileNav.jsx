import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { quickLinks, navLinks } from "../../../utils/NavigationLinks";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaEllipsisV } from "react-icons/fa";

const MobileNav = () => {
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);

  const toggleQuickLinks = () => {
    setIsQuickLinksOpen(!isQuickLinksOpen);
  };

  return (
    <nav className="container flex justify-between items-center py-2 text-[var(--bs-white)] h-20 lg:hidden  ">
      <img src={logo} alt="Logo" className=" h-16 object-cover" />
      <div className="fixed bottom-0 left-0 w-full bg-[var(--bs-body-bg)] flex justify-around items-center py-3">
        {navLinks?.map((link, index) => (
          <NavLink
            key={index}
            to={link.address}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 transition-all duration-300 ${
                isActive
                  ? "text-[var(--bs-text)]"
                  : "text-[var(--bs-gray-300)]"
              } hover:text-[var(--bs-text)]`
            }
          >
            <span>{link.icon}</span>
            <span>{link.name}</span>
          </NavLink>
        ))}
        <button onClick={toggleQuickLinks} className="text-[var(--bs-gray-300)]  text-2xl ">
          <FaEllipsisV size={24} />
        </button>
      </div>
      {isQuickLinksOpen && (
        <div className="fixed bottom-16 right-4 bg-[var(--bs-body-bg)] p-4 rounded shadow-lg z-50">
          <ul className="flex flex-col items-start space-y-4">
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
                  onClick={toggleQuickLinks}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default MobileNav;