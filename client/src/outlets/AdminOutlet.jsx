import React from "react";
import { Outlet } from "react-router-dom";

const AdminOutlet = () => {
  return (
    <div>
      <div></div>
      <Outlet />
    </div>
  );
};

export default AdminOutlet;
