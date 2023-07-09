import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";

import { queryClient } from "./services/queryClient";
import { BMCProvider } from "./providers/BMCProvider";

import "./assets/css/globals.css";

import Routes from "./routes";

ReactDOM.createRoot(document.querySelector("#root")).render(
  <QueryClientProvider client={queryClient}>
    <BMCProvider>
      <Routes />
    </BMCProvider>
  </QueryClientProvider>
);
