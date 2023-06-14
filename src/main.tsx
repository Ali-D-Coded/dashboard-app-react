import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { AuthProvider } from "react-auth-kit";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        // cookieSecure={window.location.protocol === "https:"}
        cookieSecure={false}
      >
        <App />
      </AuthProvider>
    </QueryClientProvider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
