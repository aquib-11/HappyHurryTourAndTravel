import React, { useState } from "react";
import { quickLinks, navLinks } from "../../../utils/NavigationLinks";
import { NavLink } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { useHomeLayoutContext } from "../../../outlets/HomeOutlet";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNav = () => {
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const { user: admin } = useHomeLayoutContext();

  const toggleQuickLinks = () => {
    setIsQuickLinksOpen(!isQuickLinksOpen);
  };

  const { isAuthenticated, loginWithRedirect, isLoading, user, logout } =
    useAuth0();

  const logOutMessage = () => {
    toast.success("logged out");
  };
  const isUser = isAuthenticated && user;
  console.log({ user });
  return (
    <nav className="container flex justify-between items-center py-2 text-[var(--bs-white)] h-20 lg:hidden  ">
      <img
        src={admin?.adminDetails?.image}
        alt="Logo"
        className=" h-16 object-cover"
      />
      <div className="flex items-center justify-between">
        {isUser ? (
          <button
            className="w-full bg-[var(--bs-black)] text-[var(--bs-white)] font-semibold px-3 p-1 rounded-lg border border-gray-800 hover:bg-gray-800 transition-colors"
            onClick={() => {
              logout({
                logoutParams: { returnTo: window.location.origin },
              });
              logOutMessage();
            }}
          >
            {" "}
            Logout{" "}
          </button>
        ) : (
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 p-1 rounded-lg"
            style={{ textTransform: "lowercase" }}
            type="button"
            onClick={async () => {
              loginWithRedirect();
            }}
          >
            Login
          </button>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-[var(--bs-body-bg)] flex justify-around items-center z-50 py-3">
        {navLinks?.map((link, index) => (
          <NavLink
            key={index}
            to={link.address}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 transition-all duration-300 ${
                isActive ? "text-[var(--bs-text)]" : "text-[var(--bs-gray-300)]"
              } hover:text-[var(--bs-text)]`
            }
          >
            <span>{link.icon}</span>
            <span>{link.name}</span>
          </NavLink>
        ))}
        <button
          onClick={toggleQuickLinks}
          className="text-[var(--bs-gray-300)]  text-2xl "
        >
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
