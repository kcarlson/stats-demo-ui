import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const backendHost = process.env.REACT_APP_BACKEND_HOST || "localhost";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* hostname would usually be obtained with DNS */}
    <App backendHost={backendHost} />
  </React.StrictMode>
);
