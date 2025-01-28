import React from "react";
import logo from "../../../assets/images/logo.png";
import { quickLinks, navLinks } from "../../../utils/NavigationLinks";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { useHomeLayoutContext } from "../../../outlets/HomeOutlet";
import { FaUserMinus, FaUserPlus } from "react-icons/fa6";

const DesktopNav = () => {
  const { isAuthenticated, loginWithRedirect, isLoading, user, logout } =
    useAuth0();
  const { user: admin } = useHomeLayoutContext();

  const logOutMessage = () => {
    toast.success("logged out");
  };
  const isUser = isAuthenticated && user;
  return (
    <nav className="hidden container lg:flex justify-between items-center py-2 text-[var(--bs-white)] h-20 w-full bg-[var(--bs-body-bg)] z-50 sticky top-0 ">
      <div className="flex items-center space-x-3">
        <img
          src={admin?.adminDetails?.image}
          alt="Logo"
          className="h-20 object-cover p-2"
        />
        <ul className="flex items-center space-x-4">
          {quickLinks?.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.address}
                className={({ isActive }) =>
                  `text-[var(--bs-gray-300)] text-sm flex items-center space-x-1 transition-all duration-300 ${
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
          {isUser ? (
            <button
              onClick={() => {
                logout({
                  logoutParams: { returnTo: window.location.origin },
                });
                logOutMessage();
              }}
              className="flex items-center gap-2 bg-black/25 text-[var(--bs-white)] font-semibold text-sm px-3 py-2 rounded-lg border border-gray-800 hover:bg-gray-800 transition-colors"
            >
              <FaUserMinus/>
              Logout
            </button>
          ) : (
            <button
              className="flex items-center gap-2 bg-[--bs-blur-bg] transition-colors duration-200 hover:bg-purple-700 text-sm hover:text-white text-[var(--bs-text)] px-2 py-1 rounded-md font-bold"
              type="button"
              onClick={async () => {
                await loginWithRedirect();
              }}
            >
             <FaUserPlus/> Login
            </button>
          )}
        </ul>
      </div>
      <div>
        <ul className="flex items-center space-x-3">
          {navLinks?.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.address}
                className={({ isActive }) =>
                  `flex items-center text-sm space-x-2 px-3 py-2 rounded-md transition-all duration-300 ${
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
