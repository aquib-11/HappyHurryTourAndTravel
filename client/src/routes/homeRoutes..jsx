import React, { lazy, Suspense } from "react";
import { Loader } from "../components";
import { About, Contact, Home } from "../Pages";



export const homeRoutes = [
  {
    index: true,
    element: (
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    ),
    
  },
  {
    element: (
      <Suspense fallback={<Loader />}>
        <About />
      </Suspense>
    ),
    path: "/about",
  },
  // Contact
  {
    element: (
      <Suspense fallback={<Loader />}>
        <Contact />
      </Suspense>
    ),
    path: "/contact",
  }
  

];
