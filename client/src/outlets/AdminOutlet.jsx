import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { adminLinks } from "../utils/NavigationLinks";

const AdminOutlet = () => {
  return (
    <div className="grid grid-cols-12  container gap-2">
      <ul className="col-span-12 md:col-span-2 flex  md:items-start  md:flex-col md:justify-start flex-wrap gap-3 border border-gray-600 rounded-md p-4 ">
        {adminLinks?.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.address}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-2 rounded transition-all duration-300 ${
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

      <div className=" col-span-12 md:col-span-10 p-4 border border-gray-600 rounded-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminOutlet;
