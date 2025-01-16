import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Auth0Provider} from "@auth0/auth0-react"
createRoot(document.getElementById("root")).render(
  <>
  <Auth0Provider
  domain="dev-u807c7oigyo5yvp7.us.auth0.com"
  clientId="wkreW4Y6MOBx3RQyGR9ARzZXlFDZemM3"
  authorizationParams={{redirect_uri:window.location.origin
    }}
  cacheLocation="localstorage"
  >
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    </Auth0Provider>
  </>
);
