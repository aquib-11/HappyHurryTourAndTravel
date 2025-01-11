import React from "react";
import { LoginPage } from "../Pages";
import { LoginAction } from "../Pages/auth/LoginPage";
import { logoutAction } from "../outlets/HomeOutlet";

export const authRoutes = [
  {
    path: "/auth/log-in",
    element: <LoginPage />,
    action: LoginAction,
  },
  {
    path: "/auth/logout",
    action: logoutAction,
  },
];
