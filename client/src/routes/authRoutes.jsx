import React from "react";
import { ChangePassword, ForgotPassword, LoginPage } from "../Pages";
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
  {
    path: "/auth/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword/>,
  }
];
