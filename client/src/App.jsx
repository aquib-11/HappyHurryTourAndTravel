import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomeOutlet } from "./outlets";
import { Home } from "./Pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeOutlet />,
    errorElement: <h1>1234 error</h1>,
    children: [
      {
        index: true,
        element: <Home/>,
      }
    ]}
]);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
