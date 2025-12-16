import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Styles/globals.css";   // ensure correct path

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
