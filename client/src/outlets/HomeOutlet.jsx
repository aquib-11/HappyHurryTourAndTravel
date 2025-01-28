import React, { useContext } from "react";
import {
  Outlet,
  redirect,
  ScrollRestoration,
  useLoaderData,
} from "react-router-dom";
import { Footer, Header } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { createContext } from "react";

const homeLayoutContext = createContext();
export const homeLayoutLoader = async () => {
  try {
    const { data: user } = await customFetch.get("/auth/userRole");
    return { user };
  } catch (error) {
    return error;
  }
};
export const logoutAction = async () => {
  try {
    await customFetch.get("/auth/logout");
    toast.success("Logged out");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const HomeOutlet = () => {
  const { user = "visitor", adminDetails } = useLoaderData();

  return (
    <>
      <homeLayoutContext.Provider value={{ user }}>
        <div>
          <ScrollRestoration />
          <Header />
          <Outlet />
          <Footer />
        </div>
      </homeLayoutContext.Provider>
    </>
  );
};
export const useHomeLayoutContext = () => useContext(homeLayoutContext);
export default HomeOutlet;
