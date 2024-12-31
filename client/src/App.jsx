import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import React, { useMemo } from "react";

const App = () => {
  const router = useMemo(() => createBrowserRouter(routes), []);
  return <RouterProvider router={router} />;
};
export default App;
