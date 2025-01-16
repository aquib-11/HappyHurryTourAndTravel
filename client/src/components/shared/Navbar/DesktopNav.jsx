import React from "react";
import logo from "../../../assets/images/logo.png";
import { quickLinks, navLinks } from "../../../utils/NavigationLinks";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

const DesktopNav = () => {
  const { isAuthenticated, loginWithRedirect, isLoading, user, logout  } =
    useAuth0();

    const logOutMessage = ()=>{
      toast.success("logged out")
}
  const isUser = isAuthenticated && user;
  return (
    <nav className="hidden container lg:flex justify-between items-center py-2 text-[var(--bs-white)] h-20 w-full bg-[var(--bs-body-bg)] z-50 sticky top-0 ">
      <div className=" flex items-center space-x-6">
        <img src={logo} alt="Logo" className="h-20 object-cover p-2" />
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
          > logout </button>     
               ) : (
              <button
                className="formBtn"
                style={{ textTransform: "lowercase" }}
                type="button"
                onClick={async () => {
                  loginWithRedirect();
                }}
              >
                login
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
                  `flex items-center text-sm space-x-2 px-2 py-2 rounded-md transition-all duration-300 ${
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
