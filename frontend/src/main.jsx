import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RouterDataProvider } from "./components/RoutingData/Route.jsx";
import { ThemeDataProvider } from "./components/Theme/Theme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RouterDataProvider>
        <ThemeDataProvider>
        <App />
        </ThemeDataProvider>
      </RouterDataProvider>
      
    </BrowserRouter>
  </React.StrictMode>
);
